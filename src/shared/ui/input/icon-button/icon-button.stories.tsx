import type { Meta, StoryObj } from '@storybook/nextjs';
import { ICON_NAMES } from '../../icon/config';
import IconButton from './icon-button';

const meta: Meta<typeof IconButton> = {
  title: 'UI/Input/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 스타일과 상태를 지원하는 아이콘 버튼 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: '아이콘 버튼의 스타일 변형',
    },
    styleVariant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'transparent'],
      description: '아이콘 버튼의 스타일 변형',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '아이콘 버튼의 비활성화 상태',
    },
    icon: {
      control: { type: 'select' },
      options: ICON_NAMES,
      description: '아이콘 버튼의 아이콘',
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: '버튼',
    variant: 'primary',
    styleVariant: 'filled',
    icon: 'logo',
  },
};

export const AllVariants: StoryObj<typeof meta> = {
  args: {
    icon: 'plus',
  },
  decorators: [
    () => (
      <div className='flex gap-24'>
        <IconButton variant='primary' icon='logo' />
        <IconButton variant='secondary' icon='logo' />
        <IconButton variant='danger' icon='logo' />
      </div>
    ),
  ],
};

export const AllStyleVariants: StoryObj<typeof meta> = {
  args: {
    icon: 'logo',
  },
  decorators: [
    () => (
      <div className='flex flex-col gap-16'>
        <div className='flex gap-16'>
          <IconButton styleVariant='filled' icon='logo' />
          <IconButton styleVariant='outlined' icon='logo' />
          <IconButton styleVariant='transparent' icon='logo' />
        </div>
      </div>
    ),
  ],
};

export const Primary: StoryObj<typeof meta> = {
  args: {
    icon: 'logo',
  },
  decorators: [
    () => (
      <div className='flex flex-col gap-24'>
        <div>
          <h3 className='mb-16 text-lg font-semibold'>
            Primary Button - 모든 스타일
          </h3>
          <div className='grid grid-cols-3 gap-16'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Filled Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='primary'
                    styleVariant='filled'
                    icon='logo'
                  />
                  <IconButton
                    variant='primary'
                    styleVariant='filled'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='primary'
                    styleVariant='filled'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Outline Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='primary'
                    styleVariant='outlined'
                    icon='logo'
                  />
                  <IconButton
                    variant='primary'
                    styleVariant='outlined'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='primary'
                    styleVariant='outlined'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Transparent Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='primary'
                    styleVariant='transparent'
                    icon='logo'
                  />
                  <IconButton
                    variant='primary'
                    styleVariant='transparent'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='primary'
                    styleVariant='transparent'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const Secondary: StoryObj<typeof meta> = {
  args: {
    icon: 'logo',
  },
  decorators: [
    () => (
      <div className='flex flex-col gap-24'>
        <div>
          <h3 className='mb-16 text-lg font-semibold'>
            Secondary Button - 모든 스타일
          </h3>
          <div className='grid grid-cols-3 gap-16'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Filled Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='secondary'
                    styleVariant='filled'
                    icon='logo'
                  />
                  <IconButton
                    variant='secondary'
                    styleVariant='filled'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='secondary'
                    styleVariant='filled'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Outline Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='secondary'
                    styleVariant='outlined'
                    icon='logo'
                  />
                  <IconButton
                    variant='secondary'
                    styleVariant='outlined'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='secondary'
                    styleVariant='outlined'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Transparent Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='secondary'
                    styleVariant='transparent'
                    icon='logo'
                  />
                  <IconButton
                    variant='secondary'
                    styleVariant='transparent'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='secondary'
                    styleVariant='transparent'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const Danger: StoryObj<typeof meta> = {
  args: {
    icon: 'logo',
  },
  decorators: [
    () => (
      <div className='flex flex-col gap-24'>
        <div>
          <h3 className='mb-16 text-lg font-semibold'>
            Danger Button - 모든 스타일
          </h3>
          <div className='grid grid-cols-3 gap-16'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Filled Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='danger'
                    styleVariant='filled'
                    icon='logo'
                  />
                  <IconButton
                    variant='danger'
                    styleVariant='filled'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='danger'
                    styleVariant='filled'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Outline Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='danger'
                    styleVariant='outlined'
                    icon='logo'
                  />
                  <IconButton
                    variant='danger'
                    styleVariant='outlined'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='danger'
                    styleVariant='outlined'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-4'>
                <p className='text-sm font-medium text-gray-600'>
                  Transparent Style
                </p>
                <div className='flex flex-col gap-4'>
                  <IconButton
                    variant='danger'
                    styleVariant='transparent'
                    icon='logo'
                  />
                  <IconButton
                    variant='danger'
                    styleVariant='transparent'
                    disabled
                    icon='logo'
                  />
                  <IconButton
                    variant='danger'
                    styleVariant='transparent'
                    icon='logo'
                    isLoading
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};
