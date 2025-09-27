
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

echo "== Guardrails check complete =="
exit 0
