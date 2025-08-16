import { getActivityUsersCached } from '@/entity/profile/model/main-cache';
import {
  ProfileViewSectionClient,
  ProfileViewSectionServer,
} from '@/feature/view-profile';

export const revalidate = 3600;

const LIMIT = 8;

export default async function ActivityPage() {
  const initial = await getActivityUsersCached({
    limit: 8,
    offset: 0,
  });

  const flattenedData = initial?.success ? initial.data.data : [];

  return (
    <section className='bg-primary padding-24 flex w-full flex-col gap-24'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>🎨 열활하시는 작가님들</h1>
      </div>
      <div className='border-ghost w-full border-b' />
      <ProfileViewSectionServer initial={flattenedData} />
      <ProfileViewSectionClient offset={LIMIT} />
    </section>
  );
}
