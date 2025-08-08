'use client';

import Image from 'next/image';
import { memo, useState } from 'react';
import { cn, getTimeAgo } from '@/shared/lib/utils';
import { Avatar, Icon } from '@/shared/ui/display';
import { useModal } from '@/shared/ui/feedback/modal';
import { Button, IconButton } from '@/shared/ui/input';
import { CommentDetail } from '@/entity/comment/api/types';
import {
  useCreateCommentReaction,
  useDeleteCommentReaction,
} from '@/entity/comment_reactions/query/comment-reaciton-mutation-query';
import { useCommentSectionUi } from '@/screen/emoticon/emoticon-comment-section/provider/use-comment-section-ui';
import { useAuth } from '../auth/provider/auth-provider';
import { CommentForm, EditCommentMenu, EmoticonReaction } from './ui';

interface CommentProps {
  comment: CommentDetail;
  asChild?: boolean;
  isMe?: boolean;
  isAuthor?: boolean;
  isEditing?: boolean;
  emoticonSetId: string;
  parentNickname?: string;
}

export default memo(function Comment({
  comment,
  asChild = false,
  isMe = false,
  isAuthor = false,
  emoticonSetId,
  parentNickname,
}: CommentProps) {
  const { session } = useAuth();
  const { openModal } = useModal();

  const {
    isShowingMore,
    isShowingReaction,
    isShowingForm,
    toggleMore,
    toggleReaction,
    toggleForm,
  } = useCommentSectionUi(comment.id);

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteCommentReaction } = useDeleteCommentReaction();
  const { mutate: createCommentReaction } = useCreateCommentReaction();

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    toggleMore();
  };

  return (
    <div className='flex w-full gap-4'>
      <>
        {asChild && <Icon name='corner-down-right' className='text-gray-300' />}
      </>
      <div className='flex flex-1 gap-8'>
        <Avatar
          name={comment.profile.nickname}
          profileType='image'
          size='sm'
          imageUrl={comment.profile.avatar_url ?? undefined}
        />
        <div className='flex flex-1 flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-8'>
              {comment.parent_comment_id && comment.parent_comment_id && (
                <div className='text-body-sm text-blue-500'>
                  @{parentNickname}
                </div>
              )}
              <div className='flex items-center gap-4'>
                <div className='text-body-sm font-semibold'>
                  {comment.profile.nickname}
                </div>
                {isMe && (
                  <div className='text-body-sm border-radius-rounded flex h-[20px] w-[20px] items-center justify-center bg-cyan-50 font-semibold text-cyan-600'>
                    나
                  </div>
                )}
                {isAuthor && !isMe && (
                  <div className='text-body-sm border-radius-rounded flex h-[20px] w-[40px] items-center justify-center bg-yellow-50 font-semibold text-yellow-600'>
                    작가
                  </div>
                )}
              </div>
            </div>
            <div className='relative'>
              {isMe && (
                <>
                  {isShowingMore && (
                    <EditCommentMenu
                      handleEdit={handleEdit}
                      handleDelete={() => {
                        openModal('deleteComment', {
                          commentId: comment.id,
                          emoticonSetId: emoticonSetId,
                        });
                        toggleMore();
                      }}
                    />
                  )}
                  <button
                    className='padding-0 bg-interactive-secondary-subtle cursor-pointer'
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false);
                      }
                      toggleMore();
                    }}
                  >
                    <Icon name='more-vertical' className='text-secondary' />
                  </button>
                </>
              )}
            </div>
          </div>
          {comment.images && comment.images?.length > 0 && (
            <div className='flex flex-wrap gap-8'>
              {comment.images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className='border-ghost relative h-[120px] w-[120px] overflow-hidden rounded-lg border'
                >
                  <Image
                    src={image}
                    alt='comment image'
                    fill
                    className='object-cover'
                    sizes='120px'
                  />
                </div>
              ))}
            </div>
          )}
          {isEditing ? (
            <CommentForm
              emoticonSetId={emoticonSetId}
              commentId={comment.id}
              parentCommentId={comment.id}
              className='padding-t-8'
              initialValue={comment.content}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div>{comment.content}</div>
          )}
          <div className='padding-y-2 flex items-center gap-12'>
            {comment.reaction_summary.length > 0 &&
              comment.reaction_summary.map((reaction) => {
                const isSelectedEmoticon = comment.reactions?.find(
                  (r) =>
                    r.emoji === reaction.emoji &&
                    r.user_id === session?.user.id,
                );

                return (
                  <button
                    key={reaction.emoji}
                    className={cn(
                      'border-radius-lg padding-x-8 padding-y-2 flex cursor-pointer items-center gap-4',
                      isSelectedEmoticon
                        ? 'bg-interactive-primary-subtle border-interactive-primary border'
                        : 'bg-interactive-secondary-subtle',
                    )}
                    onClick={() => {
                      if (isSelectedEmoticon) {
                        deleteCommentReaction({
                          commentId: comment.id,
                          emoji: reaction.emoji,
                        });
                      } else {
                        createCommentReaction({
                          commentId: comment.id,
                          emoji: reaction.emoji,
                        });
                      }
                    }}
                  >
                    {reaction.emoji}
                    <p className='text-body-sm text-secondary'>
                      {reaction.count}
                    </p>
                  </button>
                );
              })}
          </div>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-8'>
              <Button
                variant='secondary'
                styleVariant={isShowingForm ? 'outlined' : 'filled'}
                size='sm'
                onClick={toggleForm}
              >
                <p className='text-body-sm'>
                  {isShowingForm ? '취소' : '답글'}
                </p>
              </Button>
              <p className='text-tertiary text-body-sm'>
                {comment.created_at && getTimeAgo(comment.created_at)}
              </p>
            </div>
            <div className='relative'>
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

          <div className='border-ghost w-full border-b-[0.6px]' />

          {isShowingForm && (
            <CommentForm
              emoticonSetId={emoticonSetId}
              parentCommentId={comment.id}
              className='padding-t-8'
            />
          )}
        </div>
      </div>
    </div>
  );
});
