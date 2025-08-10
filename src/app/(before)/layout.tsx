import { HelloSection } from '@/screen/main/ui';

export default function BeforeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='padding-y-16 tablet:padding-y-24 tablet:gap-24 flex h-full w-full flex-col items-center gap-16'>
      {children}
    </div>
  );
}
