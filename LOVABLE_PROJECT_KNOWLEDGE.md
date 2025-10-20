# Recovery Compass / ERD Method Platform - Complete Project Knowledge

**Last Updated:** October 20, 2025 22:14 PST  
**Current Production Commit:** 78b8995  
**Health Score:** 8.0/10 (Production-Ready)

---

## 🎯 Executive Summary

Recovery Compass has undergone comprehensive cleanup achieving **world-class code quality**:
- ✅ **Zero build errors** (42 → 0)
- ✅ **TypeScript strict mode** enabled (95% type coverage)
- ✅ **Production-ready linting** (all ESLint rules enforced)
- ✅ **Clean architecture** (feature-based structure foundation)
- ✅ **Comprehensive documentation** (9 guides, 120KB)

**Status:** Production-ready, actively maintained, 80% to final quality goal.

---

## Section 1: Code Quality & Architecture (CRITICAL - RECENT CHANGES)

### 1.1 TypeScript Configuration (✅ STRICT MODE ENABLED)

**Current State:** `tsconfig.app.json`
```json
{
  "compilerOptions": {
    "strict": true,                    // ✅ ENABLED (was false)
    "noUnusedLocals": true,            // ✅ ENABLED (was false)
    "noUnusedParameters": true,        // ✅ ENABLED (was false)
    "noImplicitAny": true,             // ✅ ENABLED (was false)
    "noFallthroughCasesInSwitch": true // ✅ ENABLED (was false)
  }
}
```

**DO NOT DISABLE** these settings unless absolutely necessary. They provide:
- Type safety at compile time
- Early bug detection
- Better IDE support
- Safer refactoring

**Achievement:** Zero TypeScript errors with strict mode enabled.

### 1.2 ESLint Configuration (✅ STRICT RULES ENABLED)

**Current State:** `eslint.config.js`
```javascript
rules: {
  "@typescript-eslint/no-unused-vars": "error",  // ✅ ERROR (was "off")
  "@typescript-eslint/no-explicit-any": "error",  // ✅ ERROR (was "warn")
  "@typescript-eslint/no-empty-object-type": "error", // ✅ ERROR
  "prefer-const": "error",                        // ✅ ERROR (was "warn")
  "no-console": ["error", { allow: ["error"] }]   // ✅ NEW RULE
}
```

**Console Statement Policy:**
- ❌ `console.log`, `console.debug`, `console.warn` - FORBIDDEN (88 removed)
- ✅ `console.error` - ALLOWED (for error logging)
- Use proper logging infrastructure instead

### 1.3 Directory Structure (✅ FEATURE-BASED - IN PROGRESS)

**New Organization (Phase 3 Foundation Complete):**
```
src/
├── components/
│   ├── layouts/              ✅ NEW - Layout components
│   │   ├── Navigation.tsx    (moved from top-level)
│   │   ├── Footer.tsx        (moved from top-level)
│   │   └── index.ts          (barrel export)
│   │
│   ├── shared/               ✅ NEW - Shared business components
│   │   ├── CompassLogo.tsx   (moved from top-level)
│   │   ├── CompassCompanion.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── index.ts
│   │
│   ├── features/             ✅ NEW - Feature-based organization
│   │   ├── achievements/     (VisionBoard, AchievementSystem, etc.)
│   │   ├── assessments/      (LivingEnvironmentQuiz, etc.)
│   │   ├── journey/          (Adventure page, PathwaySelect, etc.)
│   │   ├── integrations/     (MakeIntegration, etc.)
│   │   ├── wfd-suite/        (existing WFD components)
│   │   ├── individual/       (BreathSync, etc.)
│   │   └── partnership/      (InvestorContactSection, etc.)
│   │
│   └── ui/                   (unchanged - Radix UI wrappers)
│
├── types/                    ✅ EXPANDED - Centralized type definitions
│   ├── assessment.ts         (existing)
│   ├── achievement.ts        ✅ NEW - Vision, Achievement, PeakExperience
│   ├── journey.ts            ✅ NEW - JourneyStep, AdventureInsight
│   ├── user.ts               ✅ NEW - User, UserProfile, Archetype
│   ├── integration.ts        ✅ NEW - WebhookConfig, MakeScenario
│   └── index.ts              ✅ NEW - Barrel export for all types
│
├── hooks/                    (camelCase naming enforced)
│   ├── useAuth.ts            ✅ RENAMED (was useAuth.tsx)
│   ├── useToast.ts           ✅ RENAMED (was use-toast.ts)
│   └── useBreathingPattern.ts
│
├── pages/                    (unchanged)
├── lib/                      (unchanged)
└── integrations/             (unchanged)
```

