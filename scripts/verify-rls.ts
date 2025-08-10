import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const anon = process.env.SUPABASE_ANON_KEY;

if (!url || !anon) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  process.exit(1);
}

const supa = createClient(url, anon);

async function assertAnonBlocked(table: string) {
  const { data, error } = await supa.from(table).select('*').limit(1);
  if (error) {
    console.log(`OK: anon blocked from ${table}: ${error.message}`);
    return;
  }
  if (Array.isArray(data) && data.length === 0) {
    throw new Error(`❌ Anon SELECT on ${table} returned empty success (should be blocked by RLS)`);
  }
  if (data) {
    throw new Error(`❌ Anon can read ${table} (${data.length} rows)`);
  }
  throw new Error(`❌ Unexpected response for ${table}`);
}

(async () => {
  const tables = ['actualization_profiles', 'assessments', 'email_captures'];
  for (const t of tables) {
    await assertAnonBlocked(t);
  }
  console.log('✅ Anon blocked on sensitive tables');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
