'use client';

import { useState } from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Avatar, Icon } from '@/shared/ui/display';
import Spinner from '@/shared/ui/feedback/spinner/spinner';
import { Button } from '@/shared/ui/input';
import { useOptimisticUpdateProfile } from '@/entity/profile/query/profile-mutate-query';
import EditAvatar from './edit-avatar';

export default function EditProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { updateOptimisticProfile, isPending, optimisticProfile } =
    useOptimisticUpdateProfile();
  const [imageUrl, setImageUrl] = useState<string>(
    () => optimisticProfile?.avatar_url || '',
  );

  const toggleEdit = () => {
    if (isEditing) {
      const newNickname = inputValue.trim();
      if (
        newNickname &&
        (newNickname !== optimisticProfile?.nickname ||
          imageUrl !== optimisticProfile?.avatar_url)
      ) {
        updateOptimisticProfile({
          nickname: newNickname,
          avatar_url: imageUrl,
        });
      }
    } else {
      setInputValue(optimisticProfile?.nickname || '');
    }
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue(optimisticProfile?.nickname || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleEdit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (!optimisticProfile) {
    return <Spinner size='lg' variant='primary' />;
  }

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
        <EditAvatar
          profile={optimisticProfile}
          onImageUpload={setImageUrl}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Avatar
          imageUrl={optimisticProfile.avatar_url ?? ''}
          size='lg'
          name={optimisticProfile.nickname}
          profileType='image'
        />
      )}

      {isEditing ? (
        <input
          name='nickname'
          type='text'
          className='text-body-lg border-interactive-secondary border-radius-md height-32 padding-x-8 border outline-none'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='닉네임을 입력해주세요.'
          onKeyDown={handleKeyDown}
          maxLength={10}
        />
      ) : (
        <span className='text-body-lg height-32 flex items-center font-semibold'>
          {optimisticProfile.nickname}
        </span>
      )}

      <div className='flex items-center gap-1'>
        <Icon name='calendar' size={12} className='text-tertiary' />
        <span className='text-body-sm text-tertiary'>
          {formatDate(optimisticProfile.created_at ?? '')} 부터 활동 중
        </span>
      </div>
    </section>
  );
}
