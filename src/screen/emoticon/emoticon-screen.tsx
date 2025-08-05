'use client';

import { useCommentQuery } from '@/entity/comment';
import { useEmoticonSetQuery } from '@/entity/emoticon-set/query/emoticon-set-query';
import { EmoticonCommentSection, EmoticonInfoSection } from './ui';
import EmoticonImageSection from './ui/emoticon-image-section';

export default function EmoticonScreen({
  emoticonSetId,
}: {
  emoticonSetId: string;
}) {
  const { data, isLoading } = useEmoticonSetQuery(emoticonSetId);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonInfoSection emoticonSet={data} />
      <EmoticonImageSection emoticonSetId={emoticonSetId} />
      <EmoticonCommentSection
        emoticonSetId={emoticonSetId}
        authorId={data.user_id ?? ''}
      />
    </div>
  );
}
