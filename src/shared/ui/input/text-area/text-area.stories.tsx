import type { Meta, StoryObj } from '@storybook/nextjs';
import TextArea from './text-area';

const meta: Meta<typeof TextArea> = {
  title: 'UI/Input/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 스타일과 상태를 지원하는 플레이스홀더 입력 컴포넌트입니다. 검색, 입력 필드 등에서 사용됩니다.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
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
    placeholder: '검색어를 입력해주세요.',
    isError: false,
    disabled: false,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-16'>
      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>기본 상태</h3>
        <TextArea
          placeholder='기본 플레이스홀더'
          isError={false}
          disabled={false}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>에러 상태</h3>
        <TextArea
          placeholder='에러가 발생했습니다'
          isError={true}
          disabled={false}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          비활성화 상태
        </h3>
        <TextArea
          placeholder='비활성화된 플레이스홀더'
          isError={false}
          disabled={true}
        />
      </div>
    </div>
  ),
};
