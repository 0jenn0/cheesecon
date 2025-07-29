import { SVGProps } from 'react';
import * as icons from '@/shared/asset/icon';
import { ICON_NAMES, iconSize } from './config';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: (typeof ICON_NAMES)[number];
  size?: iconSize;
  className?: string;
}

const kebabToPascal = (kebab: string): string => {
  return kebab
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export default function Icon({
  name,
  size = 16,
  className,
  ...props
}: IconProps) {
  const iconName = kebabToPascal(name) as keyof typeof icons;
  const Icon = icons[iconName];

  if (!Icon) {
    console.warn(`Icon "${name}" (${iconName}) not found`);
    return (
      <div
        className={`flex items-center justify-center bg-red-100 text-red-600 ${className || ''}`}
        style={{ width: size, height: size }}
      >
        ?
      </div>
    );
  }

  return (
    <Icon
      className={className}
      viewBox='0 0 24 24'
      fill='currentColor'
      width={size}
      height={size}
      {...props}
    />
  );
}
