#!/usr/bin/env bash
set -euo pipefail

# Recovery Compass - Console Log Cleanup Script
# Removes all console.log/debug/warn statements from TypeScript files
# Keeps console.error in catch blocks for production error logging

echo "=========================================="
echo "Recovery Compass - Console Log Cleanup"
echo "=========================================="
echo ""

# Count current console statements
TOTAL=$(grep -r "console\." src/ --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')
echo "Found $TOTAL console statements"
echo ""

# Show breakdown by type
echo "Breakdown:"
echo "  console.log:   $(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')"
echo "  console.debug: $(grep -r "console\.debug" src/ --include="*.tsx" --include="*.ts" | wc -l | tr -d ' ')"
echo "  console.warn:  $(grep -r "console\.warn" src/ --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')"
echo "  console.error: $(grep -r "console\.error" src/ --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')"
echo ""

# Show files with most console statements
echo "Top offenders:"
grep -r "console\." src/ --include="*.ts" --include="*.tsx" -l | \
  xargs -I {} sh -c 'echo "$(grep -c "console\." {}) {}"' | \
  sort -rn | \
  head -10 | \
  awk '{print "  " $1 " - " $2}'
echo ""

read -p "Remove all console.log, console.debug, console.warn? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Removing console statements..."
  
  # Find all TS/TSX files with console statements
  FILES=$(grep -r "console\." src/ --include="*.ts" --include="*.tsx" -l)
  
  for file in $FILES; do
    echo "  Processing: $file"
    
    # Remove entire lines with console.log, console.debug, console.warn
    # Keep console.error (useful for production error logging)
    sed -i.bak -E '/console\.(log|debug|warn)/d' "$file"
    
    # Remove backup files
    rm "${file}.bak"
  done
  
  echo ""
  echo "✅ Console cleanup complete!"
  echo ""
  
  # Count remaining
  REMAINING=$(grep -r "console\." src/ --include="*.ts" --include="*.tsx" | wc -l | tr -d ' ')
  echo "Remaining console statements: $REMAINING (should be only console.error in catch blocks)"
  echo ""
  echo "Next steps:"
  echo "  1. Review changes: git diff"
  echo "  2. Test app: npm run dev"
  echo "  3. Build: npm run build"
  echo "  4. Commit: git add -A && git commit -m 'chore(cleanup): remove console.log/debug/warn statements'"
else
  echo "Cleanup cancelled"
fi
