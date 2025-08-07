import { COMMENT_QUERY_KEY } from '@/entity/comment/query/query-key';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import {
  createCommentReaction,
  deleteCommentReaction,
} from '../api/comment-reactions-api';
import {
  CreateCommentReactionRequest,
  DeleteCommentReactionRequest,
} from '../api/type';

export function useCreateCommentReaction() {
  return useMutation({
    mutationFn: ({ commentId, emoji }: CreateCommentReactionRequest) =>
      createCommentReaction({ commentId, emoji }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
    },
    onError: (error) => {
      console.log('코멘트 리액션 에러', error);
    },
  });
}

export function useDeleteCommentReaction() {
  return useMutation({
    mutationFn: ({ commentId, emoji }: DeleteCommentReactionRequest) =>
      deleteCommentReaction({ commentId, emoji }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
    },
    onError: (error) => {
      console.log('코멘트 리액션 삭제 에러', error);
    },
  });
}
