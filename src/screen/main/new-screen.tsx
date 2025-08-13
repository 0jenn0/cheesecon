'use client';

import { GetEmoticonSetsWithRepresentativeImageResult } from '@/entity/emoticon-set/api';
import { useEmoticonSetInfinityQuery } from '@/entity/emoticon-set/query/emoticon-set-infinity-query';
import {
  EmoticonViewSection,
  EmoticonViewSkeleton,
} from '@/feature/view-emotion/emoticon-view-section';

export default function NewScreen({
  initial,
}: {
  initial?: GetEmoticonSetsWithRepresentativeImageResult;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useEmoticonSetInfinityQuery(
      {
        limit: 8,
        offset: 0,
        orderBy: 'created_at',
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
      title='✨ 따끈따끈 최신 이모티콘'
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
