'use client';

import { EmoticonProvider, UIProvider } from './provider';
import { EmoticonGrid, MultiSelectButton, OrderChangeButton } from './ui';

export default function EmoticonSection() {
  return (
    <UIProvider>
      <EmoticonProvider>
        <section className='tablet:border-radius-xl tablet: tablet:padding-24 tablet:bg-white tablet:border-radius-2xl flex w-full flex-col gap-24'>
          <div className='tablet:flex-row tablet:justify-between tablet:items-center flex w-full flex-col gap-16'>
            <h2 className='text-heading-sm'>이모티콘 시안들</h2>
            <div className='tablet:justify-normal tablet:gap-24 flex w-full justify-between gap-[48px]'>
              <OrderChangeButton />
              <MultiSelectButton />
            </div>
          </div>

          <div className='border-ghost border-b' />

          <EmoticonGrid />
        </section>
      </EmoticonProvider>
    </UIProvider>
  );
}
