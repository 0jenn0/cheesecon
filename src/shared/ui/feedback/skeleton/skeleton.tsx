import { ComponentProps } from 'react';

export interface SkeletonProps extends ComponentProps<'div'> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export default function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-pulse border-radius-lg bg-gray-200 ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
      {...props}
    />
  );
}
