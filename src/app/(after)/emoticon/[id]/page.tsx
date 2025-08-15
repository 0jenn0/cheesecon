import { EmoticonScreen } from '@/screen';

export const revalidate = 60;

export default async function EmoticonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <EmoticonScreen emoticonSetId={id} isUnlocked={true} />;
}
