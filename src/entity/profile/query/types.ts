import { EmoticonSet } from '@/entity/emoticon-set';
import { Profile, ProfileActivity } from '../type';

export type ProfileQueryParams = {
  limit?: number;
  offset?: number;
};

export type ActiveUsersQueryParams = ProfileQueryParams;

export type TrendingEmoticonsQueryParams = {
  limit?: number;
};

export type UserDetailStatsQueryParams = {
  userId: string;
};

export type ProfileQueryResult<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
};

export type ActiveUsersQueryResult = ProfileQueryResult<{
  users: ProfileActivity[];
  count: number;
}>;

export type ActiveCommentersQueryResult = ProfileQueryResult<{
  commenters: Profile[];
}>;

export type DashboardStatsQueryResult = ProfileQueryResult<{
  stats: unknown; // TODO: 구체적인 타입 정의 필요
}>;

export type UserDetailStatsQueryResult = ProfileQueryResult<{
  profile: Profile;
  emoticons: EmoticonSet[];
  recentComments: unknown[]; // TODO: Comment 타입 사용
  likesGiven: number;
}>;

export type TrendingEmoticonsQueryResult = ProfileQueryResult<{
  emoticons: EmoticonSet[];
}>;

export type MyStatsQueryResult = ProfileQueryResult<{
  profile: Profile;
  emoticon_count: number;
  comment_count: number;
  total_likes_received: number;
  likes_given: number;
  recent_emoticons: EmoticonSet[];
}>;
