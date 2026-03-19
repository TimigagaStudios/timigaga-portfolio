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

  if (req.method === 'GET') {
    try {
      const { clientRequestId, projectId } = req.query;

      let query = supabase.from('notes').select('*').order('created_at', { ascending: false });

      if (clientRequestId && typeof clientRequestId === 'string') {
        query = query.eq('client_request_id', clientRequestId);
      }

      if (projectId && typeof projectId === 'string') {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query;

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
      console.error('Notes GET error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { client_request_id, project_id, content } = req.body;

      if (!content || !String(content).trim()) {
        return res.status(400).json({
          success: false,
          error: 'Note content is required',
        });
      }

      if (!client_request_id && !project_id) {
        return res.status(400).json({
          success: false,
          error: 'A client_request_id or project_id is required',
        });
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            client_request_id: client_request_id || null,
            project_id: project_id || null,
            content: String(content).trim(),
          },
        ])
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
      console.error('Notes POST error:', error);
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