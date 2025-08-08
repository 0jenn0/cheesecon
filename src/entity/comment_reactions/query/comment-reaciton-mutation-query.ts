import { useOptimistic, useState } from 'react';
import { CommentDetail } from '@/entity/comment/api';
import { COMMENT_QUERY_KEY } from '@/entity/comment/query/query-key';
import { LikeResult } from '@/entity/like/api';
import { queryClient } from '@/provider/QueryProvider';
import { Tables } from '@/types/types_db';
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

export function useOptimisticCommentReaction(
  commentId: string,
  initialReactionCount: number = 0,
) {
  const [optimisticState, addOptimisticLike] = useOptimistic(
    initialReactionCount,
    (state, action) => {
      if (action === 'add') {
        return state + 1;
      } else if (action === 'remove') {
        return state - 1;
      }
      return state;
    },
  );

  const handleAddOptimisticReaction = async (
    commentId: string,
    emoji: string,
    action: 'add' | 'remove',
  ) => {
    addOptimisticLike(action);

    const result = await createCommentReaction({ commentId, emoji });

    if (result) {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEY.detail(commentId),
      });
    }
  };

  return {
    optimisticState,
    handleAddOptimisticReaction,
  };
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
