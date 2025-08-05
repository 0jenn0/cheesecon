import { use } from 'react';
import { EmoticonScreen } from '@/screen';

export default function EmoticonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const emoticonSetId = id;

  return <EmoticonScreen emoticonSetId={emoticonSetId} />;
}
