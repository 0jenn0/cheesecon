'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, IconButton } from '@/shared/ui/input';
import { createShareLinkAction } from '@/app/(after)/emoticon/[id]/share/actions';

export default function ShareLink({ id }: { id: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  const fetchUrl = useCallback(async () => {
    setErr(false);

    const res = await createShareLinkAction(id, 24);

    if (res.ok) {
      setUrl(res.url!);
    } else {
      setErr(true);
    }
  }, [id]);

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  const onClick = async () => {
    await navigator.clipboard.writeText(url!);
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
        {!err ? (
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
