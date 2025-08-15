'use server';

import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';
import AccessExpiredModal from '@/screen/access-expired/access-expired-modal';

export default async function AccessExpiredPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  const emoticonInfo = await getEmoticonSetCached(id);

  return (
    <>
      <AccessExpiredModal id={id} />
      <EmoticonScreen
        emoticonSetId={id}
        isUnlocked={false}
        emoticonInfo={emoticonInfo}
      />
    </>
  );
}
