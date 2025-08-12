'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { Modal, Spinner } from '@/shared/ui/feedback';
import { EmoticonImage } from '@/entity/emoticon-set';
import { EmoticonCommentSection } from '../comment/ui/emoticon-comment-section';
import LikeButton from '../like/ui/like-button/like-button';
import ColorPicker, { ColorMap } from './color-picker';
import { CenterFocusCarousel } from './image-viewer';

interface ViewEmoticonImageModalProps {
  allImages: EmoticonImage[];
  authorId: string;
}

export default function ViewEmoticonImageModal({
  allImages,
  authorId,
}: ViewEmoticonImageModalProps) {
  const searchParams = useSearchParams();
  const imageIdSearchParam = searchParams.get('imageId');
  const [imageId, setImageId] = useState<string | null>(imageIdSearchParam);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const emoticonImage = allImages.find((image) => image.id === imageId);
  const [color, setColor] = useState<ColorMap>('blue');

  return (
    <Modal.Container className='tablet:w-[72dvw] tablet:h-[80dvh] h-[90dvh] max-w-[1024px] select-none'>
      <Modal.Header
        onClose={() => {
          router.push(`/emoticon/${emoticonImage?.set_id}`, {
            scroll: false,
          });
        }}
      >
        <h1 className='text-heading-sm flex items-center gap-12'>
          <div className='text-heading-sm flex items-center justify-center'>
            {isDragging ? (
              <Spinner variant='secondary' size='md' />
            ) : (
              <div className='flex h-[16px] w-[16px] items-center justify-center'>
                {emoticonImage?.image_order}
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
          {emoticonImage && (
            <div className='flex h-full w-full items-center justify-center overflow-hidden'>
              <div className='relative flex'>
                <ColorPicker
                  color={color}
                  handleChangeColor={setColor}
                  className='absolute top-0 right-0'
                />
                <CenterFocusCarousel
                  color={color}
                  images={allImages}
                  itemWidth={240}
                  gap={20}
                  centerScale={1.2}
                  setIsDragging={setIsDragging}
                  setImageId={setImageId}
                  currentImageOrder={emoticonImage.image_order}
                />
              </div>
            </div>
          )}
        </div>
        {/* <div className='laptop:w-1/2 w-full min-w-0 flex-1 flex-shrink-0'>
          {!isDragging && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <EmoticonCommentSection
                  className='padding-0 h-full'
                  authorId={authorId}
                  targetType='emoticon_image'
                  targetId={emoticonImage?.id || ''}
                  headerAction={
                    <LikeButton
                      targetType='emoticon_image'
                      targetId={imageId ?? ''}
                    />
                  }
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div> */}
        <div className='laptop:w-1/2 w-full min-w-0 flex-1 flex-shrink-0'>
          <div
            className={cn(
              'transition-opacity duration-200',
              isDragging ? 'pointer-events-none opacity-0' : 'opacity-100',
            )}
          >
            <AnimatePresence>
              <motion.div /* ... */>
                <EmoticonCommentSection
                  className='padding-0 h-full'
                  authorId={authorId}
                  targetType='emoticon_image'
                  targetId={emoticonImage?.id ?? ''} // enabled: !!targetId 덕분에 안전
                  headerAction={
                    <LikeButton
                      targetType='emoticon_image'
                      targetId={imageId ?? ''}
                    />
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
