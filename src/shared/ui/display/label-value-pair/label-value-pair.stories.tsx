import type { Meta, StoryObj } from '@storybook/nextjs';
import LabelValuePair from './label-value-pair';

const meta: Meta<typeof LabelValuePair> = {
  title: 'UI/Display/LabelValuePair',
  component: LabelValuePair,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '라벨과 값을 표시하는 컴포넌트입니다. 행(row) 또는 열(column) 방향으로 배치할 수 있으며, 다양한 타입의 값을 표시할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='w-[600px]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
      description: '라벨과 값의 배치 방향',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    value: {
      control: { type: 'text' },
      description: '표시할 값 (문자열 또는 ReactNode)',
    },
    labelClassName: {
      control: { type: 'text' },
      description: '라벨에 적용할 추가 CSS 클래스',
    },
    valueClassName: {
      control: { type: 'text' },
      description: '값에 적용할 추가 CSS 클래스',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이름',
    value: '홍길동',
  },
};

export const ColumnDirection: Story = {
  args: {
    direction: 'column',
    label: '설명',
    value: '이것은 세로 방향으로 배치된 라벨-값 쌍입니다.',
  },
};

export const LongValue: Story = {
  args: {
    label: '주소',
    value: '서울특별시 강남구 테헤란로 123길 45, 678호 (우편번호: 06123)',
  },
};

export const ShortLabel: Story = {
  args: {
    label: 'ID',
    value: 'user_123456789',
  },
};

export const CustomStyling: Story = {
  args: {
    label: '상태',
    value: '활성',
    labelClassName: 'text-blue-600 font-semibold',
    valueClassName: 'text-green-600 font-medium',
  },
};

export const WithReactNode: Story = {
  args: {
    label: '아이콘',
    value: (
      <div className='flex items-center gap-2'>
        <span className='h-4 w-4 rounded-full bg-blue-500'></span>
        <span>커스텀 컴포넌트</span>
      </div>
    ),
  },
};

export const MultipleExamples: Story = {
  render: () => (
    <div className='space-y-4'>
      <LabelValuePair label='이름' value='김철수' />
      <LabelValuePair label='이메일' value='kim@example.com' />
      <LabelValuePair label='전화번호' value='010-1234-5678' />
      <LabelValuePair label='생년월일' value='1990-01-01' />
      <LabelValuePair
        label='상태'
        value='활성'
        valueClassName='text-green-600 font-medium'
      />
    </div>
  ),
};

export const ColumnLayout: Story = {
  render: () => (
    <div className='space-y-4'>
      <LabelValuePair
        direction='column'
        label='제목'
        value='프로젝트 제목입니다.'
      />
      <LabelValuePair
        direction='column'
        label='설명'
        value='이것은 프로젝트에 대한 자세한 설명입니다. 여러 줄로 구성될 수 있습니다.'
      />
      <LabelValuePair
        direction='column'
        label='태그'
        value='React, TypeScript, Tailwind'
      />
    </div>
  ),
};
