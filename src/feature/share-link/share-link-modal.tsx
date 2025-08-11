import { Icon } from '@/shared/ui/display';
import { Modal, useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import ShareLink from './share-link';

export default function ShareLinkModal({
  emoticonSetId,
}: {
  emoticonSetId: string;
}) {
  const { closeModal } = useModal();

  return (
    <>
      <Modal.Header>
        <Modal.Title>게시물 공유</Modal.Title>
      </Modal.Header>
      <Modal.Body className='flex flex-col gap-24'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-12'>
            <div className='border-radius-rounded flex h-[32px] w-[32px] items-center justify-center bg-rose-50'>
              <Icon name='lock' size={16} className='text-rose-600' />
            </div>
            <h2 className='text-body-lg font-semibold'>비밀 게시물</h2>
          </div>
          <p className='text-body-sm text-secondary'>
            링크를 받은 사람만 게시물을 볼 수 있어요. 24시간 동안 유효해요.
          </p>
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
