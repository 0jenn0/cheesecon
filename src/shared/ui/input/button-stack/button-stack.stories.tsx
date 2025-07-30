import type { Meta, StoryObj } from '@storybook/nextjs';
import ButtonStack from './button-stack';

const meta: Meta<typeof ButtonStack> = {
  title: 'UI/Input/ButtonStack',
  component: ButtonStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '두 개의 버튼을 다양한 레이아웃으로 배치할 수 있는 버튼 스택 컴포넌트입니다. 모달, 다이얼로그, 폼 등에서 자주 사용됩니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['stack', 'justify', 'start', 'end', 'center'],
      description: '버튼 스택의 레이아웃 변형',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'stack' },
      },
    },
    primaryButton: {
      control: { type: 'object' },
      description: '주요 버튼 속성 (확인, 저장 등)',
    },
    secondaryButton: {
      control: { type: 'object' },
      description: '보조 버튼 속성 (취소, 뒤로 등)',
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
    primaryButton: {
      children: '확인',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '취소',
      variant: 'secondary',
    },
  },
};

export const Stack: Story = {
  args: {
    variant: 'stack',
    primaryButton: {
      children: '저장하기',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '취소',
      variant: 'secondary',
    },
  },
  argTypes: {
    variant: {
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
};

export const Justify: Story = {
  args: {
    variant: 'justify',
    primaryButton: {
      children: '확인',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '취소',
      variant: 'secondary',
    },
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '버튼들이 가로로 균등하게 분할되는 레이아웃입니다.',
      },
    },
  },
};

export const Start: Story = {
  args: {
    variant: 'start',
    primaryButton: {
      children: '편집',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '삭제',
      variant: 'danger',
    },
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '버튼들이 왼쪽에 정렬되는 레이아웃입니다.',
      },
    },
  },
};

export const End: Story = {
  args: {
    variant: 'end',
    primaryButton: {
      children: '다음',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '이전',
      variant: 'secondary',
    },
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '버튼들이 오른쪽에 정렬되는 레이아웃입니다.',
      },
    },
  },
};

export const Center: Story = {
  args: {
    variant: 'center',
    primaryButton: {
      children: '로그인',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '회원가입',
      variant: 'secondary',
    },
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '버튼들이 중앙에 정렬되는 레이아웃입니다.',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    primaryButton: {
      children: '확인',
      variant: 'primary',
      styleVariant: 'filled',
    },
    secondaryButton: {
      children: '취소',
      variant: 'secondary',
    },
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '모든 레이아웃 변형을 한번에 비교해볼 수 있습니다.',
      },
    },
  },
  decorators: [
    (_, context) => (
      <div className='flex w-full flex-col gap-24'>
        <div className='flex flex-col gap-8'>
          <h3 className='text-sm font-medium text-gray-700'>
            Stack (세로 배치)
          </h3>
          <ButtonStack {...context.args} variant='stack' />
        </div>
        <div className='flex flex-col gap-8'>
          <h3 className='text-sm font-medium text-gray-700'>
            Justify (균등 분할)
          </h3>
          <ButtonStack {...context.args} variant='justify' />
        </div>
        <div className='flex flex-col gap-8'>
          <h3 className='text-sm font-medium text-gray-700'>
            Start (왼쪽 정렬)
          </h3>
          <ButtonStack {...context.args} variant='start' />
        </div>
        <div className='flex flex-col gap-8'>
          <h3 className='text-sm font-medium text-gray-700'>
            End (오른쪽 정렬)
          </h3>
          <ButtonStack {...context.args} variant='end' />
        </div>
        <div className='flex flex-col gap-8'>
          <h3 className='text-sm font-medium text-gray-700'>
            Center (중앙 정렬)
          </h3>
          <ButtonStack {...context.args} variant='center' />
        </div>
      </div>
    ),
  ],
};
