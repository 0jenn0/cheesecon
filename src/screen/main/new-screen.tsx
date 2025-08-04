'use client';

import { useEmoticonSetInfinityQuery } from '@/entity/emoticon-set/query/emoticon-set-infinity-query';
import { EmoticonViewSection } from '@/feature/view-emotion/emoticon-view-section';

export default function PopularScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEmoticonSetInfinityQuery({
      orderBy: 'created_at',
      order: 'desc',
    });

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
