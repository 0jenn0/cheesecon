import Image from 'next/image';
import { ComponentPropsWithRef } from 'react';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/icon/config';
import { EmoticonSet } from '@/entity/emoticon-set/type';

interface EmoticonViewItemProps extends ComponentPropsWithRef<'section'> {
  item: EmoticonSet;
  index: number;
}

function EmoticonViewItem({ item, index }: EmoticonViewItemProps) {
  return (
    <section className='flex gap-24'>
      <Thumbnail index={index} item={item} />
      <Content item={item} />
    </section>
  );
}

export default EmoticonViewItem;

function Thumbnail({ index, item }: { index: number; item: EmoticonSet }) {
  return (
    <div className='border-radius-lg relative flex gap-8 overflow-hidden font-semibold'>
      <div className='height-24 width-24 border-radius-lg border-secondary bg-secondary flex items-center justify-center backdrop-blur-sm'>
        <span className='text-body-sm font-regular'>{index}</span>
      </div>
      <Image
        src={item.representative_image_url}
        alt={item.title}
        className='border-radius-lg border-ghost tablet:w-[96px] tablet:h-[96px] h-[80px] w-[80px] border object-cover'
        width={80}
        height={80}
      />
    </div>
  );
}

function Content({ item }: { item: EmoticonSet }) {
  return (
    <div className='flex h-full flex-1 flex-col justify-center gap-24'>
      <h1 className='text-body-lg'>{item.title}</h1>
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
    <div className='flex gap-4'>
      <Icon name={icon} className='icon-disabled' />
      <p className='text-body-sm text-tertiary'>{label}</p>
    </div>
  );
}
