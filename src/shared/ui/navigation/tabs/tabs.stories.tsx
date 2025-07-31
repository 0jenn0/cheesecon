import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tabs } from '..';
import TabItem from './ui/tab-item';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '탭 네비게이션 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: '탭 목록',
      table: {
        type: {
          summary: 'TabItemProps[]',
        },
      },
    },
  },
  decorators: [(Story) => <Story className='w-[300px]' />],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Tab 1', href: '#' },
      { label: 'Tab 2', href: '#' },
      { label: 'Tab 3', href: '#' },
    ],
  },
};

export const TabItemActive: Story = {
  render: () => (
    <ul className='flex w-[300px] items-center gap-0'>
      <TabItem label='비활성 탭' href='/inactive' />
      <TabItem label='활성 탭' href='/active' />
      <TabItem label='다른 탭' href='/other' />
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TabItem 컴포넌트의 활성 상태 예시입니다. 현재 경로가 /active일 때 두 번째 탭이 활성 상태가 됩니다.',
      },
    },
  },
};

export const TabItemWithIcons: Story = {
  render: () => (
    <ul className='flex w-[300px] items-center gap-0'>
      <TabItem label='홈' href='/home' icon='menu' />
      <TabItem label='프로필' href='/profile' icon='at-sign' />
      <TabItem label='설정' href='/settings' icon='edit' />
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘이 포함된 TabItem 컴포넌트 예시입니다.',
      },
    },
  },
};

export const TabItemForcedActive: Story = {
  render: () => (
    <ul className='flex w-[300px] items-center gap-0'>
      <TabItem label='비활성 탭' href='/inactive' isActive={false} />
      <TabItem label='활성 탭' href='/active' isActive={true} />
      <TabItem label='다른 탭' href='/other' isActive={false} />
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: 'isActive prop을 사용하여 활성 상태를 직접 제어하는 예시입니다.',
      },
    },
  },
};

export const TabItemWithIconsForcedActive: Story = {
  render: () => (
    <ul className='flex w-[300px] items-center gap-0'>
      <TabItem label='홈' href='/home' icon='menu' isActive={false} />
      <TabItem label='프로필' href='/profile' icon='at-sign' isActive={true} />
      <TabItem label='설정' href='/settings' icon='edit' isActive={false} />
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘이 포함된 탭에서 활성 상태를 직접 제어하는 예시입니다.',
      },
    },
  },
};
