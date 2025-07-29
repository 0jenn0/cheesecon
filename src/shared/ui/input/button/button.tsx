import { ComponentPropsWithRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { ICON_NAMES } from '../../display/icon/config';
import Icon from '../../display/icon/icon';
import { Spinner } from '../../feedback';

const buttonVariants = cva(
  'group border-radius-md relative flex cursor-pointer items-center justify-center gap-8 transition-colors disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-interactive-primary text-interactive-primary',
        secondary: 'bg-interactive-secondary text-interactive-secondary',
        danger: 'bg-interactive-danger text-white',
        disabled: 'bg-disabled disabled:cursor-not-allowed',
      },
      size: {
        sm: 'padding-x-12 padding-y-8 text-body-md',
        md: 'padding-x-16 padding-y-12 text-body-lg h-10',
      },
      styleVariant: {
        outlined: 'rounded-[4px]', // FIXME: outlined일 때만 border-radius-md가 적용안됨
        filled: '',
        transparent: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        styleVariant: 'outlined',
        className:
          'bg-interactive-primary-subtle border-interactive-primary border',
      },
      {
        variant: 'secondary',
        styleVariant: 'outlined',
        className:
          'bg-interactive-secondary-subtle border-interactive-secondary border',
      },
      {
        variant: 'danger',
        styleVariant: 'outlined',
        className:
          'bg-interactive-danger-subtle border-interactive-danger border',
      },
      {
        variant: 'primary',
        styleVariant: 'transparent',
        className: 'bg-interactive-primary-subtle',
      },
      {
        variant: 'secondary',
        styleVariant: 'transparent',
        className: 'bg-interactive-secondary-subtle',
      },
      {
        variant: 'danger',
        styleVariant: 'transparent',
        className: 'bg-interactive-danger-transparent',
      },
    ],
  },
);

const textVariants = cva('text-interactive-primary', {
  variants: {
    variant: {
      primary: 'text-interactive-primary',
      secondary: 'text-interactive-secondary',
      danger: 'text-interactive-inverse',
      disabled: 'text-disabled',
    },
    styleVariant: {
      outlined: '',
      filled: '',
      transparent: '',
    },
  },
  compoundVariants: [
    {
      variant: 'danger',
      styleVariant: 'outlined',
      className: 'text-danger-bold',
    },
    {
      variant: 'danger',
      styleVariant: 'transparent',
      className: 'text-danger-bold',
    },
  ],
});

const iconVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-interactive-primary',
      secondary: 'text-interactive-secondary',
      tertiary: 'text-interactive-secondary',
      danger: 'text-interactive-inverse',
      disabled: 'text-disabled',
    },
    styleVariant: {
      outlined: '',
      filled: '',
      transparent: '',
    },
    size: {
      sm: 'width-16 height-16',
      md: 'width-24 height-24',
    },
  },
  compoundVariants: [
    {
      variant: 'danger',
      styleVariant: 'outlined',
      className: 'text-danger-bold',
    },
    {
      variant: 'danger',
      styleVariant: 'transparent',
      className: 'text-danger-bold',
    },
  ],
});

export interface ButtonProps
  extends ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: (typeof ICON_NAMES)[number];
  trailingIcon?: (typeof ICON_NAMES)[number];
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  styleVariant = 'filled',
  leadingIcon,
  trailingIcon,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const spinnerSize = size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg';
  const spinnerVariant =
    variant === 'primary'
      ? 'secondary'
      : variant === 'secondary'
        ? 'secondary'
        : variant === 'danger' && styleVariant !== 'filled'
          ? 'danger'
          : 'white';

  const finalVariant = disabled ? 'disabled' : variant;

  return (
    <button
      className={cn(
        buttonVariants({ variant: finalVariant, size, styleVariant }),
      )}
      disabled={disabled}
      {...props}
    >
      {isLoading && (
        <Spinner
          size={spinnerSize}
          variant={spinnerVariant}
          className='absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
        />
      )}
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          className={cn(
            iconVariants({ size, variant: finalVariant, styleVariant }),
            isLoading && 'opacity-0',
          )}
        />
      )}
      <div
        className={cn(
          textVariants({ variant: finalVariant, styleVariant }),
          isLoading && 'opacity-0',
        )}
      >
        {children}
      </div>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          className={cn(
            iconVariants({ size, variant: finalVariant, styleVariant }),
            isLoading && 'opacity-0',
          )}
        />
      )}
    </button>
  );
}
