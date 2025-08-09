'use client';

import { useOptimistic, useTransition } from 'react';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { queryClient } from '@/provider/QueryProvider';
import { updateProfile } from '../api';
import { ProfileUpdateRequest } from '../api/types';
import { Profile } from '../type';
import { useGetProfile } from './profile-query';
import { PROFILE_QUERY_KEYS } from './query-key';

export function useOptimisticUpdateProfile() {
  const [isPending, startTransition] = useTransition();
  const { data: profile } = useGetProfile();

  const initialProfile: Profile | null = profile?.success ? profile.data : null;

  const [optimisticProfile, setOptimisticProfile] = useOptimistic<
    Profile | null,
    ProfileUpdateRequest
  >(initialProfile, (currentProfile, updateData) => {
    if (!currentProfile) return null;

    return {
      ...currentProfile,
      ...updateData,
      updated_at: new Date().toISOString(),
    };
  });

  const updateOptimisticProfile = async (request: ProfileUpdateRequest) => {
    if (!profile) {
      console.error('프로필을 찾을 수 없습니다.');
      return;
    }

    startTransition(async () => {
      setOptimisticProfile(request);

      await updateProfile(request);
      await queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEYS.me(),
      });
    });
  };

  return {
    optimisticProfile,
    updateOptimisticProfile,
    isPending,
  };
}

export type UseOptimisticUpdateProfileReturn = {
  optimisticProfile: Profile | null;
  updateOptimisticProfile: (request: ProfileUpdateRequest) => void;
  isPending: boolean;
};
