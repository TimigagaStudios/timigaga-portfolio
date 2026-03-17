import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Missing request id',
    });
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({
      success: false,
      error: 'Missing Supabase environment variables',
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status is required',
        });
      }

      const allowedStatuses = ['pending', 'reviewed', 'contacted', 'closed'];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status value',
        });
      }

      const { data, error } = await supabase
        .from('client_requests')
        .update({ status })
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
      console.error('PATCH request error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('client_requests')
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
      console.error('GET request error:', error);
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