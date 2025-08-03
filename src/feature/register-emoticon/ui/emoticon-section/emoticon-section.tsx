'use client';

import { EmoticonProvider, UIProvider } from './provider';
import { EmoticonGrid, MultiSelectButton, OrderChangeButton } from './ui';

export default function EmoticonSection() {
  return (
    <UIProvider>
      <section className='bg-primary padding-24 border-radius-xl flex w-full flex-col gap-24'>
        <div className='flex w-full items-center justify-between'>
          <h2 className='text-heading-sm'>이모티콘 목록</h2>
          <div className='flex gap-24'>
            <OrderChangeButton />
            <MultiSelectButton />
          </div>
        </div>

        <div className='border-ghost border-b' />

        <EmoticonProvider>
          <EmoticonGrid />
        </EmoticonProvider>
      </section>
    </UIProvider>
  );
}
