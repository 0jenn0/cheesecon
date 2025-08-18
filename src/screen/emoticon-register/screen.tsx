'use client';

import EmoticonRegisterMobileScreen from './mobile-screen';
import { EmoticonRegisterContextProvider } from './model/emoticon-register-context';
import { EmoticonRegisterDesktopScreen } from './responsive/desktop-screen';

export default function EmoticonRegisterScreen() {
  return (
    <EmoticonRegisterContextProvider>
          <div className='tablet:hidden padding-b-24 block'>
            <EmoticonRegisterMobileScreen />
          </div>
          <div className='tablet:block padding-b-24 hidden'>
            <EmoticonRegisterDesktopScreen />
          </div>
    </EmoticonRegisterContextProvider>
  );
}
