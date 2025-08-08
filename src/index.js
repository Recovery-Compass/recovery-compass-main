export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Health check endpoint
    if (url.pathname === '/health' && request.method === 'GET') {
      return new Response('ok', { status: 200 });
    }
    
    // Default response
    return new Response('Recovery Compass Journeys', { status: 200 });
  },
};