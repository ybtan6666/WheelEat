// GET all users or POST new user
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      res.status(200).json(data || []);
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json(data);
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

