'use client';

import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { usePagination } from '@/shared/lib/use-pagination';
import { Icon } from '@/shared/ui/display';
import { Pagination } from '@/shared/ui/navigation';
import { useCommentListQuery } from '@/entity/comment';
import { CommentDetail } from '@/entity/comment/api/types';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { DefaultCommentForm } from '@/feature/comment/ui';
import EmoticonCommentSectionSkeleton from './emoticon-comment-section.skeleton';
import { CommentSectionUiProvider } from './provider/use-comment-section-ui';
import { RenderCommentForm } from './ui';

const COUNT_PER_PAGE = 100;

interface EmoticonCommentSectionProps extends ComponentPropsWithRef<'section'> {
  authorId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  targetId: string;
  headerAction?: React.ReactNode;
}

export default function EmoticonCommentSection({
  authorId,
  targetType,
  targetId,
  className,
  headerAction,
  ...props
}: EmoticonCommentSectionProps) {
  const queryKeyField = targetType === 'emoticon_set' ? 'set_id' : 'image_id';

  const { data, isLoading } = useCommentListQuery({
    [queryKeyField]: targetId || null,
    limit: COUNT_PER_PAGE,
    offset: 0,
  });

  const isInitialLoading = isLoading && !data;
  const comments: CommentDetail[] = data ?? [];

  const { currentPage, handlePageChange, totalPages } =
    usePagination(COUNT_PER_PAGE);

  const { session } = useAuth();

  const parentComments =
    comments?.filter((comment: CommentDetail) => !comment.parent_comment_id) ||
    [];

  return (
    <CommentSectionUiProvider>
      {isInitialLoading ? (
        <EmoticonCommentSectionSkeleton />
      ) : (
        <section
          className={cn(
            'tablet:gap-24 flex h-full w-full flex-col gap-16',
            className,
          )}
          {...props}
        >
          <div className='flex flex-col gap-8'>
            <div className='border-ghost flex items-center justify-between'>
              <div className='padding-8 flex items-center gap-4'>
                <h1 className='font-semibold'>댓글</h1>
                <p>({comments?.length || 0}개)</p>
              </div>
              {headerAction}
            </div>
            <div className='border-ghost border-b' />
          </div>

          <div className='flex w-full flex-1 flex-col gap-24'>
            {parentComments.length > 0 &&
              parentComments.map((comment: CommentDetail) => (
                <RenderCommentForm
                  key={comment.id}
                  comment={comment}
                  parentNickname={comment.profile.nickname ?? ''}
                  comments={comments}
                  authorId={authorId}
                  targetId={targetId}
                  targetType={targetType}
                  session={session}
                />
              ))}

            {parentComments.length === 0 && !isLoading && (
              <div className='padding- flex w-full items-center justify-center gap-8'>
                <p className='text-tertiary'>첫 피드백을 남겨주세요!</p>
                <Icon
                  name='message-loading'
                  size={20}
                  className='text-gray-300'
                />
              </div>
            )}
          </div>

          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages || 1}
              onPageChange={handlePageChange}
              className='mt-6'
            />
            <DefaultCommentForm targetId={targetId} targetType={targetType} />
          </div>
        </section>
      )}
    </CommentSectionUiProvider>
  );
}
