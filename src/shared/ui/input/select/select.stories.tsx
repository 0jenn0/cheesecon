import type { Meta, StoryObj } from '@storybook/nextjs';
import { SelectProvider } from './provider';
import Select from './select';

const meta: Meta<typeof Select> = {
  title: 'UI/Input/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '여러가지 옵션 중 하나를 선택할 수 있는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    isError: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    options: {
      control: { type: 'object' },
      description: '옵션 목록',
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <SelectProvider>
        <Story className='w-[300px]' />
      </SelectProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['option1', 'option2', 'option3'],
    isError: false,
    disabled: false,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className='flex gap-16'>
      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>기본 상태</h3>
        <Select
          label='전체'
          options={['option1', 'option2', 'option3']}
          className='w-[120px]'
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>에러 상태</h3>
        <Select
          label='전체'
          options={['option1', 'option2', 'option3']}
          className='w-[120px]'
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          비활성화 상태
        </h3>
        <Select
          label='전체'
          options={['option1', 'option2', 'option3']}
          className='w-[120px]'
          disabled={true}
        />
      </div>
    </div>
  ),
};
