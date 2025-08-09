import { Meta, StoryObj } from '@storybook/nextjs';
import Button from '../../input/button/button';
import Modal from './modal';
import { ModalProvider, useModal } from './modal-provider';

export default {
  title: 'UI/Feedback/Modal',
  component: Modal.Root,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
} as Meta<typeof Modal.Root>;

export const Default: StoryObj<typeof Modal.Root> = {
  args: {
    isOpen: true,
  },
  render: () => {
    const { openModal, closeModal } = useModal();

    return (
      <>
        <Button onClick={openModal}>모달 열기</Button>
        <Modal.Root>
          <Modal.Header>
            <h2 className='text-lg font-semibold'>모달 제목</h2>
          </Modal.Header>

          <Modal.Body>
            <p>모달 내용이 여기에 들어갑니다.</p>
          </Modal.Body>

          <Modal.Footer className='flex justify-between gap-8'>
            <Button
              variant='secondary'
              styleVariant='transparent'
              onClick={closeModal}
              className='w-full'
            >
              취소
            </Button>
            <Button className='w-full' onClick={closeModal}>
              확인
            </Button>
          </Modal.Footer>
        </Modal.Root>
      </>
    );
  },
};
