import type { Meta, StoryObj } from '@storybook/nextjs';
import Checkbox, { CHECKBOX_STATUS } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Input/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '체크박스 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: CHECKBOX_STATUS,
      description: '체크박스 상태',
      defaultValue: 'checked',
    },
  },
  decorators: [
    (Story) => (
      <div className='border-radius-md flex w-[400px] border border-gray-200 p-16'>
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
    status: 'checked',
  },
};

export const AllStatus: Story = {
  args: {
    status: 'checked',
  },
  argTypes: {
    status: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '버튼들이 세로로 쌓이는 레이아웃입니다. 모바일에서 자주 사용됩니다.',
      },
    },
  },
  decorators: [
    (_, context) => (
      <div className='flex w-[400px] gap-16'>
        <Checkbox {...context.args} status='checked' />
        <Checkbox {...context.args} status='unchecked' />
        <Checkbox {...context.args} status='partial' />
      </div>
    ),
  ],
};
