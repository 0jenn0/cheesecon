import { ApiResult } from '@/shared/types';
import { CommentReaction } from '@/entity/comment/type';

export type GetCommentReactionsRequest = {
  commentId: string;
};

export type GetCommentReactionsResponse = ApiResult<CommentReaction[]>;

export type CreateCommentReactionRequest = {
  commentId: string;
  emoji: string;
};

export type CreateCommentReactionResponse = ApiResult<CommentReaction>;

export type DeleteCommentReactionRequest = {
  commentId: string;
  emoji: string;
};

export type DeleteCommentReactionResponse = ApiResult<CommentReaction>;
