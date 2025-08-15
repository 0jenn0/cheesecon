'use server';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/shared/ui/display';
import { EmoticonImage } from '@/entity/emoticon-set/type';

export default async function EmoticonImageItem({
  image,
  isUnlocked,
}: {
  image: EmoticonImage;
  isUnlocked: boolean;
}) {
  const { image_order, image_url, blur_url, comments_count, likes_count } =
    image;

  return (
    <Link
      href={`/emoticon/${image.set_id}/image?imageId=${image.id}`}
      scroll={false}
    >
      <div className='border-secondary relative aspect-square w-full border-b-[0.6px]'>
        <Image
          src={isUnlocked ? image_url : (blur_url ?? '')}
          alt={`emoticon-image-${image_order}`}
          width={100}
          height={100}
          className='h-full w-full object-contain'
        />
      </div>
      <div className='padding-8 tablet:justify-end flex w-full items-center justify-between gap-12'>
        <div className='flex items-center gap-2'>
          <Icon name='message-circle' size={16} className='icon-disabled' />
          <p className='text-body-sm text-secondary'>{comments_count ?? 0}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Icon name='heart' size={16} className='icon-disabled' />
          <p className='text-body-sm text-secondary'>{likes_count ?? 0}</p>
        </div>
      </div>
    </Link>
  );
}
