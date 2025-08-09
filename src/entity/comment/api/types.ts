import { ApiResult, BaseApiRequest, BaseApiResponse } from '@/shared/types';
import { Profile } from '@/entity/profile';
import {
  Comment,
  CommentReaction,
  CommentSortParams,
  CreateCommentParams,
} from '../type';

export type CreateCommentRequest = {
  comment: CreateCommentParams;
};

export type CommentReactionSummary = {
  emoji: string;
  count: number;
};

export type CommentDetail = Comment & {
  reaction_summary: CommentReactionSummary[];
  reactions?: CommentReaction[];
  profile: Profile;
};

export type GetCommentsRequest = BaseApiRequest &
  CommentSortParams & {
    set_id?: string;
    image_id?: string;
    user_id?: string;
    parent_comment_id?: string | null;
  };

export type CreateCommentResponse = {
  comment: Comment;
};

export type CreateCommentResult = ApiResult<CreateCommentResponse>;
export type GetCommentsResult = ApiResult<BaseApiResponse<CommentDetail>>;
