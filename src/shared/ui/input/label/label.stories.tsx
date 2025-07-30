import type { Meta, StoryObj } from '@storybook/nextjs';
import Label, { LABEL_TYPE_VARIANTS } from './label';

const meta: Meta<typeof Label> = {
  title: 'UI/Input/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 상태를 지원하는 라벨 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: LABEL_TYPE_VARIANTS,
      description: '라벨의 타입',
      defaultValue: 'default',
    },
    children: {
      control: { type: 'text' },
      description: '라벨의 텍스트',
      defaultValue: '라벨',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '라벨',
    type: 'default',
  },
};

export const AllTypes: Story = {
  args: {
    children: '라벨',
  },
  argTypes: {
    type: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '모든 타입의 라벨을 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (_, context) => (
      <div className='flex flex-col gap-8'>
        <Label {...context.args} type='default' />
        <Label {...context.args} type='required' />
        <Label {...context.args} type='optional' />
      </div>
    ),
  ],
};
