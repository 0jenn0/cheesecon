// entity/like/api.ts
import { createBrowserSupabaseClient } from '@/shared/lib/supabase/client';

export interface LikeResult {
  success: boolean;
  is_liked?: boolean;
  likes_count?: number;
  error?: string;
}

export async function toggleLike(
  setId: string,
  userId: string,
): Promise<LikeResult> {
  const supabase = createBrowserSupabaseClient();

  try {
    const { data, error } = await supabase.rpc('toggle_like' as any, {
      p_set_id: setId,
      p_user_id: userId,
    });

    if (error) {
      console.error('좋아요 토글 실패:', error);
      return { success: false, error: error.message };
    }

    console.log('좋아요 토글 결과:', data);
    return data as LikeResult;
  } catch (error) {
    console.error('좋아요 토글 중 오류:', error);
    return { success: false, error: 'Unknown error' };
  }
}

// 현재 사용자의 좋아요 상태 확인
export async function getLikeStatus(
  setId: string,
  userId: string,
): Promise<boolean> {
  const supabase = createBrowserSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('set_id', setId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found
      console.error('좋아요 상태 확인 실패:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('좋아요 상태 확인 중 오류:', error);
    return false;
  }
}
