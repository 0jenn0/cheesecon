import type { Meta, StoryObj } from '@storybook/nextjs';
import ProgressBar from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'UI/Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
진행률을 시각적으로 표시하는 컴포넌트입니다.

## 특징

- **현재 값과 전체 값**을 기반으로 진행률을 계산합니다
- **퍼센트 기반**으로 진행률 바의 너비가 결정됩니다
- **두 개의 div**로 구성: 진행된 부분과 남은 부분
- **Tailwind CSS**를 사용한 스타일링

## Props

- \`current\`: 현재 진행된 값 (number)
- \`total\`: 전체 값 (number)

## 사용법

\`\`\`tsx
<ProgressBar current={3} total={10} />
\`\`\`

이 경우 30% 진행률을 표시합니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='w-[400px]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    current: {
      control: { type: 'number', min: 0 },
      description: '현재 진행된 값',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: '전체 값',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 3,
    total: 10,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 기본 사용법

30% 진행률을 보여주는 기본 예시입니다.

### 계산 방식

- 진행률 = (current / total) × 100
- 현재 예시: (3 / 10) × 100 = 30%

### 시각적 표현

- **왼쪽 영역**: 진행된 부분 (30% 너비)
- **오른쪽 영역**: 남은 부분 (70% 너비)
        `,
      },
    },
  },
};

export const HalfProgress: Story = {
  args: {
    current: 5,
    total: 10,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 50% 진행률

절반이 완료된 상태를 보여줍니다.

### 특징

- 정확히 50% 진행률
- 시각적으로 균등하게 분할된 모습
        `,
      },
    },
  },
};

export const Complete: Story = {
  args: {
    current: 10,
    total: 10,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 완료 상태

100% 진행률을 보여줍니다.

### 특징

- 전체 영역이 채워진 상태
- 더 이상 진행할 수 없는 완료 상태
        `,
      },
    },
  },
};

export const Empty: Story = {
  args: {
    current: 0,
    total: 10,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 시작 상태

0% 진행률을 보여줍니다.

### 특징

- 아무것도 진행되지 않은 초기 상태
- 오른쪽 영역만 표시됨
        `,
      },
    },
  },
};

export const SmallProgress: Story = {
  args: {
    current: 1,
    total: 100,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 작은 진행률

1% 진행률을 보여줍니다.

### 특징

- 매우 작은 진행률
- 거의 보이지 않는 진행 바
- 큰 total 값에 대한 작은 current 값의 예시
        `,
      },
    },
  },
};
