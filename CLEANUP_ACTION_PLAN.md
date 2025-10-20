# Recovery Compass - Code Cleanup Action Plan
**Created:** 2025-10-20  
**Status:** 🚧 In Progress  
**Health Score:** ⚠️ 6/10 → Target: ✅ 8.5/10

---

## 🎯 Quick Wins (TODAY - 1-2 hours)

### ✅ Task 1: Remove Console Statements (30 min)
**Impact:** Performance + Security  
**Risk:** Low  
**Files affected:** ~23 files with 88 console statements

```bash
# Script to find all console statements
grep -r "console\." src/ --include="*.ts" --include="*.tsx" | wc -l
```

**Action:**
- Remove all `console.log`, `console.debug`, `console.warn`
- Keep only `console.error` in catch blocks (change ESLint rule to allow this)

### ✅ Task 2: Delete Archive Folder (5 min)
**Impact:** Mental clarity + Build performance  
**Risk:** None (code is archived, not used)  
**Size:** 221KB (18 files)

```bash
rm -rf src/_archive
```

**Verification:**
- Check for any imports from `_archive` (there shouldn't be any)
- Run build to ensure nothing breaks

### ✅ Task 3: Move Supabase Keys to .env (10 min)
**Impact:** Security best practices  
**Risk:** Low (publishable keys are safe, but good practice)

**Current:**
```typescript
// src/integrations/supabase/client.ts
const SUPABASE_URL = "https://udpilfxpsgyhbmjikuxt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGci...";
```

**New:**
```bash
# .env
VITE_SUPABASE_URL=https://udpilfxpsgyhbmjikuxt.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
```

```typescript
// src/integrations/supabase/client.ts
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
```

**Also create:** `.env.example` for documentation

### ✅ Task 4: Standardize Hook Naming (5 min)
**Impact:** Consistency  
**Risk:** None (just a rename)

```bash
# Rename kebab-case to camelCase
mv src/hooks/use-toast.ts src/hooks/useToast.ts
```

**Update imports in:** All files that import `use-toast`

### ✅ Task 5: Add TODO Comments to Large Files (15 min)
**Impact:** Future planning  
**Risk:** None

Add standardized TODO comments to files >300 lines:
```typescript
/**
 * TODO: Refactor this component - currently 444 lines
 * Target: Break into 3-4 smaller components
 * - VisionForm.tsx (form logic)
 * - ImageUpload.tsx (upload logic)  
 * - VisionPreview.tsx (display)
 * See: CLEANUP_ACTION_PLAN.md Priority 2
 */
```

Files to mark:
- `src/_archive/pages/WhittierDashboard.tsx` (876 lines) - IN ARCHIVE, DELETE
- `src/components/achievements/VisionBoardCreator.tsx` (444 lines)
- `src/pages/Adventure.tsx` (398 lines)
- `src/components/MakeIntegration.tsx` (393 lines)
- `src/components/LivingEnvironmentQuiz.tsx` (384 lines)

---

## 🔥 Priority 1: Code Quality Foundation (Week 1 - 4-8 hours)

### Task 1.1: Enable TypeScript Strict Mode (Incremental)
**Status:** 🔴 Not Started  
**Estimated Time:** 4-6 hours (spread across week)

**Strategy:** Enable one rule at a time, fix violations, commit

#### Step 1: Enable `noUnusedLocals` (1-2 hours)
```json
// tsconfig.app.json
"noUnusedLocals": true,
```

Run: `npm run build` → Fix all unused variable errors → Commit

#### Step 2: Enable `noUnusedParameters` (30 min)
```json
"noUnusedParameters": true,
```

Prefix unused params with `_`: `const handler = (_event: Event) => {}`

#### Step 3: Enable `noFallthroughCasesInSwitch` (15 min)
```json
"noFallthroughCasesInSwitch": true,
```

Add `break` or `return` to all switch cases

#### Step 4: Enable `noImplicitAny` (2-3 hours - HARDEST)
```json
"noImplicitAny": true,
```

Add explicit types to all function parameters and variables

#### Step 5: Enable `strict` mode (30 min - should be easy after above)
```json
"strict": true,
```

This enables all strict checks. Most should already be fixed.

### Task 1.2: Re-enable ESLint Rules
**Status:** 🔴 Not Started  
**Estimated Time:** 1-2 hours

```javascript
// eslint.config.js
rules: {
  ...reactHooks.configs.recommended.rules,
  "@typescript-eslint/no-unused-vars": "error", // ← OFF → ERROR
  "@typescript-eslint/no-explicit-any": "error", // ← WARN → ERROR  
  "@typescript-eslint/no-empty-object-type": "error", // ← WARN → ERROR
  "no-console": ["error", { allow: ["error"] }], // ← NEW
  "prefer-const": "error", // ← WARN → ERROR
}
```

Run: `npm run lint` → Fix all errors → Commit

### Task 1.3: Create Environment Variable Setup
**Status:** 🔴 Not Started  
**Estimated Time:** 30 min

**Files to create:**
1. `.env.example` (committed to git)
2. `.env.local` (gitignored, for local dev)
3. Update `.gitignore` to exclude `.env*` except `.env.example`

**Also update:**
- README.md with setup instructions
- DOPPLER_SETUP.md with new structure

---

## ⚠️ Priority 2: Component Cleanup (Week 2 - 12-16 hours)

### Task 2.1: Break Down Large Components
**Status:** 🔴 Not Started  
**Estimated Time:** 8-10 hours

#### VisionBoardCreator.tsx (444 lines → 3-4 files)

**New structure:**
```
src/components/achievements/vision-board/
├── index.tsx                 # Main orchestration (100 lines)
├── VisionForm.tsx            # Form inputs (150 lines)
├── ImageUpload.tsx           # Upload logic (100 lines)
└── VisionPreview.tsx         # Display component (94 lines)
```

**Refactoring steps:**
1. Extract upload logic → `ImageUpload.tsx`
2. Extract form → `VisionForm.tsx`
3. Extract preview → `VisionPreview.tsx`
4. Orchestration stays in `index.tsx`
5. Update imports in parent components
6. Test thoroughly

#### LivingEnvironmentQuiz.tsx (384 lines → 3 files)

**New structure:**
```
src/components/living-environment-quiz/
├── index.tsx                 # Quiz flow (100 lines)
├── QuizQuestion.tsx          # Question display (120 lines)
├── QuizProgress.tsx          # Progress UI (80 lines)
└── types.ts                  # Quiz types (50 lines)
```

#### Adventure.tsx (398 lines → 4 files)

**New structure:**
```
src/pages/adventure/
├── index.tsx                 # Page layout (100 lines)
├── AdventureHero.tsx         # Hero section (80 lines)
├── AdventureContent.tsx      # Main content (120 lines)
└── AdventureNav.tsx          # Navigation (80 lines)
```

### Task 2.2: Reorganize Components
**Status:** 🔴 Not Started  
**Estimated Time:** 2-3 hours

**Current problems:**
- Flat structure in `/components`
- Mixed organization (feature, type, user-type)
- Hard to find related components

**New structure:**
```
src/components/
├── ui/                       # Radix wrappers (keep as-is)
├── layouts/                  # NEW
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── PageLayout.tsx
├── features/                 # NEW - Feature-based organization
│   ├── achievements/
│   │   ├── VisionBoardCreator/
│   │   ├── AchievementSystem.tsx
│   │   └── index.ts (barrel export)
│   ├── assessments/
│   │   ├── LivingEnvironmentQuiz/
│   │   ├── QuizResults.tsx
│   │   └── index.ts
│   ├── journey/
│   │   ├── Adventure.tsx
│   │   ├── PathwaySelect.tsx
│   │   └── index.ts
│   ├── wfd-suite/           # Keep existing
│   │   └── ...
│   └── integrations/
│       ├── MakeIntegration.tsx
│       └── index.ts
└── shared/                   # NEW - Shared business components
    ├── CompassLogo.tsx
    ├── CompassCompanion.tsx
    ├── EmergencyButton.tsx
    └── index.ts
```

**Migration steps:**
1. Create new folder structure
2. Move components (use `git mv` to preserve history)
3. Update all imports (use find/replace or codemod)
4. Add barrel exports (`index.ts` files)
5. Test build
6. Commit

### Task 2.3: Standardize Export Patterns
**Status:** 🔴 Not Started  
**Estimated Time:** 1-2 hours

**Rules:**
- ✅ **Pages**: Default exports (Next.js/React Router convention)
- ✅ **Components**: Named exports (better for refactoring)
- ✅ **Hooks**: Named exports
- ✅ **Utils**: Named exports
- ✅ **Types**: Named exports

**Conversion example:**
```typescript
// BEFORE (default export)
export default function VisionBoard() { ... }

// AFTER (named export)
export function VisionBoard() { ... }

// Import changes
// BEFORE
import VisionBoard from './VisionBoard'

// AFTER
import { VisionBoard } from './VisionBoard'
```

Use codemod or manual find/replace across codebase.

### Task 2.4: Delete Archive
**Status:** 🟢 Ready (Quick Win #2)  
**Estimated Time:** 5 min

```bash
# Verify no imports from archive
grep -r "from.*_archive" src/

# Delete
rm -rf src/_archive

# Commit
git add -A
git commit -m "chore: remove archived code (221KB)"
```

---

## 🏗️ Priority 3: Architecture Improvements (Week 3 - 8-12 hours)

### Task 3.1: Centralize Type Definitions
**Status:** 🔴 Not Started  
**Estimated Time:** 3-4 hours

**Current state:**
- Only 1 types file: `src/types/assessment.ts`
- Inline types scattered everywhere

**New structure:**
```
src/types/
├── index.ts              # Barrel export
├── assessment.ts         # Existing
├── achievement.ts        # NEW
├── journey.ts            # NEW
├── user.ts               # NEW
├── integration.ts        # NEW
├── quiz.ts               # NEW
└── common.ts             # NEW - shared utility types
```

**Examples to create:**

```typescript
// src/types/achievement.ts
export interface Vision {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: VisionCategory;
  createdAt: Date;
  updatedAt: Date;
}

export type VisionCategory = 
  | 'health'
  | 'relationships'
  | 'career'
  | 'personal-growth';

// ... more types
```

**Migration:**
1. Extract inline types to dedicated files
2. Import from centralized location
3. Remove duplicates
4. Update all imports

### Task 3.2: Create Custom Hooks
**Status:** 🔴 Not Started  
**Estimated Time:** 2-3 hours

**Hooks to create:**

```typescript
// src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Abstract localStorage with type safety + SSR handling
}

// src/hooks/useSupabase.ts
export function useSupabaseQuery<T>(query: () => Promise<T>) {
  // Wrap common Supabase patterns with React Query
}

// src/hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  // Responsive design hook
}

// src/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  // Debounce values
}
```

**Replace direct usage:**
- Find all `localStorage.getItem/setItem` calls
- Replace with `useLocalStorage` hook
- Test thoroughly

### Task 3.3: Create Storage Abstraction
**Status:** 🔴 Not Started  
**Estimated Time:** 1-2 hours

```typescript
// src/lib/storage.ts
class StorageService {
  private prefix = 'rc_'; // Recovery Compass prefix

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue ?? null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

export const storage = new StorageService();
```

**Migration:**
- Replace all direct `localStorage` calls with `storage.get/set`
- Add error handling
- Test with storage quota errors

### Task 3.4: Create Services Layer
**Status:** 🔴 Not Started  
**Estimated Time:** 2-3 hours

**New directory:**
```
src/services/
├── auth.service.ts          # Auth business logic
├── assessment.service.ts    # Assessment logic
├── achievement.service.ts   # Achievement logic
└── supabase.service.ts     # Common Supabase operations
```

**Example:**
```typescript
// src/services/auth.service.ts
import { supabase } from '@/integrations/supabase/client';

export class AuthService {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}

export const authService = new AuthService();
```

**Benefits:**
- Centralized business logic
- Easier to test
- Consistent error handling
- Better separation of concerns

---

## 📚 Priority 4: Documentation & Testing (Week 4 - 12-16 hours)

### Task 4.1: Add JSDoc Comments
**Status:** 🔴 Not Started  
**Estimated Time:** 3-4 hours

**Focus on:**
- Public component props
- Custom hooks
- Utility functions
- Service methods

**Example:**
```typescript
/**
 * Vision Board Creator component for setting and tracking life goals
 * 
 * @example
 * ```tsx
 * <VisionBoardCreator onSave={handleSave} />
 * ```
 */
export function VisionBoardCreator({ onSave }: VisionBoardCreatorProps) {
  // ...
}

/**
 * Custom hook for managing authentication state
 * 
 * @returns User object if authenticated, null otherwise
 * @throws {Error} If authentication check fails
 */
export function useAuth() {
  // ...
}
```

### Task 4.2: Setup Testing Infrastructure
**Status:** 🔴 Not Started  
**Estimated Time:** 4-6 hours

**Install dependencies:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Configuration:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

**Setup file:**
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
```

**First tests to write:**
1. `useAuth.test.ts` - Auth hook
2. `storage.test.ts` - Storage service
3. `VisionBoardCreator.test.tsx` - Key component

### Task 4.3: Add Component Tests
**Status:** 🔴 Not Started  
**Estimated Time:** 4-6 hours

**Critical flows to test:**
1. Authentication flow
2. Quiz completion
3. Vision board creation
4. Achievement tracking

**Example test:**
```typescript
// src/components/achievements/VisionBoardCreator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { VisionBoardCreator } from './VisionBoardCreator';

describe('VisionBoardCreator', () => {
  it('renders form fields', () => {
    render(<VisionBoardCreator onSave={vi.fn()} />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('calls onSave when form is submitted', async () => {
    const onSave = vi.fn();
    render(<VisionBoardCreator onSave={onSave} />);
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'My Vision' },
    });
    fireEvent.click(screen.getByText('Save'));
    
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'My Vision' })
    );
  });
});
```

**Coverage goals:**
- Critical paths: >80%
- Utilities: >90%
- Overall: >60%

### Task 4.4: Setup Code Quality Tools
**Status:** 🔴 Not Started  
**Estimated Time:** 1-2 hours

**Install Prettier:**
```bash
npm install -D prettier
```

**Configuration:**
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

**Setup pre-commit hooks:**
```bash
npm install -D husky lint-staged
npx husky init
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
```

```bash
# .husky/pre-commit
npm run lint-staged
npm run test
```

---

## 📊 Progress Tracking

### Completion Checklist

**Quick Wins (Today):**
- [ ] Remove 88 console statements
- [ ] Delete _archive folder  
- [ ] Move Supabase keys to .env
- [ ] Rename use-toast.ts → useToast.ts
- [ ] Add TODO comments to large files

**Priority 1 (Week 1):**
- [ ] Enable noUnusedLocals
- [ ] Enable noUnusedParameters
- [ ] Enable noFallthroughCasesInSwitch
- [ ] Enable noImplicitAny
- [ ] Enable strict mode
- [ ] Re-enable ESLint rules
- [ ] Create .env.example

**Priority 2 (Week 2):**
- [ ] Refactor VisionBoardCreator
- [ ] Refactor LivingEnvironmentQuiz
- [ ] Refactor Adventure page
- [ ] Reorganize component structure
- [ ] Standardize exports
- [ ] Add barrel exports

**Priority 3 (Week 3):**
- [ ] Create type definitions
- [ ] Create custom hooks
- [ ] Create storage abstraction
- [ ] Create services layer

**Priority 4 (Week 4):**
- [ ] Add JSDoc comments
- [ ] Setup Vitest
- [ ] Write component tests (>60% coverage)
- [ ] Setup Prettier
- [ ] Setup pre-commit hooks

### Metrics Dashboard

| Metric | Current | Week 1 | Week 2 | Week 3 | Week 4 | Target |
|--------|---------|--------|--------|--------|--------|--------|
| Health Score | 6.0/10 | 6.5/10 | 7.5/10 | 8.0/10 | 8.5/10 | 8.5/10 |
| Console Logs | 88 | 0 | 0 | 0 | 0 | 0 |
| Strict Mode | ❌ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| Avg Component LOC | 176 | 176 | 140 | 140 | 140 | <150 |
| Test Coverage | 0% | 0% | 20% | 40% | 65% | >60% |
| Type Coverage | ~30% | 50% | 70% | 85% | 95% | >90% |
| ESLint Errors | 50+ | 30 | 10 | 5 | <5 | <10 |

---

## 🚀 Execution Strategy

### Daily Workflow
1. **Start of day:** Review this plan, pick highest priority task
2. **Before coding:** Create feature branch: `git checkout -b cleanup/task-name`
3. **During work:** Make small, atomic commits
4. **After task:** Run `npm run build && npm run lint`
5. **End of day:** Push branch, create PR if task complete

### Branch Naming Convention
- `cleanup/remove-console-logs`
- `cleanup/enable-strict-mode`
- `refactor/vision-board-component`
- `feat/add-storage-service`
- `test/auth-hook-tests`

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Examples:**
```bash
git commit -m "chore(cleanup): remove 88 console statements"
git commit -m "refactor(components): break down VisionBoardCreator into 4 files"
git commit -m "feat(services): add storage abstraction layer"
git commit -m "test(hooks): add useAuth hook tests (80% coverage)"
```

### Testing Strategy
- **After each change:** Run `npm run dev` and test manually
- **After each task:** Run `npm run build`
- **Before committing:** Run `npm run lint`
- **Before PR:** Full manual QA of affected features

---

## ⚠️ Risks & Mitigation

### Risk 1: Breaking Changes During Refactor
**Mitigation:**
- Make small, incremental changes
- Test thoroughly after each step
- Keep PRs focused and reviewable
- Maintain feature flags if needed

### Risk 2: Merge Conflicts
**Mitigation:**
- Communicate with team about refactoring schedule
- Merge `main` into cleanup branches frequently
- Tackle one area at a time
- Use `git mv` to preserve file history

### Risk 3: Scope Creep
**Mitigation:**
- Stick to this plan - don't add new features
- Create separate issues for bugs found during cleanup
- Time-box each task
- Skip tasks if taking too long, come back later

### Risk 4: Team Disruption
**Mitigation:**
- Schedule refactoring during low-activity periods
- Communicate in team chat before big changes
- Don't merge breaking changes on Fridays
- Pair program for risky refactors

---

## 📞 Support & Resources

### Getting Help
- **Blocked on TypeScript:** Check TS handbook, ask in #dev-help
- **Unsure about pattern:** Review existing code, check React docs
- **Breaking change:** Revert and ask for review
- **Can't fix ESLint error:** Temporarily disable with comment, file issue

### Reference Documentation
- [TypeScript Strict Mode Guide](https://www.typescriptlang.org/tsconfig#strict)
- [React Testing Library](https://testing-library.com/react)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Vitest Docs](https://vitest.dev/)

### Key Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # Run ESLint
npm run test             # Run tests (when setup)

# Cleanup helpers
npm run lint -- --fix    # Auto-fix ESLint errors
npm run format           # Run Prettier (when setup)

# Git workflow
git checkout -b cleanup/task-name
git add -A
git commit -m "type(scope): description"
git push origin cleanup/task-name
```

