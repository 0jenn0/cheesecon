'use client';

import { useState } from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Avatar, Icon } from '@/shared/ui/display';
import { Button } from '@/shared/ui/input';
import { useOptimisticUpdateProfile } from '@/entity/profile/query/profile-mutate-query';
import { Profile } from '@/entity/profile/type';
import EditAvatar from './edit-avatar';

export default function EditProfileSection({
  initialProfile,
}: {
  initialProfile: Profile | null;
}) {
  const { updateOptimisticProfile, isPending, optimisticProfile } =
    useOptimisticUpdateProfile(initialProfile);

  const [isEditing, setIsEditing] = useState(false);

  const [tempNickname, setTempNickname] = useState('');
  const [tempDescription, setTempDescription] = useState('');
  const [tempImageUrl, setTempImageUrl] = useState('');

  const displayNickname = isEditing
    ? tempNickname
    : optimisticProfile?.nickname || '';
  const displayDescription = isEditing
    ? tempDescription
    : optimisticProfile?.description || '';
  const displayImageUrl = isEditing
    ? tempImageUrl
    : optimisticProfile?.avatar_url || '';

  const handleEditStart = () => {
    setTempNickname(optimisticProfile?.nickname || '');
    setTempDescription(optimisticProfile?.description || '');
    setTempImageUrl(optimisticProfile?.avatar_url || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    const newNickname = tempNickname.trim();
    const newDescription = tempDescription.trim();

    const hasChanges =
      newNickname !== optimisticProfile?.nickname ||
      newDescription !== optimisticProfile?.description ||
      tempImageUrl !== optimisticProfile?.avatar_url;

    if (hasChanges && newNickname) {
      updateOptimisticProfile({
        nickname: newNickname,
        avatar_url: tempImageUrl,
        description: newDescription,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempNickname('');
    setTempDescription('');
    setTempImageUrl('');
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      handleEditStart();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isEditing) {
        handleSave();
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const profileData = optimisticProfile ??
    initialProfile ?? {
      avatar_url: '',
      created_at: '',
      id: '',
      nickname: '',
      provider: '',
      updated_at: '',
      description: '',
    };

  return (
    <section className='padding-32 bg-primary tablet:border-radius-2xl relative flex flex-col items-center gap-12'>
      <div className='tablet:top-24 tablet:right-24 absolute top-16 right-16'>
        <Button
          type='button'
          variant='secondary'
          size='sm'
          leadingIcon='edit-2'
          className='text-body-sm'
          iconSize={16}
          onClick={toggleEdit}
          disabled={isPending}
          isLoading={isPending}
        >
          {isEditing ? '저장' : '수정'}
        </Button>
      </div>

      {isEditing ? (
        <EditAvatar profile={profileData} onImageUpload={setTempImageUrl} />
      ) : (
        <Avatar
          imageUrl={displayImageUrl}
          size='lg'
          name={displayNickname}
          profileType='image'
        />
      )}

      <div className='flex flex-col items-center gap-8'>
        {isEditing ? (
          <input
            name='nickname'
            type='text'
            className='text-body-lg border-interactive-secondary padding-x-8 h-[28px] border-b outline-none'
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)}
            placeholder='닉네임을 입력해주세요.'
            onKeyDown={handleKeyDown}
            maxLength={10}
          />
        ) : (
          <span className='text-body-lg flex h-[28px] items-center font-semibold'>
            {displayNickname}
          </span>
        )}

        {isEditing ? (
          <input
            name='description'
            type='text'
            className='text-body-lg border-interactive-secondary padding-x-8 h-[28px] border-b outline-none'
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            placeholder='소개를 입력해주세요.'
            onKeyDown={handleKeyDown}
            maxLength={10}
          />
        ) : (
          <span className='text-body-md flex h-[28px] items-center'>
            {displayDescription || '아직 소개가 없어요.'}
          </span>
        )}
      </div>

      <div className='flex items-center gap-1'>
        <Icon name='calendar' size={12} className='text-tertiary' />
        <span className='text-body-sm text-tertiary'>
          {optimisticProfile?.created_at &&
            formatDate(optimisticProfile.created_at) + ' 부터 활동 중'}
        </span>
      </div>
    </section>
  );
}
