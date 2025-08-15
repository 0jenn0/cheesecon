import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';

export const revalidate = 3600;

export const dynamic = 'force-static';

export default async function EmoticonImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const setId = (await params).id;
  const emoticonInfo = await getEmoticonSetCached(setId);

  return (
    <EmoticonScreen
      emoticonSetId={setId}
      isUnlocked={true}
      emoticonInfo={emoticonInfo}
    />
  );
}
