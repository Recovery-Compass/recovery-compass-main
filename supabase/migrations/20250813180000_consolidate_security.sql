-- Consolidated security migration: deduplicate and harden RLS policies and functions
-- Purpose:
-- - Remove duplicate/overlapping policies created by earlier emergency fixes
-- - Standardize on canonical policy names per table
-- - Ensure SECURITY DEFINER functions use a fixed safe search_path
-- - Keep audit logging safe (no client INSERTs)
-- - Treat PostGIS spatial_ref_sys as system data: drop policies and disable RLS
--
-- Idempotency: guarded with IF EXISTS / DO blocks where needed

BEGIN;

-- 0) Ensure required helper functions exist with secure search_path
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_provider_or_admin(uuid) CASCADE;

CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_uuid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_provider_or_admin(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_uuid AND role IN ('admin', 'provider')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 1) profiles: replace any prior broad/duplicate admin policies with canonical set
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop previously created policy names that may exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins can manage all profiles') THEN
    EXECUTE 'DROP POLICY "Admins can manage all profiles" ON public.profiles';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins can view all profiles') THEN
    EXECUTE 'DROP POLICY "Admins can view all profiles" ON public.profiles';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins can insert profiles') THEN
    EXECUTE 'DROP POLICY "Admins can insert profiles" ON public.profiles';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins can update profiles') THEN
    EXECUTE 'DROP POLICY "Admins can update profiles" ON public.profiles';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins can delete profiles') THEN
    EXECUTE 'DROP POLICY "Admins can delete profiles" ON public.profiles';
  END IF;
END $$;

-- Canonical policy names
CREATE POLICY profiles_admin_select ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY profiles_admin_insert ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY profiles_admin_update ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY profiles_admin_delete ON public.profiles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- 2) crisis_resources: admin manage only (canonical name)
ALTER TABLE public.crisis_resources ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='crisis_resources' AND policyname='Admins can manage crisis resources') THEN
    EXECUTE 'DROP POLICY "Admins can manage crisis resources" ON public.crisis_resources';
  END IF;
END $$;
CREATE POLICY crisis_admin_all ON public.crisis_resources
  FOR ALL USING (public.is_admin(auth.uid()));

-- 3) access_logs: view-only for admins; no client inserts
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='access_logs' AND policyname='Admins can view audit logs') THEN
    EXECUTE 'DROP POLICY "Admins can view audit logs" ON public.access_logs';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='access_logs' AND policyname='System can insert audit logs') THEN
    EXECUTE 'DROP POLICY "System can insert audit logs" ON public.access_logs';
  END IF;
END $$;
CREATE POLICY access_logs_admin_select ON public.access_logs
  FOR SELECT USING (public.is_admin(auth.uid()));
-- Note: service_role bypasses RLS for inserts via Edge Functions; no client insert policy created.

-- 4) actualization_profiles: strict owner policies; standardize names
ALTER TABLE public.actualization_profiles ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  -- Drop any long-form policy names from earlier fixes
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='actualization_profiles' AND policyname='Users can view their own actualization profiles';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can view their own actualization profiles" ON public.actualization_profiles'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='actualization_profiles' AND policyname='Users can create their own actualization profiles';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can create their own actualization profiles" ON public.actualization_profiles'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='actualization_profiles' AND policyname='Users can update their own actualization profiles';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can update their own actualization profiles" ON public.actualization_profiles'; END IF;
  -- Drop prior short names to avoid duplicates
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='actualization_profiles' AND policyname='ap_select';
  IF FOUND THEN EXECUTE 'DROP POLICY ap_select ON public.actualization_profiles'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='actualization_profiles' AND policyname='ap_update';
  IF FOUND THEN EXECUTE 'DROP POLICY ap_update ON public.actualization_profiles'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='actualization_profiles' AND policyname='ap_insert';
  IF FOUND THEN EXECUTE 'DROP POLICY ap_insert ON public.actualization_profiles'; END IF;
END $$;

CREATE POLICY ap_select ON public.actualization_profiles
  FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY ap_update ON public.actualization_profiles
  FOR UPDATE USING (user_id = auth.uid()::text);
