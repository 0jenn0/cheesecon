'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { Modal, Spinner } from '@/shared/ui/feedback';
import { EmoticonImage } from '@/entity/emoticon-set';
import { EmoticonCommentSection } from '../comment/ui/emoticon-comment-section';
import LikeButton from '../like/ui/like-button/like-button';
import ColorPicker, { ColorMap } from './color-picker';
import { SnapCarousel } from './ui';
import ImageBox from './ui/snap-carousel/image-box';

interface ViewEmoticonImageModalProps {
  setId: string;
  currentImageId: string;
  authorId: string;
  allImages: EmoticonImage[];
}

export default function ViewEmoticonImageModal({
  setId,
  currentImageId,
  authorId,
  allImages,
}: ViewEmoticonImageModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchImageId = searchParams.get('imageId');
  const [currentId, setCurrentId] = useState<string>(
    searchImageId ?? currentImageId,
  );

  const handleSetCurrentId = (image: { id: string; image_order: number }) => {
    setCurrentId(image.id);
    router.replace(`/emoticon/${setId}/image?imageId=${image.id}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const next = searchImageId ?? currentImageId;
    if (!next || next === currentId) return;
    setCurrentId(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchImageId, currentImageId]);

  const [isDragging, setIsDragging] = useState(false);
  const [color, setColor] = useState<ColorMap>('blue');

  const current = allImages.find((img) => img.id === currentId);

  return (
    <Modal.Container className='tablet:w-[72dvw] tablet:h-[80dvh] h-[90dvh] max-w-[1024px] select-none'>
      <Modal.Header
        onClose={() => {
          router.replace(`/emoticon/${setId}`, { scroll: false });
        }}
      >
        <h1 className='text-heading-sm flex items-center gap-12'>
          <div className='text-heading-sm flex items-center justify-center'>
            {isDragging ? (
              <Spinner variant='secondary' size='md' />
            ) : (
              <div className='flex h-[16px] w-[16px] items-center justify-center'>
                {current?.image_order ?? 0}
              </div>
            )}
          </div>
          <div className='text-heading-sm'>번 이모티콘</div>
        </h1>
      </Modal.Header>

      <Modal.Body
        className={cn(
          'laptop:flex-row flex h-full w-full flex-col items-stretch gap-24',
          isDragging ? 'overflow-hidden' : 'overflow-y-auto',
        )}
      >
        <div className='laptop:w-1/2 w-full min-w-0 flex-shrink-0'>
          {allImages && (
            <div className='flex h-full w-full items-center justify-center overflow-hidden'>
              <div className='relative flex'>
                <ColorPicker
                  color={color}
                  handleChangeColor={setColor}
                  className='absolute top-0 right-0'
                />
                <SnapCarousel
                  items={allImages}
                  itemWidth={220}
                  gap={40}
                  initialImageOrder={current ? current.image_order : 1}
                  setIsDragging={setIsDragging}
                  onIndexChange={handleSetCurrentId}
                  renderItem={(image: EmoticonImage) => {
                    return (
                      <ImageBox
                        key={image.id}
                        isCenter={image.id === currentId}
                        imageData={image}
                        color={color}
                        imageSize={280}
                      />
                    );
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className='laptop:w-1/2 w-full min-w-0 flex-1 flex-shrink-0'>
          {!isDragging && (
            <AnimatePresence mode='wait'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className='h-full'
              >
                <EmoticonCommentSection
                  className='padding-0 h-full'
                  authorId={authorId}
                  targetType='emoticon_image'
                  targetId={currentId}
                  headerAction={
                    <LikeButton
                      targetType='emoticon_image'
                      targetId={currentId}
                    />
                  }
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
