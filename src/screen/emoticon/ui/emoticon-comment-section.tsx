'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib';
import { usePagination } from '@/shared/lib/use-pagination';
import { Icon } from '@/shared/ui/display';
import { Pagination } from '@/shared/ui/navigation';
import { EmoticonSetDetail } from '@/entity/emoticon-set';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { Comment, CommentForm } from '@/feature/comment/ui';

const COUNT_PER_PAGE = 100;

export default function EmoticonCommentSection({
  comments,
  authorId,
  emoticonSetId,
}: {
  comments: EmoticonSetDetail['comments'];
  authorId: string;
  emoticonSetId: string;
}) {
  const { session } = useAuth();

  const [commentFormPosition, setCommentFormPosition] = useState<string | null>(
    null,
  );
  const {
    currentPage,
    handlePageChange,
    totalPages,
    data: paginatedComments,
  } = usePagination(COUNT_PER_PAGE, comments);

  const handleReply = (id: string) => {
    if (commentFormPosition === id) {
      setCommentFormPosition(null);
      return;
    }
    setCommentFormPosition(id);
  };

  const renderComment = (
    comment: EmoticonSetDetail['comments'][number],
    depth: number = 0,
    parentNickname?: string,
  ) => {
    const childComments =
      paginatedComments?.filter(
        (c: EmoticonSetDetail['comments'][number]) =>
          c.parent_comment_id === comment.id,
      ) || [];

    return (
      <div className='flex flex-col gap-16' key={comment.id}>
        <Comment
          comment={comment}
          asChild={depth > 0}
          onReply={handleReply}
          showForm={commentFormPosition === comment.id}
          isMe={session?.user.id === comment.user_id}
          isAuthor={comment.user_id === authorId}
          emoticonSetId={emoticonSetId}
        />
        {childComments.map((childComment) => (
          <div key={childComment.id} className={cn(depth < 2 && 'ml-24')}>
            {renderComment(childComment, depth + 1, comment.user_id ?? '')}
          </div>
        ))}
      </div>
    );
  };

  const parentComments =
    paginatedComments?.filter(
      (comment: EmoticonSetDetail['comments'][number]) =>
        !comment.parent_comment_id,
    ) || [];

  return (
    <section className='tablet:border-radius-2xl bg-primary tablet:padding-24 tablet:gap-24 padding-16 flex flex-col gap-16'>
      <div className='flex items-center gap-4'>
        <h1 className='font-semibold'>댓글</h1>
        <p>({comments?.length || 0}개)</p>
      </div>
      <div className='border-ghost border-b' />
      <div className='flex w-full flex-col gap-24'>
        {parentComments.length > 0 &&
          parentComments.map((comment: EmoticonSetDetail['comments'][number]) =>
            renderComment(comment),
          )}
        {parentComments.length === 0 && (
          <div className='padding- flex w-full items-center justify-center gap-8'>
            <p className='text-tertiary'>첫 피드백을 남겨주세요!</p>
            <Icon name='message-loading' size={20} className='text-gray-300' />
          </div>
        )}
      </div>
      {commentFormPosition === null && (
        <CommentForm emoticonSetId={emoticonSetId} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={handlePageChange}
        className='mt-6'
      />
    </section>
  );
}