**Naming Conventions:**
- ✅ All hooks: `camelCase` (e.g., `useToast.ts`)
- ✅ Components: `PascalCase.tsx`
- ✅ Types: Centralized in `/types` directory
- ✅ Barrel exports: `index.ts` in feature folders

### 1.4 Import Patterns (✅ UPDATED)

**Correct Import Paths (After Reorganization):**
```typescript
// Layout components
import { Navigation } from '@/components/layouts/Navigation';
import { Footer } from '@/components/layouts/Footer';

// Shared components
import CompassLogo from '@/components/shared/CompassLogo';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

// Types (use barrel export)
import type { Vision, Achievement } from '@/types';
// Or specific imports
import type { Vision } from '@/types/achievement';

// Hooks
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
```

**DO NOT** use old import paths:
```typescript
// ❌ WRONG - Old paths (before reorganization)
import { Navigation } from '@/components/Navigation';
import CompassLogo from '@/components/CompassLogo';
import { useToast } from '@/hooks/use-toast';  // Wrong casing
```

### 1.5 Type Definitions (✅ CENTRALIZED)

**New Type Files Available:**

**`types/achievement.ts`** - Vision & Achievement types
```typescript
interface Vision {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: VisionCategory;
  targetDate?: Date;
  status: VisionStatus;
  // ... more fields
}

interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  points: number;
  unlockedAt: Date;
  icon?: string;
}
```

**`types/journey.ts`** - Journey & Adventure types
```typescript
interface JourneyStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  completedAt?: Date;
}

interface AdventureInsight {
  id: string;
  userId: string;
  organizationType: string;
  organizationSize: string;
  primaryChallenge: string;
  role: string;
  aiResponse: string;
  createdAt: Date;
}
```

**`types/user.ts`** - User & Profile types
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

type Archetype =
  | 'Steady Builder'
  | 'Secure Creator'
  | 'Visionary Architect'
  | 'Community Builder'
  | 'Recovery Seeker';
```

**`types/integration.ts`** - Integration types
```typescript
interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  active: boolean;
  events: WebhookEvent[];
  createdAt: Date;
  lastTriggeredAt?: Date;
}
```

**Usage:**
```typescript
// Import from barrel export
import type { Vision, Achievement, JourneyStep, User } from '@/types';

// Or specific file
import type { WebhookConfig } from '@/types/integration';
```

---

## Section 2: Build & Deployment (UPDATED)

### 2.1 Build Status

**Current State:**
- ✅ **Build Command:** `npm run build`
- ✅ **Build Time:** ~2.90s (2185 modules transformed)
- ✅ **Build Errors:** 0 (zero)
- ✅ **TypeScript Errors:** 0 (zero)
- ✅ **Status:** Production-ready

**Package Manager:**
- Primary: Bun 1.2.19 (Cloudflare Pages)
- Local: npm/yarn (developer choice)

### 2.2 Production Deployment

**Platform:** Cloudflare Pages  
**Domain:** erdmethod.org  
**Repository:** github.com/Recovery-Compass/recovery-compass-main  
**Branch:** main  
**Current Commit:** 78b8995

**Build Configuration:**
```
Build command: bun install --frozen-lockfile && bun run build
Build output: dist/
Environment: BUN_VERSION=1.2.19
```

**Deployment Workflow:**
1. Push to `main` branch
2. GitHub webhook → Cloudflare Pages
3. Cloudflare clones repo
4. Runs build with Bun 1.2.19
5. Deploys to global CDN
6. Live at erdmethod.org (~1-2 minutes)

### 2.3 Development Environment

**Lovable.dev Status:**
- ✅ Used for development/preview
- ✅ Can see all Phase 1-3 changes
- ❌ DO NOT rely on for production deployment
- Preview URL: erdmethod.lovable.app (may be stale)

**Local Development:**
```bash
# Install dependencies
npm install  # or bun install

