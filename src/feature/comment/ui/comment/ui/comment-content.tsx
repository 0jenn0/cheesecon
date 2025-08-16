import { CommentDetail } from '@/entity/comment';
import CommentForm from '../../comment-form/comment-form';
import { useCommentItem } from '../provider';

export default function CommentContent({
  comment,
}: {
  comment: CommentDetail;
}) {
  const { isEditing } = useCommentItem();
  return isEditing ? (
    <CommentForm
      commentId={comment.id}
      targetId={comment.id}
      targetType={comment.set_id ? 'emoticon_set' : 'emoticon_image'}
      parentCommentId={comment.parent_comment_id ?? undefined}
      initialValue={{
        commentId: comment.id,
        content: comment.content,
        images: comment.images,
      }}
    />
  ) : (
    <div>{comment.content}</div>
  );
}
