import { cn } from '@/shared/lib/utils';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Spinner from './spinner';

const sizeOptions = ['sm', 'md', 'lg'];
const variantOptions = ['primary', 'secondary', 'white'];

const containerStyle =
  'padding-48 flex items-center justify-center gap-32 border-radius-md';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 중일 때 사용하는 스피너 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variantOptions,
      description: '스피너의 색상',
    },
    size: {
      control: { type: 'select' },
      options: sizeOptions,
      description: '스피너의 크기',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  decorators: [
    (Story, context) => (
      <div className={containerStyle}>
        <Story args={{ ...context.args, size: 'sm' }} />
        <Story args={{ ...context.args, size: 'md' }} />
        <Story args={{ ...context.args, size: 'lg' }} />
      </div>
    ),
  ],
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  decorators: [
    (Story, context) => (
      <div className={containerStyle}>
        <Story args={{ ...context.args, size: 'sm' }} />
        <Story args={{ ...context.args, size: 'md' }} />
        <Story args={{ ...context.args, size: 'lg' }} />
      </div>
    ),
  ],
};

export const White: Story = {
  args: {
    variant: 'white',
  },
  decorators: [
    (Story, context) => (
      <div className={cn(containerStyle, 'bg-gray-800')}>
        <Story args={{ ...context.args, size: 'sm' }} />
        <Story args={{ ...context.args, size: 'md' }} />
        <Story args={{ ...context.args, size: 'lg' }} />
      </div>
    ),
  ],
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  decorators: [
    (Story, context) => (
      <div className={containerStyle}>
        <Story args={{ ...context.args, size: 'sm' }} />
        <Story args={{ ...context.args, size: 'md' }} />
        <Story args={{ ...context.args, size: 'lg' }} />
      </div>
    ),
  ],
};
