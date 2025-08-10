import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';

export default function CommentReactForm({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return <div className={cn(className)} {...props}></div>;
}
