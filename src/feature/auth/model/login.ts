'use client';

import { Provider } from '@supabase/supabase-js';
import { authApi } from '../api';

export interface LoginParams {
  email?: string;
  password?: string;
  provider?: Provider;
}

export const signInWithProvider = async (provider: Provider) => {
  return await authApi.signInWithProvider(provider);
};
