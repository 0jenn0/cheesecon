import { cva } from 'class-variance-authority';
import { iconVariants } from '../button/button.styles';

export const iconButtonVariants = cva(
  'group border-radius-md padding-8 relative inline-flex w-fit cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-interactive-primary text-interactive-primary',
        secondary: 'bg-interactive-secondary text-interactive-secondary',
        danger: 'bg-interactive-danger text-white',
        disabled: 'bg-disabled disabled:cursor-not-allowed',
      },
      styleVariant: {
        outlined: '',
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

export const iconButtonIconVariants = iconVariants;
