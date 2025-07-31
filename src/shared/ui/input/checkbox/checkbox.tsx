import { ComponentPropsWithRef } from 'react';
import { Icon } from '../../display';
import { ICON_NAMES } from '../../icon/config';
import { checkboxVariants } from './checkbox.style';

export const CHECKBOX_STATUS = ['checked', 'unchecked', 'partial'] as const;

export interface CheckboxProps
  extends Omit<ComponentPropsWithRef<'input'>, 'onChange'> {
  status?: (typeof CHECKBOX_STATUS)[number];
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  status = 'unchecked',
  onChange,
  ...props
}: CheckboxProps) {
  const iconName = getIconName(status);

  return (
    <div className={checkboxVariants({ status })}>
      <input
        {...props}
        type='checkbox'
        className='h-0 w-0 opacity-0'
        checked={status === 'checked'}
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
        ref={(input) => {
          if (input) {
            input.indeterminate = status === 'partial';
          }
        }}
      />
      {iconName && (
        <Icon
          name={iconName}
          className='text-primary pointer-events-none absolute'
          size={24}
        />
      )}
    </div>
  );
}

function getIconName(
  status: (typeof CHECKBOX_STATUS)[number],
): (typeof ICON_NAMES)[number] | null {
  if (status === 'checked') return 'check';
  if (status === 'partial') return 'minus';
  return null;
}
