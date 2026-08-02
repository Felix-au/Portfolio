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

    const adminHtml = `<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
  <h2 style="color: #0096d6; margin-top: 0; border-bottom: 2px solid #0096d6; padding-bottom: 10px;">New Contact Inquiry</h2>
  <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Origin: <a href="https://felixau.in" style="color: #0096d6; text-decoration: none; font-weight: bold;">felixau.in</a></p>
  
  <p>You have received a new message from your portfolio contact form.</p>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
    <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 0.05em;">Sender Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 4px 0; font-weight: bold; width: 100px;">Name:</td>
        <td style="padding: 4px 0;">${cleanName}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-weight: bold;">Email:</td>
        <td style="padding: 4px 0;"><a href="mailto:${cleanEmail}" style="color: #0096d6; text-decoration: none;">${cleanEmail}</a></td>
      </tr>
    </table>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 0.05em; margin-bottom: 8px;">Message Body</h3>
    <div style="white-space: pre-wrap; background-color: #fff; border-left: 4px solid #0096d6; padding: 10px 15px; font-style: italic; color: #555;">${cleanMessage}</div>
  </div>
  
  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0 15px 0;" />
  <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
    This email was routed from Felix Au Portfolio Contact Form. Click Reply-To to respond directly to the sender.
  </p>
</div>`;

    // 2. User Confirmation Email
    const userSubject = `We received your message - Felix Au`;
    const userText = `We received your message - Felix Au

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

    const userHtml = `<div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
  <h2 style="color: #0096d6; margin-top: 0; border-bottom: 2px solid #0096d6; padding-bottom: 10px;">Message Received</h2>
  
  <p>Hello ${cleanName},</p>
  <p>Thank you for getting in touch! I have successfully received your message. I'll get back to you as soon as possible.</p>
  <p style="margin-bottom: 20px;">For your records, here is a copy of the details you submitted:</p>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
    <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #888; letter-spacing: 0.05em;">Your Submitted Message</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 4px 0; font-weight: bold; width: 100px;">Name:</td>
        <td style="padding: 4px 0;">${cleanName}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-weight: bold;">Email:</td>
        <td style="padding: 4px 0;">${cleanEmail}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-weight: bold;">Date:</td>
        <td style="padding: 4px 0;">${timestamp}</td>
      </tr>
    </table>
    
    <h4 style="margin: 15px 0 5px 0; font-size: 13px; color: #666; font-weight: bold;">Message:</h4>
    <div style="white-space: pre-wrap; background-color: #fff; border-left: 4px solid #ccc; padding: 10px 15px; color: #555; font-size: 14px;">${cleanMessage}</div>
  </div>
  
  <p style="margin-top: 25px; margin-bottom: 0;">Best regards,</p>
  <p style="margin-top: 5px; font-weight: bold; color: #111;">Felix Au (Harshit Soni)</p>
  <p style="font-size: 13px; color: #666; margin-top: 0;"><a href="https://felixau.in" style="color: #0096d6; text-decoration: none;">felixau.in</a></p>
  
  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0 15px 0;" />
  <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
    This is an automated confirmation email.
  </p>
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
