import { ComponentProps, Ref, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/shared/lib';
import { EmoticonSet } from '@/entity/emoticon-set/type';
import { EmoticonViewItem } from './ui';

export interface EmoticonViewSectionProps extends ComponentProps<'section'> {
  items: EmoticonSet[];
  title: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage?: boolean;
}

export default function EmoticonViewSection({
  items,
  title,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage = false,
}: EmoticonViewSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting, isFetchingNextPage]);

  return (
    <section className='bg-primary padding-24 flex w-full flex-col gap-24'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>{title}</h1>
      </div>
      <div className='border-ghost w-full border-b' />

      <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
        {items.map((item, index) => (
          <li className='flex flex-col gap-12' key={`${item.id}-${index}`}>
            <EmoticonViewItem item={item} index={index + 1} />
            <div className='border-ghost w-full border-b-[0.6px]' />
          </li>
        ))}
      </ul>

      <div
        ref={ref as Ref<HTMLDivElement>}
        className='flex h-10 items-center justify-center'
      >
        {hasNextPage && (
          <div className='text-sm text-gray-400'>
            {isFetchingNextPage ? '로딩 중...' : '더 보기'}
          </div>
        )}
        {!hasNextPage && items.length > 0 && (
          <div className='text-sm text-gray-400'>
            모든 데이터를 불러왔습니다
          </div>
        )}
      </div>
    </section>
  );
}
