import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mmtybpddrcnkqqdxfuzm.supabase.co'; // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdHlicGRkcmNua3FxZHhmdXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3MTE0MjYsImV4cCI6MjAwNDI4NzQyNn0.aRQE1i6kLczmAMbI65eoPJ8AIHu6tFM1Hdeo9SQ7TlU'; // Replace with your anon/public key

export const supabase = createClient(supabaseUrl, supabaseKey);
