import { cva } from 'class-variance-authority';

export const helpMessageVariants = cva('text-body-sm', {
  variants: {
    variant: {
      default: 'text-tertiary',
      error: 'text-danger',
      success: 'text-success',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'icon-tertiary',
      error: 'icon-danger',
      success: 'icon-success',
    },
  },
});
