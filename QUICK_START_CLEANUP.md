# Recovery Compass - Code Cleanup Guide

## 📋 Overview

This guide helps you execute the code cleanup and refactoring plan for Recovery Compass. The codebase is functional but needs structural improvements to ensure long-term maintainability.

**Current Health Score:** ⚠️ 6/10  
**Target Health Score:** ✅ 8.5/10

## 🚀 Quick Start

### Today's Quick Wins (1-2 hours)

```bash
# 1. Check what needs to be done
./scripts/quick-wins.sh

# 2. Remove console statements (automated)
./scripts/cleanup-console-logs.sh

# 3. Create local environment file
cp .env.example .env.local
# Edit .env.local with your actual keys

# 4. Test everything works
npm run dev
npm run build
```

### Week 1: Enable Strict Mode (Incremental)

**Strategy:** One rule at a time, fix errors, commit

```bash
# Day 1: Enable noUnusedLocals
# Edit tsconfig.app.json: "noUnusedLocals": true
npm run build  # Fix all errors
git commit -m "chore(ts): enable noUnusedLocals"

# Day 2: Enable noUnusedParameters  
# Edit tsconfig.app.json: "noUnusedParameters": true
npm run build  # Fix by prefixing with _
git commit -m "chore(ts): enable noUnusedParameters"

# Day 3: Enable noFallthroughCasesInSwitch
# Edit tsconfig.app.json: "noFallthroughCasesInSwitch": true
npm run build  # Add break/return statements
git commit -m "chore(ts): enable noFallthroughCasesInSwitch"

# Day 4-5: Enable noImplicitAny (hardest)
# Edit tsconfig.app.json: "noImplicitAny": true
npm run build  # Add explicit types
git commit -m "chore(ts): enable noImplicitAny"

# Day 5: Enable strict mode
# Edit tsconfig.app.json: "strict": true
npm run build  # Should be easy after above
git commit -m "chore(ts): enable strict mode"
```

## 📁 File Structure

```
recovery-compass-main/
├── CLEANUP_ACTION_PLAN.md      # Master plan (this links here)
├── QUICK_START_CLEANUP.md      # This file
├── .env.example                # Environment variable template
├── scripts/
│   ├── cleanup-console-logs.sh # Automated console.log removal
│   └── quick-wins.sh           # Quick wins automation
└── src/
    ├── components/             # To be reorganized by feature
    ├── hooks/                  # Custom hooks (rename use-toast → useToast)
    ├── types/                  # To be expanded
    ├── services/               # To be created (business logic)
    └── _archive/               # To be deleted
```

## 🎯 Priority Tasks

### Priority 1: Code Quality Foundation (Week 1)
- [x] Remove 88 console statements
- [ ] Enable TypeScript strict mode (incremental)
- [ ] Re-enable ESLint rules
- [ ] Move Supabase keys to .env
- [ ] Delete _archive folder

### Priority 2: Component Cleanup (Week 2)
- [ ] Break down 6 large components (>300 lines)
- [ ] Reorganize into feature folders
- [ ] Standardize exports (named exports for components)
- [ ] Add barrel exports

### Priority 3: Architecture (Week 3)
- [ ] Centralize type definitions
- [ ] Extract custom hooks
- [ ] Create storage abstraction
- [ ] Create services layer

### Priority 4: Testing & Docs (Week 4)
- [ ] Add JSDoc comments
- [ ] Setup Vitest
- [ ] Add component tests (>60% coverage)
- [ ] Setup Prettier + pre-commit hooks

## 🛠️ Helper Scripts

### cleanup-console-logs.sh
Removes all `console.log()`, `console.debug()`, `console.warn()` statements while preserving `console.error()` in catch blocks.

```bash
./scripts/cleanup-console-logs.sh
# Review changes: git diff
# Test: npm run dev
# Commit: git add -A && git commit -m "chore: remove console statements"
```

### quick-wins.sh
Interactive script that helps with:
- Checking archive folder safety
- Verifying environment setup
- Identifying large files
- Checking hook naming

```bash
./scripts/quick-wins.sh
```

