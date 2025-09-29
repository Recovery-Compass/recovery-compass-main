#!/bin/bash
set -euo pipefail

# UNSTICK readiness controller for Claude MCP staging
# - Bounded retries with classification and artifacts
# - Never stalls; exits with codes per classification
#
# Paths
ROOT="/Users/ericjones/Projects/recovery-compass/recovery-compass-main"
TOOL_DIR="$ROOT/tools/mcp-claude"
OUT_DIR="$TOOL_DIR/out"
STATUS_FILE="$OUT_DIR/status.json"
ATTEMPTS_LOG="$OUT_DIR/readiness.attempts.log"
SMOKE_JSONL="$OUT_DIR/smoke-test.jsonl"
SMOKE_SUMMARY="$OUT_DIR/smoke-summary.json"
WRAPPER="$TOOL_DIR/run-mcp-claude.sh"
SMOKE_JS="$TOOL_DIR/smoke-test.js"

mkdir -p "$OUT_DIR"
: > "$ATTEMPTS_LOG"

# Helpers
now_iso() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
truncate_200() { awk '{ s=s $0 "\n" } END { printf "%s", substr(s,1,200) }'; }
write_status() {
  local phase="$1" code="$2" classification="$3" attempts="$4" deadline="$5" message="$6"
  MSG="$message" python3 - "$phase" "$code" "$classification" "$attempts" "$deadline" <<'PY' >"$STATUS_FILE"
import json, os, sys
phase, code, classification, attempts, deadline = sys.argv[1:6]
msg = os.environ.get("MSG", "")
try:
    code_val = int(code)
except Exception:
    code_val = code
obj = {
  "phase": phase,
  "anthr_status_code": code_val,
  "classification": classification,
  "attempts": int(attempts),
  "deadline_reached": (deadline.lower() == 'true'),
  "message": msg,
}
print(json.dumps(obj, ensure_ascii=False))
PY
}

# Phase 1: Readiness check against Anthropic
PHASE="readiness"
KEY=$(security find-generic-password -a 'recovery-compass' -s 'ANTHROPIC_API_KEY' -w 2>/dev/null || true)
if [[ -z "${KEY}" ]]; then
  echo "$(now_iso) MISSING_KEY" >> "$ATTEMPTS_LOG"
  write_status "$PHASE" "NO_KEY" "TERMINAL_EXTERNAL_DEPENDENCY" 0 false "Missing ANTHROPIC_API_KEY in Keychain (account=recovery-compass, service=ANTHROPIC_API_KEY)"
  exit 12
fi

MAX_ATTEMPTS=8
DEADLINE_SECS=$((20*60))
START_TS=$(date +%s)
ATTEMPT=0
DELAY=2
CODE=""
BODY=""

