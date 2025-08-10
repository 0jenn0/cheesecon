import type { Meta, StoryObj } from '@storybook/nextjs';
import { ICON_NAMES } from '../../icon/config';
import Placeholder from './placeholder';

const meta: Meta<typeof Placeholder> = {
  title: 'UI/Input/Placeholder',
  component: Placeholder,
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
    isError: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    trailingIcon: {
      control: { type: 'select' },
      options: ['', ...ICON_NAMES],
      description: '트레일링 아이콘',
    },
    iconSize: {
      control: { type: 'number' },
      description: '아이콘 크기',
    },
    iconClassName: {
      control: { type: 'text' },
      description: '아이콘 클래스명',
    },
    inputClassName: {
      control: { type: 'text' },
      description: '입력 필드 클래스명',
    },

    onTrailingIconClick: {
      action: 'trailing icon clicked',
      description: '트레일링 아이콘 클릭 핸들러',
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
    iconSize: 24,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-16'>
      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>기본 상태</h3>
        <Placeholder
          placeholder='기본 플레이스홀더'
          isError={false}
          disabled={false}
          iconSize={24}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>에러 상태</h3>
        <Placeholder
          placeholder='에러가 발생했습니다'
          isError={true}
          disabled={false}
          iconSize={24}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          비활성화 상태
        </h3>
        <Placeholder
          placeholder='비활성화된 플레이스홀더'
          isError={false}
          disabled={true}
          iconSize={24}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          아이콘과 함께
        </h3>
        <Placeholder
          placeholder='아이콘이 있는 플레이스홀더'
          trailingIcon='plus'
          isError={false}
          disabled={false}
          iconSize={24}
        />
      </div>
    </div>
  ),
};

// 다양한 크기의 아이콘
export const IconSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-16'>
      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          작은 아이콘 (16px)
        </h3>
        <Placeholder
          placeholder='작은 아이콘'
          trailingIcon='plus'
          iconSize={16}
          isError={false}
          disabled={false}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          기본 아이콘 (24px)
        </h3>
        <Placeholder
          placeholder='기본 아이콘'
          trailingIcon='plus'
          iconSize={24}
          isError={false}
          disabled={false}
        />
      </div>

      <div>
        <h3 className='mb-8 text-sm font-medium text-gray-700'>
          큰 아이콘 (32px)
        </h3>
        <Placeholder
          placeholder='큰 아이콘'
          trailingIcon='plus'
          iconSize={32}
          isError={false}
          disabled={false}
        />
      </div>
    </div>
  ),
};
