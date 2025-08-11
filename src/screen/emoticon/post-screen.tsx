import { getEmoticonSetDetail } from '@/entity/emoticon-set';
import { EmoticonScreen } from '@/screen';

export default async function PostEmoticonScreen({ setId }: { setId: string }) {
  const emoticonData = await getEmoticonSetDetail(setId);

  if (!emoticonData) return <div>이모티콘 세트를 찾을 수 없습니다.</div>;

  return <EmoticonScreen emoticonSetId={setId} isUnlocked={true} />;
}
