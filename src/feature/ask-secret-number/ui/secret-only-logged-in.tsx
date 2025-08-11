'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/shared/ui/display';
import { Modal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';

export default function SecretOnlyLoggedIn() {
  const router = useRouter();

  return (
    <Modal.Container>
      <Modal.Header onClose={() => router.back()}>
        <Modal.Title>비밀 게시물</Modal.Title>
      </Modal.Header>

      <Modal.Body className='flex flex-col gap-24'>
        <div className='padding-24 flex flex-col items-center gap-24'>
          <div className='border-radius-rounded flex h-[48px] w-[48px] items-center justify-center bg-rose-50'>
            <Icon name='lock' size={24} className='text-rose-600' />
          </div>
          <p className='text-body-lg'>
            로그인한 유저만 비밀 게시물을 볼 수 있어요.
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className='w-full'
          variant='secondary'
          type='button'
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          className='w-full'
          variant='primary'
          type='button'
          onClick={() => router.push('/login')}
        >
          로그인
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
}
