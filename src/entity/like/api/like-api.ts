// entity/like/api.ts
import { createBrowserSupabaseClient } from '@/shared/lib/supabase/client';

export interface LikeResult {
  success: boolean;
  is_liked?: boolean;
  likes_count?: number;
  error?: string;
}

export async function toggleLike(
  targetType: 'emoticon_set' | 'emoticon_image',
  targetId: string,
  userId: string,
): Promise<LikeResult> {
  const supabase = createBrowserSupabaseClient();

  try {
    const { data, error } = await supabase.rpc('toggle_like', {
      p_set_id: targetType === 'emoticon_set' ? targetId : undefined,
      p_image_id: targetType === 'emoticon_image' ? targetId : undefined,
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
  targetType: 'emoticon_set' | 'emoticon_image',
  targetId: string,
  userId: string,
): Promise<boolean> {
  const supabase = createBrowserSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq(targetType === 'emoticon_set' ? 'set_id' : 'image_id', targetId)
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

export async function getLikeCount(
  targetType: 'emoticon_set' | 'emoticon_image',
  targetId: string,
): Promise<number | null> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('likes')
    .select('count')
    .eq(targetType === 'emoticon_set' ? 'set_id' : 'image_id', targetId);

  if (error) {
    console.error('좋아요 개수 조회 실패:', error);
    return 0;
  }

  return data?.[0]?.count ?? null;
}
