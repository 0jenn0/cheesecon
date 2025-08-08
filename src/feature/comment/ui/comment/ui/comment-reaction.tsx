import { cn } from '@/shared/lib';
import { CommentDetail } from '@/entity/comment';
import { useOptimisticCommentReaction } from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';

export default function CommentReaction({
  comment,
}: {
  comment: CommentDetail;
}) {
  const { session } = useAuth();
  const { optimisticReactionSummary, handleAddOptimisticReaction, isPending } =
    useOptimisticCommentReaction(
      comment.reaction_summary,
      comment.reactions ?? [],
    );

  return (
    <div className='padding-y-2 flex items-center gap-12'>
      {optimisticReactionSummary.reactionSummary.length > 0 &&
        optimisticReactionSummary.reactionSummary.map((reaction) => {
          const isSelectedEmoticon = optimisticReactionSummary.reactions?.find(
            (r) => r.emoji === reaction.emoji && r.user_id === session?.user.id,
          );
          return (
            <button
              key={reaction.emoji}
              disabled={isPending}
              className={cn(
                'border-radius-lg padding-x-8 padding-y-2 flex cursor-pointer items-center gap-4',
                isSelectedEmoticon
                  ? 'bg-interactive-primary-subtle border-interactive-primary border'
                  : 'bg-interactive-secondary-subtle border border-white',
              )}
              onClick={() => {
                if (isSelectedEmoticon) {
                  handleAddOptimisticReaction(
                    comment.id,
                    reaction.emoji,
                    'remove',
                  );
                } else {
                  handleAddOptimisticReaction(
                    comment.id,
                    reaction.emoji,
                    'add',
                  );
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