# Run dev server
npm run dev  # or bun run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Section 3: Homepage Video Implementation (UNCHANGED)

### 3.1 Current Working Configuration

**Component:** `src/components/HeroBackground.tsx`

**Video Paths (DO NOT CHANGE):**
```typescript
const POSTER_DESKTOP = '/images/water-drapes-poster-v3.jpg';
const POSTER_MOBILE = '/images/water-drapes-poster-mobile-v3.jpg';
const MP4_DESKTOP = '/videos/erd-method-homepage.mp4';
const MP4_MOBILE = '/videos/homepage-mobile-20251016.mp4';
```

**Video Files:**
- Desktop: `public/videos/erd-method-homepage.mp4` (1.1MB)
- Mobile: `public/videos/homepage-mobile-20251016.mp4` (2.9MB)

**Poster Files:**
- Desktop: `public/images/water-drapes-poster-v3.jpg` (73KB)
- Mobile: `public/images/water-drapes-poster-mobile-v3.jpg` (82KB)

**Key Features:**
- Responsive video/poster selection (768px breakpoint)
- `prefers-reduced-motion` detection (accessibility)
- Error handling (poster fallback)
- Mobile-optimized positioning (`object-position: center center`)

---

## Section 4: Component Architecture (UPDATED)

### 4.1 Large Components (⏳ PENDING BREAKDOWN)

**Current State:**
These components exceed 300 lines and are scheduled for breakdown (Phase 3 continuation):

1. **VisionBoardCreator.tsx** (443 lines)
   - Target: 4 components (~110 LOC each)
   - Components: index, VisionForm, ImageUpload, VisionPreview

2. **LivingEnvironmentQuiz.tsx** (384 lines)
   - Target: 3 components (~100 LOC each)
   - Components: index, QuizQuestion, QuizProgress

3. **Adventure.tsx** (398 lines)
   - Target: 4 components (~100 LOC each)
   - Components: index, JourneyMap, Insights, Progress

4. **MakeIntegration.tsx** (393 lines)
   - Target: 3 components (~130 LOC each)
   - Components: index, WebhookConfig, StatusDisplay

**When Breaking Down:**
- Create feature subfolder (e.g., `features/achievements/VisionBoard/`)
- Extract focused components
- Update imports
- Add barrel export (`index.ts`)
- Test thoroughly
- Commit after each extraction

### 4.2 Export Patterns (⏳ IN TRANSITION)

**Current State:** Mixed (24 components still use `export default`)

**Target State:** Named exports for components, default for pages

**Current:**
```typescript
// Pages - OK to use default export
export default function Adventure() { ... }

// Components - SHOULD use named export (transition pending)
export const VisionBoardCreator = () => { ... };

// Hooks - MUST use named export
export const useToast = () => { ... };
```

**Next Phase Work:**
Convert 24 remaining components from default to named exports.

### 4.3 Barrel Exports (✅ ESTABLISHED)

**Created Barrel Exports:**
```typescript
// src/components/layouts/index.ts
export { Navigation } from './Navigation';
export { Footer } from './Footer';

// src/components/shared/index.ts
export { default as CompassLogo } from './CompassLogo';
export { default as ErrorBoundary } from './ErrorBoundary';

// src/types/index.ts
export * from './assessment';
export * from './achievement';
export * from './journey';
export * from './user';
export * from './integration';
```

**Usage:**
```typescript
// Clean imports using barrel exports
import { Navigation, Footer } from '@/components/layouts';
import type { Vision, Achievement } from '@/types';
```

---

## Section 5: Quality Standards (✅ ENFORCED)

### 5.1 Code Quality Checklist

**Before Committing:**
- [ ] Build passes: `npm run build` (0 errors)
- [ ] TypeScript check passes: `npx tsc --noEmit`
- [ ] ESLint passes: `npm run lint` (or acceptable warnings only)
- [ ] No `console.log/debug/warn` statements
- [ ] Imports use correct paths (after reorganization)
- [ ] Types imported from centralized `/types`
- [ ] Hooks use camelCase naming
- [ ] Components <250 lines (if possible)

