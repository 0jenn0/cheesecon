'use client';

import { Ref, useEffect } from 'react';
import { useIntersectionObserver } from '@/shared/lib';
import { useActiveUsersInfinityQuery } from '@/entity/profile/query';
import { ProfileViewItem, ProfileViewSkeleton } from '.';

export default function ProfileViewSectionClient({
  offset,
}: {
  offset: number;
}) {
  const { ref, isIntersecting } = useIntersectionObserver();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useActiveUsersInfinityQuery({
      limit: 8,
      offset,
    });

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
      <div ref={ref as Ref<HTMLDivElement>} className='h-1' />
    </>
  );
}
