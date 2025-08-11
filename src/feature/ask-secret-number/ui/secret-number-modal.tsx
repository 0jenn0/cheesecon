'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Icon } from '@/shared/ui/display';
import { Modal } from '@/shared/ui/feedback';
import { Button, TextField } from '@/shared/ui/input';
import { unlockEmoticonAction } from '@/app/(after)/emoticon/lock/action';

export default function SecretNumberModal({ id }: { id: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const validate = (p: string, c: string) => {
    if (!p || !c) return setPasswordError(null);
    if (p !== c) return setPasswordError('비밀번호가 일치하지 않습니다.');
    if (p.length < 4)
      return setPasswordError('비밀번호는 4자리 이상이어야 합니다.');
    setPasswordError(null);
  };

  const handleChange =
    (name: 'password' | 'passwordConfirm') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (name === 'password') {
        setPassword(value);
        validate(value, passwordConfirm);
      } else {
        setPasswordConfirm(value);
        validate(password, value);
      }
    };

  const canSubmit = Boolean(password && passwordConfirm && !passwordError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || pending) return;

    startTransition(async () => {
      try {
        const res = await unlockEmoticonAction({ id, password });
        if (res?.ok === false) {
          setPasswordError(res.message ?? '비밀번호 확인에 실패했습니다.');
        }
      } catch (err: any) {
        if (err?.digest === 'NEXT_REDIRECT') return;
        console.error(err);
        setPasswordError('알 수 없는 오류가 발생했습니다.');
      }
    });
  };

  return (
    <Modal.Container>
      <form onSubmit={handleSubmit}>
        <Modal.Header onClose={() => router.back()}>
          <Modal.Title>비밀 게시물</Modal.Title>
        </Modal.Header>

        <Modal.Body className='flex flex-col gap-24'>
          <div className='flex items-center gap-12'>
            <div className='border-radius-rounded flex h-[32px] w-[32px] items-center justify-center bg-rose-50'>
              <Icon name='lock' size={16} className='text-rose-600' />
            </div>
            <p>비밀 게시물을 보려면 비밀번호를 입력해주세요.</p>
          </div>

          <div className='flex w-full flex-col gap-16'>
            <TextField
              direction='column'
              label='비밀번호'
              name='password'
              placeholder='비밀번호를 입력해주세요.'
              onChange={handleChange('password')}
              inputProps={{ type: 'password' }}
            />
            <TextField
              direction='column'
              name='passwordConfirm'
              label='비밀번호 확인'
              placeholder='비밀번호를 다시 입력해주세요.'
              onChange={handleChange('passwordConfirm')}
              inputProps={{ type: 'password' }}
              variant={passwordError ? 'error' : 'default'}
              helpMessage={
                passwordError
                  ? { error: passwordError, default: '', success: '' }
                  : undefined
              }
            />
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
            type='submit'
            disabled={!canSubmit || pending}
            isLoading={pending}
          >
            확인
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Container>
  );
}
