#!/bin/bash
# Run Phase 1 migration via Supabase SQL API

cd "$(dirname "$0")"

echo "🔄 Running Phase 1 migration..."

# Get API key from Doppler
API_KEY=$(doppler secrets get RECOVERY_COMPASS_MAIN_SUPABASE_API --plain)

if [ -z "$API_KEY" ]; then
  echo "❌ Error: Could not get Supabase API key from Doppler"
  exit 1
fi

# Read migration SQL
MIGRATION_SQL=$(cat supabase/migrations/20251015_phase1_org_context.sql)

# Execute via psql using connection string
echo "Executing migration via psql..."
doppler run -- bash -c "echo \"$MIGRATION_SQL\" | psql \"\$SUPABASE_DB_URL\""

echo "✅ Migration complete!"
