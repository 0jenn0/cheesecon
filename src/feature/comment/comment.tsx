import Image from 'next/image';
import { useState } from 'react';
import { getTimeAgo } from '@/shared/lib/utils';
import { Avatar, Icon } from '@/shared/ui/display';
import { useModal } from '@/shared/ui/feedback/modal';
import { Button, IconButton, TextArea } from '@/shared/ui/input';
import { useUpdateCommentMutation } from '@/entity/comment/query/comment-mutation';
import { EmoticonSetDetail } from '@/entity/emoticon-set';
import { CommentForm, EditCommentMenu } from './ui';

interface CommentProps {
  comment: EmoticonSetDetail['comments'][number];
  asChild?: boolean;
  onReply?: (id: string) => void;
  showForm?: boolean;
  isMe?: boolean;
  isAuthor?: boolean;
  isEditing?: boolean;
  emoticonSetId: string;
}

export default function Comment({
  comment,
  asChild = false,
  onReply,
  showForm = false,
  isMe = false,
  isAuthor = false,
  emoticonSetId,
}: CommentProps) {
  const { openModal } = useModal();
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className='flex w-full gap-4'>
      <>
        {asChild && <Icon name='corner-down-right' className='text-gray-300' />}
      </>
      <div className='flex flex-1 gap-8'>
        <Avatar
          name={comment.profile.nickname ?? ''}
          profileType='image'
          size='sm'
          imageUrl={comment.profile.avatar_url ?? undefined}
        />
        <div className='flex flex-1 flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-8'>
              {comment.parent && comment.parent.profile.nickname && (
                <div className='text-body-sm text-blue-500'>
                  @{comment.parent.profile.nickname}
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
                  {showMore && (
                    <EditCommentMenu
                      handleEdit={handleEdit}
                      handleDelete={() => {
                        openModal('deleteComment', {
                          commentId: comment.id,
                          emoticonSetId: emoticonSetId,
                        });
                      }}
                    />
                  )}
                  <IconButton
                    icon='more-vertical'
                    iconSize={16}
                    variant='secondary'
                    styleVariant='transparent'
                    onClick={handleShowMore}
                  />
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
          <div className='flex items-center gap-8'>
            <Button
              variant='secondary'
              styleVariant={showForm ? 'outlined' : 'filled'}
              size='sm'
              onClick={() => onReply?.(comment.id)}
            >
              <p className='text-body-sm'>{showForm ? '취소' : '답글'}</p>
            </Button>
            <p className='text-tertiary text-body-sm'>
              {comment.created_at && getTimeAgo(comment.created_at)}
            </p>
          </div>

          <div className='border-ghost w-full border-b-[0.6px]' />

          {showForm && (
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
}
