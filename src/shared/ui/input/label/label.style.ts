import { cva } from 'class-variance-authority';

export const trailingLabelVariants = cva('*:text-body-md', {
  variants: {
    type: {
      default: 'text-primary',
      required: 'text-danger',
      optional: 'text-tertiary',
    },
  },
});

export const labelStyle = 'text-body-md text-primary flex items-center gap-4';
