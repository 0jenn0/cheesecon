import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      primary: 'text-[var(--color-cheesecon-primary-500)]',
      secondary: 'text-[var(--color-cheesecon-secondary-800)]',
      white: 'text-white',
      danger: 'text-danger-bold',
    },
    size: {
      sm: 'width-12 height-12',
      md: 'width-16 height-16',
      lg: 'width-24 height-24',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export default function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
}: SpinnerProps) {
  return (
    <svg
      className={cn(spinnerVariants({ size, variant }), className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}
