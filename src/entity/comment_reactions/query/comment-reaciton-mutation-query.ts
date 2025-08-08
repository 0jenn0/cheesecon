import { useOptimistic, useTransition } from 'react';
import { CommentDetail, CommentReactionSummary } from '@/entity/comment/api';
import { COMMENT_QUERY_KEY } from '@/entity/comment/query/query-key';
import { CommentReaction } from '@/entity/comment/type';
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
  initialReactionSummary: CommentReactionSummary[],
  initialReactions: CommentReaction[],
) {
  const [isPending, startTransition] = useTransition();
  const [optimisticReactionSummary, addOptimisticReaction] = useOptimistic<
    {
      reactionSummary: CommentReactionSummary[];
      reactions: CommentReaction[];
    },
    {
      commentId: string;
      emoji: string;
      actionType: 'add' | 'remove';
    }
  >(
    { reactionSummary: initialReactionSummary, reactions: initialReactions },
    (state, action) => {
      const { emoji, actionType } = action;

      if (actionType === 'add') {
        const existingIndex = state.reactionSummary.findIndex(
          (reaction) => reaction.emoji === emoji,
        );

        if (existingIndex >= 0) {
          return {
            ...state,
            reactionSummary: state.reactionSummary.map((reaction, index) =>
              index === existingIndex
                ? { ...reaction, count: reaction.count + 1 }
                : reaction,
            ),
            reactions: [
              ...state.reactions,
              {
                emoji,
                comment_id: state.reactions[0].comment_id,
                created_at: state.reactions[0].created_at,
                id: state.reactions[0].id,
                user_id: state.reactions[0].user_id,
              },
            ],
          };
        } else {
          return {
            ...state,
            reactionSummary: [...state.reactionSummary, { emoji, count: 1 }],
          };
        }
      }

      if (actionType === 'remove') {
        const existingIndex = state.reactionSummary.findIndex(
          (reaction) => reaction.emoji === emoji,
        );

        if (existingIndex >= 0) {
          const currentCount = state.reactionSummary[existingIndex].count;
          const newCount = currentCount - 1;

          if (newCount <= 0) {
            return {
              ...state,
              reactionSummary: state.reactionSummary.filter(
                (_, index) => index !== existingIndex,
              ),
            };
          } else {
            return {
              ...state,
              reactionSummary: state.reactionSummary.map((reaction, index) =>
                index === existingIndex
                  ? { ...reaction, count: newCount }
                  : reaction,
              ),
              reactions: state.reactions.filter(
                (reaction) =>
                  reaction.emoji !== action.emoji &&
                  reaction.user_id !== state.reactions[0].user_id,
              ),
            };
          }
        }
      }

      return state;
    },
  );

  const handleAddOptimisticReaction = async (
    commentId: string,
    emoji: string,
    actionType: 'add' | 'remove',
  ) => {
    startTransition(() => {
      addOptimisticReaction({ commentId, emoji, actionType });
    });

    try {
      if (actionType === 'add') {
        await createCommentReaction({ commentId, emoji });
      } else if (actionType === 'remove') {
        await deleteCommentReaction({ commentId, emoji });
      }

      await queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEY.lists(),
      });
    } catch (error) {
      console.error('코멘트 리액션 API 에러:', error);
      await queryClient.refetchQueries({
        queryKey: COMMENT_QUERY_KEY.detail(commentId),
      });
    }
  };

  return {
    optimisticReactionSummary,
    handleAddOptimisticReaction,
    isPending,
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
