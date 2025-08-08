import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Icon } from '@/shared/ui/display';
import { CommentDetail } from '@/entity/comment';
import { useCommentSectionUi } from '@/screen/emoticon/emoticon-comment-section/provider/use-comment-section-ui';
import EditCommentMenu from '../../edit-comment-menu';
import { useCommentItem } from '../provider/use-comment';

export default function CommentHeader({
  comment,
  parentNickname,
  userType = 'other',
}: PropsWithChildren<{
  comment: CommentDetail;
  parentNickname: string;
  userType?: 'me' | 'author' | 'other';
}>) {
  const { isShowingMore, toggleMore } = useCommentSectionUi(comment.id);
  const { isEditing, toggleEditing } = useCommentItem();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-8'>
        {comment.parent_comment_id && comment.parent_comment_id && (
          <div className='text-body-sm text-blue-500'>@{parentNickname}</div>
        )}
        <div className='flex items-center gap-4'>
          <div className='text-body-sm font-semibold'>
            {comment.profile.nickname}
          </div>
          {userType === 'me' && (
            <div className='text-body-sm border-radius-rounded flex h-[20px] w-[20px] items-center justify-center bg-cyan-50 font-semibold text-cyan-600'>
              나
            </div>
          )}
          {userType === 'author' && (
            <div className='text-body-sm border-radius-rounded flex h-[20px] w-[40px] items-center justify-center bg-yellow-50 font-semibold text-yellow-600'>
              작가
            </div>
          )}
        </div>
      </div>
      <div className='relative'>
        {userType === 'me' && (
          <>
            {isShowingMore && <EditCommentMenu />}
            <button
              className='padding-0 bg-interactive-secondary-subtle cursor-pointer'
              onClick={() => {
                if (isEditing) {
                  toggleEditing();
                } else {
                  toggleMore();
                }
              }}
            >
              <Icon name='more-vertical' className='text-secondary' />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
