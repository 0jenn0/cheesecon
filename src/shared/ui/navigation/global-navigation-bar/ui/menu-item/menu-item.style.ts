import { cva } from 'class-variance-authority';

export const menuItemVariants = cva(
  'text-body-md bg-interactive-secondary-subtle padding-x-16 padding-y-8 flex items-center gap-4 select-none',
  {
    variants: {
      isSelected: {
        true: 'bg-interactive-selected',
      },
    },
  },
);
