'use client';

import useLikeQuery from '@/feature/like/model/use-like-query';
import { IconLabel } from './icon-label';

export default function LikeLabel({
  itemId,
  likesCount,
}: {
  itemId: string;
  likesCount: number;
}) {
  const { data: isLiked } = useLikeQuery({ itemId });

  return (
    <IconLabel
      icon={isLiked ? 'heart-filled' : 'heart'}
      iconClassName={isLiked ? 'text-rose-400' : 'text-gray-500'}
      label={likesCount}
    />
  );
}
