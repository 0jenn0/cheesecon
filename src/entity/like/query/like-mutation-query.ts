// hooks/useOptimisticLike.ts
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

// hooks/useOptimisticLike.ts

// hooks/useOptimisticLike.ts

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
          ? Math.max(0, state.likesCount - 1) // 좋아요 취소
          : state.likesCount + 1, // 좋아요 추가
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

  // 중복 요청 방지용 ref
  const isRequestingRef = useRef(false);

  // useOptimistic으로 낙관적 상태 관리
  const [optimisticState, addOptimisticLike] = useOptimistic(
    actualState,
    likeReducer,
  );

  // 초기 좋아요 상태 로드
  useEffect(() => {
    if (!userId || !setId) {
      // 비로그인 사용자는 initialLikesCount 그대로 사용
      setActualState({
        isLiked: false,
        likesCount: initialLikesCount,
      });
      return;
    }

    const loadLikeStatus = async () => {
      try {
        console.log('🔍 좋아요 상태 로드 시작:', {
          setId,
          userId,
          initialLikesCount,
        });

        const isLiked = await getLikeStatus(setId, userId);

        // 실제 서버 좋아요 수를 가져오기 위해 emoticon set 정보도 조회
        const supabase = createBrowserSupabaseClient();
        const { data: setData } = await supabase
          .from('emoticon_sets')
          .select('likes_count')
          .eq('id', setId)
          .single();

        const actualLikesCount = setData?.likes_count || initialLikesCount;

        console.log('🔍 로드된 상태:', { isLiked, actualLikesCount });

        setActualState({
          isLiked,
          likesCount: actualLikesCount,
        });
      } catch (error) {
        console.error('좋아요 상태 로드 실패:', error);
        // 실패 시 초기값 사용
        setActualState({
          isLiked: false,
          likesCount: initialLikesCount,
        });
      }
    };

    loadLikeStatus();
  }, [setId, userId, initialLikesCount]);

  // 좋아요 토글 함수
  const handleToggleLike = () => {
    console.log('🔴 handleToggleLike 호출됨');

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 이미 요청 중이면 무시
    if (isRequestingRef.current || isPending) {
      console.log('🟡 이미 요청 중, 무시:', {
        requesting: isRequestingRef.current,
        pending: isPending,
      });
      return;
    }

    console.log('🟢 요청 시작, 현재 상태:', optimisticState);

    // startTransition 안에서 낙관적 업데이트와 서버 요청 모두 처리
    startTransition(async () => {
      // 요청 시작 플래그 설정
      isRequestingRef.current = true;
      console.log('🔵 transition 시작, 낙관적 업데이트 적용');

      // 낙관적 업데이트 적용
      addOptimisticLike({ type: 'toggle' });

      try {
        console.log('🔵 서버 요청 시작');
        const result = await toggleLike(setId, userId);
        console.log('🔵 서버 응답:', result);

        if (result.success) {
          // 서버 응답으로 실제 상태 업데이트
          setActualState({
            isLiked: result.is_liked!,
            likesCount: result.likes_count!,
          });
          console.log('🟢 서버 상태로 업데이트:', result);
        } else {
          // 실패 시 원래 상태로 복원
          console.error('좋아요 토글 실패:', result.error);
          alert('좋아요 처리 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('좋아요 토글 중 오류:', error);
        alert('좋아요 처리 중 오류가 발생했습니다.');
      } finally {
        // 요청 완료 플래그 해제
        isRequestingRef.current = false;
        console.log('🔴 요청 완료, 플래그 해제');
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
