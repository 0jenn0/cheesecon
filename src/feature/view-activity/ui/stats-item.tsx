import { cn } from '@/shared/lib';
import Icon, { IconProps } from '@/shared/ui/icon/icon';

interface StatsItemProps {
  label: string;
  value: number | string;
  changes: number;
  iconName: IconProps['name'];
}

export default function StatsItem({
  label,
  value,
  changes,
  iconName,
}: StatsItemProps) {
  return (
    <section className='bg-primary padding-12 border-ghost flex h-fit items-center gap-16 border-b-[0.6px]'>
      <div className='padding-12 border-radius-lg bg-secondary flex aspect-square h-full items-center justify-center'>
        <Icon name={iconName} className='text-black/20' size={32} />
      </div>

      <div className='flex flex-1 flex-col gap-12'>
        <div className='text-body-md font-medium'>{label}</div>
        <div className='flex items-center justify-between'>
          <div className='flex items-end gap-1'>
            <span className={cn('text-body-lg font-semibold text-yellow-500')}>
              {value}
            </span>
            <span className='text-body-sm text-secondary font-medium'>개</span>
          </div>

          {changes !== 0 && <ChangeItem changes={changes} />}
        </div>
      </div>
    </section>
  );
}

function ChangeItem({ changes }: { changes: number }) {
  const isPositive = changes > 0;

  return (
    <div
      className={cn(
        'padding-x-8 padding-y-4 border-radius-rounded flex items-center gap-4',
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-700',
      )}
    >
      <span className='text-body-sm'>이번 주</span>
      <div className='flex items-center gap-2'>
        <Icon name={isPositive ? 'plus' : 'minus'} size={12} />
        <span className='text-body-sm font-bold'>{changes}</span>
      </div>
    </div>
  );
}
