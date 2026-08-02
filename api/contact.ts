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

    const adminHtml = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-top: 4px solid #00e5ff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Header Bar -->
  <div style="background-color: #111111; padding: 24px; text-align: center; border-bottom: 1px solid #1f2937;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
      New Contact Inquiry
    </h1>
    <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 13px; letter-spacing: 0.05em;">
      Origin: <a href="https://felixau.in" style="color: #00e5ff; text-decoration: none; font-weight: 600;">felixau.in</a>
    </p>
  </div>
  
  <!-- Content Area -->
  <div style="padding: 32px 24px;">
    <p style="margin-top: 0; font-size: 15px; color: #334155;">
      You have received a new contact submission from your portfolio website.
    </p>
    
    <!-- Sender Details Card -->
    <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
        Sender Details
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #475569; width: 100px; vertical-align: top;">Name:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #475569; vertical-align: top;">Email:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">
            <a href="mailto:${cleanEmail}" style="color: #0096d6; text-decoration: none; border-bottom: 1px dashed #0096d6;">${cleanEmail}</a>
          </td>
        </tr>
      </table>
    </div>
    
    <!-- Message Body -->
    <div style="margin: 24px 0;">
      <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
        Message Body
      </h3>
      <div style="white-space: pre-wrap; background-color: #fdfdfd; border-left: 4px solid #0096d6; border-radius: 4px; padding: 16px 20px; font-style: italic; color: #334155; font-size: 14.5px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">${cleanMessage}</div>
    </div>
    
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 20px 0;" />
    <p style="font-size: 11.5px; color: #94a3b8; text-align: center; margin: 0; line-height: 1.5;">
      This email was routed from your portfolio Contact Form.<br />
      Click <strong>Reply-To</strong> to respond directly to the sender.
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

    const userHtml = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-top: 4px solid #00e5ff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Header Bar -->
  <div style="background-color: #111111; padding: 24px; text-align: center; border-bottom: 1px solid #1f2937;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
      Message Received
    </h1>
    <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 13px; letter-spacing: 0.05em;">
      Felix Au &bull; Portfolio Contact
    </p>
  </div>
  
  <!-- Content Area -->
  <div style="padding: 32px 24px;">
    <p style="margin-top: 0; font-size: 15px; color: #334155; font-weight: 500;">
      Hello ${cleanName},
    </p>
    <p style="font-size: 14.5px; color: #334155; margin-bottom: 24px;">
      Thank you for getting in touch! I have successfully received your message and will get back to you as soon as possible.
    </p>
    
    <p style="font-size: 13px; font-weight: 600; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
      Your Submitted Details
    </p>
    <!-- Summary Details Card -->
    <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #64748b; width: 100px; vertical-align: top;">Name:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #64748b; vertical-align: top;">Email:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${cleanEmail}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600; color: #64748b; vertical-align: top;">Date:</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${timestamp}</td>
        </tr>
      </table>
      
      <h4 style="margin: 16px 0 6px 0; font-size: 12.5px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; font-weight: 700;">Your Message:</h4>
      <div style="white-space: pre-wrap; background-color: #ffffff; border-left: 4px solid #cbd5e1; padding: 12px 16px; color: #475569; font-size: 13.5px; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 3px;">${cleanMessage}</div>
    </div>
    
    <!-- Sign-off -->
    <div style="margin-top: 32px; font-size: 14.5px;">
      <p style="margin-bottom: 4px; color: #64748b;">Best regards,</p>
      <p style="margin-top: 0; margin-bottom: 4px; font-weight: 700; color: #0f172a;">Felix Au (Harshit Soni)</p>
      <p style="margin-top: 0; font-size: 13px; font-weight: 500;"><a href="https://felixau.in" style="color: #0096d6; text-decoration: none; border-bottom: 1px solid rgba(0, 150, 214, 0.2);">felixau.in</a></p>
    </div>
    
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 20px 0;" />
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
      This is an automated confirmation email. Please do not reply directly to this message.
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
