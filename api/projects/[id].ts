import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Missing project id',
    });
  }

  try {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      return res.status(500).json({
        success: false,
        error: 'Missing Supabase environment variables',
      });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Missing authorization token',
      });
    }

    const token = authHeader.replace('Bearer ', '');

    const supabaseAuthClient = createClient(supabaseUrl, supabaseAnonKey);

    const {
      data: { user },
      error: authError,
    } = await supabaseAuthClient.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    if (req.method === 'PATCH') {
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
    }

    if (req.method === 'GET') {
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
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('Project API error:', error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
