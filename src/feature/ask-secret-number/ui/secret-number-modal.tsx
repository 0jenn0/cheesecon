'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/display';
import { Modal } from '@/shared/ui/feedback';
import { Button, TextField } from '@/shared/ui/input';

export default function SecretNumberModal({ id }: { id: string }) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  };

  return (
    <Modal.Container>
      <Modal.Header>
        <Modal.Title>비밀 게시물</Modal.Title>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-24'>
        <div className='flex items-center gap-12'>
          <div className='border-radius-rounded flex h-[32px] w-[32px] items-center justify-center bg-rose-50'>
            <Icon name='lock' size={16} className='text-rose-600' />
          </div>
          <p>비밀 게시물을 보려면 비밀번호를 입력해주세요.</p>
        </div>

        <form
          className='flex w-full flex-col gap-16'
          onSubmit={handleCheckSecretNumber}
        >
          <TextField
            direction='column'
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요.'
            inputProps={{
              type: 'password',
              value: password,
            }}
          />
          <TextField
            direction='column'
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력해주세요.'
            inputProps={{
              type: 'password',
              value: passwordConfirm,
            }}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='w-full' variant='secondary'>
          취소
        </Button>
        <Button className='w-full' variant='primary'>
          확인
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
}