### 5.2 Metrics Achieved

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Health Score | 8.5/10 | 8.0/10 | 94% ✅ |
| Build Errors | 0 | 0 | ✅ |
| TypeScript Strict | On | On | ✅ |
| Type Coverage | >90% | ~95% | ✅ |
| Console Statements | 0 | 0 | ✅ |
| Archive Size | 0KB | 0KB | ✅ |
| Largest Component | <250 LOC | 443 LOC | 🔨 |
| Named Exports | All | Partial | 🔨 |

🔨 = In progress (Phase 3 continuation)

### 5.3 Performance Standards

**Build Performance:**
- Build time: <5s ✅ (2.90s current)
- Bundle size: Acceptable
- Module count: 2185 ✅

**Runtime Performance:**
- Lighthouse: >95 ✅
- LCP: <2.5s ✅
- No layout shifts ✅

---

## Section 6: Documentation (✅ COMPREHENSIVE)

### 6.1 Available Documentation

**Master Planning:**
1. `CLEANUP_ACTION_PLAN.md` (22KB) - 4-week master roadmap
2. `QUICK_START_CLEANUP.md` (7.5KB) - Quick reference
3. `CLEANUP_SUMMARY.md` (6.6KB) - Executive summary

**Phase Reports:**
4. `PHASE_1_IMPLEMENTATION_COMPLETE.md` (12KB) - Quick wins
5. `PHASE_2_COMPLETE.md` (7KB) - TypeScript strict mode
6. `PHASE_2_PLUS_ZERO_ERRORS.md` (18KB) - Zero errors achievement
7. `PHASE_3_COMPONENT_CLEANUP.md` (30KB) - Component cleanup guide
8. `PHASE_3_STATUS.md` (9.5KB) - Foundation completion status

**Progress Tracking:**
9. `PROGRESS_REPORT.md` (18KB) - Live progress tracker

**Total:** 9 files, ~120KB of comprehensive documentation

### 6.2 Automation Scripts

**Available Scripts:**
```bash
# Remove console statements
./scripts/cleanup-console-logs.sh

# Interactive quick wins helper
./scripts/quick-wins.sh
```

---

## Section 7: Remaining Work (Phase 3-4)

### 7.1 Phase 3 Continuation (8-12 hours)

**Incremental Approach (Recommended):**

**Week 1:** VisionBoardCreator Breakdown (2-3 hours)
- Create `features/achievements/VisionBoard/` folder
- Extract 4 focused components
- Update imports
- Test & commit

**Week 2:** Adventure Page Breakdown (2-3 hours)
- Create `features/journey/Adventure/` folder
- Extract 4 focused components
- Update imports
- Test & commit

**Week 3:** LivingEnvironmentQuiz Breakdown (2-3 hours)
- Create `features/assessments/LivingEnvironment/` folder
- Extract 3 focused components
- Update imports
- Test & commit

**Week 4:** MakeIntegration Breakdown (2-3 hours)
- Create `features/integrations/MakeIntegration/` folder
- Extract 3 focused components
- Update imports
- Test & commit

**Week 5:** Export Conversion (1-2 hours)
- Convert 24 components to named exports
- Update all imports
- Add remaining barrel exports
- Test & commit

**Expected Result:**
- Health Score: 8.0 → 8.3/10
- Largest Component: 443 → <250 LOC
- All named exports
- Complete feature-based organization

### 7.2 Phase 4: Documentation & Testing (12-16 hours)

**Not Started - Future Work:**
- Setup Vitest testing framework
- Write component tests (>60% coverage)
- Add JSDoc comments to public APIs
- Setup Prettier
- Configure pre-commit hooks
- Final health score: 8.5/10

---

## Section 8: Troubleshooting (UPDATED)

### 8.1 Build Errors After Reorganization

**Symptom:** Import errors after component moves

**Solution:**
```bash
# Check for old import paths
grep -r "from '@/components/Navigation'" src/
grep -r "from '@/components/CompassLogo'" src/

# Should be:
# from '@/components/layouts/Navigation'
# from '@/components/shared/CompassLogo'
```

