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
      error: 'Missing request id',
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