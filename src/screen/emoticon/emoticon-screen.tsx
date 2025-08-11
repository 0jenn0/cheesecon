'use server';

import {
  getEmoticonSetDetail,
  getEmoticonSetForLock,
} from '@/entity/emoticon-set';
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
  let emoticonData;

  if (isUnlocked) {
    emoticonData = await getEmoticonSetDetail(emoticonSetId);
  } else {
    emoticonData = await getEmoticonSetForLock(emoticonSetId);
  }
  await trackEmoticonView(emoticonSetId);

  if (!emoticonData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonInfoSection emoticonSetDetail={emoticonData} />
      <EmoticonImageSection emoticonImages={emoticonData.emoticon_images} />
      <div className='padding-16 tablet:padding-y-24 bg-primary border-radius-2xl'>
        <EmoticonCommentSection
          authorId={emoticonData.user_id ?? ''}
          targetType='emoticon_set'
          targetId={emoticonSetId}
        />
      </div>
    </div>
  );
}
