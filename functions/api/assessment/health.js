export async function onRequest(context) {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'recovery-compass-journeys-assessment',
    endpoint: '/api/assessment/health',
    environment: context.env.ENVIRONMENT || 'production',
    version: '1.0.0'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
