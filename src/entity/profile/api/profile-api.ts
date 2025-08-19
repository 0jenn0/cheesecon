'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ApiResult, BaseApiResponse } from '@/shared/types';
import { ProfileActivity } from '../type';
import {
  GetProfileResult,
  ProfileUpdateRequest,
  ProfileUpdateResult,
} from './types';

/**
 * 활성 사용자 목록을 가져오는 함수
 * 이모티콘 생성, 댓글 작성, 받은 좋아요 수를 기반으로 활동 점수를 계산하여 정렬
 * @param limit 가져올 사용자 수 (기본값: 20)
 * @param offset 시작 인덱스 (기본값: 0)
 * @returns 정렬된 활성 사용자 목록과 에러 정보
 */
export async function getActiveUsers({
  limit = 8,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}): Promise<ApiResult<BaseApiResponse<ProfileActivity>>> {
  try {
    const supabase = await createServerSupabaseClient();

    const { count: totalCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { data: emoticonStats } = await supabase
      .from('emoticon_sets')
      .select('user_id, likes_count, is_private')
      .not('user_id', 'is', null);

    const { data: commentStats } = await supabase
      .from('comments')
      .select('user_id');

    const emoticonCountByUser = new Map<string, number>();
    const likesReceivedByUser = new Map<string, number>();
    const commentCountByUser = new Map<string, number>();

    emoticonStats?.forEach((stat) => {
      const userId = stat.user_id;
      if (userId && stat.is_private !== true) {
        emoticonCountByUser.set(
          userId,
          (emoticonCountByUser.get(userId) || 0) + 1,
        );
        likesReceivedByUser.set(
          userId,
          (likesReceivedByUser.get(userId) || 0) + (stat.likes_count || 0),
        );
      }
    });

    commentStats?.forEach((stat) => {
      const userId = stat.user_id;
      if (userId) {
        commentCountByUser.set(
          userId,
          (commentCountByUser.get(userId) || 0) + 1,
        );
      }
    });

    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (profileError) throw profileError;

    const usersWithStats = profiles.map((profile) => {
      const emoticonCount = emoticonCountByUser.get(profile.id) || 0;
      const commentCount = commentCountByUser.get(profile.id) || 0;
      const totalLikesReceived = likesReceivedByUser.get(profile.id) || 0;

      const activityScore =
        emoticonCount * 10 + commentCount * 2 + totalLikesReceived;

      return {
        ...profile,
        emoticon_count: emoticonCount,
        comment_count: commentCount,
        total_likes_received: totalLikesReceived,
        activity_score: activityScore,
      };
    });

    const sortedUsers = usersWithStats.sort(
      (a, b) => b.activity_score - a.activity_score,
    );

    const hasMore = totalCount ? offset + limit < totalCount : false;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

    return {
      success: true,
      data: {
        data: sortedUsers,
        hasMore,
        total: totalCount || 0,
        currentPage,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching active users:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

export async function updateProfile(
  request: ProfileUpdateRequest,
): Promise<ProfileUpdateResult> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.id) {
    return {
      success: false,
      error: { message: 'User를 찾을 수 없습니다.' },
    };
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(request)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }

  return { success: true, data };
}

export async function getProfile(): Promise<GetProfileResult> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.id) {
    return { success: false, error: { message: 'User를 찾을 수 없습니다.' } };
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return { success: false, error: { message: error.message } };
  }

  return { success: true, data };
}
