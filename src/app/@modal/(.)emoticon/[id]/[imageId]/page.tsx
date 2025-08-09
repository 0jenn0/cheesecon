import { getEmoticonImageDetail } from '@/entity/emoticon-images/api';
import { getEmoticonSetDetail } from '@/entity/emoticon-set/api';
import ViewEmoticonImageModal from '@/feature/view-emoticon-image/view-emoticon-image-modal';
import EmoticonModalScreen from '@/screen/emoticon/ui/emoticon-modal-screen';

export default async function ModalPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; imageId: string }>;
  searchParams: Promise<{ modal?: string }>;
}) {
  const { id, imageId } = await params;

  const [emoticonImageResult, emoticonSet] = await Promise.all([
    getEmoticonImageDetail(id, imageId),
    getEmoticonSetDetail(id),
  ]);

  return (
    <>
      <EmoticonModalScreen
        emoticonImage={
          emoticonImageResult.success ? emoticonImageResult.data : null
        }
        emoticonSet={emoticonSet}
      />
    </>
  );
}
