import type { Meta, StoryObj } from '@storybook/nextjs';
import { ICON_NAMES } from '../../icon/config';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Input/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 버튼 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: '버튼의 스타일 변형',
    },
    styleVariant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'transparent'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: '버튼의 크기',
    },
    leadingIcon: {
      control: { type: 'select' },
      options: ['', ...ICON_NAMES],
      description: '버튼 앞에 표시할 아이콘',
    },
    trailingIcon: {
      control: { type: 'select' },
      options: ['', ...ICON_NAMES],
      description: '버튼 뒤에 표시할 아이콘',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    children: {
      control: { type: 'text' },
      description: '버튼 텍스트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
    styleVariant: 'filled',
    size: 'md',
  },
};

// 모든 variant를 한 번에 보기
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-24'>
      <div className='flex gap-16'>
        <Button variant='primary'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='danger'>Danger</Button>
      </div>
    </div>
  ),
};

// 모든 styleVariant를 한 번에 보기
export const AllStyleVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-16'>
      <div className='flex gap-16'>
        <Button styleVariant='filled'>Filled</Button>
        <Button styleVariant='outlined'>Outline</Button>
        <Button styleVariant='transparent'>Transparent</Button>
      </div>
    </div>
  ),
};

// 모든 크기를 한 번에 보기
export const AllSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-16'>
      <div className='flex items-center gap-16'>
        <span className='w-20 text-sm font-medium text-gray-600'>Small:</span>
        <Button size='sm'>Small Button</Button>
      </div>
      <div className='flex items-center gap-16'>
        <span className='w-20 text-sm font-medium text-gray-600'>Medium:</span>
        <Button size='md'>Medium Button</Button>
      </div>
    </div>
  ),
};

// Primary 버튼 - 모든 스타일과 상태
export const Primary: Story = {
  render: () => (
    <div className='flex flex-col gap-24'>
      <div>
        <h3 className='mb-16 text-lg font-semibold'>
          Primary Button - 모든 스타일
        </h3>
        <div className='grid grid-cols-3 gap-16'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>Filled Style</p>
              <div className='flex flex-col gap-4'>
                <Button variant='primary' styleVariant='filled' size='md'>
                  Primary Button
                </Button>
                <Button
                  variant='primary'
                  styleVariant='filled'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='primary'
                  styleVariant='filled'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='primary'
                  styleVariant='filled'
                  size='md'
                  leadingIcon='plus'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='primary'
                  styleVariant='filled'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='primary'
                  styleVariant='filled'
                  size='md'
                  leadingIcon='heart'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>Outline Style</p>
              <div className='flex flex-col gap-4'>
                <Button variant='primary' styleVariant='outlined' size='md'>
                  Primary Button
                </Button>
                <Button
                  variant='primary'
                  styleVariant='outlined'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='primary'
                  styleVariant='outlined'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='primary'
                  styleVariant='outlined'
                  size='md'
                  leadingIcon='plus'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='primary'
                  styleVariant='outlined'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='primary'
                  styleVariant='outlined'
                  size='md'
                  leadingIcon='heart'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>
                Transparent Style
              </p>
              <div className='flex flex-col gap-4'>
                <Button variant='primary' styleVariant='transparent' size='md'>
                  Primary Button
                </Button>
                <Button
                  variant='primary'
                  styleVariant='transparent'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='primary'
                  styleVariant='transparent'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='primary'
                  styleVariant='transparent'
                  size='md'
                  leadingIcon='plus'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='primary'
                  styleVariant='transparent'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='primary'
                  styleVariant='transparent'
                  size='md'
                  leadingIcon='heart'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Secondary 버튼 - 모든 스타일과 상태
export const Secondary: Story = {
  render: () => (
    <div className='flex flex-col gap-24'>
      <div>
        <h3 className='mb-16 text-lg font-semibold'>
          Secondary Button - 모든 스타일
        </h3>
        <div className='grid grid-cols-3 gap-16'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>Filled Style</p>
              <div className='flex flex-col gap-4'>
                <Button variant='secondary' styleVariant='filled' size='md'>
                  Secondary Button
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='filled'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='filled'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='filled'
                  size='md'
                  leadingIcon='edit'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='filled'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='filled'
                  size='md'
                  leadingIcon='edit'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>Outline Style</p>
              <div className='flex flex-col gap-4'>
                <Button variant='secondary' styleVariant='outlined' size='md'>
                  Secondary Button
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='outlined'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='outlined'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='outlined'
                  size='md'
                  leadingIcon='edit'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='outlined'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='outlined'
                  size='md'
                  leadingIcon='edit'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>
                Transparent Style
              </p>
              <div className='flex flex-col gap-4'>
                <Button
                  variant='secondary'
                  styleVariant='transparent'
                  size='md'
                >
                  Secondary Button
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='transparent'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='transparent'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='transparent'
                  size='md'
                  leadingIcon='edit'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='transparent'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='secondary'
                  styleVariant='transparent'
                  size='md'
                  leadingIcon='edit'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Danger 버튼 - 모든 스타일과 상태
export const Danger: Story = {
  render: () => (
    <div className='flex flex-col gap-24'>
      <div>
        <h3 className='mb-16 text-lg font-semibold'>
          Danger Button - 모든 스타일
        </h3>
        <div className='grid grid-cols-3 gap-16'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>Filled Style</p>
              <div className='flex flex-col gap-4'>
                <Button variant='danger' styleVariant='filled' size='md'>
                  Delete
                </Button>
                <Button
                  variant='danger'
                  styleVariant='filled'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='danger'
                  styleVariant='filled'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='danger'
                  styleVariant='filled'
                  size='md'
                  leadingIcon='trash'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='danger'
                  styleVariant='filled'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='danger'
                  styleVariant='filled'
                  size='md'
                  leadingIcon='trash'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>Outline Style</p>
              <div className='flex flex-col gap-4'>
                <Button variant='danger' styleVariant='outlined' size='md'>
                  Delete
                </Button>
                <Button
                  variant='danger'
                  styleVariant='outlined'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='danger'
                  styleVariant='outlined'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='danger'
                  styleVariant='outlined'
                  size='md'
                  leadingIcon='trash'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='danger'
                  styleVariant='outlined'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='danger'
                  styleVariant='outlined'
                  size='md'
                  leadingIcon='trash'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-sm font-medium text-gray-600'>
                Transparent Style
              </p>
              <div className='flex flex-col gap-4'>
                <Button variant='danger' styleVariant='transparent' size='md'>
                  Delete
                </Button>
                <Button
                  variant='danger'
                  styleVariant='transparent'
                  size='md'
                  disabled
                >
                  Disabled
                </Button>
                <Button
                  variant='danger'
                  styleVariant='transparent'
                  size='md'
                  isLoading
                >
                  Loading...
                </Button>
                <Button
                  variant='danger'
                  styleVariant='transparent'
                  size='md'
                  leadingIcon='trash'
                >
                  With Leading Icon
                </Button>
                <Button
                  variant='danger'
                  styleVariant='transparent'
                  size='md'
                  trailingIcon='chevron-down'
                >
                  With Trailing Icon
                </Button>
                <Button
                  variant='danger'
                  styleVariant='transparent'
                  size='md'
                  leadingIcon='trash'
                  trailingIcon='chevron-down'
                >
                  With Both Icons
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