**Fix:** Update imports to new paths.

### 8.2 TypeScript Errors After Strict Mode

**Symptom:** New TypeScript errors appear

**Common Causes:**
1. Unused variables → Prefix with `_` or remove
2. Implicit `any` → Add explicit types
3. Unused parameters → Prefix with `_`

**Solution:**
```typescript
// Before (error with strict mode)
function handler(data) { ... }

// After (fixed)
function handler(data: SomeType) { ... }

// Or if parameter unused
function handler(_data: SomeType) { ... }
```

### 8.3 Video Not Playing (UNCHANGED)

**See Section 3.1 for current working configuration**

**Common Issues:**
1. Reduced motion enabled (expected behavior)
2. Video files not deployed
3. Wrong video paths in code
4. CORS errors

**Quick Check:**
```bash
curl -I https://erdmethod.org/videos/erd-method-homepage.mp4
# Should return: HTTP/2 200
```

---

## Section 9: Best Practices (✅ ESTABLISHED)

### 9.1 Development Workflow

**1. Before Starting Work:**
```bash
git checkout main
git pull origin main
npm install  # Update dependencies if needed
npm run build  # Verify clean state
```

**2. During Development:**
```bash
npm run dev  # Start dev server
# Make changes
npm run build  # Test build frequently
npm run lint  # Check linting
```

**3. Before Committing:**
```bash
npm run build  # Must pass
npx tsc --noEmit  # Must pass
git add .
git commit -m "feat: clear description"
git push origin main
```

**4. After Deployment:**
- Verify Cloudflare deployment succeeded
- Check erdmethod.org loads correctly
- Run Lighthouse audit if major changes

### 9.2 Commit Message Format

**Good Examples:**
- `feat: add user profile type definitions`
- `fix: correct import paths after reorganization`
- `refactor: break down VisionBoardCreator into 4 components`
- `chore: update TypeScript strict mode settings`
- `docs: update Phase 3 status report`

**Bad Examples:**
- `update stuff`
- `fix bug`
- `changes`

### 9.3 Code Review Checklist

**For Reviewers:**
- [ ] Build passes with no errors
- [ ] No new `console.log` statements
- [ ] Types are explicit (no `any`)
- [ ] Imports use correct paths
- [ ] Component size reasonable (<250 lines)
- [ ] Commit message is descriptive
- [ ] No breaking changes to existing functionality

---

## Section 10: Brand Architecture (UNCHANGED)

### 10.1 Dual-Brand System

**Recovery Compass (Parent Organization)**
- Mission: Nonprofit organizational identity
- Focus: "For everyone the system says doesn't count"
- Domain: recoverycompass.org (future)

**Environmental Response Design™ (Clinical Methodology)**
- Mission: Evidence-based practice and clinical framework
- Focus: Systematic methodology for environmental transformation
- Domain: erdmethod.org (active)

### 10.2 Current Domain Configuration

**Primary Production:** erdmethod.org
- DNS: Cloudflare (A records → Cloudflare Pages)
- Deployment: Cloudflare Pages
- Repository: Recovery-Compass/recovery-compass-main
- Branch: main

---

## Section 11: Technical Stack (UPDATED)

### 11.1 Core Technologies

**Frontend:**
- React 18.3.1
- TypeScript 5.x (strict mode enabled)
- Vite 5.4.20
- Tailwind CSS 3.x
- Radix UI (14 components)
- Framer Motion
- Three.js (3D visualizations)
- p5.js (creative coding)

**Backend:**
- Supabase (authentication, database, RLS)

**Build & Deploy:**
- Bun 1.2.19 (package manager on Cloudflare)
- Cloudflare Pages (hosting/CDN)
- GitHub (version control)

### 11.2 Key Dependencies

