'use client';

import {
  GetActiveUsersInfinityResult,
  useActiveUsersInfinityQuery,
} from '@/entity/profile';
import {
  ProfileViewSection,
  ProfileViewSkeleton,
} from '@/feature/view-profile';

export default function ActivityScreen({
  initial,
}: {
  initial?: GetActiveUsersInfinityResult;
}) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useActiveUsersInfinityQuery(
      {
        limit: 8,
        offset: 0,
      },
      {
        initialData: initial
          ? { pages: [initial], pageParams: [0] }
          : undefined,
      },
    );

  const flattenedData = data?.pages.flatMap((page) =>
    page.success ? page.data.data : [],
  );

  if (isLoading) {
    return <ProfileViewSkeleton />;
  }

  return (
    <ProfileViewSection
      profileActivities={flattenedData ?? []}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
