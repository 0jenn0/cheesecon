import Image from 'next/image';
import { getTimeAgo } from '@/shared/lib/utils';
import { Avatar, Icon } from '@/shared/ui/display';
import { Button } from '@/shared/ui/input';
import { CommentWithProfile } from '@/entity/comment';
import { EmoticonSetDetail } from '@/entity/emoticon-set';
import CommentForm from './comment-form';

interface CommentProps {
  comment: EmoticonSetDetail['comments'][number];
  to?: string;
  asChild?: boolean;
  onReply?: (id: string) => void;
  showForm?: boolean;
  isMe?: boolean;
  isAuthor?: boolean;
}

export default function Comment({
  comment,
  to,
  asChild = false,
  onReply,
  showForm = false,
  isMe = false,
  isAuthor = false,
}: CommentProps) {
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
          <div className='flex items-center gap-8'>
            {to && <div className='text-body-sm text-blue-500'>@{to}</div>}
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
                  />
                </div>
              ))}
            </div>
          )}
          <div>{comment.content}</div>
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
              emoticonSetId={comment.set_id ?? ''}
              parentCommentId={comment.id}
              className='padding-t-8'
            />
          )}
        </div>
      </div>
    </div>
  );
}