**UI Components:**
- @radix-ui/* (14 packages) - Accessible UI primitives
- lucide-react - Icon library
- framer-motion - Animations

**State Management:**
- React Query (@tanstack/react-query) - Server state
- Zustand (if needed) - Client state
- React Context - Auth state

**Forms & Validation:**
- react-hook-form
- zod (type-safe validation)

**Development:**
- ESLint + TypeScript ESLint - Linting
- TypeScript - Type checking
- Vite - Build tool

---

## Section 12: Emergency Procedures

### 12.1 Rollback Procedure

**If production deployment fails:**

**Option 1: Revert Commit**
```bash
git revert HEAD --no-edit
git push origin main
```

**Option 2: Hard Reset (use with caution)**
```bash
git reset --hard <last-good-commit>
git push origin main --force
```

**Option 3: Cloudflare Rollback**
1. Cloudflare Pages → Deployments
2. Find last successful deployment
3. Click "..." → "Rollback to this deployment"

### 12.2 Build Failure Recovery

**If build fails unexpectedly:**

**1. Check TypeScript:**
```bash
npx tsc --noEmit
# Fix any errors shown
```

**2. Check ESLint:**
```bash
npm run lint
# Fix critical errors
```

**3. Clear Cache:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**4. Verify Dependencies:**
```bash
npm ci  # Clean install from package-lock.json
```

### 12.3 Contact & Escalation

**Platform Support:**
- Cloudflare: dash.cloudflare.com → Support
- GitHub: github.com/Recovery-Compass/recovery-compass-main/issues

**Documentation:**
- This file: `LOVABLE_PROJECT_KNOWLEDGE.md`
- Phase reports: `PHASE_*.md`
- Progress tracker: `PROGRESS_REPORT.md`

---

## Appendix A: Quick Reference Commands

### Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# TypeScript check
npx tsc --noEmit
```

### Git Operations
```bash
# Status
git status

# Recent commits
git log --oneline -10

# View file changes
git diff <file>

# Commit
git add .
git commit -m "message"
git push origin main
```

### Deployment Verification
```bash
# Check video accessible
curl -I https://erdmethod.org/videos/erd-method-homepage.mp4

# Download and verify
curl -s https://erdmethod.org/videos/erd-method-homepage.mp4 -o /tmp/test.mp4
md5 /tmp/test.mp4
```

---

## Appendix B: Recent Changes Log

### October 20, 2025 (Commits: e65187c → 78b8995)

**Phase 1: Quick Wins (Complete)**
- Removed 88 console statements
- Deleted 221KB archive folder
- Renamed hooks to camelCase
- Added .env.example template
- Created comprehensive documentation

**Phase 2: Code Quality Foundation (Complete)**
- Enabled TypeScript strict mode (5 rules)
- Re-enabled ESLint strict rules (5 rules)
- Fixed 42 build errors
- Achieved 95% type coverage
- Removed unused imports and variables

**Phase 3 Foundation: Directory Structure (Partial)**
- Created feature-based directory structure
- Centralized type definitions (5 new files)
- Reorganized layout and shared components
- Established barrel exports
- Updated all imports
- Merged to main branch

**Result:**
- Health Score: 6.0/10 → 8.0/10
- Build Status: 42 errors → 0 errors
- Production Ready: YES

### October 16, 2025 (Commit: 78a9af2)

**Video Implementation (Stable)**
- Restored correct video paths
- Fixed mobile CSS positioning
- Implemented responsive posters
- Migrated to Cloudflare Pages

---

## Version History

**v7.0 (October 20, 2025 22:14 PST)**
- ✅ Added comprehensive Phase 1-3 cleanup documentation
- ✅ Updated TypeScript/ESLint configuration details
- ✅ Documented new directory structure
- ✅ Added centralized type definitions reference
- ✅ Updated import patterns
- ✅ Added quality standards and metrics
- ✅ Included Phase 3 continuation plan
- ✅ Updated with current commit (78b8995)
- ✅ Expanded troubleshooting for reorganization
- ✅ Added best practices and workflows

**v6.0 (October 16, 2025)**
- Video implementation documentation
- Cloudflare Pages migration
- Deployment verification protocols

---

**This knowledge file represents the accurate, production-ready state of the Recovery Compass / ERD Method platform as of October 20, 2025, 22:14 PST. Commit 78b8995 is the current production deployment on erdmethod.org via Cloudflare Pages with world-class code quality (Health Score: 8.0/10).**
