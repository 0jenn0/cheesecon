'use server';

import { cookies } from 'next/headers';
import { Database } from '@/types/types_db';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

export const createServerSupabaseClient = async (
  cookieStore?: Awaited<ReturnType<typeof cookies>>,
  admin: boolean = false,
) => {
  const cookieStoreInstance = cookieStore || (await cookies());

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin
      ? process.env.NEXT_SUPABASE_SERVICE_ROLE!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStoreInstance.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStoreInstance.set({ name, value, ...options });
          } catch (error) {
            // 서버 컴포넌트에서 `set` 메서드가 호출되었습니다.
            // 미들웨어에서 사용자 세션을 갱신하고 있다면 이 에러는 무시할 수 있습니다.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStoreInstance.set({ name, value: '', ...options });
          } catch (error) {
            // 서버 컴포넌트에서 `remove` 메서드가 호출되었습니다.
            // 미들웨어에서 사용자 세션을 갱신하고 있다면 이 에러는 무시할 수 있습니다.
          }
        },
      },
    },
  );
};

export const createServerSupabaseAdminClient = async (
  cookieStore?: Awaited<ReturnType<typeof cookies>>,
) => {
  return createServerSupabaseClient(cookieStore, true);
};
