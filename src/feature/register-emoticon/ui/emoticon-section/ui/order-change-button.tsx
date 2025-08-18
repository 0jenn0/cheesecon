import { Button } from '@/shared/ui/input';

export default function OrderChangeButton({
  isOrderChangeMode,
  toggleOrderChangeMode,
}: {
  isOrderChangeMode: boolean;
  toggleOrderChangeMode: () => void;
}) {
  const handleStartOrderChange = () => {
    toggleOrderChangeMode();
  };

  const handleCancelOrder = () => {
    toggleOrderChangeMode();
  };

  const handleSaveOrder = () => {
    toggleOrderChangeMode();
  };

  return (
    <>
      {isOrderChangeMode ? (
        <div className='tablet:w-fit flex w-full gap-8'>
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
            disabled={false}
            className='tablet:w-fit w-full'
          >
            {'저장'}
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
