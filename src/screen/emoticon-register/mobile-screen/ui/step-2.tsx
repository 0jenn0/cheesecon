import {
  EmoticonInfoForm,
  EmoticonSection,
  SecretNumberForm,
} from '@/feature/register-emoticon/ui';
import { ImageDropzone } from '@/feature/upload-image/ui';

export default function EmoticonRegisterStep2Screen() {
  return (
    <section className='flex w-full flex-col gap-24'>
      <section className='padding-16 bg-primary flex w-full flex-col gap-16'>
        <h2 className='text-heading-md w-full text-start'>
          이모티콘 대표이미지
        </h2>
        <ImageDropzone />
      </section>

      <div className='padding-16 bg-primary'>
        <EmoticonSection />
      </div>
    </section>
  );
}
