export const PROFILE_QUERY_KEYS = {
  all: ['profile'] as const,
  activeUsers: () => [...PROFILE_QUERY_KEYS.all, 'active-users'] as const,
  activeCommenters: () =>
    [...PROFILE_QUERY_KEYS.all, 'active-commenters'] as const,
  dashboardStats: () => [...PROFILE_QUERY_KEYS.all, 'dashboard-stats'] as const,
  userDetailStats: (userId: string) =>
    [...PROFILE_QUERY_KEYS.all, 'user-detail-stats', userId] as const,
  trendingEmoticons: () =>
    [...PROFILE_QUERY_KEYS.all, 'trending-emoticons'] as const,
  myStats: () => [...PROFILE_QUERY_KEYS.all, 'my-stats'] as const,
} as const;
