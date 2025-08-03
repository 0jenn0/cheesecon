import { Button } from '@/shared/ui/input';
import useUIContext from '../provider/ui-provider';

export default function MultiSelectButton() {
  const { isOrderChange, isMultipleSelect, handleMultipleSelect } =
    useUIContext();

  return (
    <Button
      variant='secondary'
      textClassName='text-body-sm font-semibold'
      onClick={handleMultipleSelect}
      disabled={isOrderChange}
    >
      다중 선택
    </Button>
  );
}
