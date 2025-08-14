'use client';

import { Ref, useEffect } from 'react';
import useIntersectionObserver from '@/shared/lib/use-intersection-observer';
import { useEmoticonSetInfinityQuery } from '@/entity/emoticon-set';
import { EmoticonViewSkeleton } from '@/feature/view-emotion/emoticon-view-section';
import { EmoticonViewItemClient } from './ui';

export default function EmoticonViewSectionClient({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useEmoticonSetInfinityQuery({
      limit,
      offset,
      orderBy: 'likes_count',
      order: 'desc',
    });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting, isFetchingNextPage]);

  const flattenedData = data?.pages.flatMap((page) =>
    page.success ? page.data.data : [],
  );

  return (
    <>
      {isLoading && <EmoticonViewSkeleton />}
      <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
        {flattenedData?.map((item, index) => (
          <li
            className='flex cursor-pointer flex-col gap-12'
            key={`${item.id}-${index}`}
          >
            <EmoticonViewItemClient item={item} index={index + offset + 1} />
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
        {!hasNextPage && flattenedData?.length > 0 && (
          <div className='text-sm text-gray-400'>
            모든 이모티콘을 불러왔어요!
          </div>
        )}
      </div>
    </>
  );
}
