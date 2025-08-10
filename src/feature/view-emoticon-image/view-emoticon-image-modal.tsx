'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@/shared/ui/feedback';
import { EmoticonImage, EmoticonSetDetail } from '@/entity/emoticon-set';
import { EmoticonCommentSection } from '../comment/ui/emoticon-comment-section';
import LikeButton from '../like/ui/like-button/like-button';
import ImageViewer from './image-viewer';

interface ViewEmoticonImageModalProps {
  emoticonImage: EmoticonImage | null;
  emoticonSet: EmoticonSetDetail | null;
}

export default function ViewEmoticonImageModal({
  emoticonImage,
  emoticonSet,
}: ViewEmoticonImageModalProps) {
  const router = useRouter();

  if (!emoticonImage || !emoticonSet) {
    return null;
  }

  const prevImage = emoticonSet.emoticon_images.find(
    (image: EmoticonImage) =>
      image.image_order ===
      (emoticonSet.emoticon_images.find(
        (image) => image.id === emoticonImage.id,
      )?.image_order ?? 0) -
        1,
  );

  const nextImage = emoticonSet.emoticon_images.find(
    (image: EmoticonImage) =>
      image.image_order ===
      (emoticonSet.emoticon_images.find(
        (image) => image.id === emoticonImage.id,
      )?.image_order ?? 0) +
        1,
  );

  return (
    <Modal.Container className='tablet:w-[72dvw] tablet:h-[80dvh] h-[90dvh] max-w-[1024px]'>
      <Modal.Header
        onClose={() => {
          router.push(`/emoticon/${emoticonSet.id}`, { scroll: false });
        }}
      >
        <h1 className='text-heading-sm'>
          {emoticonImage?.image_order}번 이모티콘
        </h1>
      </Modal.Header>
      <Modal.Body className='laptop:flex-row flex h-full w-full flex-col items-stretch gap-24 overflow-y-auto'>
        <div className='laptop:w-1/2 w-full min-w-0 flex-shrink-0'>
          <ImageViewer
            images={{
              prev: prevImage,
              current: emoticonImage,
              next: nextImage,
            }}
            currentImageOrder={emoticonImage?.image_order}
            onImageOrderChange={() => {}}
            isInModal={true}
          />
        </div>

        <div className='laptop:w-1/2 w-full min-w-0 flex-1 flex-shrink-0'>
          <EmoticonCommentSection
            className='padding-0 h-full'
            authorId={emoticonSet?.user_id ?? ''}
            targetType='emoticon_image'
            targetId={emoticonImage?.id ?? ''}
            headerAction={
              <LikeButton
                targetType='emoticon_image'
                targetId={emoticonImage.id}
                initialLikesCount={emoticonImage.likes_count ?? 0}
              />
            }
          />
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
