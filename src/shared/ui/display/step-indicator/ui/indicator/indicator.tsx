import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';

export const indicatorVariants = cva('height-8 border-radius-rounded', {
  variants: {
    currentStep: {
      true: 'width-24 bg-cheesecon-primary-300',
      false: 'width-16 bg-cheesecon-secondary-100',
    },
  },
});

interface IndicatorProps {
  step: number;
  currentStep: number;
}

export default function Indicator({ step, currentStep }: IndicatorProps) {
  return (
    <div
      className={cn(indicatorVariants({ currentStep: currentStep === step }))}
    />
  );
}
