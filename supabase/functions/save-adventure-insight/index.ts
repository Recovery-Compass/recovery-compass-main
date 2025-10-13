import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
// Resend temporarily disabled due to build environment dependency resolution
// import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
// const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
// const resend = new Resend(resendApiKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, ai_response } = await req.json();

    // Validate input
    if (!email || !ai_response) {
      return new Response(
        JSON.stringify({ error: 'Email and AI response are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Save to database
    const { data, error: dbError } = await supabase
      .from('adventure_insights')
      .insert([
        {
          email: email.trim(),
          ai_response: ai_response.trim()
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save insight' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send confirmation email to user and notification to Eric
    // TEMPORARILY DISABLED: Email functionality commented out due to Resend/OpenAI type resolution issue
    // TODO: Re-enable once Lovable Cloud build environment properly installs npm dependencies before type-checking
    /*
    try {
      // Send confirmation to user
      const confirmationEmail = await resend.emails.send({
...
      console.log('Notification email sent to Eric:', notificationEmail);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the entire request if email fails
    }
    */

    console.log('Adventure insight saved (email notifications temporarily disabled):', {
      id: data.id,
      email: email,
      created_at: data.created_at
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Adventure insight received successfully',
        id: data.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in save-adventure-insight function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});