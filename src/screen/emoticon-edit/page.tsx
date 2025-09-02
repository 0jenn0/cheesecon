'use client';

import { EmoticonImage, EmoticonSetInfo } from '@/entity/emoticon-set';
import { DraftProvider } from '@/feature/register-emoticon/model/draft-context';
import { EmoticonRegisterContextProvider } from '../emoticon-register/model/emoticon-register-context';
import EmoticonEditScreenDesktop from './ui/emoticon-edit-screen.desktop';

export default function EmoticonEditScreen({
  initialEmoticonInfo,
  initialImages,
}: {
  initialEmoticonInfo: EmoticonSetInfo;
  initialImages: EmoticonImage[];
}) {
  return (
    <EmoticonRegisterContextProvider>
      <DraftProvider
        initialMeta={initialEmoticonInfo}
        initialImages={initialImages}
      >
        {/* <div className='tablet:hidden padding-b-24 block'>
          <EmoticonRegisterMobileScreen />
        </div> */}
        <div className='tablet:block padding-b-24 hidden'>
          <EmoticonEditScreenDesktop />
        </div>
      </DraftProvider>
    </EmoticonRegisterContextProvider>
  );
}
