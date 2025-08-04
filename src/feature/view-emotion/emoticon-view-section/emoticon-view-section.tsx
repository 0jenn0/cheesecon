import { ComponentProps, Ref, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/shared/lib';
import { EmoticonSet } from '@/entity/emoticon-set/type';
import { EmoticonViewFallback } from '.';
import { EmoticonViewItem } from './ui';

export interface EmoticonViewSectionProps extends ComponentProps<'section'> {
  items: EmoticonSet[];
  title: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export default function EmoticonViewSection({
  items,
  title,
  fetchNextPage,
  hasNextPage,
}: EmoticonViewSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  return (
    <section className='bg-primary padding-24 flex w-full flex-col gap-24'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>{title}</h1>
      </div>
      <div className='border-ghost w-full border-b' />
      <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
        {Array.from({ length: 8 }, (_, index) => {
          if (index < items.length) {
            const item = items[index];
            return (
              <li className='flex flex-col gap-12' key={`${item.id}-${index}`}>
                <EmoticonViewItem item={item} index={index + 1} />
                <div className='border-ghost w-full border-b-[0.6px]' />
              </li>
            );
          } else {
            return (
              <li className='flex flex-col gap-12' key={`fallback-${index}`}>
                <EmoticonViewFallback />
                <div className='border-ghost w-full border-b-[0.6px]' />
              </li>
            );
          }
        })}
      </ul>
      <div ref={ref as Ref<HTMLDivElement>} className='h-2' />
    </section>
  );
}
