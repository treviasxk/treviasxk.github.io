/*
    Software Developed by Trevias Xk
    Social Networks:     treviasxk
    Github:              https://github.com/treviasxk
    Paypal:              trevias@live.com
*/

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Supabase Config
const supabaseUrl = "https://cyhgmlceqsfktdivwbgg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5aGdtbGNlcXNma3RkaXZ3YmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2Mjc0NDUsImV4cCI6MjA1NTIwMzQ0NX0.LLExdL6Q0n87rzG8e6FAoNw0vhhoZTPraWIrN3jnRgk";
supabase = createClient(supabaseUrl, supabaseKey)