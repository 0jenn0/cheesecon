import { createBrowserSupabaseClient } from '@/shared/lib/supabase/client';

function hasViewedInSession(setId: string, userId?: string): boolean {
  if (typeof window === 'undefined') return false;

  const key = `viewed_${setId}_${userId || 'anon'}`;
  return sessionStorage.getItem(key) === 'true';
}

function markViewedInSession(setId: string, userId?: string): void {
  if (typeof window === 'undefined') return;

  const key = `viewed_${setId}_${userId || 'anon'}`;
  sessionStorage.setItem(key, 'true');
}

export async function incrementViewCount(setId: string, userId?: string) {
  const supabase = createBrowserSupabaseClient();

  try {
    const { data, error } = await supabase.rpc(
      'increment_view_count_safe' as any,
      {
        p_set_id: setId,
        p_user_id: userId || null,
      },
    );

    if (error) {
      console.error('조회수 증가 실패:', error);
      return false;
    }

    return data as boolean;
  } catch (error) {
    console.error('조회수 증가 중 오류:', error);
    return false;
  }
}

export async function trackEmoticonView(setId: string, userId?: string) {
  if (hasViewedInSession(setId, userId)) {
    return true;
  }

  const success = await incrementViewCount(setId, userId);

  if (success) {
    markViewedInSession(setId, userId);
  } else {
    markViewedInSession(setId, userId);
  }

  return success;
}
