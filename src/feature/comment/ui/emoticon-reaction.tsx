'use client';

import { ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/input';
import { CommentReactionSummary } from '@/entity/comment/api';
import {
  useCreateCommentReaction,
  useOptimisticCommentReaction,
} from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';

const COMMENT_EMOTICON_REACTION_LIST = ['❤️', '👍', '✅', '👀', '😢'] as const;

interface EmoticonReactionProps
  extends ComponentPropsWithRef<typeof motion.div> {
  handleToggleReaction: (emoji: string) => void;
}

export default function EmoticonReaction({
  handleToggleReaction,
  ...props
}: EmoticonReactionProps) {
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
          className='text-body-lg transition-all duration-200 select-none'
          onClick={() => handleToggleReaction(item)}
        >
          {item}
        </Button>
      ))}
    </motion.div>
  );
}
