import {
  useCallback,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useToast } from '@/shared/ui/feedback';
import { CommentReactionSummary } from '@/entity/comment/api';
import { COMMENT_QUERY_KEY } from '@/entity/comment/query/query-key';
import { useCommentSectionUi } from '@/feature/comment/ui/emoticon-comment-section/provider/use-comment-section-ui';
import { queryClient } from '@/provider/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import {
  createCommentReaction,
  deleteCommentReaction,
} from '../api/comment-reactions-api';
import { CreateCommentReactionRequest } from '../api/type';

export function useCreateCommentReaction(commentId: string) {
  const { addToast } = useToast();
  const { toggleReaction } = useCommentSectionUi(commentId);

  return useMutation({
    mutationFn: ({ commentId, emoji }: CreateCommentReactionRequest) =>
      createCommentReaction({ commentId, emoji }),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.lists() });
      } else {
        addToast({
          type: 'error',
          message: data.error.message,
        });
        toggleReaction();
        return;
      }
    },
    onError: () => {
      addToast({
        type: 'error',
        message: '코멘트 리액션에 실패했어요. 다시 시도해주세요.',
      });
    },
  });
}

type ReactionAction = { type: 'toggle'; emoji: string };

function reactionReducer(
  state: CommentReactionSummary[],
  action: ReactionAction,
): CommentReactionSummary[] {
  if (action.type !== 'toggle') return state;

  const { emoji } = action;
  const i = state.findIndex((r) => r.emoji === emoji);

  if (i < 0) {
    return [...state, { emoji, count: 1, reacted: true, my_reaction_ids: [] }];
  }

  const cur = state[i];

  if (cur.reacted) {
    const nextCount = Math.max(0, cur.count - 1);
    if (nextCount === 0) {
      return state.filter((_, idx) => idx !== i);
    }
    const newState = [...state];
    newState[i] = {
      ...cur,
      count: nextCount,
      reacted: false,
      my_reaction_ids: [],
    };
    return newState;
  }

  const newState = [...state];
  newState[i] = { ...cur, count: cur.count + 1, reacted: true };
  return newState;
}

export function useOptimisticCommentReaction(
  commentId: string,
  initialSummary: CommentReactionSummary[],
) {
  const { addToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [actualSummary, setActualSummary] = useState<CommentReactionSummary[]>(
    () => initialSummary,
  );

  const isRequestingRef = useRef(false);
  const prevActualRef = useRef<CommentReactionSummary[] | null>(null);

  const [optimisticSummary, dispatchOptimistic] = useOptimistic<
    CommentReactionSummary[],
    ReactionAction
  >(actualSummary, reactionReducer);

  const actualSummaryRef = useRef(actualSummary);
  actualSummaryRef.current = actualSummary;

  const toggleReaction = useCallback(
    (emoji: string) => {
      if (isRequestingRef.current) return;
      isRequestingRef.current = true;

      startTransition(async () => {
        dispatchOptimistic({ type: 'toggle', emoji });

        const prev = actualSummaryRef.current;
        prevActualRef.current = prev;
        const prevItem = prev.find((r) => r.emoji === emoji);
        const wasReacted = !!prevItem?.reacted;

        try {
          if (wasReacted) {
            const res = await deleteCommentReaction({ commentId, emoji });
            if (!res.success) {
              addToast({
                type: 'error',
                message: res.error.message,
              });
              return;
            }
          } else {
            const res = await createCommentReaction({ commentId, emoji });
            if (!res.success) {
              addToast({
                type: 'error',
                message: res.error.message,
              });
              return;
            }
          }

          setActualSummary((s) =>
            reactionReducer(s, { type: 'toggle', emoji }),
          );
        } catch (error) {
          if (prevActualRef.current) {
            setActualSummary(prevActualRef.current);
          }
          addToast({
            type: 'error',
            message: `이모지 반응 처리 중 오류가 발생했어요. ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
          });
        } finally {
          isRequestingRef.current = false;
        }
      });
    },
    [commentId, addToast, dispatchOptimistic],
  );

  return useMemo(
    () => ({
      reactionSummary: optimisticSummary,
      toggleReaction,
      isLoading: isPending,
    }),
    [optimisticSummary, toggleReaction, isPending],
  );
}
