import { useModal } from '@/shared/ui/feedback/modal';
import { Button } from '@/shared/ui/input';
import DeleteConfirmModal from '../../delete-confirm-modal';
import useEmoticonContext from '../provider/emotion-provider';
import useUIContext from '../provider/ui-provider';

export default function MultiSelectButton() {
  const { openModal } = useModal();
  const { isMultipleSelect, toggleMultipleSelect } = useUIContext();

  const { items, handleEmoticonItem } = useEmoticonContext();

  const handleClickCancel = () => {
    toggleMultipleSelect();
    items.forEach((item) => {
      handleEmoticonItem(item.imageNumber, 'UNCHECK');
    });
  };

  const handleDeleteSelectedItems = () => openModal('deleteConfirm');

  const isCheckedItems = items.filter((item) => item.isChecked).length;

  return (
    <>
      {!isMultipleSelect ? (
        <Button
          variant='secondary'
          textClassName='text-body-sm font-semibold'
          className='tablet:w-fit w-full'
          onClick={toggleMultipleSelect}
        >
          다중 선택
        </Button>
      ) : (
        <div className='tablet:w-fit flex w-full gap-8'>
          <Button
            variant='secondary'
            styleVariant='outlined'
            textClassName='text-body-sm font-semibold'
            className='tablet:w-fit w-full'
            onClick={handleClickCancel}
          >
            취소
          </Button>
          <Button
            variant='danger'
            styleVariant='outlined'
            textClassName='text-body-sm font-semibold'
            className='tablet:w-fit w-full'
            onClick={handleDeleteSelectedItems}
            disabled={!isCheckedItems}
          >
            선택 삭제
          </Button>
        </div>
      )}
      <DeleteConfirmModal />
    </>
  );
}
