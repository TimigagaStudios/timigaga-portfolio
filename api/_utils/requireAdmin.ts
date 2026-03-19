import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function requireAdmin(req: VercelRequest, res: VercelResponse) {
  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(500).json({
      success: false,
      error: 'Missing Supabase authentication environment variables',
    });
    return null;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Missing authorization token',
    });
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  const supabaseAuthClient = createClient(supabaseUrl, supabaseAnonKey);

  const {
    data: { user },
    error,
  } = await supabaseAuthClient.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
    return null;
  }

  return user;
}