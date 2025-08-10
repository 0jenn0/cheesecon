import { ComponentProps, Ref, useEffect } from 'react';
import { useIntersectionObserver } from '@/shared/lib';
import { ProfileActivity } from '@/entity/profile/type';
import { ProfileViewFallback, ProfileViewItem } from '.';

export interface ProfileViewSectionProps extends ComponentProps<'section'> {
  profileActivities: ProfileActivity[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export default function ProfileViewSection({
  profileActivities,
  fetchNextPage,
  hasNextPage,
}: ProfileViewSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  return (
    <section className='bg-primary padding-24 flex w-full flex-col gap-24'>
      <h1 className='text-heading-md'>🎨 열활하시는 작가님들</h1>

      <div className='border-ghost w-full border-b' />
      <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
        {Array.from({ length: 8 }, (_, index) => {
          if (index < profileActivities.length) {
            const profileActivity = profileActivities[index];
            return (
              <li
                className='flex flex-col gap-12'
                key={`${profileActivity.id}-${index}`}
              >
                <ProfileViewItem
                  profileActivity={profileActivity}
                  index={index + 1}
                />
                <div className='border-ghost w-full border-b-[0.6px]' />
              </li>
            );
          } else {
            return (
              <li className='flex flex-col gap-12' key={`fallback-${index}`}>
                <ProfileViewFallback />
                <div className='border-ghost w-full border-b-[0.6px]' />
              </li>
            );
          }
        })}
      </ul>
      <div ref={ref as Ref<HTMLDivElement>} className='h-1' />
    </section>
  );
}
