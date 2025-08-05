'use client';

import { ComponentProps } from 'react';
import { cn } from '@/shared/lib';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { useEmoticonImagesQuery } from '@/entity/emoticon-images/query';
import { EmoticonImage } from '@/entity/emoticon-set/type';
import { EmoticonProvider } from '@/feature/register-emoticon/ui/emoticon-section/provider';

interface EmoticonImageSectionProps extends ComponentProps<'section'> {
  emoticonSetId: string;
}

export default function EmoticonImageSection({
  emoticonSetId,
  className,
  ...props
}: EmoticonImageSectionProps) {
  const { data: images, isLoading } = useEmoticonImagesQuery(emoticonSetId);

  if (isLoading) return <div>Loading...</div>;
  if (!images) return <div>데이터를 찾을 수 없습니다.</div>;

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
            'tablet:grid-cols-6 grid grid-cols-4 gap-12',
            className,
          )}
        >
          {images.map((image: EmoticonImage) => (
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
    >
      <EmoticonItem.Content>
        <EmoticonItem.Header />
        <EmoticonItem.Body />
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
      <EmoticonItem.BottomBar />
    </EmoticonItem.Root>
  );
}
