import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_utils/requireAdmin';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Missing project id',
    });
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({
      success: false,
      error: 'Missing Supabase environment variables',
    });
  }

  const user = await requireAdmin(req, res);
  if (!user) return;

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