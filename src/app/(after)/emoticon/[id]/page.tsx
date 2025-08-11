import { getEmoticonSetDetail } from '@/entity/emoticon-set';
import ViewEmoticonImageModal from '@/feature/view-emoticon-image/view-emoticon-image-modal';
import { EmoticonScreen } from '@/screen';

export default async function ImageFullPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imageId: string }>;
}) {
  const { id } = await params;
  const { imageId } = await searchParams;

  const emoticonSetDetail = await getEmoticonSetDetail(id);
  const authorId = emoticonSetDetail.user_id;
  const allImages = emoticonSetDetail.emoticon_images;

  return (
    <>
      {imageId ? (
        <ViewEmoticonImageModal
          allImages={allImages}
          imageId={imageId}
          authorId={authorId}
        />
      ) : (
        <EmoticonScreen emoticonSetId={id} isUnlocked={true} />
      )}
    </>
  );
}
