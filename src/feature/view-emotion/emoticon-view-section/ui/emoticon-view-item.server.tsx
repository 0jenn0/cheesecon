'use server';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import {
  EmoticonSetDetail,
  EmoticonSetWithRepresentativeImage,
} from '@/entity/emoticon-set/type';
import { IconLabel } from './icon-label';
import LikeLabel from './like-label';

interface EmoticonViewItemProps extends ComponentPropsWithRef<'section'> {
  item: EmoticonSetDetail | EmoticonSetWithRepresentativeImage;
  index?: number;
  hideLikes?: boolean;
}

export default async function EmoticonViewItemServer({
  item,
  index,
  hideLikes = false,
}: EmoticonViewItemProps) {
  return (
    <Link
      href={`/emoticon/${item.id}`}
      className='group flex cursor-pointer gap-24'
    >
      <Thumbnail index={index} item={item} />
      <Content item={item} hideLikes={hideLikes} />
    </Link>
  );
}

function Thumbnail({
  index,
  item,
}: {
  index?: number;
  item: EmoticonSetWithRepresentativeImage;
}) {
  return (
    <div className='border-radius-lg relative flex gap-8 overflow-hidden font-semibold'>
      <div className='flex flex-col justify-between'>
        <div className='height-24 width-24 flex items-center justify-center'>
          {index && (
            <span className='text-body-sm text-secondary font-regular'>
              {index}
            </span>
          )}
        </div>
        <div className='flex flex-col items-center gap-4'>
          <EmoticonType type={item.type} />
          <EmoticonPlatform platform={item.platform} />
        </div>
      </div>
      <Image
        src={
          item.representative_image.webp_url ??
          item.representative_image.image_url
        }
        alt={item.title}
        className='border-radius-lg border-ghost tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px] border object-cover transition-all duration-200'
        width={80}
        height={80}
        priority={index && index < 4 ? true : false}
        loading={index && index < 4 ? 'eager' : 'lazy'}
        placeholder='blur'
        blurDataURL={
          item.representative_image.blur_url ??
          item.representative_image.webp_url ??
          item.representative_image.image_url ??
          ''
        }
      />
    </div>
  );
}

function EmoticonType({ type }: { type: EmoticonSetDetail['type'] }) {
  return (
    <div
      className={cn(
        'border-radius-md flex h-[18px] w-[18px] items-center justify-center',
        type === 'animated' ? 'bg-rose-50' : 'bg-primary border-ghost border',
      )}
    >
      <Icon
        name={type === 'animated' ? 'smile-move' : 'smile'}
        size={16}
        className={cn(type === 'animated' ? 'text-rose-600' : 'text-gray-400')}
      />
    </div>
  );
}

function EmoticonPlatform({
  platform,
}: {
  platform: EmoticonSetWithRepresentativeImage['platform'];
}) {
  return (
    <div className='flex h-[24px] w-[24px] items-center justify-center'>
      <Icon
        name={platform === 'kakaotalk' ? 'kakao-logo' : 'line-logo'}
        size={24}
        className='h-full w-full text-gray-600'
      />
    </div>
  );
}

function Content({
  item,
  hideLikes,
}: {
  item: EmoticonSetWithRepresentativeImage;
  hideLikes?: boolean;
}) {
  return (
    <div className='flex h-full flex-1 flex-col justify-center gap-24'>
      <h1 className='text-body-lg w-fit transition-all duration-200 group-hover:underline'>
        {item.title}
      </h1>
      <div className='flex w-full justify-between'>
        <p className='text-body-sm text-gray-500'>{item.author_name}</p>
        <div className='flex gap-12'>
          <IconLabel icon='message-circle' label={item.comments_count} />
          {!hideLikes && (
            <LikeLabel itemId={item.id} likesCount={item.likes_count ?? 0} />
          )}
        </div>
      </div>
    </div>
  );
}
