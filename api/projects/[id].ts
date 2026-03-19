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
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Missing project id',
    });
  }

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return res.status(500).json({
      success: false,
      error: 'Missing Supabase environment variables',
    });
  }

  const authCheck = await verifyAuth(req);

  if (!authCheck.authorized) {
    return res.status(401).json({
      success: false,
      error: authCheck.error,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  if (req.method === 'PATCH') {
    try {
      const { stage } = req.body;

      if (!stage) {
        return res.status(400).json({
          success: false,
          error: 'Stage is required',
        });
      }

      const allowedStages = [
        'onboarding',
        'in progress',
        'waiting on client',
        'review',
        'completed',
        'archived',
      ];

      if (!allowedStages.includes(stage)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid project stage',
        });
      }

      const { data, error } = await supabase
        .from('projects')
        .update({ stage })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error('Project PATCH error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error('Project GET error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
}