import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { useSelect } from '../../provider/select-provider';
import { selectOptionVariants } from './select-option.style';

export interface SelectOptionProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onSelect'> {
  label: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  (
    { label, isSelected: externalIsSelected, onSelect, className, ...props },
    ref,
  ) => {
    const { currentValue, setCurrentValue, setIsOpen } = useSelect();
    const isSelected = externalIsSelected ?? currentValue === label;

    const handleClick = () => {
      setCurrentValue(label);
      setIsOpen(false);
      onSelect?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        role='option'
        aria-selected={isSelected}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          selectOptionVariants({ isSelected }),
          'hover:bg-secondary focus:bg-secondary cursor-pointer focus:outline-none',
          className,
        )}
        {...props}
      >
        <Icon
          name='check'
          size={16}
          className={cn('opacity-0', isSelected && 'opacity-100')}
        />
        <span className='flex-1'>{label}</span>
      </div>
    );
  },
);

SelectOption.displayName = 'SelectOption';

export default SelectOption;
