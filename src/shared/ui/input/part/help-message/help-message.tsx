import { ComponentPropsWithRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { ICON_NAMES } from '@/shared/ui/display/icon/config';
import Icon from '@/shared/ui/display/icon/icon';
import { helpMessageVariants, iconVariants } from './help-message.style';

export interface HelpMessageProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof helpMessageVariants> {}

export default function HelpMessage({
  variant = 'default',
  className,
  children,
  ...props
}: HelpMessageProps) {
  const iconName = getIconName(variant);

  return (
    <div className='flex items-center gap-4' {...props}>
      {iconName && (
        <Icon name={iconName} size={16} className={iconVariants({ variant })} />
      )}
      <span className={helpMessageVariants({ variant })}>{children}</span>
    </div>
  );
}

function getIconName(
  variant: HelpMessageProps['variant'],
): (typeof ICON_NAMES)[number] | null {
  if (variant === 'error') return 'alert-circle';
  if (variant === 'success') return 'check-circle';
  return null;
}
