import type { Meta, StoryObj } from '@storybook/nextjs';
import EmoticonItem from './emoticon-item';

const imageUrl = 'https://picsum.photos/240/240';

const meta: Meta<typeof EmoticonItem> = {
  title: 'UI/Display/EmoticonItem',
  component: EmoticonItem,
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
    (Story) => (
      <div className='w-[240px]'>
        <Story />
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
    showBottomBar: {
      control: { type: 'boolean' },
      description: '하단 바 표시 여부',
    },
    showGrip: {
      control: { type: 'boolean' },
      description: '그립 표시 여부',
    },
    showCheckbox: {
      control: { type: 'boolean' },
      description: '체크박스 표시 여부',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태 표시 여부',
    },
    likeCount: {
      control: { type: 'number' },
      description: '좋아요 수',
    },
    commentCount: {
      control: { type: 'number' },
      description: '댓글 수',
    },
    isDragging: {
      control: { type: 'boolean' },
      description: '드래그 중인 상태',
    },
    isChanged: {
      control: { type: 'boolean' },
      description: '순서가 변경된 상태',
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
};

export const WithImage: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
  },
};

export const WithBottomBar: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showBottomBar: true,
    likeCount: 42,
    commentCount: 12,
  },
};

export const WithGrip: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showGrip: true,
  },
};

export const WithCheckbox: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showCheckbox: true,
  },
};

export const Loading: Story = {
  args: {
    imageNumber: 1,
    isLoading: true,
  },
};

export const Dragging: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    isDragging: true,
  },
};

export const Changed: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    isChanged: true,
  },
};

export const FullFeatured: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showBottomBar: true,
    showGrip: true,
    showCheckbox: true,
    likeCount: 128,
    commentCount: 32,
  },
};

export const HighLikes: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showBottomBar: true,
    likeCount: 999,
    commentCount: 5,
  },
};

export const HighComments: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showBottomBar: true,
    likeCount: 15,
    commentCount: 256,
  },
};

export const NoImage: Story = {
  args: {
    imageNumber: 1,
    showBottomBar: true,
    likeCount: 0,
    commentCount: 0,
  },
};

export const WithCheckboxAndBottomBar: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showCheckbox: true,
    showBottomBar: true,
    likeCount: 42,
    commentCount: 12,
  },
};

export const WithCheckboxAndGrip: Story = {
  args: {
    imageNumber: 1,
    imageUrl,
    showCheckbox: true,
    showGrip: true,
  },
};

export const Grid: Story = {
  render: () => (
    <div className='grid w-[720px] grid-cols-3 gap-4'>
      <EmoticonItem
        imageNumber={1}
        imageUrl={imageUrl}
        showBottomBar={true}
        likeCount={42}
        commentCount={12}
      />
      <EmoticonItem
        imageNumber={2}
        imageUrl={imageUrl}
        showBottomBar={true}
        likeCount={128}
        commentCount={32}
        isChanged={true}
      />
      <EmoticonItem
        imageNumber={3}
        imageUrl={imageUrl}
        showBottomBar={true}
        likeCount={999}
        commentCount={5}
      />
      <EmoticonItem
        imageNumber={4}
        imageUrl={imageUrl}
        showBottomBar={true}
        likeCount={15}
        commentCount={256}
      />
      <EmoticonItem
        imageNumber={5}
        imageUrl={imageUrl}
        showBottomBar={true}
        likeCount={0}
        commentCount={0}
      />
      <EmoticonItem
        imageNumber={6}
        imageUrl={imageUrl}
        showBottomBar={true}
        likeCount={67}
        commentCount={8}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const GridWithCheckboxes: Story = {
  render: () => (
    <div className='grid w-[720px] grid-cols-3 gap-4'>
      <EmoticonItem
        imageNumber={1}
        imageUrl={imageUrl}
        showCheckbox={true}
        showBottomBar={true}
        likeCount={42}
        commentCount={12}
      />
      <EmoticonItem
        imageNumber={2}
        imageUrl={imageUrl}
        showCheckbox={true}
        showBottomBar={true}
        likeCount={128}
        commentCount={32}
      />
      <EmoticonItem
        imageNumber={3}
        imageUrl={imageUrl}
        showCheckbox={true}
        showBottomBar={true}
        likeCount={999}
        commentCount={5}
      />
      <EmoticonItem
        imageNumber={4}
        imageUrl={imageUrl}
        showCheckbox={true}
        showBottomBar={true}
        likeCount={15}
        commentCount={256}
      />
      <EmoticonItem
        imageNumber={5}
        imageUrl={imageUrl}
        showCheckbox={true}
        showBottomBar={true}
        likeCount={0}
        commentCount={0}
      />
      <EmoticonItem
        imageNumber={6}
        imageUrl={imageUrl}
        showCheckbox={true}
        showBottomBar={true}
        likeCount={67}
        commentCount={8}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
