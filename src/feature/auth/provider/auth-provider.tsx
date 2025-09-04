'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setUserId, setUserProperties } from '@/shared/lib/amplitude';
import { Provider, Session } from '@supabase/supabase-js';
import { AuthApiResponse, authApi } from '../api';
import { signInWithProvider } from '../model';
import { AuthUser } from '../type/user';

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  signInWithProvider: (
    provider: Provider,
    redirectUrl?: string,
  ) => Promise<AuthApiResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  signInWithProvider: async () => ({ data: null, error: null }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const signInWithProviderAuth = async (
    provider: Provider,
    redirectUrl?: string,
  ) => {
    try {
      const result = await signInWithProvider(provider, redirectUrl);
      if (result.error) {
        setError(result.error as Error);
      }
      return result;
    } catch (error) {
      const errorObj = error as Error;
      setError(errorObj);
      return { data: null, error: errorObj };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await authApi.signOut();
      setUser(null);
      if (error) throw error;
    } catch (error) {
      console.error('로그아웃 오류:', error);
      setError(error as Error);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: session, error } = await authApi.getSession();
        if (error) throw error;

        setSession(session);

        const metadata = session?.user?.user_metadata;

        const userInfo = {
          email: metadata?.email ?? '',
          name: metadata?.full_name ?? '',
          avatarUrl: metadata?.avatar_url
            ? metadata.avatar_url.replace(/^http:\/\//, 'https://')
            : '',
        };

        setUser(userInfo);

        if (session?.user?.id) {
          setUserId(session.user.id);
          setUserProperties({
            user_type: 'creator',
            email: userInfo.email,
            name: userInfo.name,
            provider: metadata?.provider,
            created_at: session.user.created_at,
            has_avatar: !!userInfo.avatarUrl,
          });
        }
      } catch (error) {
        console.error('초기 세션 조회 오류:', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = authApi.onAuthStateChange(
      async (event: string, session: Session | null) => {
        setSession(session);

        const userInfo = {
          email: session?.user?.email ?? '',
          name: session?.user?.user_metadata?.full_name ?? '',
          avatarUrl: session?.user?.user_metadata?.avatar_url ?? '',
        };

        setUser(userInfo);

        if (session?.user?.id) {
          setUserId(session.user.id);
          setUserProperties({
            user_type: 'creator',
            email: userInfo.email,
            name: userInfo.name,
            provider: session.user.user_metadata?.provider,
            created_at: session.user.created_at,
            has_avatar: !!userInfo.avatarUrl,
            auth_event: event,
          });
        } else {
          setUserId('');
        }

        setIsLoading(false);
        setError(null);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    isLoading,
    error,
    signInWithProvider: signInWithProviderAuth,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
