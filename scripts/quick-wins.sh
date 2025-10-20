#!/usr/bin/env bash
set -euo pipefail

# Recovery Compass - Quick Wins Automation Script
# Executes all "Today" tasks from CLEANUP_ACTION_PLAN.md

cd "$(dirname "$0")/.."

echo "=========================================="
echo "Recovery Compass - Quick Wins"
echo "=========================================="
echo ""

# Task 2: Delete Archive Folder (5 min)
echo "📁 Task 2: Check Archive Folder"
if [ -d "src/_archive" ]; then
  ARCHIVE_SIZE=$(du -sh src/_archive | cut -f1)
  ARCHIVE_FILES=$(find src/_archive -type f | wc -l | tr -d ' ')
  echo "  Found: src/_archive ($ARCHIVE_SIZE, $ARCHIVE_FILES files)"
  
  # Check for imports from archive
  ARCHIVE_IMPORTS=$(grep -r "from.*_archive" src/ --exclude-dir=_archive 2>/dev/null | wc -l | tr -d ' ')
  
  if [ "$ARCHIVE_IMPORTS" -gt 0 ]; then
    echo "  ⚠️  WARNING: Found $ARCHIVE_IMPORTS imports from _archive"
    grep -r "from.*_archive" src/ --exclude-dir=_archive
    echo ""
    read -p "  Delete archive anyway? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo "  Skipping archive deletion"
    else
      rm -rf src/_archive
      echo "  ✅ Archive deleted"
    fi
  else
    echo "  ✅ No imports from archive found (safe to delete)"
    read -p "  Delete src/_archive? (y/N) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      rm -rf src/_archive
      echo "  ✅ Archive deleted ($ARCHIVE_SIZE freed)"
    fi
  fi
else
  echo "  ℹ️  No archive folder found (already deleted)"
fi
echo ""

# Task 3: Environment Variables
echo "📝 Task 3: Environment Variables"
if [ -f ".env.example" ]; then
  echo "  ✅ .env.example already exists"
else
  echo "  ⚠️  .env.example not found (should be created manually)"
fi

if [ -f ".env.local" ]; then
  echo "  ✅ .env.local exists"
else
  echo "  ℹ️  .env.local not found"
  echo "  Create it by copying .env.example:"
  echo "    cp .env.example .env.local"
fi

# Check if .env* is gitignored
if grep -q "\.env" .gitignore 2>/dev/null; then
  echo "  ✅ .env* in .gitignore"
else
  echo "  ⚠️  Add .env* to .gitignore (except .env.example)"
fi
echo ""

# Task 4: Standardize Hook Naming
echo "🪝 Task 4: Hook Naming Convention"
if [ -f "src/hooks/use-toast.ts" ]; then
  echo "  Found: src/hooks/use-toast.ts (kebab-case)"
  read -p "  Rename to useToast.ts? (y/N) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git mv src/hooks/use-toast.ts src/hooks/useToast.ts
    echo "  ✅ Renamed to useToast.ts"
    echo "  ⚠️  Don't forget to update imports!"
    echo "    Search for: from.*use-toast"
    echo "    Replace with: from.*useToast"
  fi
elif [ -f "src/hooks/useToast.ts" ]; then
  echo "  ✅ Already renamed to useToast.ts"
else
  echo "  ℹ️  use-toast.ts not found"
fi
echo ""

# Task 5: Add TODO Comments
echo "📝 Task 5: Add TODO Comments to Large Files"
echo "  Large files to mark:"
echo ""

# Find large files
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  lines=$(wc -l < "$file" | tr -d ' ')
  if [ "$lines" -gt 300 ]; then
    echo "    $lines lines - $file"
  fi
done | sort -rn | head -10

echo ""
echo "  TODO format:"
echo '    /**'
echo '     * TODO: Refactor this component - currently XXX lines'
echo '     * Target: Break into smaller components'
echo '     * See: CLEANUP_ACTION_PLAN.md Priority 2'
echo '     */'
echo ""

# Summary
echo "=========================================="
echo "✅ Quick Wins Check Complete!"
echo "=========================================="
echo ""
echo "Remaining manual tasks:"
echo "  1. Run: ./scripts/cleanup-console-logs.sh"
echo "  2. Update imports after hook rename"
echo "  3. Add TODO comments to large files"
echo "  4. Create .env.local from .env.example"
echo "  5. Test: npm run dev && npm run build"
echo ""
echo "See CLEANUP_ACTION_PLAN.md for details"
