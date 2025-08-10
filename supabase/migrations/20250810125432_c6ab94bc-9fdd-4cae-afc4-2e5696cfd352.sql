
-- 1) Drop old policies and replace with strict owner policies (no COALESCE patterns)

-- actualization_profiles
DROP POLICY IF EXISTS "Users can view their own actualization profiles" ON public.actualization_profiles;
DROP POLICY IF EXISTS "Users can create their own actualization profiles" ON public.actualization_profiles;
DROP POLICY IF EXISTS "Users can update their own actualization profiles" ON public.actualization_profiles;

ALTER TABLE public.actualization_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY ap_select ON public.actualization_profiles
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY ap_update ON public.actualization_profiles
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY ap_insert ON public.actualization_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- assessments
DROP POLICY IF EXISTS "Anyone can create assessments" ON public.assessments;
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessments;

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY asmt_select ON public.assessments
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY asmt_update ON public.assessments
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY asmt_insert ON public.assessments
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- email_captures
DROP POLICY IF EXISTS "Anyone can capture emails" ON public.email_captures;
DROP POLICY IF EXISTS "Users can view their own email captures" ON public.email_captures;

ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;

CREATE POLICY ec_select ON public.email_captures
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.assessments a
      WHERE a.id = email_captures.assessment_id
        AND a.user_id = auth.uid()::text
    )
  );

CREATE POLICY ec_insert ON public.email_captures
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.assessments a
      WHERE a.id = email_captures.assessment_id
        AND a.user_id = auth.uid()::text
    )
  );

-- 2) Lock down audit logs: remove public/anon insert policy so only service_role can insert (service_role bypasses RLS)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='access_logs' AND policyname='System can insert audit logs'
  ) THEN
    EXECUTE 'DROP POLICY "System can insert audit logs" ON public.access_logs';
  END IF;
END $$;

ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- Keep existing admin SELECT policy as-is (relies on is_admin(auth.uid())). No INSERT policy means client cannot insert; Edge Functions with service_role can.

-- 3) SECURITY DEFINER functions hardening: set fixed search_path on is_admin and is_provider_or_admin (if they exist)
DO $$
DECLARE f RECORD;
BEGIN
  FOR f IN
    SELECT n.nspname, p.proname, pg_get_function_identity_arguments AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname='public' AND p.proname IN ('is_admin','is_provider_or_admin')
  LOOP
    EXECUTE format('ALTER FUNCTION %I.%I(%s) SET search_path = public', f.nspname, f.proname, f.args);
  END LOOP;
END $$;

-- 4) Optional: Quiet linter by enabling RLS on spatial_ref_sys but allow universal SELECT
-- Comment out if you prefer to leave it unmanaged.
ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='spatial_ref_sys' AND policyname='srs_read'
  ) THEN
    CREATE POLICY srs_read ON public.spatial_ref_sys FOR SELECT USING (true);
  END IF;
END $$;
