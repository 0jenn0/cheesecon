'use server';

import { EmoticonScreen } from '@/screen';
import AccessExpiredModal from '@/screen/access-expired/access-expired-modal';

export default async function AccessExpiredPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  return (
    <>
      <AccessExpiredModal id={id} />
      <EmoticonScreen emoticonSetId={id} isUnlocked={false} />
    </>
  );
}
