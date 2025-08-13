'use client';

import { GetEmoticonSetsWithRepresentativeImageResult } from '@/entity/emoticon-set/api/types';
import { useEmoticonSetInfinityQuery } from '@/entity/emoticon-set/query/emoticon-set-infinity-query';
import {
  EmoticonViewSection,
  EmoticonViewSkeleton,
} from '@/feature/view-emotion/emoticon-view-section';

export default function PopularScreen({
  initial,
}: {
  initial?: GetEmoticonSetsWithRepresentativeImageResult;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useEmoticonSetInfinityQuery(
      {
        limit: 8,
        offset: 0,
        orderBy: 'likes_count',
        order: 'desc',
      },
      {
        initialData: initial
          ? { pages: [initial], pageParams: [0] }
          : undefined,
      },
    );

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
