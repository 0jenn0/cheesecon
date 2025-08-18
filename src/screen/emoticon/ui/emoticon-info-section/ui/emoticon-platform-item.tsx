import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { EmoticonSet } from '@/entity/emoticon-set/type';

export default function EmoticonPlatformItem({
  platform,
}: {
  platform: EmoticonSet['platform'];
}) {
  return (
    <div
      className={cn(
        'padding-8 border-radius-md tablet:w-[160px] flex w-full items-center gap-4',
        platform === 'kakaotalk' ? 'bg-yellow-50' : 'bg-green-50',
      )}
    >
      <Icon
        name={platform === 'kakaotalk' ? 'kakao-logo' : 'ogq-logo'}
        size={20}
      />
      <p
        className={cn(
          platform === 'kakaotalk' ? 'text-yellow-700' : 'text-green-700',
        )}
      >
        {platform === 'kakaotalk' ? '카카오톡' : '라인'}
      </p>
    </div>
  );
}
