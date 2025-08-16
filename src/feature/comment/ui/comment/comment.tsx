'use client';

import { useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, Icon } from '@/shared/ui/display';
import { useToast } from '@/shared/ui/feedback';
import { CommentDetail } from '@/entity/comment/api/types';
import { useOptimisticCommentReaction } from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { useCommentSectionUi } from '@/feature/comment/ui/emoticon-comment-section/provider/use-comment-section-ui';
import { CommentForm } from '..';
import { CommentItemProvider } from './provider';
import {
  CommentFooter,
  CommentHeader,
  CommentImages,
  CommentReaction,
} from './ui';
import CommentContent from './ui/comment-content';

interface CommentProps {
  comment: CommentDetail;
  asChild?: boolean;
  userType?: 'me' | 'author' | 'other';
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  parentNickname?: string;
}

export default function Comment({
  comment,
  asChild = false,
  userType = 'other',
  targetId,
  targetType,
  parentNickname,
}: CommentProps) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { isShowingForm } = useCommentSectionUi(comment.id);
  const {
    reactionSummary,
    toggleReaction: toggleReactionOptimistic,
    isLoading,
  } = useOptimisticCommentReaction(comment.id, comment.reaction_summary);

  const hasReactions = reactionSummary.length > 0;

  const handleToggleReaction = useCallback(
    (emoji: string) => {
      if (!user) {
        addToast({
          type: 'error',
          message: '로그인 후 이모지 반응을 할 수 있어요.',
        });
        return;
      }
      toggleReactionOptimistic(emoji);
    },
    [toggleReactionOptimistic, user, addToast],
  );

  return (
    <CommentItemProvider
      commentId={comment.id}
      targetId={targetId}
      targetType={targetType}
      userType={userType}
    >
      <div className='flex w-full gap-4'>
        {asChild && <Icon name='corner-down-right' className='text-gray-300' />}
        <div className='flex flex-1 gap-8'>
          <Avatar
            name={comment.profile.nickname ?? ''}
            profileType='image'
            size='sm'
            imageUrl={comment.profile.avatar_url ?? undefined}
          />
          <div className='flex flex-1 flex-col gap-8'>
            <CommentHeader
              comment={comment}
              parentNickname={parentNickname ?? ''}
              userType={userType}
            />
            <CommentContent comment={comment} />

            {comment.images && comment.images?.length > 0 && (
              <CommentImages images={comment.images} />
            )}

            <AnimatePresence mode='wait'>
              {hasReactions && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <CommentReaction
                    reactionSummary={reactionSummary}
                    toggleReaction={handleToggleReaction}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <CommentFooter
              comment={comment}
              handleToggleReaction={handleToggleReaction}
            />

            <div className='border-ghost w-full border-b-[0.6px]' />

            {isShowingForm && (
              <CommentForm
                targetId={targetId}
                targetType={targetType}
                parentCommentId={comment.id}
                className='padding-t-8'
              />
            )}
          </div>
        </div>
      </div>
    </CommentItemProvider>
  );
}
