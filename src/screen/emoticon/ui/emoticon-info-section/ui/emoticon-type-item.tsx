import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { EmoticonSet } from '@/entity/emoticon-set/type';

export default function EmoticonTypeItem({
  type,
}: {
  type: EmoticonSet['type'];
}) {
  return (
    <div
      className={cn(
        'padding-8 border-radius-md tablet:w-[160px] flex w-full items-center gap-4',
        type === 'animated' ? 'bg-rose-50' : 'bg-gray-50',
      )}
    >
      <Icon
        name={type === 'animated' ? 'smile-move' : 'smile'}
        size={20}
        className={type === 'animated' ? 'text-rose-600' : 'text-gray-600'}
      />
      <p
        className={cn(type === 'animated' ? 'text-rose-600' : 'text-gray-600')}
      >
        {type === 'animated' ? '움직이는 이모티콘' : '멈춰있는 이모티콘'}
      </p>
    </div>
  );
}
