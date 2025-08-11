'use server';

import { EmoticonScreen } from '@/screen';
import LockModal from '@/screen/lock/lock-modal';

export default async function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <LockModal />
      <EmoticonScreen emoticonSetId={id} isUnlocked={false} />
    </>
  );
}
