import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '../../display';
import { ICON_NAMES } from '../../icon/config';
import { checkboxVariants } from './checkbox.style';

export const CHECKBOX_STATUS = ['checked', 'unchecked', 'partial'] as const;
export type CheckboxStatus = (typeof CHECKBOX_STATUS)[number];

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  status?: CheckboxStatus;
}

export default function Checkbox({
  status = 'unchecked',
  disabled = false,
  onChange,
  ...props
}: CheckboxProps) {
  const { defaultChecked, ...restProps } = props;
  const iconName = getIconName(status);

  return (
    <div className={checkboxVariants({ status, disabled })}>
      <input
        {...restProps}
        type='checkbox'
        disabled={disabled}
        className={cn(
          'absolute h-full w-full opacity-0 outline-none',
          disabled && 'cursor-not-allowed',
        )}
        checked={status === 'checked'}
        onChange={onChange}
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
