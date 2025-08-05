import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';

export default function SecretIcon({ isSecret }: { isSecret: boolean }) {
  return (
    <div className={cn('border-radius-xl flex h-full items-center gap-2')}>
      <Icon
        name={isSecret ? 'lock' : 'earth'}
        size={16}
        className={cn(isSecret ? 'text-rose-500' : 'text-emerald-500')}
      />
      <p
        className={cn(
          'text-body-sm tablet:block hidden',
          isSecret ? 'text-rose-600' : 'text-emerald-600',
        )}
      >
        {isSecret ? '비밀' : '공개'} 게시물
      </p>
    </div>
  );
}
