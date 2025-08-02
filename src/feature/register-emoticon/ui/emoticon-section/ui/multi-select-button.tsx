import { Button } from '@/shared/ui/input';

interface MultiSelectButtonProps {
  handleMultipleSelect: () => void;
  isOrderChange: boolean;
}

export default function MultiSelectButton({
  handleMultipleSelect,
  isOrderChange,
}: MultiSelectButtonProps) {
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
