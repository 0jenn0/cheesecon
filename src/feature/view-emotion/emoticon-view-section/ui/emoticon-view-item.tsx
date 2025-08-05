'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/icon/config';
import { EmoticonSet } from '@/entity/emoticon-set/type';

interface EmoticonViewItemProps extends ComponentPropsWithRef<'section'> {
  item: EmoticonSet;
  index: number;
}

function EmoticonViewItem({ item, index }: EmoticonViewItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/emoticon/${item.id}`);
  };

  return (
    <section className='group flex cursor-pointer gap-24' onClick={handleClick}>
      <Thumbnail index={index} item={item} />
      <Content item={item} />
    </section>
  );
}

export default EmoticonViewItem;

function Thumbnail({ index, item }: { index: number; item: EmoticonSet }) {
  return (
    <div className='border-radius-lg relative flex gap-8 overflow-hidden font-semibold'>
      <div className='flex flex-col justify-between'>
        <div className='height-24 width-24 flex items-center justify-center'>
          <span className='text-body-sm font-regular'>{index}</span>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <EmoticonType type={item.type} />
          <EmoticonPlatform platform={item.platform} />
        </div>
      </div>
      <Image
        src={item.representative_image_url}
        alt={item.title}
        className='border-radius-lg border-ghost tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px] border object-cover transition-all duration-200'
        width={80}
        height={80}
      />
    </div>
  );
}

function EmoticonType({ type }: { type: EmoticonSet['type'] }) {
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

function EmoticonPlatform({ platform }: { platform: EmoticonSet['platform'] }) {
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

function Content({ item }: { item: EmoticonSet }) {
  return (
    <div className='flex h-full flex-1 flex-col justify-center gap-24'>
      <h1 className='text-body-lg w-fit transition-all duration-200 group-hover:underline'>
        {item.title}
      </h1>
      <div className='flex w-full justify-between'>
        <p className='text-body-sm text-gray-500'>{item.author_name}</p>
        <div className='flex gap-12'>
          <IconLabel
            item={item}
            icon='message-circle'
            label={item.comments_count}
          />
          <IconLabel item={item} icon='heart' label={item.likes_count} />
        </div>
      </div>
    </div>
  );
}

function IconLabel({
  item,
  icon,
  label,
}: {
  item: EmoticonSet;
  icon: (typeof ICON_NAMES)[number];
  label: number | null;
}) {
  return (
    <div className='flex gap-2'>
      <Icon name={icon} className='icon-disabled' />
      <p className='text-body-sm text-secondary'>{label}</p>
    </div>
  );
}
