import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
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

export const textVariants = cva('text-interactive-primary', {
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

export const iconVariants = cva('', {
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
