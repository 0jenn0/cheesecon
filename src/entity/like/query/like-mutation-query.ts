'use client';

import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { createBrowserSupabaseClient } from '@/shared/lib/supabase/client';
import { getLikeStatus, toggleLike } from '@/entity/like/api';

interface LikeState {
  isLiked: boolean;
  likesCount: number;
}

type LikeAction = {
  type: 'toggle';
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'toggle':
      return {
        isLiked: !state.isLiked,
        likesCount: state.isLiked
          ? Math.max(0, state.likesCount - 1)
          : state.likesCount + 1,
      };
    default:
      return state;
  }
}

export function useOptimisticLike(
  setId: string,
  userId?: string,
  initialLikesCount: number = 0,
) {
  const [isPending, startTransition] = useTransition();
  const [actualState, setActualState] = useState<LikeState>({
    isLiked: false,
    likesCount: initialLikesCount,
  });

  const isRequestingRef = useRef(false);

  const [optimisticState, addOptimisticLike] = useOptimistic(
    actualState,
    likeReducer,
  );

  useEffect(() => {
    if (!userId || !setId) {
      setActualState({
        isLiked: false,
        likesCount: initialLikesCount,
      });
      return;
    }

    const loadLikeStatus = async () => {
      try {
        const isLiked = await getLikeStatus(setId, userId);

        const supabase = createBrowserSupabaseClient();
        const { data: setData } = await supabase
          .from('emoticon_sets')
          .select('likes_count')
          .eq('id', setId)
          .single();

        const actualLikesCount = setData?.likes_count || initialLikesCount;

        setActualState({
          isLiked,
          likesCount: actualLikesCount,
        });
      } catch (error) {
        setActualState({
          isLiked: false,
          likesCount: initialLikesCount,
        });
      }
    };

    loadLikeStatus();
  }, [setId, userId, initialLikesCount]);

  const handleToggleLike = () => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    startTransition(async () => {
      isRequestingRef.current = true;
      addOptimisticLike({ type: 'toggle' });

      try {
        const result = await toggleLike(setId, userId);

        if (result.success) {
          setActualState({
            isLiked: result.is_liked!,
            likesCount: result.likes_count!,
          });
        } else {
          alert('좋아요 처리 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('좋아요 토글 중 오류:', error);
        alert('좋아요 처리 중 오류가 발생했습니다.');
      } finally {
        isRequestingRef.current = false;
      }
    });
  };

  return {
    isLiked: optimisticState.isLiked,
    likesCount: optimisticState.likesCount,
    isLoading: isPending,
    toggleLike: handleToggleLike,
  };
}
