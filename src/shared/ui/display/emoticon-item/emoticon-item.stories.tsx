import type { Meta, StoryObj } from '@storybook/nextjs';
import EmoticonItem from './emoticon-item';

const imageUrl = 'https://picsum.photos/240/240';

const meta: Meta<typeof EmoticonItem.Root> = {
  title: 'UI/Display/EmoticonItem',
  component: EmoticonItem.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '이모티콘 아이템을 표시하는 컴포넌트입니다. 이미지, 로딩 상태, 좋아요/댓글 수, 드래그 상태 등을 지원합니다.',
      },
    },
  },
  decorators: [
    () => (
      <div className='w-[240px]'>
        <EmoticonItem.Root imageNumber={1}>
          <EmoticonItem.Content>
            <EmoticonItem.Body>
              <EmoticonItem.Header />
            </EmoticonItem.Body>
            <EmoticonItem.Footer />
          </EmoticonItem.Content>
        </EmoticonItem.Root>
      </div>
    ),
  ],
  argTypes: {
    imageNumber: {
      control: { type: 'number' },
      description: '이모티콘 번호',
    },
    imageUrl: {
      control: { type: 'text' },
      description: '이모티콘 이미지 URL',
    },
    showCheckbox: {
      control: { type: 'boolean' },
      description: '체크박스 표시 여부',
    },
    showGripIcon: {
      control: { type: 'boolean' },
      description: '그립 아이콘 표시 여부',
    },
    showNumberBadge: {
      control: { type: 'boolean' },
      description: '번호 배지 표시 여부',
    },
    isUploading: {
      control: { type: 'boolean' },
      description: '업로드 중인 상태',
    },
    isDragging: {
      control: { type: 'boolean' },
      description: '드래그 중인 상태',
    },
    commentsCount: {
      control: { type: 'number' },
      description: '댓글 수',
    },
    likesCount: {
      control: { type: 'number' },
      description: '좋아요 수',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageNumber: 1,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const WithImage: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const WithCheckbox: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showCheckbox: true,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const WithGripIcon: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showGripIcon: true,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const WithNumberBadge: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showNumberBadge: true,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const Uploading: Story = {
  args: {
    imageNumber: 1,
    isUploading: true,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const Dragging: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    isDragging: true,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};

export const WithStats: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    likesCount: 42,
    commentsCount: 12,
  },
  render: (args) => (
    <EmoticonItem.Root {...args}>
      <EmoticonItem.Content>
        <EmoticonItem.Body>
          <EmoticonItem.Header />
        </EmoticonItem.Body>
        <EmoticonItem.Footer />
        <EmoticonItem.BottomBar />
      </EmoticonItem.Content>
    </EmoticonItem.Root>
  ),
};
