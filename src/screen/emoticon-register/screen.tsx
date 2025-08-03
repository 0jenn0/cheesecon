import EmoticonRegisterMobileScreen from './mobile-screen';
import { EmoticonRegisterContextProvider } from './model/emoticon-register-context';
import EmoticonRegisterDesktopScreen from './responsive/desktop-screen/desktop-screen';

export default function EmoticonRegisterScreen() {
  return (
    <EmoticonRegisterContextProvider>
      <div className='tablet:hidden block'>
        <EmoticonRegisterMobileScreen />
      </div>
      <div className='tablet:block hidden'>
        <EmoticonRegisterDesktopScreen />
      </div>
    </EmoticonRegisterContextProvider>
  );
}
