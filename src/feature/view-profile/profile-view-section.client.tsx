'use client';

import { Ref, useEffect } from 'react';
import { useIntersectionObserver } from '@/shared/lib';
import { useToast } from '@/shared/ui/feedback';
import { useActiveUsersInfinityQuery } from '@/entity/profile/query';
import { ProfileViewItem, ProfileViewSkeleton } from '.';

export default function ProfileViewSectionClient({
  offset,
}: {
  offset: number;
}) {
  const { addToast } = useToast();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  });

  const {
    data,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
  } = useActiveUsersInfinityQuery({
    limit: 8,
    offset,
  });

  if (error) {
    addToast({
      type: 'error',
      message: '작가 목록을 불러오는데 실패했어요.',
    });
  }

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  const flattenedData = data?.pages.flatMap((page) =>
    page.success ? page.data.data : [],
  );

  return (
    <>
      {isLoading && <ProfileViewSkeleton />}
      <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
        {flattenedData?.map((item, index) => (
          <li className='flex flex-col gap-12' key={`${item.id}-${index}`}>
            <ProfileViewItem
              profileActivity={item}
              index={index + offset + 1}
            />
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
        {!hasNextPage && flattenedData && flattenedData.length > 0 && (
          <div className='text-sm text-gray-400'>모든 작가를 불러왔어요!</div>
        )}
      </div>
    </>
  );
}
