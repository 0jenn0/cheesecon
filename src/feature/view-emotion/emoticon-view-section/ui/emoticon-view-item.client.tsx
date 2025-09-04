'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import type {
  EmoticonSetDetail,
  EmoticonSetWithRepresentativeImage,
} from '@/entity/emoticon-set/type';
import { IconLabel } from './icon-label';
import LikeLabel from './like-label';

interface EmoticonViewItemProps {
  item: EmoticonSetDetail | EmoticonSetWithRepresentativeImage;
  index?: number;
  hideLikes?: boolean;
}

export default function EmoticonViewItemClient({
  item,
  index,
  hideLikes = false,
}: EmoticonViewItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => videoRef.current?.play();
  const reset = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();
  };

  return (
    <section
      className='group flex w-full cursor-pointer'
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <Link href={`/emoticon/${item.id}`} className='group flex w-full gap-24'>
        <Thumbnail
          index={index}
          item={item as EmoticonSetWithRepresentativeImage}
          videoRef={videoRef}
        />
        <Content
          item={item as EmoticonSetWithRepresentativeImage}
          hideLikes={hideLikes}
        />
      </Link>
    </section>
  );
}

function Thumbnail({
  index,
  item,
  videoRef,
}: {
  index?: number;
  item: EmoticonSetWithRepresentativeImage;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const hasVideo =
    !!item.representative_image.mp4_url ||
    !!item.representative_image.webm_url;

  return (
    <div className='border-radius-lg relative flex gap-8 overflow-hidden font-semibold'>
      <div className='flex flex-col justify-between'>
        <div className='height-24 width-24 flex items-center justify-center'>
          {typeof index === 'number' && (
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

      {hasVideo ? (
        <video
          ref={videoRef}
          src={
            item.representative_image.mp4_url ||
            item.representative_image.webm_url ||
            undefined
          }
          poster={
            item.representative_image.poster_url ??
            item.representative_image.webp_url ??
            item.representative_image.image_url ??
            ''
          }
          className={cn(
            'border-radius-lg border-ghost tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px] border object-cover transition-all duration-200 group-hover:scale-105',
          )}
          muted
          loop
          playsInline
          // 개별 비디오에 핸들러는 필요 없음 (부모에서 전체 제어)
        />
      ) : (
        <Image
          src={
            item.representative_image.webp_url ??
            item.representative_image.image_url ??
            ''
          }
          alt={item.title}
          className='border-radius-lg border-ghost tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px] border object-cover transition-all duration-200'
          width={80}
          height={80}
          priority={typeof index === 'number' && index < 4 ? true : false}
          loading={typeof index === 'number' && index < 4 ? 'eager' : 'lazy'}
          placeholder='blur'
          blurDataURL={
            item.representative_image.blur_url ??
            item.representative_image.webp_url ??
            item.representative_image.image_url ??
            ''
          }
        />
      )}
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
        name={platform === 'kakaotalk' ? 'kakao-logo' : 'ogq-logo'}
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
