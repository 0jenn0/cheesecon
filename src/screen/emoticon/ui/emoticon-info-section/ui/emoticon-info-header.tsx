import Image from 'next/image';
import { Icon } from '@/shared/ui/display';
import { IconButton } from '@/shared/ui/input';
import { EmoticonSet } from '@/entity/emoticon-set/type';
import LikeButton from '@/feature/like/ui/like-button/like-button';
import { SecretIcon } from '.';

export default function EmoticonInfoHeader({
  emoticonSet,
}: {
  emoticonSet: EmoticonSet;
}) {
  const {
    author_name,
    representative_image_url,
    title,
    is_private,
    views_count,
    comments_count,
  } = emoticonSet;

  return (
    <div className='bg-primary flex w-full items-center gap-16'>
      <Image
        src={representative_image_url}
        alt={author_name}
        width={100}
        height={100}
        className='border-radius-lg border-ghost aspect-square h-full border'
      />
      <div className='flex flex-1 flex-col gap-8'>
        {/* Header */}
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
            <IconButton variant='secondary' icon='link' iconSize={20} />
            <IconButton variant='secondary' icon='edit-2' iconSize={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
