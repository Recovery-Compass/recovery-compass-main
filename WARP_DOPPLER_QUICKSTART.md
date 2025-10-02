# Warp + Doppler Quick Start

## 🎯 Current Status

✅ **Doppler is fully configured and bound to this project!**

- **Project:** `manus-warp-api-keys-ecosystem-overhaul`
- **Config:** `dev_rc_apis`
- **Secrets:** 7 VITE_ environment variables ready
- **Scope:** Bound to `/Users/ericjones/Projects/recovery-compass/recovery-compass-main`

---

## 🚀 Run Warp Through Doppler (3 Ways)

### Method 1: Direct Dev Server Launch (Fastest)

```bash
cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main
doppler run -- npm run dev
```

**What happens:**
- Doppler fetches all 7 secrets from `dev_rc_apis` config
- Injects them as environment variables
- Launches Vite dev server
- Vite reads `import.meta.env.VITE_*` variables at runtime

---

### Method 2: Doppler-Injected Shell (Most Flexible)

```bash
cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main
doppler run -- zsh
```

**Now you're in a Warp shell with all secrets injected!**

Run any command:
```bash
# Start dev server
npm run dev

# Run tests
npm test

# Check environment variables
env | grep VITE_

# Build for production
npm run build
```

**Everything inherits the Doppler-injected secrets automatically.**

---

### Method 3: Warp Workflows (One-Click)

**We've created pre-configured workflows for you:**

1. Open Warp's **Workflows panel** (Cmd+Shift+P → "Workflows")
2. Find these workflows:
   - **"Recovery Compass Dev (Doppler)"** - Starts dev server
   - **"Recovery Compass Shell (Doppler)"** - Opens injected shell
3. Click to run

**Location:** `.warp/workflows/rc-dev-with-doppler.yaml`

---

## 🔍 Verify Doppler Is Working

### Quick Check
```bash
doppler run --command='echo $VITE_SUPABASE_URL'
```
**Expected output:** `https://shcuzhyonrpacdynxjjd.supabase.co`

### List All VITE_ Variables
```bash
doppler run -- env | grep ^VITE_
```
**Expected output:** 7 environment variables

### Check Doppler Configuration
```bash
doppler configure
```
**Should show:**
- **config:** `dev_rc_apis`
- **project:** `manus-warp-api-keys-ecosystem-overhaul`
- **scope:** Your repo directory

---

## 💡 Pro Tips for Warp + Doppler

### 1. Create Shell Aliases (Optional)
Add to your `~/.zshrc`:

```bash
# Doppler shortcuts for Recovery Compass
alias rc-dev='cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main && doppler run -- npm run dev'
alias rc-shell='cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main && doppler run -- zsh'
alias rc-build='cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main && doppler run -- npm run build'
```

Then reload:
```bash
source ~/.zshrc
```

Now you can just type `rc-dev` from anywhere!

---

### 2. Use Warp's AI Agents with Doppler Context

When using Warp's agents, you can reference Doppler secrets:

**Example prompts:**
- "Run the dev server with Doppler secrets"
- "Show me all VITE_ environment variables from Doppler"
- "Start a Doppler-injected shell and run tests"

The agent will automatically use `doppler run` commands.

---

### 3. Export Secrets Temporarily (Current Shell Only)

If you need secrets in your **current** Warp session without starting a new shell:

```bash
set -a
source <(doppler secrets download --no-file --format env)
set +a
```

**Then verify:**
```bash
echo $VITE_SUPABASE_URL
```

**⚠️ Caution:** Secrets stay in this shell session only. Use `doppler run` for better isolation.

---

## 🛠️ Troubleshooting

### "Missing VITE_SUPABASE_URL" Error

**Cause:** You started the app without Doppler.

**Fix:**
```bash
# Instead of this:
npm run dev

# Use this:
doppler run -- npm run dev
```

---

### Wrong Secrets or Config

**Check current configuration:**
```bash
doppler configure
```

**Re-bind if needed:**
```bash
cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main
doppler setup --project manus-warp-api-keys-ecosystem-overhaul --config dev_rc_apis --no-interactive
```

---

### Secrets Not Updating

**Refresh Doppler cache:**
```bash
doppler run -- env | grep VITE_
```

If secrets still don't match Doppler dashboard:
1. Check you're in the correct directory
2. Verify `doppler.yaml` exists
3. Re-authenticate: `doppler login`

---

## 🔐 Security Notes

✅ **What's Protected:**
- No `.env` files in repo or locally
- No hardcoded secrets in source code
- Secrets fetched at runtime only
- Isolated per-shell injection

❌ **Never Do This:**
- Don't commit `doppler.yaml` with service tokens (only commit project/config)
- Don't echo secrets to logs or console
- Don't share your personal Doppler token

---

## 📚 Related Documentation

- `DOPPLER_SETUP.md` - Full Doppler integration guide
- `.warp/workflows/` - Pre-configured Warp workflows
- `doppler.yaml` - Project/config binding
- `src/integrations/supabase/client.ts` - Example of env var usage

---

## 🎬 Getting Started Right Now

**Copy and paste this into Warp:**

```bash
cd /Users/ericjones/Projects/recovery-compass/recovery-compass-main && doppler run -- npm run dev
```

**That's it! Your dev server is running with Doppler-managed secrets. 🚀**

---

## 📞 Need Help?

1. Check `DOPPLER_SETUP.md` for detailed troubleshooting
2. Run `doppler --help` for CLI reference
3. Visit [Doppler Documentation](https://docs.doppler.com/)
4. Ask Warp's AI agent: "Help me debug Doppler secrets"
