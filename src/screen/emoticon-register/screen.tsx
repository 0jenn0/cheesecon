'use client';

import { EmoticonRegisterProvider } from '@/feature/register-emoticon/model/hook';
import {
  EmoticonInfoForm,
  EmoticonSection,
  SecretNumberForm,
} from '@/feature/register-emoticon/ui';
import { RegisterBottomBar } from '@/feature/register-emoticon/ui/register-bottom-bar';
import { ImageDropzone } from '@/feature/upload-image/ui';

export default function EmoticonRegisterScreen() {
  return (
    <EmoticonRegisterProvider>
      <div className='padding-16 tablet:padding-24 margin-b-64 flex h-full w-full flex-col items-center gap-24'>
        <div className='padding-24 border-radius-2xl bg-primary flex w-full flex-col gap-24'>
          <h1 className='text-heading-md w-full text-start'>
            이모티콘 등록하기
          </h1>
          <div className='border-ghost border-b' />
          <div className='flex flex-1 gap-24'>
            <section className='flex flex-1 flex-col gap-24'>
              <h2 className='text-heading-sm'>이모티콘 정보</h2>
              <EmoticonInfoForm />
              <div className='border-ghost border-b' />
              <SecretNumberForm />
            </section>

            <div className='max-w-[320px] flex-1'>
              <ImageDropzone maxSize={5} />
            </div>
          </div>
        </div>

        <EmoticonSection />
      </div>
      <RegisterBottomBar />
    </EmoticonRegisterProvider>
  );
}
