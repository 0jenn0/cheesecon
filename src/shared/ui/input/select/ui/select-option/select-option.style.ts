import { cva } from 'class-variance-authority';

export const selectOptionVariants = cva(
  'bg-interactive-secondary-subtle padding-x-8 padding-y-4 flex cursor-pointer items-center gap-4 select-none',
  {
    variants: {
      isSelected: {
        true: 'bg-interactive-selected',
      },
    },
  },
);
