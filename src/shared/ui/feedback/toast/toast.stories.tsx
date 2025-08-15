import type { Meta, StoryObj } from '@storybook/nextjs';
import Toast from './toast';
import ToastContainer from './toast-container';
import { ToastProvider } from './toast-provider';

const meta: Meta<typeof Toast> = {
  title: 'UI/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: {
      control: { type: 'number' },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastContainer />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    type: 'success',
    message: '성공적으로 처리되었습니다.',
    duration: 5000,
  },
};

export const Success: Story = {
  args: {
    id: '2',
    type: 'success',
    message: '작업이 성공적으로 완료되었습니다.',
    duration: 5000,
  },
};

export const Error: Story = {
  args: {
    id: '3',
    type: 'error',
    message: '오류가 발생했습니다. 다시 시도해주세요.',
    duration: 5000,
  },
};

export const Warning: Story = {
  args: {
    id: '4',
    type: 'warning',
    message: '주의가 필요한 작업입니다.',
    duration: 5000,
  },
};

export const Info: Story = {
  args: {
    id: '5',
    type: 'info',
    message: '새로운 업데이트가 있습니다.',
    duration: 5000,
  },
};

export const LongMessage: Story = {
  args: {
    id: '6',
    type: 'info',
    message:
      '이것은 매우 긴 메시지입니다. 사용자에게 중요한 정보를 전달하기 위해 작성된 긴 텍스트입니다.',
    duration: 5000,
  },
};