## 📊 Metrics to Track

| Metric | Current | Target |
|--------|---------|--------|
| Console Logs | 88 | 0 |
| TypeScript Strict | ❌ | ✅ |
| Avg Component Size | 176 LOC | <150 LOC |
| Test Coverage | 0% | >60% |
| Type Coverage | ~30% | >90% |
| ESLint Errors | 50+ | <10 |

## ⚠️ Common Issues

### Issue: "Module not found" after hook rename
**Solution:** Update all imports from `use-toast` to `useToast`
```bash
# Find imports
grep -r "from.*use-toast" src/

# Update manually or with sed
find src -type f -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i '' 's/use-toast/useToast/g'
```

### Issue: TypeScript errors after enabling strict mode
**Solution:** Fix incrementally, one rule at a time (see Week 1 plan above)

### Issue: Build fails after removing console.log
**Solution:** Some console.log might have been part of important logic. Review git diff and restore if needed.

### Issue: Breaking changes in main branch
**Solution:** Work in feature branches, rebase frequently
```bash
git checkout -b cleanup/task-name
# ... make changes ...
git fetch origin
git rebase origin/main
```

## 🔍 Code Quality Checks

Run these before committing:

```bash
# 1. Lint check
npm run lint

# 2. Type check
npm run build

# 3. Dev server (manual testing)
npm run dev

# 4. Check for console statements
grep -r "console\." src/ --include="*.ts" --include="*.tsx" | \
  grep -v "console.error"

# 5. Check for any type
grep -r ": any" src/ --include="*.ts" --include="*.tsx"
```

## 📚 Learning Resources

- **TypeScript Strict Mode:** https://www.typescriptlang.org/tsconfig#strict
- **React Best Practices:** https://react.dev/learn/thinking-in-react
- **Component Composition:** https://react.dev/learn/passing-props-to-a-component
- **Custom Hooks:** https://react.dev/learn/reusing-logic-with-custom-hooks
- **Testing Library:** https://testing-library.com/docs/react-testing-library/intro/

## 🎓 Best Practices

### Component Size
- **Target:** <200 lines per file
- **Strategy:** Extract sub-components, move logic to hooks/services

### Exports
- **Pages:** Default exports (for routing)
- **Components:** Named exports (better refactoring)
- **Hooks:** Named exports
- **Utils:** Named exports

### Type Safety
- **Always:** Explicit types for function parameters
- **Avoid:** `any` type (use `unknown` if necessary)
- **Prefer:** Interface over type for objects

### File Organization
- **Group by feature**, not by type
- **Co-locate** related files
- **Use barrel exports** (index.ts) for public APIs

## 🚨 What NOT to Do

- ❌ Don't add new features during cleanup
- ❌ Don't merge breaking changes on Fridays
- ❌ Don't disable TypeScript/ESLint rules without good reason
- ❌ Don't delete code without checking for usage first
- ❌ Don't commit directly to main (use feature branches)

## ✅ Definition of Done

A task is complete when:
1. Code changes made and tested
2. `npm run build` passes
3. `npm run lint` passes
4. Manual testing confirms no regressions
5. Git commit with clear message
6. PR created (if applicable)

## 📞 Getting Help

If you're stuck:

1. **Check the plan:** Review CLEANUP_ACTION_PLAN.md for details
2. **Search the codebase:** Look for similar patterns
3. **Check docs:** TypeScript, React, library docs
4. **Ask the team:** Post in #dev-help with context
5. **Create an issue:** Document blockers for discussion

## 🎉 Progress Celebration

Track your wins:
- ✅ Every console.log removed
- ✅ Every component refactored
- ✅ Every test written
- ✅ Every strict mode rule enabled

Small wins add up to big improvements!

---

**Next Steps:**
1. Read through CLEANUP_ACTION_PLAN.md for full details
2. Run `./scripts/quick-wins.sh` to get started
3. Pick a task from Priority 1
4. Make progress, commit often, celebrate wins!

**Questions?** See CLEANUP_ACTION_PLAN.md or ask in #dev-help
