'use client';

import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { EmoticonSetInfo } from '@/entity/emoticon-set';
import { DraftProvider } from '@/feature/register-emoticon/model/draft-context';
import { EmoticonRegisterContextProvider } from './model/emoticon-register-context';
import {
  EmoticonFormDesktopScreen,
  EmoticonFormMobileScreen,
} from './responsive';

interface EmoticonFormScreenProps {
  action: 'create' | 'update';
  initialEmoticonInfo?: Partial<EmoticonSetInfo>;
  initialImages?: EmoticonImageState[];
}

export default function EmoticonFormScreen({
  action,
  initialEmoticonInfo,
  initialImages,
}: EmoticonFormScreenProps) {
  return (
    <EmoticonRegisterContextProvider>
      <DraftProvider
        initialMeta={initialEmoticonInfo}
        initialImages={initialImages}
      >
        <div className='tablet:hidden padding-b-24 block'>
          <EmoticonFormMobileScreen action={action} />
        </div>
        <div className='tablet:block padding-b-24 hidden'>
          <EmoticonFormDesktopScreen action={action} />
        </div>
      </DraftProvider>
    </EmoticonRegisterContextProvider>
  );
}
