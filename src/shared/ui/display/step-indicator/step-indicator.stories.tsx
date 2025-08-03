import type { Meta, StoryObj } from '@storybook/nextjs';
import StepIndicator from './step-indicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'UI/Display/StepIndicator',
  component: StepIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '단계별 진행 상황을 시각적으로 표시하는 인디케이터 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    totalStep: {
      control: { type: 'number' },
      description: '총 단계 수',
    },
    currentStep: {
      control: { type: 'number' },
      description: '현재 단계',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalStep: 4,
    currentStep: 2,
  },
};

export const ThreeSteps: Story = {
  args: {
    totalStep: 3,
    currentStep: 1,
  },
};

export const FiveSteps: Story = {
  args: {
    totalStep: 5,
    currentStep: 3,
  },
};

export const FirstStep: Story = {
  args: {
    totalStep: 4,
    currentStep: 1,
  },
};

export const LastStep: Story = {
  args: {
    totalStep: 4,
    currentStep: 4,
  },
};

export const AllStepStates: Story = {
  render: () => (
    <div className='flex flex-col gap-24'>
      <div>
        <h3 className='mb-16 text-lg font-semibold'>
          4단계 인디케이터 - 모든 상태
        </h3>
        <div className='flex flex-col gap-16'>
          <div className='flex items-center gap-16'>
            <span className='w-20 text-sm font-medium text-gray-600'>
              1단계:
            </span>
            <StepIndicator totalStep={4} currentStep={1} />
          </div>
          <div className='flex items-center gap-16'>
            <span className='w-20 text-sm font-medium text-gray-600'>
              2단계:
            </span>
            <StepIndicator totalStep={4} currentStep={2} />
          </div>
          <div className='flex items-center gap-16'>
            <span className='w-20 text-sm font-medium text-gray-600'>
              3단계:
            </span>
            <StepIndicator totalStep={4} currentStep={3} />
          </div>
          <div className='flex items-center gap-16'>
            <span className='w-20 text-sm font-medium text-gray-600'>
              4단계:
            </span>
            <StepIndicator totalStep={4} currentStep={4} />
          </div>
        </div>
      </div>
    </div>
  ),
};
