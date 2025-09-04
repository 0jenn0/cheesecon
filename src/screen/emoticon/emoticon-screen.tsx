import { EmoticonSetInfo } from '@/entity/emoticon-set';
import {
  EmoticonCommentSection,
  EmoticonImageSection,
  EmoticonInfoSection,
  EmoticonViewTracker,
} from './ui';

export default function EmoticonScreen({
  emoticonSetId,
  isUnlocked,
  emoticonInfo,
}: {
  emoticonSetId: string;
  isUnlocked: boolean;
  emoticonInfo: EmoticonSetInfo;
}) {
  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonViewTracker emoticonSetId={emoticonSetId} />
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
