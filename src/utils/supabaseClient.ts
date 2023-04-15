import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
    'https://mmxojpcdznhhxqhlbxtr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1teG9qcGNkem5oaHhxaGxieHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NjczMzgsImV4cCI6MTk5NzE0MzMzOH0.Lk2wbrGYWYm2juBCaCaVEj3SL5dJp1hckeaVsOPMklg'
)