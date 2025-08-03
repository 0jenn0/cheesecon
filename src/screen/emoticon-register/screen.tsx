'use client';

import { EmoticonRegisterProvider } from '@/feature/register-emoticon/model/hook';
import { EmoticonProvider } from '@/feature/register-emoticon/ui/emoticon-section/provider';
import EmoticonRegisterMobileScreen from './mobile-screen';
import { EmoticonRegisterContextProvider } from './model/emoticon-register-context';
import { EmoticonRegisterDesktopScreen } from './responsive/desktop-screen';

export default function EmoticonRegisterScreen() {
  return (
    <EmoticonRegisterContextProvider>
      <EmoticonRegisterProvider>
        <EmoticonProvider>
          <div className='tablet:hidden block'>
            <EmoticonRegisterMobileScreen />
          </div>
          <div className='tablet:block hidden'>
            <EmoticonRegisterDesktopScreen />
          </div>
        </EmoticonProvider>
      </EmoticonRegisterProvider>
    </EmoticonRegisterContextProvider>
  );
}
