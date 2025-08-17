'use client';

import { useRouter } from 'next/navigation';
import { Icon, LabelValuePair } from '@/shared/ui/display';
import { Modal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import { useEmoticonSetDetailQuery } from '@/entity/emoticon-set/query/emoticon-set-query';

export default function AccessExpiredModal({ id }: { id: string }) {
  const router = useRouter();

  const { data: emoticonSet } = useEmoticonSetDetailQuery(id);
  const author = emoticonSet?.author_name;
  const title = emoticonSet?.title;

  return (
    <Modal.Container>
      <Modal.Header onClose={() => router.back()}>
        <Modal.Title>비밀 게시물</Modal.Title>
      </Modal.Header>

      <Modal.Body className='flex flex-col gap-24'>
        <div className='flex items-center gap-12'>
          <div className='flex h-24 w-24 items-center justify-center rounded-full bg-rose-100'>
            <Icon name='lock' className='text-rose-600' size={16} />
          </div>
          <p className='text-body-md font-semibold'>
            비밀 게시물이 만료되었습니다.
          </p>
        </div>
        <div className='flex flex-col gap-16'>
          <LabelValuePair
            direction='column'
            label='작성자'
            value={author}
            valueClassName='w-full'
          />
          <LabelValuePair
            direction='column'
            label='이모티콘 작품명'
            value={title}
            valueClassName='w-full'
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className='w-full'
          variant='primary'
          type='button'
          onClick={() => router.push('/main/popular')}
        >
          홈으로 이동
        </Button>
      </Modal.Footer>
    </Modal.Container>
  );
}
