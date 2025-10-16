import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from 'https://esm.sh/resend@4.0.0';

// HTML escaping function to prevent XSS attacks
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Enum validation constants
const VALID_ORG_TYPES = ['treatment-center', 'sober-living', 'outpatient', 'nonprofit', 'government', 'healthcare', 'education', 'other'];
const VALID_ORG_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];
const VALID_CHALLENGES = ['staff-retention', 'client-engagement', 'relapse-prevention', 'program-effectiveness', 'facility-design', 'culture-change', 'compliance', 'funding', 'other'];

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
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit: max 3 submissions per minute from same IP
    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from('rate_limits')
      .select('created_at')
      .eq('identifier', clientIp)
      .eq('endpoint', 'save-adventure-insight')
      .gte('created_at', new Date(Date.now() - 60000).toISOString());
    
    if (!rateLimitError && recentSubmissions && recentSubmissions.length >= 3) {
      console.log('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again in a minute.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Record this request for rate limiting
    await supabase.from('rate_limits').insert({
      identifier: clientIp,
      endpoint: 'save-adventure-insight'
    });
    
    const { 
      email, 
      name,
      ai_response, 
      org_type,
      org_size,
      primary_challenge,
      role,
      honeypot
    } = await req.json();
    
    // Honeypot check - silent rejection for bots
    if (honeypot) {
      console.log('Bot detected via honeypot field');
      return new Response(
        JSON.stringify({ success: true }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate required fields
    if (!email || !ai_response || !name) {
      return new Response(
        JSON.stringify({ error: 'Email, name, and AI response are required' }),
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

    // Validate AI response length (minimum 100 characters)
    if (ai_response.length < 100) {
      return new Response(
        JSON.stringify({ error: 'AI response must be at least 100 characters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate field lengths
    if (name.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Name exceeds maximum length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (role && role.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Role exceeds maximum length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (ai_response.length > 10000) {
      return new Response(
        JSON.stringify({ error: 'AI response exceeds maximum length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate enum fields
    if (org_type && !VALID_ORG_TYPES.includes(org_type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid organization type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (org_size && !VALID_ORG_SIZES.includes(org_size)) {
      return new Response(
        JSON.stringify({ error: 'Invalid organization size' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (primary_challenge && !VALID_CHALLENGES.includes(primary_challenge)) {
      return new Response(
        JSON.stringify({ error: 'Invalid primary challenge' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save to database
    const { data, error: dbError } = await supabase
      .from('adventure_insights')
      .insert([
        {
          email: email.trim(),
          name: name.trim(),
          ai_response: ai_response.trim(),
          org_type: org_type || null,
          org_size: org_size || null,
          primary_challenge: primary_challenge || null,
          role: role ? role.trim() : null
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
    try {
      // Send confirmation to user
      const confirmationEmail = await resend.emails.send({
        from: 'Recovery Compass <hello@erdmethod.org>',
        to: [email],
        subject: 'Your Expert Analysis is On The Way',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #D4AF37;">Thank you for your submission!</h1>
            <p>Hi ${escapeHtml(name)},</p>
            <p>We've received your Environmental Response Architecture™ submission and our team is reviewing it now.</p>
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>Our recovery environment specialists will analyze your AI response</li>
              <li>You'll receive personalized guidance within 48 hours</li>
              <li>The analysis will include specific implementation recommendations</li>
            </ul>
            <p>We're excited to help you transform your organization's environment into your ally.</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              — Recovery Compass Team<br>
              Environmental Response Design™
            </p>
          </div>
        `
      });
      
      console.log('Confirmation email sent to user:', confirmationEmail);
      
      // Format organization context for Eric's email
      const formatOrgType = org_type ? org_type.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : '(not provided)';
      const formatChallenge = primary_challenge ? primary_challenge.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : '(not provided)';
      
      // Send notification to Eric
      const notificationEmail = await resend.emails.send({
        from: 'Recovery Compass <hello@erdmethod.org>',
        to: ['eric@recovery-compass.org'],
        subject: `New Adventure Insight Submission from ${name} (${email})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37;">New Submission Received</h2>
            
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Role:</strong> ${escapeHtml(role || '(not provided)')}</p>
            
            <h3>Organization Context</h3>
            <p><strong>Organization Type:</strong> ${escapeHtml(formatOrgType)}</p>
            <p><strong>Organization Size:</strong> ${escapeHtml(org_size || '(not provided)')}</p>
            <p><strong>Primary Challenge:</strong> ${escapeHtml(formatChallenge)}</p>
            
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Submission ID:</strong> ${data.id}</p>
            
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <h3>AI Response:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-family: monospace; font-size: 13px;">
${escapeHtml(ai_response.substring(0, 1500))}${ai_response.length > 1500 ? '...' : ''}
            </div>
            ${ai_response.length > 1500 ? `<p style="color: #666; font-size: 12px;">(Truncated to 1500 characters. Full response: ${ai_response.length} characters)</p>` : ''}
            
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p><a href="${supabaseUrl}/project/default/editor" style="background: #D4AF37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">View in Supabase Dashboard</a></p>
          </div>
        `
      });
      
      console.log('Notification email sent to Eric:', notificationEmail);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the entire request if email fails
      // Still return success to user, but log the email failure
    }

    console.log('Adventure insight saved successfully (emails sent):', {
      id: data.id,
      email: email,
      name: name,
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