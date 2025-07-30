import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { useSelect } from '../../provider/select-provider';
import { selectOptionVariants } from './select-option.style';

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
