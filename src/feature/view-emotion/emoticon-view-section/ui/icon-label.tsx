import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/icon/config';

export function IconLabel({
  icon,
  label,
  iconClassName,
}: {
  icon: (typeof ICON_NAMES)[number];
  label: number | null;
  iconClassName?: string;
}) {
  return (
    <div className='flex gap-2'>
      <Icon name={icon} className={cn('text-gray-500', iconClassName)} />
      <p className='text-body-sm text-secondary'>{label}</p>
    </div>
  );
}
