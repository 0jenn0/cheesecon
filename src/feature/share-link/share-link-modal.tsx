import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { Modal, useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import ShareLink from './share-link';

export default function ShareLinkModal({
  emoticonSetId,
  isPrivate,
}: {
  emoticonSetId: string;
  isPrivate: boolean;
}) {
  const { closeModal } = useModal();

  return (
    <>
      <Modal.Header>
        <Modal.Title>게시물 공유</Modal.Title>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-[32px]'>
        <div className='flex flex-col gap-12'>
          <ShareLinkModalHeader isPrivate={isPrivate} />
          <ShareLinkModalDescription isPrivate={isPrivate} />
        </div>

        <div className='padding-b-12 flex flex-col gap-16'>
          <ShareLink id={emoticonSetId} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' className='w-full' onClick={closeModal}>
          닫기
        </Button>
      </Modal.Footer>
    </>
  );
}

function ShareLinkModalHeader({ isPrivate }: { isPrivate: boolean }) {
  return (
    <div className='flex items-center gap-8'>
      <div
        className={cn(
          'border-radius-rounded flex h-[32px] w-[32px] items-center justify-center',
          isPrivate ? 'bg-rose-50' : 'bg-emerald-50',
        )}
      >
        <Icon
          name={isPrivate ? 'lock' : 'earth'}
          size={16}
          className={isPrivate ? 'text-rose-500' : 'text-emerald-500'}
        />
      </div>
      <h2 className='text-body-lg font-semibold'>
        {isPrivate ? '비밀 게시물' : '공개 게시물'}
      </h2>
    </div>
  );
}

function ShareLinkModalDescription({ isPrivate }: { isPrivate: boolean }) {
  return (
    <p className='text-body-md text-secondary'>
      {isPrivate
        ? '링크를 받은 사람만 게시물을 볼 수 있어요. 24시간 동안 유효해요.'
        : '누구나 볼 수 있는 공개 게시물이에요.'}
    </p>
  );
}
