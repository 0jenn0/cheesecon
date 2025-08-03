import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
  'height-24 width-24 border-radius-md relative flex items-center justify-center',
  {
    variants: {
      status: {
        checked: 'bg-interactive-primary',
        unchecked: 'bg-primary border-interactive-secondary border',
        partial: 'bg-interactive-primary',
      },
    },
  },
);
