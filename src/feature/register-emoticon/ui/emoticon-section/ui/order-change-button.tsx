import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/shared/ui/input';
import useEmoticonContext from '../provider/emotion-provider';
import useUIContext from '../provider/ui-provider';

export default function OrderChangeButton() {
  const { items, handleEmoticonItem } = useEmoticonContext();
  const { isOrderChange, toggleOrderChange, handleOrderChange } =
    useUIContext();

  const [isSaveChanged, setIsSaveChanged] = useState(false);

  const handleCancelOrder = () => {
    setIsSaveChanged(false);
    handleOrderChange(false);
  };

  const handleSaveOrder = () => {
    setIsSaveChanged(true);
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
            onClick={handleCancelOrder}
          >
            취소
          </Button>
          <Button
            variant='primary'
            textClassName='text-body-sm font-semibold'
            onClick={handleSaveOrder}
            disabled={!isSaveChanged}
          >
            {isSaveChanged ? '저장' : '저장됨'}
          </Button>
        </div>
      ) : (
        <Button
          variant='secondary'
          textClassName='text-body-sm font-semibold'
          onClick={toggleOrderChange}
        >
          순서 바꾸기
        </Button>
      )}
    </>
  );
}
