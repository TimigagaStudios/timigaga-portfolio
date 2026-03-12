-- SQL Schema for Timigaga Studios Project Intake
-- This can be pasted into the Supabase SQL Editor

CREATE TABLE project_intake (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  country TEXT,
  project_types TEXT[] DEFAULT '{}',
  budget TEXT,
  description TEXT NOT NULL,
  timeline TEXT,
  design_style TEXT,
  theme TEXT,
  extra_features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'new' -- new, reviewing, contacted, closed
);

-- Enable Row Level Security (RLS)
ALTER TABLE project_intake ENABLE ROW LEVEL SECURITY;

-- Allow anonymous submissions (Public)
CREATE POLICY "Allow public submissions" 
ON project_intake FOR INSERT 
TO anon 
WITH CHECK (true);

-- Only authenticated staff can view submissions
CREATE POLICY "Allow authenticated view" 
ON project_intake FOR SELECT 
TO authenticated 
USING (true);
