'use client';

import { useState } from 'react';
import {
  EmoticonGrid,
  EmoticonInfoForm,
  ImageUploader,
  SecretNumberForm,
} from '@/feature/register-emoticon/ui';
import { RegisterBottomBar } from '@/feature/register-emoticon/ui/register-bottom-bar';

export default function EmoticonRegisterPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  return (
    <>
      <div className='padding-16 tablet:padding-24 margin-b-64 flex h-full w-full flex-col items-center gap-24'>
        <div className='padding-24 border-radius-2xl bg-primary flex w-full flex-col gap-24'>
          <h1 className='text-heading-md border-ghost padding-b-12 w-full border-b text-start'>
            이모티콘 등록하기
          </h1>
          <div className='flex flex-1 gap-24'>
            <section className='flex flex-1 flex-col gap-24'>
              <h2 className='text-heading-sm'>이모티콘 정보</h2>
              <EmoticonInfoForm />
              <div className='border-ghost border-b' />
              <SecretNumberForm />
            </section>
            <ImageUploader
              onImageSelect={handleImageSelect}
              accept='image/*'
              maxSize={5} // 5MB
            />
          </div>
        </div>

        <EmoticonGrid />
      </div>
      <RegisterBottomBar />
    </>
  );
}
