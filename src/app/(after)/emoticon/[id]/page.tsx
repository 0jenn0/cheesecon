import { getEmoticonImages } from '@/entity/emoticon-images/api';
import { getAuthorId } from '@/entity/emoticon-set';
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

  const [authorId, imagesRes] = await Promise.all([
    getAuthorId(id),
    getEmoticonImages(id),
  ]);

  const allImages = (imagesRes?.success ? imagesRes.data : [])?.filter(
    (image) => image.is_representative !== true,
  );

  const authorIdData = authorId?.success ? authorId.data : '';

  return (
    <>
      {imageId ? (
        <ViewEmoticonImageModal
          allImages={allImages ?? []}
          authorId={authorIdData}
        />
      ) : (
        <EmoticonScreen emoticonSetId={id} isUnlocked={true} />
      )}
    </>
  );
}
