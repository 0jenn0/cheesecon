import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/shared/ui/input';
import useEmoticonContext from '../provider/emotion-provider';
import useUIContext from '../provider/ui-provider';

export default function OrderChangeButton() {
  const { changeStack, setChangeStack, clearChangeStack, handleEmoticonItem } =
    useEmoticonContext();
  const { isOrderChange, toggleOrderChange, handleOrderChange } =
    useUIContext();

  const handleUndo = () => {
    const reversedChanges = [...changeStack].reverse();
    reversedChanges.forEach((change) => {
      handleEmoticonItem(change.newImageNumber, 'CHANGE_ORDER', {
        newImageNumber: change.imageNumber,
      });
    });
  };

  const handleCancelOrder = () => {
    handleUndo();
    clearChangeStack();
    handleOrderChange(false);
  };

  const handleSaveOrder = () => {
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
            disabled={!changeStack.length}
          >
            {changeStack.length ? '저장' : '저장됨'}
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
