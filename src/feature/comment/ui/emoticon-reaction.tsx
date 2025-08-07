'use client';

import { Button } from '@/shared/ui/input';
import { useCreateCommentReaction } from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';

const COMMENT_EMOTICON_REACTION_LIST = ['❤️', '👍', '✅', '👀', '😢'] as const;

interface EmoticonReactionProps {
  commentId: string;
}

export default function EmoticonReaction({ commentId }: EmoticonReactionProps) {
  const { session } = useAuth();
  const { mutate: createCommentReaction } = useCreateCommentReaction();

  const handleCreateCommentReaction = (emoji: string) => {
    if (!session) return;
    createCommentReaction({ commentId, emoji });
  };

  return (
    <div className='padding-y-8 padding-x-16 bg-secondary border-radius-rounded flex items-center gap-8'>
      {COMMENT_EMOTICON_REACTION_LIST.map((item) => (
        <Button
          variant='secondary'
          key={item}
          size='sm'
          className='text-body-lg'
          onClick={() => handleCreateCommentReaction(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
