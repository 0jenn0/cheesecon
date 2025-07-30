import { cva } from 'class-variance-authority';

export const buttonStackVariants = cva('flex w-full', {
  variants: {
    variant: {
      stack: 'flex-col gap-8 *:flex-1',
      justify: 'gap-12 *:flex-1',
      start: 'justify-start gap-12',
      end: 'justify-end gap-12',
      center: 'justify-center gap-12',
    },
  },
});
