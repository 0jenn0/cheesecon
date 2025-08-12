import { useQuery } from '@tanstack/react-query';
import { getLikeCount } from '../api';

export function useLikeCount(
  targetType: 'emoticon_set' | 'emoticon_image',
  targetId: string,
) {
  return useQuery({
    queryKey: ['like', targetType, targetId],
    queryFn: () => getLikeCount(targetType, targetId),
  });
}
