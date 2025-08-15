'use client';

import { ComponentPropsWithRef } from 'react';
import { Button } from '@/shared/ui/input';
import { useCreateCommentReaction } from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';

const COMMENT_EMOTICON_REACTION_LIST = ['❤️', '👍', '✅', '👀', '😢'] as const;

interface EmoticonReactionProps extends ComponentPropsWithRef<'div'> {
  commentId: string;
}

export default function EmoticonReaction({
  commentId,
  ...props
}: EmoticonReactionProps) {
  const { mutate: createCommentReaction } = useCreateCommentReaction(commentId);

  const handleCreateCommentReaction = async (emoji: string) => {
    createCommentReaction({ commentId, emoji });
  };

  return (
    <div
      className='padding-y-8 padding-x-16 bg-secondary border-radius-rounded flex items-center gap-8'
      {...props}
    >
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
