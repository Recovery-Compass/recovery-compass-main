import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { serve } from 'jsr:@supabase/functions-js'
import { createClient } from 'npm:@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ALLOWED_ORIGINS = new Set([
  'https://www.wfd-compliance.org',
  'https://wfd-compliance.org',
  'https://app.recovery-compass.org',
])

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const origin = req.headers.get('origin') ?? ''
  if (origin && ![...ALLOWED_ORIGINS].some((o) => origin.startsWith(o))) {
    return new Response('Forbidden', { status: 403, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400, headers: corsHeaders })
  }

  if (!body?.accessed_table || !body?.action_type) {
    return new Response('Missing accessed_table or action_type', { status: 400, headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    return new Response('Server not configured', { status: 500, headers: corsHeaders })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const xff = req.headers.get('x-forwarded-for') || ''
  const ip = xff.split(',')[0]?.trim() || null
  const userAgent = req.headers.get('user-agent') || null

  const payload = {
    accessed_table: String(body.accessed_table),
    action_type: String(body.action_type),
    additional_metadata: body.additional_metadata ?? {},
    ip_address: ip,
    user_agent: userAgent,
    session_id: body.session_id ?? null,
    accessed_record_id: body.accessed_record_id ?? null,
    phi_accessed: !!body.phi_accessed,
    user_id: body.user_id ?? null,
  }

  const { data, error } = await supabase.from('access_logs').insert(payload).select()
  if (error) {
    console.error('Insert error:', error)
    return new Response(JSON.stringify({ ok: false, error }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true, data }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
