import { EmoticonScreen } from '@/screen';

export default async function EmoticonImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const setId = (await params).id;

  return <EmoticonScreen emoticonSetId={setId} isUnlocked={true} />;
}
