import { Resend } from 'resend';

export default {
  async email(message, env, ctx) {
    // Initialize Resend client
    const resend = new Resend(env.RESEND_API_KEY);

    // Parse incoming email
    const fromAddress = message.from?.value?.[0]?.address || 'unknown@domain.com';
    const originalSubject = message.subject || '(no subject)';
    const textBody = await message.text();
    const receivedAt = new Date().toISOString();

    // Prepare file content for GitHub (base64-encoded)
    const record = {
      from: fromAddress,
      subject: originalSubject,
      body: textBody,
      date: receivedAt
    };
    const contentBase64 = btoa(JSON.stringify(record, null, 2));
    const filePath = `emails/${Date.now()}.json`;

    // Save to GitHub
    await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add email from ${fromAddress}`,
        content: contentBase64,
        branch: env.GITHUB_BRANCH
      })
    });

    // Send an automated reply
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [fromAddress],
      subject: `Re: ${originalSubject}`,
      html: `<p>Thank you for your email! We have received it and will get back to you shortly.</p>`
    });

    return new Response('OK', { status: 200 });
  }
};
