import { PopularScreen } from '@/screen';
import { HelloSection } from '@/screen/main/ui';

export default function PopularPage() {
  return (
    <div className='tablet:gap-24 flex w-full flex-col gap-16'>
      <HelloSection />
      <PopularScreen />
    </div>
  );
}
