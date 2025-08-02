import { Button } from '@/shared/ui/input';

interface OrderChangeButtonProps {
  isOrderChange: boolean;
  handleCancelOrder: () => void;
  handleSaveOrder: () => void;
  handleOrderChange: () => void;
  hasUnsavedChanges: boolean;
}

export default function OrderChangeButton({
  isOrderChange,
  handleCancelOrder,
  handleSaveOrder,
  handleOrderChange,
  hasUnsavedChanges,
}: OrderChangeButtonProps) {
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
            disabled={!hasUnsavedChanges}
          >
            {hasUnsavedChanges ? '저장' : '저장됨'}
          </Button>
        </div>
      ) : (
        <Button
          variant='secondary'
          textClassName='text-body-sm font-semibold'
          onClick={handleOrderChange}
        >
          순서 바꾸기
        </Button>
      )}
    </>
  );
}
