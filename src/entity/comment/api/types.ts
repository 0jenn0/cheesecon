import { ApiResult, BaseApiRequest, BaseApiResponse } from '@/shared/types';
import { Comment, CommentSortParams } from '../type';

export type CreateCommentRequest = {
  comment: Comment;
};

export type GetCommentsRequest = BaseApiRequest & {
  param?: CommentSortParams & {
    set_id?: string;
    user_id?: string;
    parent_comment_id?: string | null;
  };
};

export type CreateCommentResponse = {
  comment: Comment;
};

export type CreateCommentResult = ApiResult<CreateCommentResponse>;
export type GetCommentsResult = ApiResult<BaseApiResponse<Comment>>;
