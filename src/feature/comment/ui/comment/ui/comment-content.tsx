import { CommentDetail } from '@/entity/comment';
import CommentForm from '../../comment-form';
import { useCommentItem } from '../provider';

export default function CommentContent({
  comment,
}: {
  comment: CommentDetail;
}) {
  const { isEditing, targetId, targetType } = useCommentItem();
  return (
    <>
      {isEditing ? (
        <CommentForm
          targetId={targetId}
          targetType={targetType}
          commentId={comment.id}
          parentCommentId={comment.id}
          className='padding-t-8'
          initialValue={comment.content}
        />
      ) : (
        <div>{comment.content}</div>
      )}
    </>
  );
}
