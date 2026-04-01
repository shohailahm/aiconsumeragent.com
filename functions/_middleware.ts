export const onRequest = async ({ request, env, next }: { request: any, env: any, next: any }) => {
  const startTime = Date.now();
  
  // Pass to next function/static asset
  const response = await next();
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Skip logging API track events to avoid infinite loops or noise
  const url = new URL(request.url);
  if (url.pathname === '/api/track') {
    return response;
  }

  // Log request to Analytics Engine
  if (env.ANALYTICS_ENGINE) {
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
