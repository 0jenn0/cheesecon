import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { SelectOption } from '..';
import { useSelect } from '../../provider/select-provider';

export interface SelectListProps extends ComponentPropsWithRef<'ul'> {
  options: string[];
}

export default function SelectList({ options, ...props }: SelectListProps) {
  const { isOpen } = useSelect();

  return (
    <ul
      {...props}
      className={cn(
        'effect-shadow-16 z-index-popover bg-primary border-radius-md padding-y-4 border-secondary margin-t-8 absolute top-full right-0 left-0 max-h-[300px] w-full flex-col gap-0 overflow-y-auto border',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      {options.map((option, index) => (
        <SelectOption key={`${option}-${index}`} label={option} />
      ))}
    </ul>
  );
}
