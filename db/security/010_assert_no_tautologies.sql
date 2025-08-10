-- Documentation-only check to avoid permissive RLS patterns.
-- Keep this file in source control to signal policy intent.

-- Anti-patterns to avoid:
-- 1) Using COALESCE(auth.uid(), user_id) or similar fallbacks that allow anonymous access.
-- 2) WITH CHECK true on sensitive tables (creates public write surface).
-- 3) SELECT USING true on sensitive tables without proper ownership constraints.
-- 4) UPDATE/DELETE policies without auth.uid() ownership checks.

-- Recommended patterns:
-- - SELECT/UPDATE/DELETE: USING (user_id = auth.uid())
-- - INSERT: WITH CHECK (user_id = auth.uid())
-- - Public tables (like FAQs): SELECT USING (true) only.

-- This file is intentionally non-executable. Use your SQL editor or linter to review policies.
