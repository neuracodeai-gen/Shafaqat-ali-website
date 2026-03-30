import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tglfzkvdaligwpixudok.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbGZ6a3ZkYWxpZ3dwaXh1ZG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Njc0MzYsImV4cCI6MjA5MDQ0MzQzNn0.H38TNP3ctysOv2dOegvsC30XbzDveIR59ZzLfkyBUHA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;