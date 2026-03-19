import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

async function verifyAuth(req: VercelRequest) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authorized: false, error: 'Missing authorization token' };
  }

  const token = authHeader.replace('Bearer ', '');

  const supabaseAuthClient = createClient(supabaseUrl, supabaseAnonKey);
  const {
    data: { user },
    error,
  } = await supabaseAuthClient.auth.getUser(token);

  if (error || !user) {
    return { authorized: false, error: 'Unauthorized' };
  }

  return { authorized: true, user };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const authCheck = await verifyAuth(req);

    if (!authCheck.authorized) {
      return res.status(401).json({
        success: false,
        error: authCheck.error,
      });
    }

    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        error: 'requestId is required',
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: requestData, error: requestError } = await supabase
      .from('client_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (requestError || !requestData) {
      return res.status(404).json({
        success: false,
        error: 'Client request not found',
      });
    }

    const projectPayload = {
      client_request_id: requestData.id,
      project_name: `${requestData.company || requestData.name} Project`,
      client_name: requestData.name,
      client_email: requestData.email,
      company: requestData.company || '',
      service: requestData.project_category,
      country: requestData.country || '',
      budget: requestData.budget || '',
      budget_amount: requestData.budget_amount ?? null,
      budget_currency: requestData.budget_currency || '',
      budget_display: requestData.budget_display || '',
      style_preference: requestData.style_preference || '',
      theme: requestData.theme || '',
      message: requestData.message || '',
      stage: 'onboarding',
    };

    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert([projectPayload])
      .select()
      .single();

    if (projectError) {
      return res.status(500).json({
        success: false,
        error: projectError.message,
      });
    }

    await supabase
      .from('client_requests')
      .update({ status: 'closed' })
      .eq('id', requestId);

    return res.status(200).json({
      success: true,
      data: projectData,
    });
  } catch (error) {
    console.error('Convert request error:', error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}