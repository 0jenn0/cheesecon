import { Modal, useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';

export default function DeleteConfirmModal({
  imageIds,
  onDelete,
}: {
  imageIds: string[];
  onDelete: (imageId: string) => void;
}) {
  const { closeModal } = useModal();

  const handleDelete = () => {
    imageIds.forEach((imageId) => {
      onDelete(imageId);
    });

    closeModal();
  };

  return (
    <>
      <Modal.Header>
        <h2 className='text-body-lg font-semibold'>이모티콘 이미지 삭제</h2>
      </Modal.Header>
      <Modal.Body>
        {imageIds && imageIds.length > 0 ? (
          <div className='flex flex-col gap-8'>
            <p>{imageIds.length}개의 이모티콘을 삭제하시겠습니까?</p>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <div className='flex gap-8'>
          <Button
            variant='secondary'
            styleVariant='outlined'
            className='w-full'
            onClick={() => closeModal()}
          >
            취소
          </Button>
          <Button
            variant='danger'
            styleVariant='outlined'
            className='w-full'
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
}
