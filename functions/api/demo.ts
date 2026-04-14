export const onRequestPost = async ({ request, env }: { request: any, env: any }) => {
  try {
    const data = await request.json();
    const { email } = data;

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    /**
     * Placeholder for Email Integration (e.g., Resend, SendGrid)
     * To integrate Resend, you would do something like this:
     * 
     * const response = await fetch('https://api.resend.com/emails', {
     *   method: 'POST',
     *   headers: {
     *     'Authorization': `Bearer ${env.RESEND_API_KEY}`,
     *     'Content-Type': 'application/json',
     *   },
     *   body: JSON.stringify({
     *     from: 'onboarding@resend.dev',
     *     to: 'contact@aiconsumeragent.com',
     *     subject: 'New Demo Request',
     *     html: `<p>New demo request from: <strong>${email}</strong></p>`
     *   }),
     * });
     */

    // Log the request locally for visibility (Cloudflare logs)
    console.log(`Demo request received for: ${email}`);

    // Track the submission in Cloudflare Analytics Engine if available
    if (env.ANALYTICS_ENGINE) {
      env.ANALYTICS_ENGINE.writeDataPoint({
        blobs: ['demo_request', 'submission', email, request.headers.get('cf-connecting-ip') || ''],
        doubles: [Date.now()],
        indexes: ['demo_request']
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Demo request submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Demo API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
