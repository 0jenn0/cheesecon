import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  'bg-cheesecon-primary-300 flex items-center justify-center overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'height-24 width-24',
        lg: 'height-64 width-64',
      },
    },
  },
);

export const letterVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'text-body-sm',
      lg: 'text-body-lg',
    },
  },
});
