import { sbInit } from '../init';

const supabase = sbInit.supabase;

export const supabaseDbFns = {
  aaa: () => {
    console.log(typeof supabase);
  },
};
