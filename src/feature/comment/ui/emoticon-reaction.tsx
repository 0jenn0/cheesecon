'use client';

import { ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/input';
import { useCreateCommentReaction } from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';

const COMMENT_EMOTICON_REACTION_LIST = ['❤️', '👍', '✅', '👀', '😢'] as const;

interface EmoticonReactionProps
  extends ComponentPropsWithRef<typeof motion.div> {
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
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.1,
      }}
      className='padding-y-8 padding-x-16 bg-secondary border-radius-rounded flex items-center gap-8'
      {...props}
    >
      {COMMENT_EMOTICON_REACTION_LIST.map((item) => (
        <Button
          variant='secondary'
          key={item}
          size='sm'
          className='text-body-lg ho transition-all duration-200'
          onClick={() => handleCreateCommentReaction(item)}
        >
          {item}
        </Button>
      ))}
    </motion.div>
  );
}
