import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

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

    // Send immediate confirmation email
    try {
      const confirmationEmail = await resend.emails.send({
        from: 'Recovery Compass <insights@resend.dev>',
        to: [email],
        subject: 'Adventure Insight Received - Recovery Compass',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1f3a; font-size: 28px; margin-bottom: 10px;">Recovery Compass</h1>
              <p style="color: #666; font-size: 16px;">Environmental Response Architecture™</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #1a1f3a; font-size: 22px; margin-bottom: 15px;">Adventure Insight Received</h2>
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                Thank you for engaging with our Environmental Response Architecture™ prompt. We've received your AI analysis and will craft a personalized reflection within 48 hours.
              </p>
              <p style="color: #666; font-size: 14px; line-height: 1.5;">
                <strong>What happens next:</strong><br>
                • Our team reviews your submission using Environmental Response principles<br>
                • We identify specific environment-as-ally opportunities<br>
                • You receive actionable insights tailored to your organization
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px 0;">
              <p style="color: #666; font-size: 14px;">
                This methodology helps organizations transform challenges into environmental opportunities.
              </p>
            </div>
          </div>
        `
      });

      console.log('Confirmation email sent:', confirmationEmail);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the entire request if email fails
    }

    // Schedule 48-hour follow-up (simple approach - could be enhanced with cron jobs)
    // For now, we'll track this manually in the database
    console.log('Adventure insight saved:', {
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