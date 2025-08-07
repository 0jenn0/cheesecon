'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib';
import { usePagination } from '@/shared/lib/use-pagination';
import { Icon } from '@/shared/ui/display';
import { Pagination } from '@/shared/ui/navigation';
import { CommentDetail } from '@/entity/comment/api/types';
import { useCommentQuery } from '@/entity/comment/query/comment-infinity-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { Comment, CommentForm } from '@/feature/comment/ui';

const COUNT_PER_PAGE = 100;

export default function EmoticonCommentSection({
  authorId,
  emoticonSetId,
}: {
  authorId: string;
  emoticonSetId: string;
}) {
  const { data } = useCommentQuery({
    set_id: emoticonSetId,
    limit: COUNT_PER_PAGE,
  });

  const comments = data?.success ? data.data.data : [];

  const { currentPage, handlePageChange, totalPages } =
    usePagination(COUNT_PER_PAGE);

  const [commentFormPosition, setCommentFormPosition] = useState<string | null>(
    null,
  );

  const parentComments =
    comments?.filter((comment: CommentDetail) => !comment.parent_comment_id) ||
    [];

  return (
    <section className='tablet:border-radius-2xl bg-primary tablet:padding-24 tablet:gap-24 padding-16 flex flex-col gap-16'>
      <div className='flex items-center gap-4'>
        <h1 className='font-semibold'>댓글</h1>
        <p>({comments?.length || 0}개)</p>
      </div>
      <div className='border-ghost border-b' />
      <div className='flex w-full flex-col gap-24'>
        {parentComments.length > 0 &&
          parentComments.map((comment: CommentDetail) =>
            renderComment({
              comment,
              parentNickname: comment.profile.nickname,
              comments,
              authorId,
              emoticonSetId,
              commentFormPosition,
              setCommentFormPosition,
            }),
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

function renderComment({
  comment,
  depth = 0,
  parentNickname,
  comments,
  authorId,
  emoticonSetId,
  commentFormPosition,
  setCommentFormPosition,
}: {
  comment: CommentDetail;
  depth?: number;
  parentNickname: string;
  comments: CommentDetail[];
  authorId: string;
  emoticonSetId: string;
  commentFormPosition: string | null;
  setCommentFormPosition: (position: string | null) => void;
}) {
  const { session } = useAuth();

  const handleReply = (id: string) => {
    if (commentFormPosition === id) {
      setCommentFormPosition(null);
      return;
    }
    setCommentFormPosition(id);
  };

  const childComments =
    comments?.filter(
      (c: CommentDetail) => c.parent_comment_id === comment.id,
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
        parentNickname={parentNickname}
      />
      {childComments.map((childComment) => (
        <div key={childComment.id} className={cn(depth < 2 && 'ml-24')}>
          {renderComment({
            comment: childComment,
            depth: depth + 1,
            parentNickname,
            comments,
            authorId,
            emoticonSetId,
            commentFormPosition,
            setCommentFormPosition,
          })}
        </div>
      ))}
    </div>
  );
}
