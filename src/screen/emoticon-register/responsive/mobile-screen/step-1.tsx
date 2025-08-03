import {
  EmoticonInfoForm,
  SecretNumberForm,
} from '@/feature/register-emoticon/ui';

export default function EmoticonRegisterStep1Screen() {
  return (
    <section className='padding-16 bg-primary flex w-full flex-col gap-24'>
      <h1 className='text-heading-lg border-ghost padding-b-12 w-full border-b text-start'>
        이모티콘 등록하기
      </h1>
      <h2 className='text-heading-sm w-full text-start'>이모티콘 정보</h2>
      <EmoticonInfoForm />
      <div className='border-ghost border-b' />
      <SecretNumberForm />
    </section>
  );
}
