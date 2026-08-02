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

    const timestamp = new Date().toISOString();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // 1. Admin Inquiry Email
    const adminSubject = `New Contact Inquiry - felixau.in`;
    const adminText = `New Contact Inquiry
felixau.in

You have received a message.

Sender Details:
Name: ${cleanName}
Email: ${cleanEmail}

Message Body:
"${cleanMessage}"

---
This email was routed from Felix Au Portfolio Contact Form. Click Reply-To to respond directly to the sender.
`;

    const adminHtml = `<div style="background-color: #f6f9fc; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="background-color: #ffffff; border-radius: 12px; max-width: 580px; margin: 0 auto; padding: 32px 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); border: 1px solid #e8ebf0;">
    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: #0096d6; text-transform: uppercase; margin-bottom: 8px;">Inquiry Notification</div>
    <h2 style="font-family: inherit; color: #1a1f36; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; line-height: 1.3;">New Contact Inquiry</h2>
    
    <p style="color: #4f566b; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">You have received a new message from <a href="https://felixau.in" style="color: #0096d6; text-decoration: none; font-weight: 600;">felixau.in</a>.</p>
    
    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #edf2f7; margin-bottom: 24px;">
      <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 12px; text-transform: uppercase; color: #8792a2; letter-spacing: 0.05em; font-weight: 700;">Sender Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #8792a2; font-weight: 500; width: 100px; vertical-align: top;">Name:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #1a1f36; font-weight: 600; vertical-align: top;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #8792a2; font-weight: 500; vertical-align: top;">Email:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #1a1f36; font-weight: 600; vertical-align: top;"><a href="mailto:${cleanEmail}" style="color: #0096d6; text-decoration: none;">${cleanEmail}</a></td>
        </tr>
      </table>
    </div>
    
    <div style="margin-bottom: 32px;">
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #8792a2; letter-spacing: 0.05em; font-weight: 700;">Message Body</h3>
      <div style="white-space: pre-wrap; background-color: #ffffff; border-left: 4px solid #0096d6; padding: 14px 20px; font-style: italic; color: #4f566b; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.6; border-top: 1px solid #f0f4f8; border-right: 1px solid #f0f4f8; border-bottom: 1px solid #f0f4f8;">${cleanMessage}</div>
    </div>
    
    <hr style="border: 0; border-top: 1px solid #e8ebf0; margin: 0 0 20px 0;" />
    <p style="font-size: 12px; color: #8792a2; text-align: center; margin: 0; line-height: 1.5;">
      This email was routed from Felix Au Portfolio Contact Form. Click <strong>Reply-To</strong> to respond directly to the sender.
    </p>
  </div>
</div>`;

    // 2. User Confirmation Email
    const userSubject = `I received your message - Felix Au`;
    const userText = `I received your message - Felix Au

Message Received

Hello ${cleanName},

Thank you for getting in touch! I have successfully received your message. I'll get back to you as soon as possible.

For your records, here is a copy of the details you submitted:

Your Submitted Message:
Name: ${cleanName}
Email: ${cleanEmail}
Date: ${timestamp}

Message:
"${cleanMessage}"

Best regards,

Felix Au (Harshit Soni)
hi@felixau.in

---
This is an automated confirmation email. Please do not reply directly to this message.
`;

    const userHtml = `<div style="background-color: #f6f9fc; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="background-color: #ffffff; border-radius: 12px; max-width: 580px; margin: 0 auto; padding: 32px 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); border: 1px solid #e8ebf0;">
    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: #0096d6; text-transform: uppercase; margin-bottom: 8px;">Auto-Receipt</div>
    <h2 style="font-family: inherit; color: #1a1f36; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; line-height: 1.3;">Message Received</h2>
    
    <p style="color: #4f566b; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 12px;">Hello ${cleanName},</p>
    <p style="color: #4f566b; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">Thank you for getting in touch! I have successfully received your message and will review it as soon as possible.</p>
    <p style="color: #8792a2; font-size: 13px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Here is a copy of your submitted details:</p>
    
    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #edf2f7; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #8792a2; font-weight: 500; width: 100px; vertical-align: top;">Name:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #1a1f36; font-weight: 600; vertical-align: top;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #8792a2; font-weight: 500; vertical-align: top;">Email:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #1a1f36; font-weight: 600; vertical-align: top;">${cleanEmail}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #8792a2; font-weight: 500; vertical-align: top;">Date:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #1a1f36; font-weight: 600; vertical-align: top;">${timestamp}</td>
        </tr>
      </table>
      
      <h4 style="margin: 18px 0 8px 0; font-size: 12px; color: #8792a2; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Message Content:</h4>
      <div style="white-space: pre-wrap; background-color: #ffffff; border-left: 4px solid #cbd5e1; padding: 14px 20px; color: #4f566b; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; border-top: 1px solid #f0f4f8; border-right: 1px solid #f0f4f8; border-bottom: 1px solid #f0f4f8;">${cleanMessage}</div>
    </div>
    
    <div style="margin-top: 28px; margin-bottom: 0;">
      <p style="color: #4f566b; font-size: 15px; margin-bottom: 4px; line-height: 1.3;">Best regards,</p>
      <p style="color: #1a1f36; font-size: 15px; font-weight: 700; margin-top: 0; margin-bottom: 4px;">Felix Au (Harshit Soni)</p>
      <p style="font-size: 13px; color: #8792a2; margin-top: 0; margin-bottom: 0;"><a href="https://felixau.in" style="color: #0096d6; text-decoration: none;">felixau.in</a></p>
    </div>
    
    <hr style="border: 0; border-top: 1px solid #e8ebf0; margin: 28px 0 15px 0;" />
    <p style="font-size: 11px; color: #8792a2; text-align: center; margin: 0; line-height: 1.5;">
      This is an automated confirmation email.
    </p>
  </div>
</div>`;

    // Concurrently dispatch both emails
    const [adminResponse, userResponse] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'Felix Au <hi@felixau.in>',
          to: ['felixaugum@gmail.com'],
          reply_to: cleanEmail,
          subject: adminSubject,
          text: adminText,
          html: adminHtml
        })
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'Felix Au <hi@felixau.in>',
          to: [cleanEmail],
          reply_to: 'hi@felixau.in',
          subject: userSubject,
          text: userText,
          html: userHtml
        })
      })
    ]);

    if (!adminResponse.ok) {
      const errText = await adminResponse.text();
      console.error(`Resend API returned status ${adminResponse.status} for Admin notification: ${errText}`);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email'
      });
    }

    if (!userResponse.ok) {
      const errText = await userResponse.text();
      console.warn(`Resend API returned status ${userResponse.status} for User confirmation: ${errText}`);
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
