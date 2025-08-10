'use client';

import { useEffect, useOptimistic, useState, useTransition } from 'react';
import { queryClient } from '@/provider/QueryProvider';
import { updateProfile } from '../api';
import { ProfileUpdateRequest } from '../api/types';
import { Profile } from '../type';
import { useGetProfile } from './profile-query';
import { PROFILE_QUERY_KEYS } from './query-key';

interface ProfileState {
  profile: Profile | null;
}

type ProfileAction = {
  type: 'update';
  payload: ProfileUpdateRequest;
};

function profileReducer(
  state: ProfileState,
  action: ProfileAction,
): ProfileState {
  switch (action.type) {
    case 'update':
      if (!state.profile) return state;
      return {
        profile: {
          ...state.profile,
          ...action.payload,
          updated_at: new Date().toISOString(),
        },
      };
    default:
      return state;
  }
}

export function useOptimisticUpdateProfile(initialProfile?: Profile | null) {
  const [isPending, startTransition] = useTransition();
  const { data: profileData } = useGetProfile();

  const [actualState, setActualState] = useState<ProfileState>({
    profile: initialProfile ?? null,
  });

  useEffect(() => {
    if (profileData?.success && profileData.data) {
      setActualState({
        profile: profileData.data,
      });
    }
  }, [profileData]);

  const [optimisticState, addOptimisticUpdate] = useOptimistic(
    actualState,
    profileReducer,
  );

  const updateOptimisticProfile = (request: ProfileUpdateRequest) => {
    if (!actualState.profile) {
      console.error('프로필을 찾을 수 없습니다.');
      return;
    }

    startTransition(async () => {
      addOptimisticUpdate({ type: 'update', payload: request });

      try {
        const result = await updateProfile(request);

        if (result.success) {
          setActualState({
            profile: result.data,
          });

          queryClient.setQueryData(PROFILE_QUERY_KEYS.me(), {
            success: true,
            data: result.data,
          });
        } else {
          console.error('프로필 업데이트 실패');
          await queryClient.invalidateQueries({
            queryKey: PROFILE_QUERY_KEYS.me(),
          });
        }
      } catch (error) {
        console.error('프로필 업데이트 중 오류:', error);
        await queryClient.invalidateQueries({
          queryKey: PROFILE_QUERY_KEYS.me(),
        });
      }
    });
  };

  return {
    optimisticProfile: optimisticState.profile,
    updateOptimisticProfile,
    isPending,
  };
}

export type UseOptimisticUpdateProfileReturn = {
  optimisticProfile: Profile | null;
  updateOptimisticProfile: (request: ProfileUpdateRequest) => void;
  isPending: boolean;
};
