import { Button } from '@/shared/ui/input';

export default function OrderChangeButton() {
  const handleStartOrderChange = () => {};

  const handleCancelOrder = () => {};

  const handleSaveOrder = () => {};

  return (
    <>
      <div className='tablet:w-fit flex w-full gap-8'>
        {/* <Button
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
        </Button> */}
        <Button
          variant='secondary'
          className='tablet:w-fit w-full'
          textClassName='text-body-sm font-semibold'
          onClick={handleStartOrderChange}
        >
          순서 바꾸기
        </Button>
      </div>
    </>
  );
}
