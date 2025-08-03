import { EmoticonRegisterMobileScreen, EmoticonRegisterScreen } from '@/screen';

export default function EmoticonRegisterPage() {
  return (
    <div>
      <div className='tablet:block hidden'>
        <EmoticonRegisterScreen />
      </div>

      <div className='tablet:hidden block'>
        <EmoticonRegisterMobileScreen />
      </div>
    </div>
  );
}
