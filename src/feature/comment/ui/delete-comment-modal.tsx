import { Modal, useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import { useDeleteCommentMutation } from '@/entity/comment/query/comment-mutation';

export default function DeleteCommentModal({
  commentId,
  emoticonSetId,
}: {
  commentId?: string;
  emoticonSetId?: string;
}) {
  const { closeModal } = useModal();
  const { mutate: deleteComment, isPending: isDeleting } =
    useDeleteCommentMutation({
      commentId,
      emoticonSetId,
      onSuccess: () => {
        closeModal();
        // TODO: 토스트 추가
      },
      onError: () => {
        console.error('댓글 삭제에 실패했습니다.');
      },
    });

  const handleDeleteComment = () => {
    if (!commentId) return;
    deleteComment({ commentId, emoticonSetId: emoticonSetId });
  };

  return (
    <Modal.Container className='tablet:min-w-[400px]'>
      <Modal.Header>
        <Modal.Title>댓글 삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>댓글을 정말 삭제하시겠어요?</p>
      </Modal.Body>
      <Modal.Footer className='flex gap-12'>
        <Button
          variant='secondary'
          styleVariant='filled'
          onClick={closeModal}
          className='w-full'
        >
          취소
        </Button>
        <Button
          variant='danger'
          styleVariant='outlined'
          className='w-full'
          onClick={handleDeleteComment}
          isLoading={isDeleting}
        >
          삭제
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
}
