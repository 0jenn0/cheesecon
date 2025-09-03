import { useEffect } from 'react';
import { useIntersectionObserver } from '@/shared/lib';
import { EmoticonSection } from '@/feature/register-emoticon/ui';
import { ImageDropzone } from '@/feature/upload-image/ui';
import { useEmoticonRegisterContext } from '../../model/emoticon-register-context';

export default function EmoticonFormStep2Screen() {
  const { setIsEmoticonSectionVisibleMobile } = useEmoticonRegisterContext();

  const { ref: emoticonSectionMobileRef, isIntersecting } =
    useIntersectionObserver({
      threshold: 0.6,
      triggerOnce: false,
    });

  useEffect(() => {
    setIsEmoticonSectionVisibleMobile(isIntersecting);
  }, [isIntersecting, setIsEmoticonSectionVisibleMobile]);

  return (
    <section className='flex w-full flex-col gap-24'>
      <section className='padding-16 bg-primary flex w-full flex-col gap-16'>
        <h2 className='text-heading-sm w-full text-start'>
          이모티콘 대표 이미지
        </h2>
        <ImageDropzone />
      </section>

      <div
        className='padding-16 bg-primary'
        ref={emoticonSectionMobileRef as React.Ref<HTMLDivElement>}
      >
        <EmoticonSection />
      </div>
    </section>
  );
}
