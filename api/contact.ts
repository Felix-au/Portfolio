import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`
    });
  }

  try {
    const { name, email, message } = req.body || {};

    // Validate name
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request payload'
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request payload'
      });
    }

    // Validate message
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request payload'
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables');
      return res.status(500).json({
        success: false,
        error: 'Failed to send email'
      });
    }

    const emailBody = `New Contact Form Submission

Name:
${name.trim()}

Email:
${email.trim()}

Message:
${message.trim()}

Submitted:
${new Date().toISOString()}
`;

    // Dispatch email using Resend API via fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Felix Au <hi@felixau.in>',
        to: ['hi@felixau.in'],
        reply_to: email.trim(),
        subject: `New Contact Form Submission from ${name.trim()}`,
        text: emailBody
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Resend API returned status ${response.status}: ${errText}`);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email'
      });
    }

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Error in /api/contact handler:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email'
    });
  }
}
