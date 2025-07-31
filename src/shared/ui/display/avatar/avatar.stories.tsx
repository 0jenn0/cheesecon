import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar, { AVATAR_SIZE, PROFILE_TYPE } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '사용자 프로필 이미지를 표시하는 컴포넌트입니다. 레터, 이미지, 아이콘 타입을 지원합니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '사용자 이름',
    },
    size: {
      control: { type: 'select' },
      options: AVATAR_SIZE,
      description: '아바타의 크기',
    },
    profileType: {
      control: { type: 'select' },
      options: PROFILE_TYPE,
      description: '아바타의 타입',
    },
    imageUrl: {
      control: { type: 'text' },
      description: '프로필 이미지 URL',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '최리버',
    size: 'sm',
    profileType: 'letter',
  },
};

export const Letter: Story = {
  args: {
    name: '최리버',
    size: 'sm',
    profileType: 'letter',
  },
};

export const Image: Story = {
  args: {
    name: '최리버',
    size: 'sm',
    profileType: 'image',
    imageUrl: 'https://picsum.photos/100/100',
  },
};

export const Icon: Story = {
  args: {
    name: '최리버',
    size: 'sm',
    profileType: 'icon',
  },
};

export const LargeImage: Story = {
  args: {
    name: '최리버',
    size: 'lg',
    profileType: 'image',
    imageUrl: 'https://picsum.photos/200/200',
  },
};
