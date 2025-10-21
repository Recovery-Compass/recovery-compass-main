// Catch-all handler for React SPA
// This ensures all routes that aren't handled by specific Functions
// are served the index.html for client-side routing

export async function onRequest(context) {
  // Get the URL path
  const url = new URL(context.request.url);
  
  // If requesting a specific asset (has file extension), try to serve it
  if (url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
    try {
      const asset = await context.env.ASSETS.fetch(context.request);
      if (asset.status !== 404) {
        return asset;
      }
    } catch (e) {
      // Continue to index.html fallback
    }
  }
  
  // For all other routes (React Router paths), serve index.html
  const indexRequest = new Request(
    new URL('/index.html', context.request.url),
    context.request
  );
  
  return context.env.ASSETS.fetch(indexRequest);
}
