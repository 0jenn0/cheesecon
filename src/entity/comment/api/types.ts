import { ApiResult, BaseApiRequest, BaseApiResponse } from '@/shared/types';
import { Profile } from '@/entity/profile';
import { Comment, CommentSortParams, CreateCommentParams } from '../type';

export type CreateCommentRequest = {
  comment: CreateCommentParams;
};

export type GetCommentsRequest = BaseApiRequest &
  CommentSortParams & {
    set_id?: string;
    user_id?: string;
    parent_comment_id?: string | null;
  };

export interface CommentWithProfile extends Comment {
  profile: Pick<Profile, 'id' | 'nickname' | 'avatar_url'>;
}

export type CreateCommentResponse = {
  comment: Comment;
};

export type CreateCommentResult = ApiResult<CreateCommentResponse>;
export type GetCommentsResult = ApiResult<BaseApiResponse<CommentWithProfile>>;
