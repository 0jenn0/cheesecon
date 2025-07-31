import * as icons from '@/shared/asset/icon';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ICON_NAMES } from './config';
import Icon from './icon';

const kebabToPascal = (kebab: string): string => {
  return kebab
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const meta: Meta<typeof Icon> = {
  title: 'UI/Display/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 아이콘을 표시하는 컴포넌트입니다. SVG 아이콘을 React 컴포넌트로 렌더링합니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ICON_NAMES,
      description: '표시할 아이콘의 이름',
    },
    size: {
      control: { type: 'select' },
      options: [16, 24, 32, 40, 48],
      description: '아이콘의 크기 (픽셀)',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'logo',
    size: 24,
  },
};

export const Sizes: Story = {
  args: {
    name: 'logo',
    className: 'text-gray-700',
  },
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div className='flex items-center gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <Story args={{ ...context.args, size: 16 }} />
          <span className='text-xs text-gray-500'>16px</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Story args={{ ...context.args, size: 24 }} />
          <span className='text-xs text-gray-500'>24px</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Story args={{ ...context.args, size: 32 }} />
          <span className='text-xs text-gray-500'>32px</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Story args={{ ...context.args, size: 40 }} />
          <span className='text-xs text-gray-500'>40px</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Story args={{ ...context.args, size: 48 }} />
          <span className='text-xs text-gray-500'>48px</span>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '아이콘의 다양한 크기를 보여줍니다.',
      },
    },
  },
};

export const Colors: Story = {
  args: {
    name: 'logo',
    size: 24,
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div className='flex items-center gap-4'>
        <Story args={{ ...context.args, className: 'text-red-500' }} />
        <Story args={{ ...context.args, className: 'text-blue-500' }} />
        <Story args={{ ...context.args, className: 'text-green-500' }} />
        <Story args={{ ...context.args, className: 'text-yellow-500' }} />
        <Story args={{ ...context.args, className: 'text-purple-500' }} />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind CSS 클래스를 사용하여 아이콘 색상을 변경할 수 있습니다.',
      },
    },
  },
};

export const Debug = {
  decorators: [
    () => {
      const availableIcons = Object.keys(icons);
      console.log('Available icons:', availableIcons);
      console.log('ICON_NAMES:', ICON_NAMES);

      return (
        <div className='space-y-4'>
          <div>
            <h3 className='mb-2 text-lg font-bold'>
              Available Icons ({availableIcons.length})
            </h3>
            <div className='grid grid-cols-4 gap-2 text-xs'>
              {availableIcons.map((icon) => (
                <div key={icon} className='rounded bg-gray-100 p-2'>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='mb-2 text-lg font-bold'>
              ICON_NAMES ({ICON_NAMES.length})
            </h3>
            <div className='grid grid-cols-4 gap-2 text-xs'>
              {ICON_NAMES.map((name) => {
                const pascalName = kebabToPascal(name);
                const exists = availableIcons.includes(pascalName);
                return (
                  <div
                    key={name}
                    className={`rounded p-2 ${exists ? 'bg-green-100' : 'bg-red-100'}`}
                  >
                    {name} → {pascalName} {exists ? '✓' : '✗'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          '사용 가능한 아이콘들과 ICON_NAMES를 비교하여 매칭 상태를 확인합니다.',
      },
    },
  },
};

export const AllIcons: Story = {
  decorators: [
    () => (
      <div className='grid max-w-4xl grid-cols-8 gap-4'>
        {ICON_NAMES.map((iconName) => (
          <div
            key={iconName}
            className='flex flex-col items-center justify-center gap-8 rounded border border-gray-300 p-4'
          >
            <Icon name={iconName} size={24} />
            <span className='text-center text-xs text-gray-500'>
              {iconName}
            </span>
          </div>
        ))}
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '사용 가능한 모든 아이콘들을 보여줍니다.',
      },
    },
  },
};
