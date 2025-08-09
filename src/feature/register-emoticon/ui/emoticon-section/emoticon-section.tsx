'use client';

import { UIProvider } from './provider';
import {
  EmoticonGrid,
  MultiSelectButton,
  MultiUploadButton,
  OrderChangeButton,
} from './ui';

export default function EmoticonSection() {
  return (
    <UIProvider>
      <section className='tablet:border-radius-xl tablet: tablet:padding-24 tablet:bg-white tablet:border-radius-2xl flex w-full flex-col gap-24'>
        <div className='tablet:flex-row tablet:justify-between tablet:items-center flex w-full flex-col gap-16'>
          <h2 className='text-heading-sm'>이모티콘 시안</h2>
          <div className='tablet:hidden block w-full'>
            <MultiUploadButton />
          </div>
          <div className='tablet:justify-normal tablet:gap-24 tablet:w-fit flex w-full justify-between gap-[48px]'>
            <OrderChangeButton />
            <MultiSelectButton />
            <div className='tablet:block hidden'>
              <MultiUploadButton />
            </div>
          </div>
        </div>

        <div className='border-ghost border-b' />

        <EmoticonGrid />
      </section>
    </UIProvider>
  );
}
