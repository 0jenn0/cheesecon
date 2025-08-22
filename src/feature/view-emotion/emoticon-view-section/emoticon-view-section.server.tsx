'use server';

import { EmoticonSetWithRepresentativeImage } from '@/entity/emoticon-set';
import { EmoticonViewItemServer } from '@/feature/view-emotion/emoticon-view-section/ui';

export default async function EmoticonViewSectionServer({
  initial,
}: {
  initial?: EmoticonSetWithRepresentativeImage[];
}) {
  return (
    <ul className='grid grid-cols-1 gap-x-48 gap-y-12 md:grid-cols-2'>
      {initial?.map((item, index) => (
        <li
          className='flex cursor-pointer flex-col gap-12'
          key={`${item.id}-${index}`}
        >
          <EmoticonViewItemServer item={item} index={index + 1} />
          <div className='border-ghost w-full border-b-[0.6px]' />
        </li>
      ))}
    </ul>
  );
}
