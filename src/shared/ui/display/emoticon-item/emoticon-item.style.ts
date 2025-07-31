import { cva } from 'class-variance-authority';

export const emoticonItemVariant = cva(
  'border-radius-lg relative flex min-w-[96px] flex-1 flex-col gap-0',
  {
    variants: {
      variant: {
        default: 'bg-interactive-secondary-subtle',
        dragging:
          'effect-shadow-16 border-2 border-[var(--color-cheesecon-primary-300)]',
        changed: 'border-2 border-[var(--color-cheesecon-primary-300)]',
      },
    },
  },
);
