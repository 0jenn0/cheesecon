import { cn } from '@/shared/lib';
import { CommentReactionSummary } from '@/entity/comment';
import { trackEvent } from '@/shared/lib/amplitude';

export default function CommentReaction({
  reactionSummary,
  toggleReaction,
  isLoading,
}: {
  reactionSummary: CommentReactionSummary[];
  toggleReaction: (emoji: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className='padding-y-2 flex items-center gap-4'>
      {reactionSummary.map((reaction) => {
        return (
          <button
            key={reaction.emoji}
            disabled={isLoading}
            className={cn(
              'border-radius-lg padding-x-8 padding-y-2 flex cursor-pointer items-center gap-4 transition-all duration-100 active:scale-95',
              reaction.reacted
                ? 'bg-interactive-primary-subtle border-interactive-primary border'
                : 'bg-interactive-secondary-subtle border border-white',
            )}
            onClick={() => {
              trackEvent('select_feedback_tag', {
                tag_name: reaction.emoji,
                tag_category: 'emoji_reaction',
                is_custom: false,
                action: reaction.reacted ? 'remove' : 'add',
                current_count: reaction.count
              });
              toggleReaction(reaction.emoji);
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
