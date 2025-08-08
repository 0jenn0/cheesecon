import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface CommentReactFormProps extends ComponentPropsWithRef<'div'> {}

export default function CommentReactForm({
  className,
  ...props
}: CommentReactFormProps) {
  return <div className={cn(className)} {...props}></div>;
}
