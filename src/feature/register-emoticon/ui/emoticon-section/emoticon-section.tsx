'use client';

import { EmoticonProvider, UIProvider } from './provider';
import { EmoticonGrid, MultiSelectButton, OrderChangeButton } from './ui';

export default function EmoticonSection() {
  return (
    <UIProvider>
      <EmoticonProvider>
        <section className='tablet:border-radius-xl tablet: tablet:padding-24 tablet:bg-white tablet:border-radius-2xl flex w-full flex-col gap-24'>
          <div className='flex w-full items-center justify-between'>
            <h2 className='text-heading-sm'>이모티콘 시안들</h2>
            <div className='flex gap-24'>
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
