import { cva } from 'class-variance-authority';

export const selectPlaceholderVariants = cva(
  'bg-primary padding-x-12 border-radius-lg placeholder:placeholder-text-primary flex w-full cursor-pointer items-center justify-between select-none',
  {
    variants: {
      variant: {
        default: 'border-interactive-secondary border',
        filled: 'border-interactive-secondary border',
        error: 'border-danger border',
        disabled:
          'border-interactive-secondary bg-disabled cursor-not-allowed border',
      },
      isOpen: {
        true: '!border-[var(--color-border-interactive-primary)]',
        false: '',
      },
    },
  },
);
