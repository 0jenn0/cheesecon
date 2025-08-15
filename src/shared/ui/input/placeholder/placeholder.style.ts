import { cva } from 'class-variance-authority';

export const placeholderVariants = cva(
  'bg-primary padding-x-8 padding-y-12 border-radius-lg flex items-center justify-center gap-8 border',
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
