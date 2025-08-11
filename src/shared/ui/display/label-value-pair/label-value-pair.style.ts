import { cva } from 'class-variance-authority';

export const labelValuePairVariants = cva('flex w-full', {
  variants: {
    direction: {
      row: 'flex-row items-center gap-16',
      column: 'flex-col items-start gap-8',
    },
  },
});

export const labelVariants = cva(
  'text-body-sm text-secondary tablet:min-w-[160px] min-w-[100px]',
  {
    variants: {
      direction: {
        row: 'border-ghost border-r',
        column: '',
      },
    },
  },
);
