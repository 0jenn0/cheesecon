'use client';

import { useEffect } from 'react';
import { useEmoticonSetDetailQuery } from '@/entity/emoticon-set/query/emoticon-set-query';
import { trackEmoticonView } from '@/entity/view/api';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import {
  EmoticonCommentSection,
  EmoticonInfoSection,
  EmoticonScreenSkeleton,
} from './ui';
import EmoticonImageSection from './ui/emoticon-image-section';

export default function EmoticonScreen({
  emoticonSetId,
}: {
  emoticonSetId: string;
}) {
  const { data, isLoading } = useEmoticonSetDetailQuery(emoticonSetId);
  const { session } = useAuth();

  useEffect(() => {
    trackEmoticonView(emoticonSetId, session?.user.id);
  }, [emoticonSetId, session?.user.id]);

  if (isLoading) return <EmoticonScreenSkeleton />;
  if (!data) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex flex-col gap-16'>
      <EmoticonInfoSection emoticonSetDetail={data} />
      <EmoticonImageSection emoticonImages={data.emoticon_images} />
      <EmoticonCommentSection
        comments={data.comments}
        authorId={data.user_id ?? ''}
        emoticonSetId={emoticonSetId}
      />
    </div>
  );
}
