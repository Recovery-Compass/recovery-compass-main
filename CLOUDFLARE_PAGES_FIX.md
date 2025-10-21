# Cloudflare Pages Deployment Fix - October 20, 2025

## Problem Identified
The build was failing because the project was configured as a Cloudflare **Worker** instead of Cloudflare **Pages**. The recovery-compass project is a Vite React static site application, which should be deployed as Pages, not as a Worker script.

## Root Cause
- Build command: `bun run build` ✅ (correct - builds static files to `dist/`)
- Deploy command: `npx wrangler deploy` ❌ (wrong - tries to deploy as Worker)
- Configuration: Worker settings instead of Pages settings

## Solution Applied

### 1. Updated `wrangler.toml`
```toml
name = "erdmethod"
compatibility_date = "2025-10-16"
pages_build_output_dir = "dist"

# This is a Cloudflare Pages project
# To deploy: npx wrangler pages deploy dist --project-name=erdmethod
```

### 2. Added Deploy Script to `package.json`
```json
"scripts": {
  "deploy": "bun run build && npx wrangler pages deploy dist --project-name=erdmethod"
}
```

### 3. Successful Deployment
- ✅ Created new Cloudflare Pages project: `erdmethod`
- ✅ Uploaded 35 files successfully
- ✅ Live URL: https://5cb4f93c.erdmethod.pages.dev
- ✅ Build time: ~3 seconds
- ✅ Upload time: ~167 seconds

## Next Steps for Cloudflare Dashboard

### Update Your Cloudflare Settings

You need to update the build settings in your Cloudflare dashboard to use Pages instead of Workers:

#### Option 1: Convert Existing Worker to Pages (Recommended if you want to keep the domain)
1. Go to Cloudflare Dashboard → Workers & Pages
2. Delete the existing `erdmethod` Worker
3. Create a new Pages project named `erdmethod`
4. Connect to GitHub: `Recovery-Compass/recovery-compass-main`
5. Configure build settings:
   - **Framework preset**: None (or Vite)
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
   - **Branch**: `main`
6. Add environment variable:
   - Name: `BUN_VERSION`
   - Value: `1.2.19`
7. Add your custom domain `erdmethod.org` to the Pages project

#### Option 2: Use the New Pages Project
The Pages project is already created and working. You can:
1. Add the custom domain `erdmethod.org` to the new Pages project
2. Remove the domain from the old Worker
3. Update DNS if needed

### For GitHub Auto-Deployments
1. Go to your Pages project settings
2. Enable "Automatic git deployments" 
3. Every push to `main` will automatically build and deploy

### Local Development
```bash
# Build the project
bun run build

# Deploy to Cloudflare Pages
bun run deploy
# or
npm run deploy

# Preview locally
bun run preview
```

## Technical Details

### Why This Failed Before
- **Workers** are for serverless functions/APIs (JavaScript/TypeScript code that runs on edge)
- **Pages** are for static sites (HTML/CSS/JS files served from CDN)
- Vite builds static files → needs Pages, not Workers
- Command `npx wrangler deploy` without `pages` flag tries to deploy as Worker

### Files Modified
1. `wrangler.toml` - Clarified Pages configuration
2. `package.json` - Added `deploy` script
3. Created this documentation

### Deployment URL
- Preview URL: https://5cb4f93c.erdmethod.pages.dev
- Custom domain (to be configured): erdmethod.org

## Verification
✅ Build successful (2.94s)
✅ Deploy successful (166.56s)
✅ Site accessible and working
✅ Zero build errors
✅ All 35 files uploaded

The site is now live and ready for the custom domain configuration!
