import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';

export default async function PostEmoticonScreen({ setId }: { setId: string }) {
  const emoticonData = await getEmoticonSetCached(setId);

  return (
    <EmoticonScreen
      emoticonSetId={setId}
      isUnlocked={true}
      emoticonInfo={emoticonData}
    />
  );
}
