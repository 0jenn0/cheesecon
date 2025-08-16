import { cva } from 'class-variance-authority';

export const placeholderVariants = cva(
  'padding-12 border-radius-lg bg-primary flex min-w-0 items-center justify-center gap-8 border',
  {
    variants: {
      variant: {
        default: 'border-interactive-secondary',
        filled: 'border-interactive-secondary',
        error: 'border-danger',
        disabled: 'border-interactive-secondary bg-disabled cursor-not-allowed',
      },
    },
  },
);
