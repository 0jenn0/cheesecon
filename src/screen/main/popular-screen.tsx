'use client';

import { useEmoticonSetInfinityQuery } from '@/entity/emoticon-set/query/emoticon-set-infinity-query';
import {
  EmoticonViewSection,
  EmoticonViewSkeleton,
} from '@/feature/view-emotion/emoticon-view-section';

export default function PopularScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useEmoticonSetInfinityQuery({
      orderBy: 'likes_count',
      order: 'desc',
    });

  if (isLoading) return <EmoticonViewSkeleton />;

  const flattenedData = data?.pages.flatMap((page) =>
    page.success ? page.data.data : [],
  );

  return (
    <EmoticonViewSection
      items={flattenedData || []}
      title='🔥 인기 급상승 이모티콘'
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
