import { Button } from '@/shared/ui/input';
import useEmoticonContext from '../provider/emotion-provider';
import useUIContext from '../provider/ui-provider';

export default function MultiSelectButton() {
  const { isOrderChange, isMultipleSelect, toggleMultipleSelect } =
    useUIContext();
  const { items, handleEmoticonItem } = useEmoticonContext();

  const handleDeleteSelectedItems = () => {
    const checkedItems = items.filter((item) => item.isChecked);
    checkedItems.forEach((item) => {
      if (item.isChecked) {
        handleEmoticonItem(item.imageNumber, 'UPLOAD', {
          imageUrl: '',
        });
      }
      handleEmoticonItem(item.imageNumber, 'UNCHECK');
    });
  };

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
            onClick={toggleMultipleSelect}
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