---

## 🎉 Success Criteria

### Week 1 Complete When:
- ✅ All console statements removed
- ✅ TypeScript strict mode enabled
- ✅ ESLint rules re-enabled
- ✅ Build passes without errors
- ✅ Archive deleted
- ✅ Environment variables configured

### Week 2 Complete When:
- ✅ 3 large components refactored
- ✅ Components organized by feature
- ✅ All exports standardized
- ✅ Barrel exports added
- ✅ Build passes

### Week 3 Complete When:
- ✅ Type definitions centralized
- ✅ 4+ custom hooks created
- ✅ Storage service implemented
- ✅ Services layer created
- ✅ No direct localStorage usage

### Week 4 Complete When:
- ✅ 60%+ test coverage
- ✅ Vitest configured
- ✅ Pre-commit hooks working
- ✅ Prettier configured
- ✅ All PRs merged

### Final Success:
- **Health Score:** 8.5/10
- **Console Logs:** 0
- **Type Coverage:** >90%
- **Test Coverage:** >60%
- **ESLint Errors:** <10
- **Avg Component Size:** <150 LOC
- **Team Velocity:** Improved (easier to add features)

---

## 📝 Notes

- This is a living document - update as you progress
- Don't be afraid to adjust timelines if tasks take longer
- Celebrate small wins!
- Ask for help early and often
- Keep communicating with the team

**Last Updated:** 2025-10-20  
**Next Review:** End of Week 1
