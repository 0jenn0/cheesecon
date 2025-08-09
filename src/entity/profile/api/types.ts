import { ApiResult, BaseApiRequest, BaseApiResponse } from '@/shared/types';
import { EmoticonSet } from '@/entity/emoticon-set';
import { MyStats, Profile, ProfileActivity, UserDetailStats } from '../type';

export type GetActiveUsersRequest = BaseApiRequest & {
  limit?: number;
  offset?: number;
};

export type GetActiveUsersResponse = BaseApiResponse<ProfileActivity>;

export type GetActiveCommentersResponse = {
  commenters: Profile[];
};

export type GetDashboardStatsResponse = {
  stats: any; // TODO: 구체적인 타입 정의 필요
};

export type GetUserDetailStatsRequest = BaseApiRequest & {
  userId: string;
};

export type GetUserDetailStatsResponse = UserDetailStats;

export type GetTrendingEmoticonsRequest = BaseApiRequest & {
  limit?: number;
};

export type GetTrendingEmoticonsResponse = {
  emoticons: EmoticonSet[];
};

export type GetMyStatsResponse = MyStats;

export type GetActiveUsersResult = ApiResult<GetActiveUsersResponse>;
export type GetActiveCommentersResult = ApiResult<GetActiveCommentersResponse>;
export type GetDashboardStatsResult = ApiResult<GetDashboardStatsResponse>;
export type GetUserDetailStatsResult = ApiResult<GetUserDetailStatsResponse>;
export type GetTrendingEmoticonsResult =
  ApiResult<GetTrendingEmoticonsResponse>;
export type GetMyStatsResult = ApiResult<GetMyStatsResponse>;

export type ProfileUpdateRequest = Partial<
  Pick<Profile, 'nickname' | 'avatar_url'>
>;
export type ProfileUpdateResponse = Profile;
export type ProfileUpdateResult = ApiResult<ProfileUpdateResponse>;

export type GetProfileResult = ApiResult<Profile>;
