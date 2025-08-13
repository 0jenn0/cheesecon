'use server';

import { getRepresentativeImageBySetId } from '@/entity/emoticon-images/api';
import { EmoticonImageSimple } from '@/entity/emoticon-images/type/emoticon-image.type';
import { getEmoticonSet } from '@/entity/emoticon-set';
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
  console.log('isUnlocked', isUnlocked);

  await trackEmoticonView(emoticonSetId);

  const emoticonInfo = await getEmoticonSet(emoticonSetId);
  const representativeImageResult =
    await getRepresentativeImageBySetId(emoticonSetId);

  const representativeImageData = representativeImageResult?.success
    ? representativeImageResult.data
    : null;

  const representativeImage = isUnlocked
    ? representativeImageData
    : {
        ...representativeImageData,
        image_url: representativeImageData?.blur_url,
      };

  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonInfoSection
        emoticonSet={emoticonInfo}
        representativeImage={representativeImage as EmoticonImageSimple}
      />
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
