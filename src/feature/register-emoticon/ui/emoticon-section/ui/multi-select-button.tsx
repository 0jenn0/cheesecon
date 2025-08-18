import { useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';

export default function MultiSelectButton() {
  const { openModal } = useModal();

  const handleClickCancel = () => {};

  const handleDeleteSelectedItems = () =>
    openModal('deleteConfirm', {
      items: [],
      handleEmoticonItem: () => {},
    });

  const isCheckedItems = 0;

  return (
    <>
      {false ? (
        <Button
          variant='secondary'
          textClassName='text-body-sm font-semibold'
          className='tablet:w-fit w-full'
          onClick={() => {}}
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
    </>
  );
}
