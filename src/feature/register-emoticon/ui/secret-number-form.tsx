'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/display';
import { Checkbox, TextField } from '@/shared/ui/input';

export default function SecretNumberForm() {
  const [isSecret, setIsSecret] = useState(false);

  const handleSecretNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSecret(e.target.checked);
  };

  return (
    <section className='flex flex-col gap-24'>
      <div className='flex flex-col gap-12'>
        <div className='flex w-full items-center gap-12'>
          <Checkbox
            checked={isSecret}
            onChange={handleSecretNumberChange}
            status={isSecret ? 'checked' : 'unchecked'}
            id='secretNumberCheck'
          />
          <div className='flex items-center gap-4'>
            <label
              className='text-body-lg cursor-pointer font-semibold select-none'
              htmlFor='secretNumberCheck'
            >
              비밀 게시물로 설정
            </label>
            <Icon name='lock' />
          </div>
        </div>

        <span className='text-body-sm text-tertiary'>
          비밀 게시물로 설정하면 비밀 번호를 입력해야 이모티콘을 확인할 수
          있습니다.
        </span>
      </div>

      {isSecret && (
        <div className='bg-secondary padding-24 border-radius-2xl flex flex-col gap-16'>
          <TextField
            name='secretNumber'
            label='비밀 번호'
            placeholder='****'
            direction='row'
            labelType='required'
            placeholderClassName='padding-y-12'
          />
          <TextField
            name='secretNumber'
            label='비밀 번호 확인'
            placeholder='****'
            direction='row'
            labelType='required'
            placeholderClassName='padding-y-12'
          />
        </div>
      )}
    </section>
  );
}
