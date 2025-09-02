'use server';

import { ComponentProps, Suspense } from 'react';
import EmoticonImageItem from './emoticon-image-item.server';
import EmoticonImageItemSkeleton from './emoticon-image-item.skeleton';
import ImageBatch from './image-batch.server';

interface EmoticonImageSectionProps extends ComponentProps<'section'> {
  emoticonSetId: string;
  isUnlocked: boolean;
}

export default async function EmoticonImageSection({
  emoticonSetId,
  isUnlocked,
  ...props
}: EmoticonImageSectionProps) {
  return (
    <section
      className='tablet:border-radius-2xl bg-primary tablet:padding-24 tablet:gap-24 padding-16 flex flex-col gap-16'
      {...props}
    >
      <h2 className='text-heading-sm'>이모티콘 시안</h2>
      <div className='border-ghost w-full border-b' />
      <div className='tablet:hidden flex flex-col gap-24'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Suspense
            key={index}
            fallback={getEmoticonImageSectionSkeleton({ columnCount: 4 })}
          >
            <ImageBatch
              key={index}
              setId={emoticonSetId}
              limit={4}
              offset={index * 4}
              isUnlocked={isUnlocked}
              Wrapper={EmoticonImageItem}
            />
          </Suspense>
        ))}
      </div>
      <div className='tablet:flex tablet:flex-col hidden gap-24'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Suspense
            key={index}
            fallback={getEmoticonImageSectionSkeleton({ columnCount: 6 })}
          >
            <ImageBatch
              key={index}
              setId={emoticonSetId}
              limit={6}
              offset={index * 6}
              isUnlocked={isUnlocked}
              Wrapper={EmoticonImageItem}
            />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

function getEmoticonImageSectionSkeleton({
  columnCount,
}: {
  columnCount: number;
}) {
  return (
    <ul className='flex w-full gap-24'>
      {Array.from({ length: columnCount }).map((_, index) => (
        <li key={index} className='w-full'>
          <EmoticonImageItemSkeleton />
        </li>
      ))}
    </ul>
  );
}
