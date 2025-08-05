import { EmoticonSet } from "@/entity/emoticon-set/type";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui/display";

export default function EmoticonPlatformItem({ platform }: { platform: EmoticonSet['platform'] }) {
    return (
      <div
        className={cn(
          'padding-8 border-radius-md tablet:w-[160px] flex w-full items-center gap-4',
          platform === 'kakao' ? 'bg-yellow-50' : 'bg-green-50',
        )}
      >
        <Icon
          name={platform === 'kakao' ? 'kakao-logo' : 'line-logo'}
          size={20}
        />
        <p
          className={cn(
            platform === 'kakao' ? 'text-yellow-00' : 'text-green-700',
          )}
        >
          {platform === 'kakao' ? '카카오톡' : '라인'}
        </p>
      </div>
    );
  }
  