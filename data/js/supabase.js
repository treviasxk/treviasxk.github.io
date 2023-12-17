/*
    Software Developed by Trevias Xk
    Social Networks:     treviasxk
    Github:              https://github.com/treviasxk
    Paypal:              trevias@live.com
*/

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Supabase Config
const supabaseUrl = "https://dfmkiesijkrlfgqovkgy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbWtpZXNpamtybGZncW92a2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MDQzODgsImV4cCI6MjAxODE4MDM4OH0.hfyPYOMyU7udufL9syI17e8VOGs7swbfe4gPE54aWqI";
supabase = createClient(supabaseUrl, supabaseKey)

const { data: { user } } = await supabase.auth.getUser()
supabaseUser = user;