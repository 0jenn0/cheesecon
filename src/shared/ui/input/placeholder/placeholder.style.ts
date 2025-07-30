import { cva } from 'class-variance-authority';

export const placeholderVariants = cva(
  'bg-primary padding-16 border-radius-lg flex items-center justify-center gap-8 border',
  {
    variants: {
      variant: {
        default: 'border-interactive-secondary',
        filled: 'border-interactive-secondary',
        error: 'border-danger focus-within:border-yellow-400',
        disabled: 'border-interactive-secondary bg-disabled cursor-not-allowed',
      },
    },
  },
);
