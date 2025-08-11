import { EmoticonScreen } from '@/screen';

export default async function EmoticonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EmoticonScreen emoticonSetId={id} isUnlocked={true} />;
}
