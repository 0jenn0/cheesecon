'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@/shared/ui/feedback';
import { EmoticonImage } from '@/entity/emoticon-set';
import { EmoticonCommentSection } from '../comment/ui/emoticon-comment-section';
import LikeButton from '../like/ui/like-button/like-button';
import ImageViewer from './image-viewer';

interface ViewEmoticonImageModalProps {
  allImages: EmoticonImage[];
  imageId: string;
  authorId: string;
}

export default function ViewEmoticonImageModal({
  allImages,
  imageId,
  authorId,
}: ViewEmoticonImageModalProps) {
  const router = useRouter();

  const emoticonImage = allImages.find((image) => image.id === imageId);
  const prevImage = allImages.find(
    (image) =>
      image.image_order === Math.max(0, (emoticonImage?.image_order ?? 0) - 1),
  );
  const nextImage = allImages.find(
    (image) =>
      image.image_order ===
      Math.min(allImages.length - 1, (emoticonImage?.image_order ?? 0) + 1),
  );

  return (
    <Modal.Container className='tablet:w-[72dvw] tablet:h-[80dvh] h-[90dvh] max-w-[1024px]'>
      <Modal.Header
        onClose={() => {
          router.push(`/emoticon/${emoticonImage?.set_id}`, {
            scroll: false,
          });
        }}
      >
        <h1 className='text-heading-sm'>
          {emoticonImage?.image_order}번 이모티콘
        </h1>
      </Modal.Header>
      <Modal.Body className='laptop:flex-row flex h-full w-full flex-col items-stretch gap-24 overflow-y-auto'>
        <div className='laptop:w-1/2 w-full min-w-0 flex-shrink-0'>
          {emoticonImage && (
            <ImageViewer
              images={{
                prev: prevImage,
                current: emoticonImage,
                next: nextImage,
              }}
              currentImageOrder={emoticonImage?.image_order ?? 0}
              onImageOrderChange={() => {}}
              isInModal={true}
            />
          )}
        </div>

        <div className='laptop:w-1/2 w-full min-w-0 flex-1 flex-shrink-0'>
          <EmoticonCommentSection
            className='padding-0 h-full'
            authorId={authorId}
            targetType='emoticon_image'
            targetId={emoticonImage?.id ?? ''}
            headerAction={
              <LikeButton
                targetType='emoticon_image'
                targetId={emoticonImage?.id ?? ''}
                initialLikesCount={emoticonImage?.likes_count ?? 0}
              />
            }
          />
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
