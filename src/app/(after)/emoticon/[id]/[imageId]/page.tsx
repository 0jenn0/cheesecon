import { getEmoticonImageDetail } from '@/entity/emoticon-images/api';
import { getEmoticonSetDetail } from '@/entity/emoticon-set/api';
import { EmoticonScreen } from '@/screen';
import EmoticonModalScreen from '@/screen/emoticon/ui/emoticon-modal-screen';

export default async function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string; imageId: string }>;
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
      <EmoticonScreen emoticonSetId={id} isUnlocked={true} />
    </>
  );
}
