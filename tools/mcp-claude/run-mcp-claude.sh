#!/bin/sh
set -euo pipefail
# Thin wrapper to reliably spawn the MCP Claude server under Warp.
# Uses absolute paths to avoid PATH/WD resolution issues in spawn.
# Fetches Anthropic API key from macOS Keychain at runtime.

# Minimal startup log (no secrets)
{
  echo "$(date -Is) wrapper starting pid=$$" >> /tmp/mcp-claude-wrapper.log
} 2>/dev/null || true

# Read ANTHROPIC_API_KEY from Keychain (account: recovery-compass, service: ANTHROPIC_API_KEY)
KEY="$(/usr/bin/security find-generic-password -a 'recovery-compass' -s 'ANTHROPIC_API_KEY' -w 2>/dev/null || true)"
if [ -z "${KEY:-}" ]; then
  echo "Missing ANTHROPIC_API_KEY in Keychain (account=recovery-compass, service=ANTHROPIC_API_KEY)" >&2
  exit 1
fi
export ANTHROPIC_API_KEY="$KEY"

# Resolve Node (prefer Homebrew path, fall back to PATH)
NODE="/opt/homebrew/bin/node"
if [ ! -x "$NODE" ]; then
  NODE="$(/usr/bin/which node)"
fi
if [ -z "${NODE:-}" ] || [ ! -x "$NODE" ]; then
  echo "Node binary not found" >&2
  exit 1
fi

exec "$NODE" \
  /Users/ericjones/Projects/recovery-compass/recovery-compass-main/tools/mcp-claude/server.js
