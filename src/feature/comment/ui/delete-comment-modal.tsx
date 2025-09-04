'use client';

import { DangerModal } from '@/shared/ui/feedback/modal/danger-modal';
import { useDeleteCommentMutation } from '@/entity/comment/query/comment-mutation';

export default function DeleteCommentModal({
  commentId,
  emoticonSetId,
}: {
  commentId: string;
  emoticonSetId: string;
}) {
  const { mutate: deleteCommentMutation } = useDeleteCommentMutation();

  return (
    <DangerModal
      title='댓글 삭제'
      description='댓글을 정말 삭제하시겠어요?'
      onConfirm={() => {
        deleteCommentMutation({ commentId, emoticonSetId: emoticonSetId });
      }}
    />
  );
}
