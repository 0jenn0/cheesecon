'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/input';
import { useAuth } from '@/feature/auth/provider/auth-provider';

export default function HelloSection() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <section className='padding-16 bg-primary tablet:border-radius-xl tablet:flex-row tablet:justify-between flex w-full flex-col gap-16'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-body-lg font-semibold'>
          {user?.name} 작가님, 안녕하세요!
        </h1>
        <p className='text-body-sm text-secondary'>오늘도 열작하시나요?</p>
      </div>
      <Button
        variant='primary'
        leadingIcon='edit'
        textClassName='font-semibold text-body-sm'
        onClick={() => {
          router.push('/emoticon-register');
        }}
      >
        새 이모티콘 등록하기
      </Button>
    </section>
  );
}
