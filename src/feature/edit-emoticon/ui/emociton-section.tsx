'use client';

import { useCallback, useState } from 'react';
import { EmoticonImage } from '@/entity/emoticon-set';
import {
  EmoticonGrid,
  MultiSelectButton,
  MultiUploadButton,
  OrderChangeButton,
} from '@/feature/register-emoticon/ui/emoticon-section/ui';

export default function EmoticonEditSection() {
  const [isOrderChangeMode, setIsOrderChangeMode] = useState(false);
  const [isMultiSelectedMode, setIsMultiSelectedMode] = useState(false);

  const toggleOrderChangeMode = useCallback(() => {
    setIsOrderChangeMode((prev) => !prev);
  }, []);

  const toggleMultiSelectedMode = useCallback(() => {
    setIsMultiSelectedMode((prev) => !prev);
  }, []);

  return (
    <section className='tablet:border-radius-xl tablet: tablet:padding-24 tablet:bg-white tablet:border-radius-2xl flex w-full flex-col gap-24'>
      <div className='tablet:flex-row tablet:justify-between tablet:items-center flex w-full flex-col gap-16'>
        <h2 className='text-heading-sm'>이모티콘 시안</h2>
        <div className='tablet:hidden block w-full'>
          <MultiUploadButton />
        </div>
        <div className='tablet:justify-normal tablet:gap-24 tablet:w-fit flex w-full justify-between gap-[48px]'>
          <OrderChangeButton
            isOrderChangeMode={isOrderChangeMode}
            toggleOrderChangeMode={toggleOrderChangeMode}
          />
          <MultiSelectButton
            isMultiSelectedMode={isMultiSelectedMode}
            toggleMultiSelectedMode={toggleMultiSelectedMode}
          />
          <div className='tablet:block hidden'>
            <MultiUploadButton />
          </div>
        </div>
      </div>

      <div className='border-ghost border-b' />

      <EmoticonGrid
        isOrderChangeMode={isOrderChangeMode}
        isMultiSelectedMode={isMultiSelectedMode}
      />
    </section>
  );
}
