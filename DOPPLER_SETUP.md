# Doppler Setup for Recovery Compass

## Overview

Recovery Compass uses [Doppler](https://doppler.com) for secure secrets management. All environment variables are injected at runtime via `doppler run`, eliminating the need for local `.env` files and preventing secrets leakage.

**Doppler Configuration:**
- **Project:** `manus-warp-api-keys-ecosystem-overhaul`
- **Config:** `dev_rc_apis`

## Quick Start

### Prerequisites

1. **Install Doppler CLI** (if not already installed):
   ```bash
   brew install gnupg
   brew install dopplerhq/cli/doppler
   doppler --version
   ```

2. **Authenticate:**
   ```bash
   doppler login
   doppler whoami
   ```

### Running the Development Server

From the repository root:

```bash
# Option 1: Direct command
doppler run -- npm run dev

# Option 2: Open a Doppler-injected shell, then run commands
doppler run -- zsh
npm run dev
```

### Warp Workflows

We've created Warp workflows for one-click dev startup:

- **Recovery Compass Dev (Doppler)**: Starts Vite dev server with Doppler secrets
- **Recovery Compass Shell (Doppler)**: Opens an interactive shell with secrets injected

Access these from Warp's Workflows panel.

## How It Works

1. **Runtime Injection:** Doppler CLI fetches secrets and injects them as environment variables when you run `doppler run`.

2. **Vite Integration:** The Vite dev server reads `VITE_*` prefixed environment variables via `import.meta.env` at build/dev time.

3. **No Local Files:** No `.env` files exist locally or in version control. All secrets live in Doppler's secure vault.

## Environment Variables

The following secrets are managed in Doppler (config: `dev_rc_apis`):

| Variable | Description |
|----------|-------------|
| `VITE_ANALYTICS_KEY` | Amplitude analytics key |
| `VITE_DEVANSH_UTM` | UTM parameters for Devansh campaign tracking |
| `VITE_ENVIRONMENT` | Environment identifier (development/production) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key (placeholder) |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project identifier |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable/anon JWT key |
| `VITE_SUPABASE_URL` | Supabase project URL |

## Code Changes

### Supabase Client Refactoring

The Supabase client (`src/integrations/supabase/client.ts`) has been refactored to read credentials from environment variables:

```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL. Are you running via Doppler?');
}
if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_SUPABASE_PUBLISHABLE_KEY. Are you running via Doppler?');
}
```

This ensures:
- No hardcoded credentials in source code
- Clear error messages if secrets are missing
- Runtime validation on app startup

## Verification

### Verify Secrets Are Injected

```bash
# Test individual secret
doppler run --command='echo $VITE_SUPABASE_URL'

# List all VITE_ variables
doppler run -- env | grep ^VITE_
```

### Verify No Secrets in Repo

```bash
# Check git status
git status

# Search for hardcoded secrets (should return nothing)
git grep -n "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

## Troubleshooting

### "Missing VITE_SUPABASE_URL" Error

If you see this error, you're not running through Doppler. Always use:
```bash
doppler run -- npm run dev
```

### Wrong Project/Config

If Doppler is using the wrong project or config:
```bash
# Check current configuration
doppler configure

# Reset configuration
cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main
doppler setup --project manus-warp-api-keys-ecosystem-overhaul --config dev_rc_apis --no-interactive
```

### Environment Variable Not Found

List all available secrets:
```bash
doppler secrets --only-names
```

Add a missing secret:
```bash
doppler secrets set VITE_NEW_SECRET="value"
```

## CI/CD Integration (Future)

For AWS Amplify or other CI/CD pipelines:

1. **Create a Service Token** (scoped to `dev_rc_apis`):
   ```bash
   doppler tokens create \
     --project manus-warp-api-keys-ecosystem-overhaul \
     --config dev_rc_apis \
     --name "amplify-dev"
   ```

2. **Store Token in CI Environment:**
   - Add `DOPPLER_TOKEN=dp.st.xxxxx` to Amplify environment variables

3. **Update Build Commands:**
   ```yaml
   build:
     commands:
       - doppler run -- npm ci
       - doppler run -- npm run build
   ```

## Security Best Practices

- ✅ No `.env` files in repo (enforced by `.gitignore`)
- ✅ No hardcoded credentials in source code
- ✅ Secrets injected at runtime only
- ✅ Project/config pinned via `doppler.yaml` for team consistency
- ✅ Service Tokens (not personal tokens) for CI/CD
- ✅ Secrets scoped per environment (dev/staging/prod)

## Related Files

- `doppler.yaml` - Pins project and config for this repository
- `.gitignore` - Excludes `.env` and `.env.*` files
- `.warp/workflows/` - Warp workflows for Doppler-injected commands
- `src/integrations/supabase/client.ts` - Refactored to use env vars

## References

- [Doppler Documentation](https://docs.doppler.com/)
- [Doppler CLI Reference](https://docs.doppler.com/docs/cli)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
