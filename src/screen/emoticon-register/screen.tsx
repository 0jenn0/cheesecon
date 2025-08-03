'use client';

import { EmoticonProvider } from '@/feature/register-emoticon/ui/emoticon-section/provider';
import EmoticonRegisterMobileScreen from './mobile-screen';
import { EmoticonRegisterContextProvider } from './model/emoticon-register-context';
import { EmoticonRegisterDesktopScreen } from './responsive/desktop-screen';

export default function EmoticonRegisterScreen() {
  return (
    <EmoticonRegisterContextProvider>
      <EmoticonProvider>
        <div className='tablet:hidden block'>
          <EmoticonRegisterMobileScreen />
        </div>
        <div className='tablet:block hidden'>
          <EmoticonRegisterDesktopScreen />
        </div>
      </EmoticonProvider>
    </EmoticonRegisterContextProvider>
  );
}
