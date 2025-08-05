import Image from 'next/image';
import { ComponentProps } from 'react';
import { cn } from '@/shared/lib';
import { Icon, LabelValuePair } from '@/shared/ui/display';
import { IconButton } from '@/shared/ui/input';
import { EmoticonSet } from '@/entity/emoticon-set/type';
import LikeButton from '@/feature/like/ui/like-button/like-button';

interface EmoticonInfoSectionProps extends ComponentProps<'section'> {
  emoticonSet: EmoticonSet;
}

export default function EmoticonInfoSection({
  emoticonSet,
}: EmoticonInfoSectionProps) {
  const { title, author_name, representative_image_url } = emoticonSet;
  return (
    <section className='tablet:border-radius-2xl bg-primary padding-24 flex flex-col gap-24'>
      <div className='bg-primary flex w-full items-center gap-16'>
        <Image
          src={representative_image_url}
          alt={author_name}
          width={100}
          height={100}
          className='border-radius-lg border-ghost aspect-square h-full border'
        />
        <div className='flex flex-1 flex-col gap-8'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-12'>
                <h1 className='text-heading-lg'>{title}</h1>
              </div>
              <p>{author_name}</p>
            </div>
            <LikeButton
              setId={emoticonSet.id}
              initialLikesCount={emoticonSet.likes_count ?? 0}
            />
          </div>
          <div className='border-ghost w-full border-t' />
          <div className='flex w-full items-center justify-between'>
            <div className='padding-x-8 padding-y-4 border-radius-lg flex w-fit items-center gap-12'>
              <SecretIcon isSecret={emoticonSet.is_private ?? false} />
              <div className='border-ghost h-16 w-px border-r' />
              <div className='flex items-center gap-8'>
                <p className='text-body-sm text-secondary'>
                  조회 {emoticonSet.views_count}
                </p>
                <div className='flex items-center gap-2'>
                  <Icon
                    name='message-circle'
                    size={16}
                    className='icon-disabled'
                  />
                  <p className='text-body-sm text-secondary'>
                    {emoticonSet.comments_count}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-8'>
              <IconButton variant='secondary' icon='link' iconSize={20} />
              <IconButton variant='secondary' icon='edit-2' iconSize={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary flex flex-col gap-8'>
        <LabelValuePair
          label='이모티콘 플랫폼'
          value={<EmoticonPlatform platform={emoticonSet.platform} />}
        />
        <LabelValuePair
          label='이모티콘 유형'
          value={<EmoticonType type={emoticonSet.type} />}
        />
        <LabelValuePair label='이모티콘 설명' value={emoticonSet.description} />
      </div>
    </section>
  );
}

function SecretIcon({ isSecret }: { isSecret: boolean }) {
  return (
    <div className={cn('border-radius-xl flex h-full items-center gap-2')}>
      <Icon
        name={isSecret ? 'lock' : 'earth'}
        size={16}
        className={cn(isSecret ? 'text-rose-500' : 'text-emerald-500')}
      />
      <p
        className={cn(
          'text-body-sm tablet:block hidden',
          isSecret ? 'text-rose-600' : 'text-emerald-600',
        )}
      >
        {isSecret ? '비밀' : '공개'} 게시물
      </p>
    </div>
  );
}

function EmoticonPlatform({ platform }: { platform: EmoticonSet['platform'] }) {
  return (
    <div
      className={cn(
        'padding-8 border-radius-md tablet:w-[160px] flex w-full items-center gap-4',
        platform === 'kakao' ? 'bg-yellow-50' : 'bg-green-50',
      )}
    >
      <Icon
        name={platform === 'kakao' ? 'kakao-logo' : 'line-logo'}
        size={20}
      />
      <p
        className={cn(
          platform === 'kakao' ? 'text-yellow-00' : 'text-green-700',
        )}
      >
        {platform === 'kakao' ? '카카오톡' : '라인'}
      </p>
    </div>
  );
}

function EmoticonType({ type }: { type: EmoticonSet['type'] }) {
  return (
    <div
      className={cn(
        'padding-8 border-radius-md tablet:w-[160px] flex w-full items-center gap-4',
        type === 'animated' ? 'bg-rose-50' : 'bg-gray-50',
      )}
    >
      <Icon
        name={type === 'animated' ? 'smile-move' : 'smile'}
        size={20}
        className={type === 'animated' ? 'text-rose-600' : 'text-gray-600'}
      />
      <p
        className={cn(type === 'animated' ? 'text-rose-600' : 'text-gray-600')}
      >
        {type === 'animated' ? '움직이는 이모티콘' : '멈춰있는 이모티콘'}
      </p>
    </div>
  );
}