CREATE POLICY ap_insert ON public.actualization_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- 5) assessments: strict owner policies; standardize names
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='assessments' AND policyname='Users can view their own assessments';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can view their own assessments" ON public.assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='assessments' AND policyname='Anyone can create assessments';
  IF FOUND THEN EXECUTE 'DROP POLICY "Anyone can create assessments" ON public.assessments'; END IF;
  -- Drop prior short names to avoid duplicates
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='assessments' AND policyname='asmt_select';
  IF FOUND THEN EXECUTE 'DROP POLICY asmt_select ON public.assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='assessments' AND policyname='asmt_update';
  IF FOUND THEN EXECUTE 'DROP POLICY asmt_update ON public.assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='assessments' AND policyname='asmt_insert';
  IF FOUND THEN EXECUTE 'DROP POLICY asmt_insert ON public.assessments'; END IF;
END $$;

CREATE POLICY asmt_select ON public.assessments
  FOR SELECT USING (user_id = auth.uid()::text);
CREATE POLICY asmt_update ON public.assessments
  FOR UPDATE USING (user_id = auth.uid()::text);
CREATE POLICY asmt_insert ON public.assessments
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- 6) email_captures: tie to owning assessment; standardize names
ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='email_captures' AND policyname='Users can view their own email captures';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can view their own email captures" ON public.email_captures'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='email_captures' AND policyname='Anyone can capture emails';
  IF FOUND THEN EXECUTE 'DROP POLICY "Anyone can capture emails" ON public.email_captures'; END IF;
  -- Drop prior short names to avoid duplicates
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='email_captures' AND policyname='ec_select';
  IF FOUND THEN EXECUTE 'DROP POLICY ec_select ON public.email_captures'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='email_captures' AND policyname='ec_insert';
  IF FOUND THEN EXECUTE 'DROP POLICY ec_insert ON public.email_captures'; END IF;
END $$;

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

-- 7) environment_assessments: owner plus provider/admin read access
ALTER TABLE public.environment_assessments ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='Providers can view patient assessments';
  IF FOUND THEN EXECUTE 'DROP POLICY "Providers can view patient assessments" ON public.environment_assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='Users can view own assessments';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can view own assessments" ON public.environment_assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='Users can update own assessments';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can update own assessments" ON public.environment_assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='Users can create own assessments';
  IF FOUND THEN EXECUTE 'DROP POLICY "Users can create own assessments" ON public.environment_assessments'; END IF;
  -- Also drop prior canonical names if they exist to avoid duplicates
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='env_select';
  IF FOUND THEN EXECUTE 'DROP POLICY env_select ON public.environment_assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='env_update';
  IF FOUND THEN EXECUTE 'DROP POLICY env_update ON public.environment_assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='env_insert';
  IF FOUND THEN EXECUTE 'DROP POLICY env_insert ON public.environment_assessments'; END IF;
  PERFORM 1 FROM pg_policies WHERE schemaname='public' AND tablename='environment_assessments' AND policyname='env_provider_select';
  IF FOUND THEN EXECUTE 'DROP POLICY env_provider_select ON public.environment_assessments'; END IF;
END $$;

CREATE POLICY env_select ON public.environment_assessments
  FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY env_insert ON public.environment_assessments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY env_update ON public.environment_assessments
  FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY env_provider_select ON public.environment_assessments
  FOR SELECT USING (public.is_provider_or_admin(auth.uid()));

-- 8) PostGIS spatial_ref_sys: treat as system table (no RLS)
-- If earlier migrations enabled RLS or created a policy, undo that safely.
DO $$
BEGIN
  -- Drop any policies on spatial_ref_sys
  FOR policy_name IN
    SELECT policyname FROM pg_policies
    WHERE schemaname='public' AND tablename='spatial_ref_sys'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.spatial_ref_sys', policy_name);
  END LOOP;
  BEGIN
    EXECUTE 'ALTER TABLE public.spatial_ref_sys DISABLE ROW LEVEL SECURITY';
  EXCEPTION WHEN OTHERS THEN
    -- Ignore if extension-owned table disallows change; keep as-is
    NULL;
  END;
END $$;

COMMIT;

