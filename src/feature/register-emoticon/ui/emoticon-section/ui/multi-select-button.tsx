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

  const isCheckedItemsIsTwo =
    items.filter((item) => item.isChecked).length === 2;

  const handleChangeOrderSelectedItems = () => {
    const checkedItems = items.filter((item) => item.isChecked);

    const imageNumber = checkedItems[0].imageNumber;
    const newImageNumber = checkedItems[1].imageNumber;

    handleEmoticonItem(imageNumber, 'CHANGE_ORDER', {
      newImageNumber,
    });
  };

  const isCheckedItemsHasImageUrl = items.some(
    (item) => item.isChecked && item.imageUrl,
  );

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
        <div className='flex gap-8'>
          <Button
            variant='secondary'
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
          >
            선택 삭제
          </Button>
        </div>
      )}
    </>
  );
}
