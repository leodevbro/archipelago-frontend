import { supabaseAuthFns } from '../for-specific-backends/supabase-leo/auth/main';
import { supabaseDbFns } from '../for-specific-backends/supabase-leo/db/main';

export const api = {
  auth: supabaseAuthFns,
  db: supabaseDbFns,
};
