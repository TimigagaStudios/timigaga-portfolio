import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from './_utils/requireAdmin';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({
      success: false,
      error: 'Missing Supabase environment variables',
    });
  }

  const user = await requireAdmin(req, res);
  if (!user) return;

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('studio_settings')
        .select('*')
        .limit(1)
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
      console.error('Settings GET error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const {
        id,
        studio_name,
        founder_name,
        public_email,
        phone,
        location,
        default_theme,
        accent_color,
        brand_status,
      } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Settings id is required',
        });
      }

      const { data, error } = await supabase
        .from('studio_settings')
        .update({
          studio_name,
          founder_name,
          public_email,
          phone,
          location,
          default_theme,
          accent_color,
          brand_status,
        })
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
      console.error('Settings PATCH error:', error);
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