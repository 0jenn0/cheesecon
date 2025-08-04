'use client';

import { useActiveUsersInfinityQuery } from '@/entity/profile';
import {
  ProfileViewSection,
  ProfileViewSkeleton,
} from '@/feature/view-profile';

export default function ActivityScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useActiveUsersInfinityQuery();

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
