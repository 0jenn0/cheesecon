'use client';

import Link from 'next/link';
import { ComponentProps } from 'react';
import { cn } from '@/shared/lib';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { EmoticonImage, EmoticonSetDetail } from '@/entity/emoticon-set/type';
import { EmoticonProvider } from '@/feature/register-emoticon/ui/emoticon-section/provider';

interface EmoticonImageSectionProps extends ComponentProps<'section'> {
  emoticonImages: EmoticonSetDetail['emoticon_images'];
}

export default function EmoticonImageSection({
  emoticonImages,
  className,
  ...props
}: EmoticonImageSectionProps) {
  return (
    <EmoticonProvider>
      <section
        className='tablet:border-radius-2xl bg-primary tablet:padding-24 tablet:gap-24 padding-16 flex flex-col gap-16'
        {...props}
      >
        <h2 className='text-heading-sm'>이모티콘 시안</h2>
        <div className='border-ghost w-full border-b' />
        <ul
          className={cn(
            'tablet:grid-cols-6 tablet:gap-x-[32px] grid grid-cols-4 gap-x-16 gap-y-16',
            className,
          )}
        >
          {emoticonImages
            .toSorted((a, b) => a.image_order - b.image_order)
            .map((image: EmoticonImage) => (
              <li key={image.id}>
                <EmoticonImageItem image={image} />
              </li>
            ))}
        </ul>
      </section>
    </EmoticonProvider>
  );
}

function EmoticonImageItem({ image }: { image: EmoticonImage }) {
  const { image_order, image_url, comments_count, likes_count } = image;

  return (
    <EmoticonItem.Root
      imageNumber={image_order}
      imageUrl={image_url}
      commentsCount={comments_count ?? 0}
      likesCount={likes_count ?? 0}
      className='cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95'
      isUploading={false}
      isDragging={false}
    >
      <Link href={`/emoticon/${image.set_id}/${image.id}`} scroll={false}>
        <EmoticonItem.Content>
          <EmoticonItem.Header />
          <EmoticonItem.Body />
          <EmoticonItem.Footer />
        </EmoticonItem.Content>
      </Link>
      <EmoticonItem.BottomBar />
    </EmoticonItem.Root>
  );
}
