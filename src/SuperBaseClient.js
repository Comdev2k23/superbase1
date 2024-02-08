import { createClient  } from "@supabase/supabase-js";

const superbaseURL = "https://vwlwkukwlqbrlkpzztjo.supabase.co"
const superbaseAnnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bHdrdWt3bHFicmxrcHp6dGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MTE1OTYsImV4cCI6MjAyMjk4NzU5Nn0.7ec8aQyqYqq93_q-ZEVhPv8daXEeERQ6hUdF9XJFlsA"

export const superbase = createClient(superbaseURL, superbaseAnnonKey)