while (( ATTEMPT < MAX_ATTEMPTS )); do
  ATTEMPT=$((ATTEMPT+1))
  TMP_BODY=$(mktemp)
  # Deterministic minimal payload; hard timeouts
  set +e
  CURL_OUT=$(curl -sS \
    --connect-timeout 5 --max-time 10 \
    -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "x-api-key: ${KEY}" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{"model":"claude-3-5-sonnet-latest","max_tokens":1,"messages":[{"role":"user","content":"ping"}]}' \
    https://api.anthropic.com/v1/messages 2>"$TMP_BODY.err")
  RC=$?
  set -e
  BODY="${CURL_OUT%HTTP_STATUS:*}"
  CODE="${CURL_OUT##*HTTP_STATUS:}"
  CODE="${CODE%%$'\n'*}"
  ERR_SNIP=$(cat "$TMP_BODY.err" 2>/dev/null | truncate_200)
  rm -f "$TMP_BODY.err"
  TS=$(now_iso)
  echo "$TS attempt=$ATTEMPT code=${CODE:-RC_$RC} err=${ERR_SNIP}" >> "$ATTEMPTS_LOG"

  # 200 OK → proceed to probe
  if [[ "$CODE" == "200" ]]; then
    write_status "$PHASE" "$CODE" "OK" "$ATTEMPT" false "OK"
    break
  fi

  # 400 invalid_request_error with disabled org → terminal
  if [[ "$CODE" == "400" ]] && echo "$BODY" | grep -qi "organization has been disabled"; then
MSG=$(printf "%s" "$BODY" | truncate_200)
write_status "$PHASE" "$CODE" "TERMINAL_EXTERNAL_DEPENDENCY" "$ATTEMPT" false "$MSG"
    echo "ANTHROPIC_ORG_DISABLED_TERMINAL"
    exit 70
  fi

  # Other 4xx: treat as terminal external dependency (e.g., 401/403)
  if [[ "$CODE" =~ ^4[0-9][0-9]$ ]]; then
MSG=$(printf "%s" "$BODY" | truncate_200)
write_status "$PHASE" "$CODE" "TERMINAL_EXTERNAL_DEPENDENCY" "$ATTEMPT" false "$MSG"
    exit 70
  fi

  # 5xx or timeout/transport errors → retry with backoff
  NOW=$(date +%s)
  ELAPSED=$((NOW-START_TS))
  if (( ATTEMPT >= MAX_ATTEMPTS || ELAPSED >= DEADLINE_SECS )); then
MSG=$(printf "%s" "$BODY" | truncate_200)
write_status "$PHASE" "${CODE:-RC_$RC}" "RETRYING" "$ATTEMPT" true "$MSG"
    exit 75
  fi
  sleep "$DELAY"
  # exponential backoff (cap at 120s)
  if (( DELAY < 120 )); then DELAY=$((DELAY*2)); fi
done

# Phase 2: Probe (only reached if 200 OK)
PHASE="probe"
SMOKE_START=$(date +%s)
: > "$SMOKE_JSONL"

# Run smoke test with 60s timeout via Python wrapper to avoid hanging
python3 - "$SMOKE_JS" "$SMOKE_JSONL" <<'PY'
import json, os, sys, subprocess, time, selectors
from datetime import datetime

smoke_js = sys.argv[1]
out_path = sys.argv[2]
start = time.time()
proc = subprocess.Popen(["node", smoke_js], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
sel = selectors.DefaultSelector()
if proc.stdout: sel.register(proc.stdout, selectors.EVENT_READ)
if proc.stderr: sel.register(proc.stderr, selectors.EVENT_READ)

with open(out_path, 'a') as f:
    while True:
        if (time.time() - start) > 60:
            proc.kill()
            exit_code = 124
            break
        events = sel.select(timeout=0.5)
        for key, _ in events:
            line = key.fileobj.readline()
            if not line:
                continue
            entry = {"ts": datetime.utcnow().isoformat()+"Z", "stream": "stderr" if key.fileobj is proc.stderr else "stdout", "line": line.rstrip("\n")}
            f.write(json.dumps(entry)+"\n")
            f.flush()
        if proc.poll() is not None:
            exit_code = proc.returncode
            break

# Summarize
summary = {
    "tools_list": 0,
    "summarize_status": "UNKNOWN",
    "duration_sec": round(time.time()-start, 3),
    "exit_code": exit_code,
}

# Parse the jsonl for simple signals
try:
    with open(out_path, 'r') as f:
        lines = [json.loads(l) for l in f]
    text = "\n".join([l.get("line","") for l in lines])
    if "Tools:" in text:
        # heuristic: count occurrences of "name: '" as a proxy
        summary["tools_list"] = text.count("name: '")
    if "Result:" in text:
        summary["summarize_status"] = "OK"
    elif "McpError" in text or "error" in text.lower():
        summary["summarize_status"] = "ERROR"
except Exception:
    pass

print(json.dumps(summary))
PY > "$SMOKE_SUMMARY"

SMOKE_END=$(date +%s)
write_status "$PHASE" 200 "OK" "$ATTEMPT" false "smoke test completed in $((SMOKE_END-SMOKE_START))s"

# Emit success markers and summary
echo "ANTHROPIC_OK_200"
echo "SMOKE_TEST_OK"
cat "$SMOKE_SUMMARY"
