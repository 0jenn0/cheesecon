import { getEmoticonImages } from '@/entity/emoticon-images/api';
import { getAuthorId } from '@/entity/emoticon-set';
import ViewEmoticonImageModal from '@/feature/view-emoticon-image/view-emoticon-image-modal';
import { EmoticonScreen } from '@/screen';

export const revalidate = 60;

export default async function EmoticonPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imageId: string }>;
}) {
  const [id, imageId] = await Promise.all([
    params.then((p) => p.id),
    searchParams.then((p) => p.imageId),
  ]);

  const [authorId, allImages] = await Promise.all([
    getAuthorId(id),
    getEmoticonImages(id),
  ]);

  const authorIdData = authorId?.success ? authorId.data : '';
  const allImagesData = allImages?.success ? allImages.data : [];

  return (
    <>
      {imageId && (
        <ViewEmoticonImageModal
          setId={id}
          currentImageId={imageId}
          allImages={allImagesData ?? []}
          authorId={authorIdData}
        />
      )}
      <EmoticonScreen emoticonSetId={id} isUnlocked={true} />
    </>
  );
}
