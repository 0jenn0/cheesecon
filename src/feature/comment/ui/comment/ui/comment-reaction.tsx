import { cn } from '@/shared/lib/utils';
import { CommentDetail } from '@/entity/comment';
import {
  useCreateCommentReaction,
  useDeleteCommentReaction,
} from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';

export default function CommentReaction({
  comment,
}: {
  comment: CommentDetail;
}) {
  const { session } = useAuth();
  const { mutate: deleteCommentReaction } = useDeleteCommentReaction();
  const { mutate: createCommentReaction } = useCreateCommentReaction();

  return (
    <div className='padding-y-2 flex items-center gap-12'>
      {comment.reaction_summary.length > 0 &&
        comment.reaction_summary.map((reaction) => {
          const isSelectedEmoticon = comment.reactions?.find(
            (r) => r.emoji === reaction.emoji && r.user_id === session?.user.id,
          );

          return (
            <button
              key={reaction.emoji}
              className={cn(
                'border-radius-lg padding-x-8 padding-y-2 flex cursor-pointer items-center gap-4',
                isSelectedEmoticon
                  ? 'bg-interactive-primary-subtle border-interactive-primary border'
                  : 'bg-interactive-secondary-subtle',
              )}
              onClick={() => {
                if (isSelectedEmoticon) {
                  deleteCommentReaction({
                    commentId: comment.id,
                    emoji: reaction.emoji,
                  });
                } else {
                  createCommentReaction({
                    commentId: comment.id,
                    emoji: reaction.emoji,
                  });
                }
              }}
            >
              {reaction.emoji}
              <p className='text-body-sm text-secondary'>{reaction.count}</p>
            </button>
          );
        })}
    </div>
  );
}
