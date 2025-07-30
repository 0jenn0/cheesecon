import type { Meta, StoryObj } from '@storybook/nextjs';
import { ICON_NAMES } from '../../display/icon/config';
import TextField, {
  TEXTFIELD_DIRECTION,
  TEXTFIELD_VARIANT,
} from './text-area-field';

const meta: Meta<typeof TextField> = {
  title: 'UI/Input/TextAreaField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 스타일과 상태를 지원하는 텍스트 필드 컴포넌트입니다. 검색, 입력 필드 등에서 사용됩니다.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    placeholderIcon: {
      control: { type: 'select' },
      options: ICON_NAMES,
      description: '플레이스홀더 아이콘',
    },
    placeholderIconSize: {
      control: { type: 'number' },
      description: '아이콘 크기',
    },
    variant: {
      control: { type: 'select' },
      options: TEXTFIELD_VARIANT,
      description: '텍스트 필드 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    helpMessage: {
      control: { type: 'object' },
      description: '도움말 메시지 (각 상태별)',
    },
    direction: {
      control: { type: 'select' },
      options: TEXTFIELD_DIRECTION,
      description: '라벨과 입력 필드의 배치 방향',
    },
  },
  decorators: [
    (Story) => (
      <div className='w-[600px]'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이름',
    placeholder: '2-22자 사이로 입력해주세요.',
    variant: 'default',
    disabled: false,
    placeholderIcon: 'logo',
    placeholderIconSize: 24,
    direction: 'column',
    helpMessage: {
      default: '도움말 메시지',
      success: '성공 메시지',
      error: '에러 메시지',
    },
  },
};

export const Success: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
    variant: 'success',
    disabled: false,
    placeholderIcon: 'at-sign',
    placeholderIconSize: 24,
    direction: 'column',
    helpMessage: {
      default: '올바른 이메일 형식으로 입력해주세요.',
      success: '사용 가능한 이메일입니다.',
      error: '이미 사용 중인 이메일입니다.',
    },
  },
};

export const Error: Story = {
  args: {
    label: '비밀번호',
    placeholder: '8자 이상 입력해주세요.',
    variant: 'error',
    disabled: false,
    placeholderIcon: 'lock',
    placeholderIconSize: 24,
    direction: 'column',
    helpMessage: {
      default: '영문, 숫자, 특수문자를 포함해주세요.',
      success: '안전한 비밀번호입니다.',
      error: '비밀번호가 일치하지 않습니다.',
    },
  },
};

export const Disabled: Story = {
  args: {
    label: '전화번호',
    placeholder: '전화번호를 입력해주세요.',
    variant: 'default',
    disabled: true,
    placeholderIcon: 'at-sign',
    placeholderIconSize: 24,
    direction: 'column',
    helpMessage: {
      default: '하이픈(-) 없이 숫자만 입력해주세요.',
      success: '올바른 전화번호입니다.',
      error: '올바르지 않은 전화번호입니다.',
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    label: '주소',
    placeholder: '주소를 입력해주세요.',
    variant: 'default',
    disabled: false,
    direction: 'column',
    helpMessage: {
      default: '상세주소까지 입력해주세요.',
      success: '주소가 정상적으로 등록되었습니다.',
      error: '주소를 다시 확인해주세요.',
    },
  },
};

export const WithoutHelpMessage: Story = {
  args: {
    label: '메모',
    placeholder: '메모를 입력해주세요.',
    variant: 'default',
    disabled: false,
    placeholderIcon: 'edit',
    placeholderIconSize: 24,
    direction: 'column',
  },
};

export const RowDirection: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력해주세요.',
    variant: 'default',
    disabled: false,
    placeholderIcon: 'menu',
    placeholderIconSize: 24,
    direction: 'row',
    helpMessage: {
      default: '검색어를 입력해주세요.',
      success: '검색이 완료되었습니다.',
      error: '검색어를 다시 입력해주세요.',
    },
  },
};
