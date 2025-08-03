import { Button } from '@/shared/ui/input';
import useEmoticonContext from '../provider/emotion-provider';
import useUIContext from '../provider/ui-provider';

export default function OrderChangeButton() {
  const {
    changeStack,
    clearChangeStack,
    saveInitialOrder,
    clearInitialOrder,
    handleEmoticonItem,
  } = useEmoticonContext();
  const { isOrderChange, handleOrderChange } = useUIContext();

  const handleStartOrderChange = () => {
    saveInitialOrder();
    handleOrderChange(true);
  };

  const handleCancelOrder = () => {
    handleEmoticonItem(0, 'RESTORE_INITIAL_ORDER');
    clearChangeStack();
    clearInitialOrder();
    handleOrderChange(false);
  };

  const handleSaveOrder = () => {
    clearChangeStack();
    clearInitialOrder();
    handleOrderChange(false);
  };

  return (
    <>
      {isOrderChange ? (
        <div className='flex gap-8'>
          <Button
            variant='secondary'
            styleVariant='outlined'
            textClassName='text-body-sm font-semibold'
            className='tablet:w-fit w-full'
            onClick={handleCancelOrder}
          >
            취소
          </Button>
          <Button
            variant='primary'
            textClassName='text-body-sm font-semibold'
            onClick={handleSaveOrder}
            disabled={!changeStack.length}
            className='tablet:w-fit w-full'
          >
            {changeStack.length ? '저장' : '저장됨'}
          </Button>
        </div>
      ) : (
        <Button
          variant='secondary'
          className='tablet:w-fit w-full'
          textClassName='text-body-sm font-semibold'
          onClick={handleStartOrderChange}
        >
          순서 바꾸기
        </Button>
      )}
    </>
  );
}
