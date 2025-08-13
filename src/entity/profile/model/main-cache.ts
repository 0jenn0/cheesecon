import { unstable_cache } from 'next/cache';
import { CACHE_TAGS } from '@/shared/config/cach-tag';
import { createAnonServerClient } from '@/shared/lib/supabase';
import { GetActiveUsersInfinityResult } from '../api';

export const getActivityUsersCached = unstable_cache(
  fetchActivityUsers,
  [CACHE_TAGS.activity],
  { revalidate: 60 * 60, tags: [CACHE_TAGS.activity] },
);

async function fetchActivityUsers({
  limit = 8,
  offset = 0,
}): Promise<GetActiveUsersInfinityResult> {
  const supabase = createAnonServerClient();

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
      commentCountByUser.set(userId, (commentCountByUser.get(userId) || 0) + 1);
    }
  });

  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
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
}
