// supabase.js
// ----------------------------------------------------------
// Initialize the Supabase client.
// Replace the two values below with your project's URL and anon key.
// Find them in: Supabase Dashboard → Settings → API
// ----------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co'
const SUPABASE_ANON = 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
