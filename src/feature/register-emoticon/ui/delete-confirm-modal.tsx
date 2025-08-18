import { Modal, useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';

export default function DeleteConfirmModal({
  items,
  handleEmoticonItem,
}: {
  items: EmoticonImageState[];
  handleEmoticonItem: (
    imageNumber: number,
    action: 'UPLOAD' | 'UNCHECK',
    options?: { imageUrl?: string },
  ) => void;
}) {
  const { closeModal } = useModal();

  const checkedItems = items.filter((item) => item.is_representative);
  const checkedItemsImageNumber = checkedItems.map((item) => item.image_order);
  const checkItemsCount = checkedItemsImageNumber.length;

  const handleDelete = () => {
    checkedItemsImageNumber.forEach((imageNumber) => {
      handleEmoticonItem(imageNumber, 'UPLOAD', { imageUrl: '' });
      handleEmoticonItem(imageNumber, 'UNCHECK');
    });

    closeModal();
  };

  return (
    <>
      <Modal.Header>
        <h2 className='text-body-lg font-semibold'>이모티콘 이미지 삭제</h2>
      </Modal.Header>
      <Modal.Body>
        {checkItemsCount > 0 ? (
          <div className='flex flex-col gap-8'>
            <p>{checkItemsCount}개의 이모티콘을 삭제하시겠습니까?</p>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <div className='flex gap-8'>
          <Button
            variant='secondary'
            styleVariant='outlined'
            className='w-full'
            onClick={closeModal}
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
