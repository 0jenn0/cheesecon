'use server';

import { getEmoticonSetCached } from '@/entity/emoticon-set/model/main-cache';
import { trackEmoticonView } from '@/entity/view/api';
import { EmoticonCommentSection, EmoticonInfoSection } from './ui';
import EmoticonImageSection from './ui/emoticon-image-section';

export default async function EmoticonScreen({
  emoticonSetId,
  isUnlocked,
}: {
  emoticonSetId: string;
  isUnlocked: boolean;
}) {
  await trackEmoticonView(emoticonSetId);
  const emoticonInfo = await getEmoticonSetCached(emoticonSetId);

  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonInfoSection emoticonInfo={emoticonInfo} />
      <EmoticonImageSection
        emoticonSetId={emoticonSetId}
        isUnlocked={isUnlocked}
      />
      <div className='padding-16 tablet:padding-y-24 bg-primary border-radius-2xl'>
        <EmoticonCommentSection
          authorId={emoticonInfo.user_id ?? ''}
          targetType='emoticon_set'
          targetId={emoticonSetId}
        />
      </div>
    </div>
  );
}
