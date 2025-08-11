import { getEmoticonSetDetail } from '@/entity/emoticon-set';
import { EmoticonScreen } from '@/screen';

export default async function EmoticonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const emoticonSetId = id;

  return <EmoticonScreen emoticonSetId={emoticonSetId} isUnlocked={true} />;
}
