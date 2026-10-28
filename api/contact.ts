import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Hardcoded verified recipient email address
const RECIPIENT_EMAIL = 'krupitpatel7kp@gmail.com';

// Simple HTML entity escaping to prevent any script or tag injection in HTML email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Please send a POST request.',
    });
  }

  try {
    // 2. Parse and normalize body
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Invalid JSON request payload.',
        });
      }
    }

    const { name, email, project, message, botcheck } = body || {};

    // 3. Honeypot check for spam prevention
    if (botcheck) {
      console.warn('[Spam Detection] Honeypot triggered, ignoring submission silently.');
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your inquiry has been submitted successfully.',
      });
    }

    // 4. Validate input fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 5 characters.',
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message must not exceed 5000 characters.',
      });
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 254);
    const cleanProject = typeof project === 'string' && project.trim() ? project.trim().slice(0, 100) : 'General Inquiry';
    const cleanMessage = message.trim();
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 5. Inspect server-side credentials
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Contact API Configuration Error] RESEND_API_KEY environment variable is not configured.');
      return res.status(503).json({
        success: false,
        error: 'EMAIL_SERVICE_NOT_CONFIGURED',
        message: 'Email service is not configured. Please add RESEND_API_KEY in Vercel Project Settings.',
      });
    }

    // 6. Initialize Resend client
    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'CLICK FRAME CINEMATIC <onboarding@resend.dev>';

    // 7. Render clean, safe HTML email
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeProject = escapeHtml(cleanProject);
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br/>');

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Inquiry — CLICK FRAME CINEMATIC</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080811; color: #FFFFFF;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #12121E; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #22D3EE 100%);">
        <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 1px; text-transform: uppercase;">
          CLICK FRAME CINEMATIC
        </h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.9); font-weight: 500;">
          New Client Portfolio Inquiry
        </p>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 32px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8B5CF6; font-weight: 700;">Client Name</span>
              <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #FFFFFF;">${safeName}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #22D3EE; font-weight: 700;">Client Email</span>
              <p style="margin: 4px 0 0; font-size: 15px; color: #FFFFFF;">
                <a href="mailto:${safeEmail}" style="color: #22D3EE; text-decoration: none; font-weight: 600;">${safeEmail}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #EC4899; font-weight: 700;">Project Type</span>
              <p style="margin: 4px 0 0; font-size: 15px; color: #FFFFFF; font-weight: 600;">${safeProject}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #B7B7C9; font-weight: 700;">Project Message / Details</span>
              <div style="margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #E2E8F0; background-color: rgba(0,0,0,0.3); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                ${safeMessage}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 16px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #71717A; font-weight: 600;">Submitted At</span>
              <p style="margin: 4px 0 0; font-size: 12px; color: #94A3B8; font-family: monospace;">${timestamp} (IST)</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background-color: #0A0A14; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #94A3B8;">
          You can reply directly to this email to contact <strong>${safeName}</strong>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textBody = `
New Portfolio Inquiry — CLICK FRAME CINEMATIC
==============================================

Client Name: ${cleanName}
Client Email: ${cleanEmail}
Project Type: ${cleanProject}
Submitted: ${timestamp} (IST)

Message:
${cleanMessage}

----------------------------------------------
Reply directly to this email to respond to ${cleanName} (${cleanEmail}).
    `.trim();

    // 8. Dispatch email via Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [RECIPIENT_EMAIL],
      replyTo: cleanEmail,
      subject: `New Portfolio Inquiry — CLICK FRAME CINEMATIC: ${cleanProject}`,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error('[Resend Delivery Error]', {
        name: error.name,
        message: error.message,
      });
      return res.status(502).json({
        success: false,
        message: 'Your message could not be sent. Please try again or contact Krupit through WhatsApp.',
      });
    }

    console.log('[Contact Inquiry Sent Successfully]', {
      id: data?.id,
      timestamp: new Date().toISOString(),
      recipient: RECIPIENT_EMAIL,
    });

    // 9. Return verified success
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully. Krupit will get back to you soon.',
      id: data?.id,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error';
    console.error('[Contact API Unexpected Error]', errorMsg);

    return res.status(500).json({
      success: false,
      message: 'Your message could not be sent. Please try again or contact Krupit through WhatsApp.',
    });
  }
}
