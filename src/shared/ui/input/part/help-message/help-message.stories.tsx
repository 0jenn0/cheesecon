import type { VariantProps } from 'class-variance-authority';
import type { Meta, StoryObj } from '@storybook/nextjs';
import HelpMessage from './help-message';
import { helpMessageVariants } from './help-message.style';

const meta: Meta<typeof HelpMessage> = {
  title: 'UI/Input/HelpMessage',
  component: HelpMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 스타일과 상태를 지원하는 헬프 메시지 컴포넌트입니다. 검색, 입력 필드 등에서 사용됩니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'] satisfies VariantProps<
        typeof helpMessageVariants
      >['variant'][],
      description: '헬프 메시지 상태',
    },
  },
  decorators: [
    (Story) => (
      <div className='w-[400px]'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '보조 메세지입니다.',
    variant: 'default',
  },
};

export const AllStates: Story = {
  args: {
    children: '보조 메세지입니다.',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  decorators: [
    (_, context) => (
      <div className='flex flex-col gap-16'>
        <div>
          <h3 className='mb-8 text-sm font-medium text-gray-700'>기본 상태</h3>
          <HelpMessage variant='default' {...context.args} />
        </div>

        <div>
          <h3 className='mb-8 text-sm font-medium text-gray-700'>성공 상태</h3>
          <HelpMessage variant='success' {...context.args} />
        </div>

        <div>
          <h3 className='mb-8 text-sm font-medium text-gray-700'>에러 상태</h3>
          <HelpMessage variant='error' {...context.args} />
        </div>
      </div>
    ),
  ],
};
