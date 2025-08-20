'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { useModal } from '@/shared/ui/feedback';
import { IconButton } from '@/shared/ui/input';
import { EmoticonSetInfo } from '@/entity/emoticon-set/type';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import LikeButton from '@/feature/like/ui/like-button/like-button';
import { SecretIcon } from '.';

export default function EmoticonInfoHeader({
  emoticonInfo,
}: {
  emoticonInfo: EmoticonSetInfo;
}) {
  const { session } = useAuth();
  const { author_name, title, is_private, views_count, comments_count } =
    emoticonInfo;
  const { openModal } = useModal();

  const isAuthor = emoticonInfo.user_id === session?.user.id;
  const canShare = (is_private && isAuthor) || !is_private;
  const representativeImage = emoticonInfo.representative_image;

  const handleShareLink = () => {
    openModal('shareLink', {
      emoticonSetId: emoticonInfo.id,
      isPrivate: is_private ?? false,
    });
  };

  return (
    <div className={cn('bg-primary flex w-full items-center gap-16')}>
      <div className='border-ghost tablet:w-[160px] tablet:h-[160px] border-radius-lg aspect-square h-[100px] w-[100px] overflow-hidden border'>
        {representativeImage.mp4_url || representativeImage.webm_url ? (
          <video
            src={
              representativeImage.mp4_url ?? representativeImage.webm_url ?? ''
            }
            poster={
              representativeImage.webp_url ?? representativeImage.image_url
            }
            className='h-full w-full object-cover'
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={representativeImage.webp_url ?? representativeImage.image_url}
            alt={author_name}
            width={160}
            height={160}
            className='h-full w-full object-cover'
            priority
            loading='eager'
            placeholder='blur'
            blurDataURL={
              representativeImage.blur_url ??
              representativeImage.webp_url ??
              representativeImage.image_url ??
              ''
            }
          />
        )}
      </div>

      <div className='tablet:gap-12 flex h-full flex-1 flex-col gap-8'>
        {/* Header */}
        <div className='flex w-full items-center justify-between'>
          <div className='tablet:gap-8 flex flex-col gap-4'>
            <div className='flex items-center gap-12'>
              <h1 className='text-heading-lg'>{title}</h1>
            </div>
            <p>{author_name}</p>
          </div>
          <LikeButton
            targetType='emoticon_set'
            targetId={emoticonInfo.id}
            initialLikesCount={emoticonInfo.likes_count ?? 0}
          />
        </div>

        <div className='border-ghost w-full border-t' />

        {/* Footer */}
        <div className='flex w-full items-center justify-between'>
          <div className='padding-x-8 padding-y-4 border-radius-lg flex w-fit items-center gap-12'>
            <SecretIcon isSecret={is_private ?? false} />
            <div className='border-ghost h-16 w-px border-r' />
            <div className='flex items-center gap-8'>
              <p className='text-body-sm text-secondary'>조회 {views_count}</p>
              <div className='flex items-center gap-2'>
                <Icon
                  name='message-circle'
                  size={16}
                  className='icon-disabled'
                />
                <p className='text-body-sm text-secondary'>{comments_count}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-8'>
            {canShare ? (
              <IconButton
                variant='secondary'
                icon='link'
                iconSize={20}
                onClick={handleShareLink}
              />
            ) : (
              <div className='h-[36px] w-[36px]' />
            )}
            {isAuthor && (
              <IconButton
                variant='secondary'
                icon='edit-2'
                iconSize={20}
                // onClick={handleEdit} TODO: 수정 기능 추가
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
