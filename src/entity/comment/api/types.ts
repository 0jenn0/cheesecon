import { ApiResult, BaseApiRequest, BaseApiResponse } from '@/shared/types';
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
  reacted: boolean;
  my_reaction_ids: string[];
};

export type CommentDetail = Comment & {
  reaction_summary: CommentReactionSummary[];
  reactions?: CommentReaction[];
  profile: {
    id: string;
    nickname: string | null;
    avatar_url: string | null;
    description: string | null;
  };
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
