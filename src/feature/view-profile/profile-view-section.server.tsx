'use server';

import { ProfileActivity } from '@/entity/profile/type';
import { ProfileViewItem } from '.';

export default async function ProfileViewSectionServer({
  initial,
}: {
  initial?: ProfileActivity[];
}) {
  return (
    <ul className='grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2'>
      {initial?.map((item, index) => (
        <li className='flex flex-col gap-12' key={`${item.id}-${index}`}>
          <ProfileViewItem profileActivity={item} index={index + 1} />
          <div className='border-ghost w-full border-b-[0.6px]' />
        </li>
      ))}
    </ul>
  );
}
