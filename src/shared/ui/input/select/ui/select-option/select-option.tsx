import { ComponentPropsWithRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { useSelect } from '../../provider/select-provider';

const selectOptionVariants = cva(
  'bg-interactive-secondary-subtle padding-x-8 padding-y-4 flex items-center gap-4',
  {
    variants: {
      isSelected: {
        true: 'bg-interactive-selected',
      },
    },
  },
);

export interface SelectOptionProps extends ComponentPropsWithRef<'li'> {
  label: string;
}

export default function SelectOption({ label, ...props }: SelectOptionProps) {
  const { currentValue, setCurrentValue } = useSelect();
  const isSelected = currentValue === label;

  const handleClick = () => {
    setCurrentValue(label);
  };

  return (
    <li
      {...props}
      onClick={handleClick}
      className={cn(selectOptionVariants({ isSelected }))}
    >
      <Icon
        name='check'
        size={16}
        className={cn('opacity-0', isSelected && 'opacity-100')}
      />
      {label}
    </li>
  );
}
