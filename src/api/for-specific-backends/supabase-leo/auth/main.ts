import { VerifyEmailOtpParams } from '@supabase/supabase-js';
import { TyBasicAuth, TyMailAddress } from '../../../../types/basic';
import { sbInit } from '../init';

const supabase = sbInit.supabase;

export const supabaseAuthFns = {
  signUp: async ({ email, password }: TyBasicAuth) => {
    const result = await supabase.auth.signUp({
      email,
      password,
    });

    return result;
  },

  verifyOtp: async (inp: VerifyEmailOtpParams) => {
    const result = await supabase.auth.verifyOtp(inp);

    return result;
  },

  signInEmailAndPassword: async ({ email, password }: TyBasicAuth) => {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return result;
  },

  signOut: async () => {
    const result = await supabase.auth.signOut();
    return result;
  },

  sendResetPasswordEmail: async (email: TyMailAddress) => {
    // Send the user an email to get a password reset token.
    // This email contains a link which sends the user back to your application.

    const result = await supabase.auth.resetPasswordForEmail(email);

    return result;
  },

  getSession: async () => {
    const session = await supabase.auth.getSession();

    return session;
  },

  onAuthStateChange: (
    ...params: Parameters<typeof supabase.auth.onAuthStateChange>
  ) => {
    const result = supabase.auth.onAuthStateChange(...params);

    return result;
  },

  updateUser: async (
    ...params: Parameters<typeof supabase.auth.updateUser>
  ) => {
    const result = await supabase.auth.updateUser(...params);

    return result;
  },
};
