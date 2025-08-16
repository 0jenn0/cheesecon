'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getTimeAgo } from '@/shared/lib/utils';
import { Button, IconButton } from '@/shared/ui/input';
import { CommentDetail } from '@/entity/comment';
import { useCommentSectionUi } from '@/feature/comment/ui/emoticon-comment-section/provider/use-comment-section-ui';
import { EmoticonReaction } from '../..';

export default function CommentFooter({
  comment,
  handleToggleReaction,
}: {
  comment: CommentDetail;
  handleToggleReaction: (emoji: string) => void;
}) {
  const { isShowingReaction, toggleReaction, isShowingForm, toggleForm } =
    useCommentSectionUi(comment.id);
  const reactionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isShowingReaction &&
        reactionRef.current &&
        !reactionRef.current.contains(event.target as Node)
      ) {
        toggleReaction();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowingReaction, toggleReaction]);

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Button
          variant='secondary'
          styleVariant={isShowingForm ? 'outlined' : 'filled'}
          size='sm'
          onClick={toggleForm}
        >
          <p className='text-body-sm'>{isShowingForm ? '취소' : '답글'}</p>
        </Button>
        <p className='text-tertiary text-body-sm'>
          {comment.created_at && getTimeAgo(comment.created_at)}
        </p>
      </div>
      <div className='relative' ref={reactionRef}>
        <IconButton
          icon='smile-plus'
          variant='secondary'
          iconSize={16}
          styleVariant='transparent'
          onClick={toggleReaction}
        />
        <div className='margin-r-8 absolute top-1/2 right-full -translate-y-1/2'>
          <AnimatePresence>
            {isShowingReaction && (
              <EmoticonReaction handleToggleReaction={handleToggleReaction} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
