#!/usr/bin/env bash
# Run project scripts with Doppler-injected secrets using a Keychain-stored service token.
# Usage: scripts/run-with-doppler.sh [dev|build|preview|<npm-script>]
set -Eeuo pipefail
CMD="${1:-dev}"

# Pre-flight
if ! command -v doppler >/dev/null 2>&1; then
  echo "[ERROR] Doppler CLI not found. Install via: brew install dopplerhq/cli/doppler" >&2
  exit 1
fi
if ! command -v bun >/dev/null 2>&1; then
  echo "[ERROR] Bun not found. Install via: brew install bun" >&2
  exit 1
fi

# Resolve token from Keychain (never printed)
TOKEN="$($HOME/bin/doppler-token.sh)"

# Execute script via Doppler; secrets stay in env, not files
exec doppler --token "$TOKEN" run -- bun run "$CMD"
