'use server';

import { getEmoticonSetDetail } from '@/entity/emoticon-set';
import { trackEmoticonView } from '@/entity/view/api';
import { EmoticonCommentSection, EmoticonInfoSection } from './ui';
import EmoticonImageSection from './ui/emoticon-image-section';

export default async function EmoticonScreen({
  emoticonSetId,
}: {
  emoticonSetId: string;
}) {
  const data = await getEmoticonSetDetail(emoticonSetId);
  await trackEmoticonView(emoticonSetId);

  if (!data) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonInfoSection emoticonSetDetail={data} />
      <EmoticonImageSection emoticonImages={data.emoticon_images} />
      <EmoticonCommentSection
        authorId={data.user_id ?? ''}
        emoticonSetId={emoticonSetId}
      />
    </div>
  );
}
