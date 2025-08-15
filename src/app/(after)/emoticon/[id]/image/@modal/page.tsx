import { getEmoticonImages } from '@/entity/emoticon-images/api/emoticon-images-api';
import { getAuthorId } from '@/entity/emoticon-set/api/emoticon-set-api';
import ViewEmoticonImageModal from '@/feature/view-emoticon-image/view-emoticon-image-modal';

export default async function EmoticonModal({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imageId: string }>;
}) {
  const setId = (await params).id;
  const currentImageId = (await searchParams).imageId;

  const [authorId, allImages] = await Promise.all([
    getAuthorId(setId),
    getEmoticonImages(setId),
  ]);

  const authorIdData = authorId?.success ? authorId.data : '';
  const allImagesData = allImages?.success ? allImages.data : [];

  return (
    <ViewEmoticonImageModal
      setId={setId}
      currentImageId={currentImageId}
      authorId={authorIdData}
      allImages={allImagesData ?? []}
    />
  );
}
