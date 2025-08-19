import { Button } from '@/shared/ui/input';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';

export default function OrderChangeButton({
  isOrderChangeMode,
  toggleOrderChangeMode,
}: {
  isOrderChangeMode: boolean;
  toggleOrderChangeMode: () => void;
}) {
  const saveReordering = useDraft((s) => s.saveReordering);
  const cancelReordering = useDraft((s) => s.cancelReordering);

  const handleStartOrderChange = () => {
    saveReordering();
    toggleOrderChangeMode();
  };

  const handleCancelOrder = () => {
    toggleOrderChangeMode();
    cancelReordering();
  };

  const handleSaveOrder = () => {
    toggleOrderChangeMode();
    saveReordering();
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
            저장
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
