export const onRequest = async ({ request, env, next }: { request: any, env: any, next: any }) => {
  const startTime = Date.now();
  const url = new URL(request.url);
  
  // Attempt to fetch the static asset or run the function
  let response = await next();
  
  // If the asset is not found (404), and it's not an API or a direct file request (no extension)
  // we fallback to index.html for SPA routing.
  if (response.status === 404 && !url.pathname.startsWith('/api') && !url.pathname.includes('.')) {
    // Rewrite to index.html but keep the URL the same for React Router
    const indexRequest = new Request(new URL('/', request.url), request);
    response = await env.ASSETS.fetch(indexRequest);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Log request to Analytics Engine
  if (env.ANALYTICS_ENGINE && url.pathname !== '/api/track') {
    try {
      env.ANALYTICS_ENGINE.writeDataPoint({
        blobs: [
          'request',
          request.method,
          url.pathname,
          response.status.toString(),
          request.headers.get('cf-connecting-ip') || '0.0.0.0',
          request.headers.get('user-agent') || '',
          request.headers.get('cf-ray') || ''
        ],
        doubles: [
          duration,
          response.headers.get('content-length') ? parseInt(response.headers.get('content-length')!) : 0
        ],
        indexes: ['request']
      });
    } catch (error) {
      console.error('Middleware Analytics Error:', error);
    }
  }

  return response;
};
