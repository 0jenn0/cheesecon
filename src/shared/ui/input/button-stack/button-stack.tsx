import { ComponentPropsWithRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import Button, { ButtonProps } from '../button/button';
import { buttonStackVariants } from './button-stack.style';

export interface ButtonStackProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof buttonStackVariants> {
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
}

export default function ButtonStack({
  primaryButton,
  secondaryButton,
  variant = 'stack',
}: ButtonStackProps) {
  return (
    <div className={cn(buttonStackVariants({ variant }))}>
      <Button {...primaryButton} />
      <Button {...secondaryButton} />
    </div>
  );
}
