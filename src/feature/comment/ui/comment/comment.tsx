'use client';

import { Avatar, Icon } from '@/shared/ui/display';
import { CommentDetail } from '@/entity/comment/api/types';
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
  const { isShowingForm } = useCommentSectionUi(comment.id);

  return (
    <CommentItemProvider
      commentId={comment.id}
      targetId={targetId}
      targetType={targetType}
      userType={userType}
    >
      <div className='flex w-full gap-4'>
        <>
          {asChild && (
            <Icon name='corner-down-right' className='text-gray-300' />
          )}
        </>
        <div className='flex flex-1 gap-8'>
          <Avatar
            name={comment.profile.nickname}
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

            <CommentReaction comment={comment} />
            <CommentFooter comment={comment} />

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
