'use client';

import { cn } from '@/shared/lib';
import { CommentDetail } from '@/entity/comment';
import { Session } from '@supabase/supabase-js';
import { Comment } from '../../comment';
import CommentForm from '../../comment-form/comment-form';
import { CommentItemProvider } from '../../comment/provider';
import { useCommentSectionUi } from '../provider/use-comment-section-ui';

export default function RenderCommentForm({
  comment,
  depth = 0,
  parentNickname,
  comments,
  authorId,
  targetId,
  targetType,
  session,
}: {
  comment: CommentDetail;
  depth?: number;
  parentNickname: string;
  comments: CommentDetail[];
  authorId: string;
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  session: Session | null;
}) {
  const { isShowingForm } = useCommentSectionUi(comment.id);

  const childComments =
    comments?.filter(
      (c: CommentDetail) => c.parent_comment_id === comment.id,
    ) || [];

  return (
    <div className='flex flex-col gap-16' key={comment.id}>
      <CommentItemProvider
        commentId={comment.id}
        targetId={targetId}
        targetType={targetType}
        userType={
          session?.user.id === comment.user_id
            ? 'me'
            : comment.user_id === authorId
              ? 'author'
              : 'other'
        }
      >
        <Comment
          comment={comment}
          asChild={depth > 0}
          userType={
            session?.user.id === comment.user_id
              ? 'me'
              : comment.user_id === authorId
                ? 'author'
                : 'other'
          }
          targetId={targetId}
          targetType={targetType}
          parentNickname={parentNickname}
        />
      </CommentItemProvider>
      {childComments.map((childComment) => (
        <div key={childComment.id} className={cn(depth < 2 && 'ml-24')}>
          <RenderCommentForm
            comment={childComment}
            depth={depth + 1}
            parentNickname={parentNickname}
            comments={comments}
            authorId={authorId}
            targetId={targetId}
            targetType={targetType}
            session={session}
          />
        </div>
      ))}
      {isShowingForm && (
        <CommentForm
          targetId={targetId}
          targetType={targetType}
          parentCommentId={comment.id}
          className={cn(depth < 2 && 'ml-24')}
        />
      )}
    </div>
  );
}
