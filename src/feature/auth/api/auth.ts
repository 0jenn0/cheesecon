'use client';

import { createBrowserSupabaseClient } from '@/shared/lib/supabase/client';
import { Provider, Session } from '@supabase/supabase-js';

export interface AuthApiResponse<T = any> {
  data: T | null;
  error: any;
}

export const authApi = {
  signInWithProvider: async (provider: Provider): Promise<AuthApiResponse> => {
    const supabase = createBrowserSupabaseClient();

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('소셜 로그인 오류:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('소셜 로그인 중 오류 발생:', error);
      return { data: null, error };
    }
  },

  signOut: async (): Promise<AuthApiResponse> => {
    const supabase = createBrowserSupabaseClient();

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('로그아웃 오류:', error);
        return { data: null, error };
      }

      return { data: null, error: null };
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      return { data: null, error };
    }
  },

  getSession: async (): Promise<AuthApiResponse<Session>> => {
    const supabase = createBrowserSupabaseClient();

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('세션 조회 오류:', error);
        return { data: null, error };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error('세션 조회 중 오류 발생:', error);
      return { data: null, error };
    }
  },

  onAuthStateChange: (
    callback: (event: string, session: Session | null) => void,
  ) => {
    const supabase = createBrowserSupabaseClient();

    return supabase.auth.onAuthStateChange(callback);
  },
};
