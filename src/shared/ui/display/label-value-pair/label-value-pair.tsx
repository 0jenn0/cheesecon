import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import {
  labelValuePairVariants,
  labelVariants,
} from './label-value-pair.style';

export interface LabelValuePairProp
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof labelValuePairVariants> {
  label: string;
  value: ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}

export default function LabelValuePair({
  direction = 'row',
  label,
  value,
  labelClassName,
  valueClassName,
}: LabelValuePairProp) {
  const ValueComponent =
    typeof value === 'string' ? (
      <span className='padding-12 bg-secondary border-radius-md text-body-md flex flex-1'>
        {value}
      </span>
    ) : (
      value
    );

  return (
    <div className={labelValuePairVariants({ direction })}>
      <dt className={cn(labelVariants({ direction }), labelClassName)}>
        {label}
      </dt>
      <dd className={cn('flex-1', valueClassName)}>{ValueComponent}</dd>
    </div>
  );
}
