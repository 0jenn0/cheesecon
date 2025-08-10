'use client';

import React, { useEffect } from 'react';
import useIntersectionObserver from '@/shared/lib/use-intersection-observer';
import {
  EmoticonInfoForm,
  EmoticonSection,
  SecretNumberForm,
} from '@/feature/register-emoticon/ui';
import { RegisterBottomBar } from '@/feature/register-emoticon/ui/register-bottom-bar';
import { ImageDropzone } from '@/feature/upload-image/ui';
import { useEmoticonRegisterContext } from '../../model/emoticon-register-context';

export default function EmoticonRegisterDesktopScreen() {
  const { isEmoticonSectionVisibleMobile, setIsEmoticonSectionVisible } =
    useEmoticonRegisterContext();

  const { ref: emoticonSectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.6,
    triggerOnce: false,
  });

  useEffect(() => {
    setIsEmoticonSectionVisible(isIntersecting);
  }, [isIntersecting, setIsEmoticonSectionVisible]);

  useEffect(() => {
    if (isEmoticonSectionVisibleMobile) {
      const element = emoticonSectionRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;

        window.scrollTo({
          top: targetPosition,
          behavior: 'instant',
        });
      }
    }
  }, [isEmoticonSectionVisibleMobile, emoticonSectionRef]);

  return (
    <>
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

        <section className='w-full' ref={emoticonSectionRef}>
          <EmoticonSection />
        </section>
      </div>
      <RegisterBottomBar />
    </>
  );
}
