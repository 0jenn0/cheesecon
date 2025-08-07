import { useQuery } from '@tanstack/react-query';
import { getCommentReactions } from '../api/comment-reactions-api';

export function useGetCommentReactions(commentId: string) {
  return useQuery({
    queryKey: ['comment-reactions', commentId],
    queryFn: () => getCommentReactions(commentId),
  });
}
