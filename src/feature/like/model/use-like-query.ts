import { getEmoticonSetIsLiked } from '@/entity/emoticon-set';
import { useQuery } from '@tanstack/react-query';

export default function useLikeQuery({ itemId }: { itemId: string }) {
  return useQuery({
    queryKey: ['emoticon-set-is-liked', itemId],
    queryFn: () => getEmoticonSetIsLiked(itemId),
  });
}
