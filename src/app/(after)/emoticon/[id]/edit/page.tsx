import { getEmoticonImages } from '@/entity/emoticon-images/api';
import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';
import EmoticonEditScreen from '@/screen/emoticon-edit/page';

export default async function EmoticonEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const [emoticonInfo, images] = await Promise.all([
    getEmoticonSetCached(id),
    getEmoticonImages(id),
  ]);

  return (
    <EmoticonEditScreen
      initialEmoticonInfo={emoticonInfo}
      initialImages={images.success ? (images.data ?? []) : []}
    />
  );
}
