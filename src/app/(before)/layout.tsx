import { Tabs } from '@/shared/ui/navigation';
import { HelloSection } from '@/screen/main/ui';

export default function BeforeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='tablet:gap-24 flex h-full w-full flex-col items-center gap-16'>
      <div />
      <HelloSection />
      {children}
    </div>
  );
}
