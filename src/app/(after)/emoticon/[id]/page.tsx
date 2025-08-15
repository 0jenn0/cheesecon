import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function EmoticonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const emoticonInfo = await getEmoticonSetCached(id);

  return (
    <EmoticonScreen
      emoticonSetId={id}
      isUnlocked={true}
      emoticonInfo={emoticonInfo}
    />
  );
}
