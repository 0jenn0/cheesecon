'use server';

import { SecretNumberModal } from '@/feature/ask-secret-number';
import { EmoticonScreen } from '@/screen';

export default async function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SecretNumberModal id={id} />
      <EmoticonScreen emoticonSetId={id} isUnlocked={false} />
    </>
  );
}
