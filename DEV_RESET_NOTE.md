
# Recovery Compass - Container Path Fix & Reset Instructions

## CRITICAL BUILD ERROR (5-Day Outage)

**Error**: `npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '/dev-server/package.json'`

**Root Cause**: Container is configured to look for `package.json` in `/dev-server/` directory, but project files are located in root directory (`/`).

## IMMEDIATE FIX REQUIRED

### 1. Container Path Configuration
```bash
# Current (BROKEN) container path: /dev-server/
# Correct container path should be: / (project root)
```

### 2. Platform Team Actions Required

#### Step 1: Stop All Services
```bash
# Stop the running dev server container
docker stop recovery-compass-dev
docker rm recovery-compass-dev
```

#### Step 2: Container Path Fix
```bash
# Update container configuration to mount project root properly
# Change working directory from /dev-server/ to /
# Update volume mounts to map project root correctly
```

#### Step 3: Cache Purge & Reset
```bash
# Clear all Docker volumes and caches
docker system prune -af --volumes
docker builder prune -af

# Remove any persistent node_modules volumes
docker volume rm $(docker volume ls -q | grep recovery-compass)
```

#### Step 4: Fresh Container Build
```bash
# Use Node 20 LTS for consistency
FROM node:20-alpine

# Set correct working directory (NOT /dev-server/)
WORKDIR /app

# Copy package files from correct location
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm ci --prefer-offline --no-audit --progress=false

# Start dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8080"]
```

#### Step 5: Verification Steps
```bash
# After container restart, verify:
1. ls -la /app/package.json (should exist)
2. npm --version (should work)
3. npm run dev (should start without errors)
4. curl http://localhost:8080 (should return app)
```

## PROJECT STRUCTURE CONFIRMATION
```
recovery-compass-journeys/
├── package.json ✅ (EXISTS in root)
├── package-lock.json ✅ (EXISTS in root)  
├── vite.config.ts ✅ (EXISTS in root)
├── tailwind.config.ts ✅ (EXISTS in root)
├── tsconfig.json ✅ (EXISTS in root)
├── index.html ✅ (EXISTS in root)
└── src/
    ├── main.tsx ✅
    ├── App.tsx ✅
    └── components/ ✅
```

## CONTAINER ENVIRONMENT VARIABLES
```bash
# Ensure these are set correctly:
NODE_ENV=development
PORT=8080
VITE_SERVER_HOST=0.0.0.0
VITE_SERVER_PORT=8080
```

## SUCCESS CRITERIA
- ✅ Container can find `package.json` in root directory
- ✅ `npm ci` completes without errors  
- ✅ `npm run dev` starts Vite dev server
- ✅ Application loads at `http://localhost:8080`
- ✅ Hot reload functions properly
- ✅ Routes (`/`, `/assessment`, etc.) load correctly

## TESTING CHECKLIST POST-FIX
1. Homepage loads (`/`)
2. Assessment page loads (`/assessment`) 
3. Navigation links work
4. Font rendering (Montserrat) displays correctly
5. Responsive design functions on mobile
6. Console shows no critical errors

## URGENCY LEVEL: CRITICAL
**Impact**: Complete development environment failure (5 days downtime)  
**Business Risk**: Cannot deploy fixes, updates, or new features  
**Timeline**: Must be resolved within 24 hours

## CONTACT
- **Technical Lead**: Recovery Compass Development Team
- **Priority**: P0 (Highest)
- **Escalation**: Required if not resolved within 4 hours

---
*Document Created*: 2025-06-27  
*Status*: ACTIVE CRITICAL ISSUE  
*Next Review*: Upon resolution
