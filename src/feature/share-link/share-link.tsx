'use client';

import { useState } from 'react';
import { Skeleton, useToast } from '@/shared/ui/feedback';
import { Button, IconButton } from '@/shared/ui/input';
import { useShareLink } from '@/app/(after)/emoticon/[id]/share/model';

export default function ShareLink({ id }: { id: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const { addToast } = useToast();

  const { data } = useShareLink(id, 24);
  const url = data?.success ? data.data.url : null;

  const onClick = async () => {
    await navigator.clipboard.writeText(url!);
    addToast({
      message: '링크가 복사되었어요!',
      type: 'success',
      position: 'top',
    });
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className='flex w-full flex-col gap-12'>
      <label className='text-body-md font-semibold'>공유 링크</label>
      <div className='flex w-full items-center gap-8'>
        <input
          type='text'
          readOnly
          value={url ?? ''}
          className='border-radius-md border-secondary padding-x-12 padding-y-8 flex-1 border outline-none'
        />
        {url ? (
          <IconButton
            variant={isCopied ? 'primary' : 'secondary'}
            icon={isCopied ? 'check' : 'copy'}
            iconSize={20}
            onClick={onClick}
          />
        ) : (
          <Button variant='secondary' onClick={onClick}>
            링크 생성
          </Button>
        )}
      </div>
    </div>
  );
}
