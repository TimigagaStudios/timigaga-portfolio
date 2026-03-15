import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type ClientRequestPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_category: string;
  budget?: string;
  style_preference?: string;
  theme?: string;
  message: string;
  reference_images?: string[];
  status?: 'pending' | 'reviewed' | 'contacted' | 'closed';
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const brevoApiKey = process.env.BREVO_API_KEY as string;
const brevoSenderName = process.env.BREVO_SENDER_NAME as string;
const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL as string;
const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL as string;

function validateEnv() {
  if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseServiceRoleKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  if (!brevoApiKey) throw new Error('Missing BREVO_API_KEY');
  if (!brevoSenderName) throw new Error('Missing BREVO_SENDER_NAME');
  if (!brevoSenderEmail) throw new Error('Missing BREVO_SENDER_EMAIL');
  if (!adminNotificationEmail) throw new Error('Missing ADMIN_NOTIFICATION_EMAIL');
}

function validatePayload(body: Partial<ClientRequestPayload>) {
  if (!body.name || !body.name.trim()) return 'Name is required';
  if (!body.email || !body.email.trim()) return 'Email is required';
  if (!body.project_category || !body.project_category.trim()) return 'Project category is required';
  if (!body.message || !body.message.trim()) return 'Message is required';
  return null;
}

async function sendBrevoEmail({
  toEmail,
  toName,
  subject,
  htmlContent,
}: {
  toEmail: string;
  toName: string;
  subject: string;
  htmlContent: string;
}) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify({
      sender: {
        name: brevoSenderName,
        email: brevoSenderEmail,
      },
      to: [{ email: toEmail, name: toName }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo email failed: ${errorText}`);
  }

  return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    validateEnv();

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const body = req.body as ClientRequestPayload;
    const validationError = validatePayload(body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError,
      });
    }

    const payload: ClientRequestPayload = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || '',
      company: body.company?.trim() || '',
      project_category: body.project_category.trim(),
      budget: body.budget?.trim() || '',
      style_preference: body.style_preference?.trim() || '',
      theme: body.theme?.trim() || '',
      message: body.message.trim(),
      reference_images: Array.isArray(body.reference_images) ? body.reference_images : [],
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('client_requests')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to save request',
        details: error.message,
      });
    }

    const adminHtml = `
      <div style="font-family: Inter, Arial, sans-serif; color: #111111;">
        <h2>New Client Request - Timigaga Studios</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${payload.company || 'N/A'}</p>
        <p><strong>Project Category:</strong> ${payload.project_category}</p>
        <p><strong>Budget:</strong> ${payload.budget || 'N/A'}</p>
        <p><strong>Style Preference:</strong> ${payload.style_preference || 'N/A'}</p>
        <p><strong>Theme:</strong> ${payload.theme || 'N/A'}</p>
        <p><strong>Reference Images:</strong> ${
          payload.reference_images && payload.reference_images.length > 0
            ? payload.reference_images.join(', ')
            : 'None'
        }</p>
        <p><strong>Message:</strong><br>${payload.message.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    const clientHtml = `
      <div style="font-family: Inter, Arial, sans-serif; color: #111111;">
        <h2>Thanks for contacting Timigaga Studios</h2>
        <p>Hi ${payload.name},</p>
        <p>We’ve received your request and will review it shortly.</p>
        <p><strong>Project Category:</strong> ${payload.project_category}</p>
        <p><strong>Budget:</strong> ${payload.budget || 'N/A'}</p>
        <p><strong>Style Preference:</strong> ${payload.style_preference || 'N/A'}</p>
        <p style="margin-top: 20px;">Timigaga Studios</p>
        <p>Build. Design. Innovate.</p>
      </div>
    `;

    await Promise.allSettled([
      sendBrevoEmail({
        toEmail: adminNotificationEmail,
        toName: 'Admin',
        subject: `New Client Request from ${payload.name}`,
        htmlContent: adminHtml,
      }),
      sendBrevoEmail({
        toEmail: payload.email,
        toName: payload.name,
        subject: 'We received your project request - Timigaga Studios',
        htmlContent: clientHtml,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Request submitted successfully',
      data,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}