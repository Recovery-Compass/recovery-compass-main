
#!/usr/bin/env bash
# Lightweight, non-blocking guardrails verifier for Recovery Compass

echo "== Recovery Compass – Solo-Dev Guardrails Check =="

# 1) Secrets hygiene
if [ -f ".env" ]; then
  echo "WARN: .env found in repo root. Ensure secrets are not committed."
else
  echo "OK: No .env committed."
fi

# 2) Lockfiles (prefer one lockfile, npm preferred if using npm)
warnings=0
for lf in yarn.lock pnpm-lock.yaml bun.lockb; do
  if [ -f "$lf" ]; then
    echo "WARN: Found $lf — prefer a single lockfile strategy (npm or your chosen tool)."
    warnings=$((warnings+1))
  fi
done
if [ $warnings -eq 0 ]; then
  echo "OK: No alternate lockfiles detected."
fi

# 3) Build output expectation
echo "INFO: Expected build output directory is 'dist/' for Vite SPA."

# 4) CI hygiene reminder
if [ -d ".github/workflows" ]; then
  echo "INFO: GitHub Actions workflows exist. Keep CI/CD Amplify-only; avoid adding new workflows."
else
  echo "OK: No GitHub Actions workflows directory detected."
fi

echo ""
echo "== SSH guardrails verification =="
# Use which to find SSH binaries for better cross-platform compatibility
SSH_BIN="$(which ssh 2>/dev/null || echo "/usr/bin/ssh")"
SSH_ADD_BIN="$(which ssh-add 2>/dev/null || echo "/usr/bin/ssh-add")"
FINGERPRINT="SHA256:2TB7n4C+bOneTr5SXXLPzZxeivUujr9VzyVkYZZ8EO0"
IDENTITY_FILE="$HOME/.ssh/my_new_ed25519"

# Check effective ssh config for GitHub
if ! $SSH_BIN -G github.com | grep -qiE '^user git$'; then
  echo "FAIL: ssh -G github.com does not return 'user git'"
  exit 1
fi
if ! $SSH_BIN -G github.com | grep -qiE '^identitiesonly yes$'; then
  echo "FAIL: ssh -G github.com missing 'identitiesonly yes'"
  exit 1
fi
IDENT_FROM_CFG="$($SSH_BIN -G github.com | awk '/^identityfile /{print $2; exit}')"
if [ "$IDENT_FROM_CFG" != "$IDENTITY_FILE" ]; then
  echo "WARN: identityfile is '$IDENT_FROM_CFG' (expected '$IDENTITY_FILE')"
fi

# Ensure correct key is present in the agent
if ! $SSH_ADD_BIN -l -E sha256 >/dev/null 2>&1; then
  echo "INFO: Agent is empty; loading key from Keychain..."
  $SSH_ADD_BIN --apple-use-keychain "$IDENTITY_FILE" >/dev/null 2>&1 || true
fi
if ! $SSH_ADD_BIN -l -E sha256 | grep -q "$FINGERPRINT"; then
  echo "INFO: Key not present; attempting to load from Keychain..."
  $SSH_ADD_BIN --apple-use-keychain "$IDENTITY_FILE" >/dev/null 2>&1 || true
fi
if $SSH_ADD_BIN -l -E sha256 | grep -q "$FINGERPRINT"; then
  echo "OK: SSH key fingerprint present in agent."
else
  echo "FAIL: SSH key fingerprint not present in agent."
  exit 1
fi

# Probe GitHub authentication (non-interactive banner check)
if $SSH_BIN -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
  echo "OK: GitHub SSH authentication works."
else
  echo "WARN: Could not confirm GitHub auth. Ensure the public key for $IDENTITY_FILE is added to GitHub."
fi

echo "== Guardrails check complete =="
exit 0
