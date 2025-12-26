// GET, PUT, DELETE single user by ID
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { id } = req.query;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
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
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(data);
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .update({ name, email, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      if (!data) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(data);
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      res.status(200).json({ message: 'User deleted successfully' });
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

