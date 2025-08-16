import { ApproveCalendar } from '@/feature/calendar/ui';
import HelloSection from '@/screen/main/ui/hello-section';

export default function BeforeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='padding-y-0 tablet:padding-y-12 flex h-full w-full flex-col items-center gap-12'>
      <div className='tablet:gap-8 tablet:flex-row flex w-full flex-col gap-12'>
        <HelloSection className='tablet:flex-1 flex-2' />
        <ApproveCalendar className='flex-1' />
      </div>
      {children}
    </div>
  );
}
