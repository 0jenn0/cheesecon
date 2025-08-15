import { EmoticonSetInfo } from '@/entity/emoticon-set';
import { trackEmoticonView } from '@/entity/view/api';
import { EmoticonCommentSection, EmoticonInfoSection } from './ui';
import EmoticonImageSection from './ui/emoticon-image-section/emoticon-image-section';

export default async function EmoticonScreen({
  emoticonSetId,
  isUnlocked,
  emoticonInfo,
}: {
  emoticonSetId: string;
  isUnlocked: boolean;
  emoticonInfo: EmoticonSetInfo;
}) {
  await trackEmoticonView(emoticonSetId);

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
