'use client';

import { useEffect, useRef } from 'react';
import { getTimeAgo } from '@/shared/lib/utils';
import { Button, IconButton } from '@/shared/ui/input';
import { CommentDetail } from '@/entity/comment';
import { useCommentSectionUi } from '@/feature/comment/ui/emoticon-comment-section/provider/use-comment-section-ui';
import { EmoticonReaction } from '../..';

export default function CommentFooter({ comment }: { comment: CommentDetail }) {
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
        {isShowingReaction && (
          <div className='margin-r-8 absolute top-1/2 right-full -translate-y-1/2'>
            <EmoticonReaction commentId={comment.id} />
          </div>
        )}
      </div>
    </div>
  );
}
