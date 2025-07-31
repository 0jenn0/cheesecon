import { cva } from 'class-variance-authority';

export const labelValuePairVariants = cva('flex w-full gap-12', {
  variants: {
    direction: {
      row: 'flex-row items-center',
      column: 'flex-col items-start',
    },
  },
});

export const labelVariants = cva('text-body-sm text-secondary min-w-[120px]', {
  variants: {
    direction: {
      row: 'border-ghost border-r',
      column: '',
    },
  },
});
