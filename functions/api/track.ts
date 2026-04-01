export const onRequestPost = async ({ request, env }: { request: any, env: any }) => {
  try {
    const data = await request.json();
    
    // Validate request
    if (!data.action) {
      return new Response('Missing action', { status: 400 });
    }

    // Write data point to Cloudflare Analytics Engine
    // blobs: [action, category, label, url, referrer, userAgent, ip]
    // doubles: [value, timestamp]
    // indexes: [action] (optional, for faster queries)
    
    if (env.ANALYTICS_ENGINE) {
      env.ANALYTICS_ENGINE.writeDataPoint({
        blobs: [
          data.action,
          data.category || '',
          data.label || '',
          data.url || '',
          data.referrer || '',
          request.headers.get('user-agent') || '',
          request.headers.get('cf-connecting-ip') || '0.0.0.0'
        ],
        doubles: [
          data.value || 0,
          Date.now()
        ],
        indexes: [data.action]
      });
    } else {
      console.warn('ANALYTICS_ENGINE binding not found');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Track API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
