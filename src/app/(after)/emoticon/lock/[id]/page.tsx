'use server';

import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { EmoticonScreen } from '@/screen';
import LockModal from '@/screen/lock/lock-modal';

export default async function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const emoticonInfo = await getEmoticonSetCached(id);

  return (
    <>
      <LockModal />
      <EmoticonScreen
        emoticonSetId={id}
        isUnlocked={false}
        emoticonInfo={emoticonInfo}
      />
    </>
  );
}
