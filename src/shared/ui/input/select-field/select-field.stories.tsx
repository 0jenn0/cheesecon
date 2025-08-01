import type { Meta, StoryObj } from '@storybook/nextjs';
import { ICON_NAMES } from '../../icon/config';
import SelectField, { SELECT_DIRECTION, SELECT_VARIANT } from './select-field';

const meta: Meta<typeof SelectField> = {
  title: 'UI/Input/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 스타일과 상태를 지원하는 Select 필드 컴포넌트입니다. 검색, 입력 필드 등에서 사용됩니다.',
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
      options: SELECT_VARIANT,
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
      options: SELECT_DIRECTION,
      description: '라벨과 입력 필드의 배치 방향',
    },
    options: {
      control: { type: 'object' },
      description: '선택 옵션 목록',
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
    label: '카테고리',
    placeholder: '카테고리를 선택해주세요.',
    variant: 'default',
    disabled: false,
    placeholderIcon: 'menu',
    placeholderIconSize: 24,
    direction: 'column',
    options: ['전자제품', '의류', '식품', '도서', '스포츠'],
    helpMessage: {
      default: '상품 카테고리를 선택해주세요.',
      success: '카테고리가 선택되었습니다.',
      error: '카테고리를 다시 선택해주세요.',
    },
  },
};

export const Success: Story = {
  args: {
    label: '배송지',
    placeholder: '배송지를 선택해주세요.',
    variant: 'success',
    disabled: false,
    placeholderIcon: 'earth',
    placeholderIconSize: 24,
    direction: 'column',
    options: ['집', '회사', '학교', '기타'],
    helpMessage: {
      default: '배송받을 주소를 선택해주세요.',
      success: '배송지가 선택되었습니다.',
      error: '배송지를 다시 선택해주세요.',
    },
  },
};

export const Error: Story = {
  args: {
    label: '결제수단',
    placeholder: '결제수단을 선택해주세요.',
    variant: 'error',
    disabled: false,
    placeholderIcon: 'check-circle',
    placeholderIconSize: 24,
    direction: 'column',
    options: ['신용카드', '체크카드', '계좌이체', '휴대폰결제'],
    helpMessage: {
      default: '결제수단을 선택해주세요.',
      success: '결제수단이 선택되었습니다.',
      error: '결제수단을 다시 선택해주세요.',
    },
  },
};

export const Disabled: Story = {
  args: {
    label: '배송방법',
    placeholder: '배송방법을 선택해주세요.',
    variant: 'default',
    disabled: true,
    placeholderIcon: 'send',
    placeholderIconSize: 24,
    direction: 'column',
    options: ['일반배송', '빠른배송', '특급배송'],
    helpMessage: {
      default: '배송방법을 선택해주세요.',
      success: '배송방법이 선택되었습니다.',
      error: '배송방법을 다시 선택해주세요.',
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    label: '색상',
    placeholder: '색상을 선택해주세요.',
    variant: 'default',
    disabled: false,
    direction: 'column',
    options: ['빨강', '파랑', '초록', '노랑', '검정', '흰색'],
    helpMessage: {
      default: '원하는 색상을 선택해주세요.',
      success: '색상이 선택되었습니다.',
      error: '색상을 다시 선택해주세요.',
    },
  },
};

export const WithoutHelpMessage: Story = {
  args: {
    label: '사이즈',
    placeholder: '사이즈를 선택해주세요.',
    variant: 'default',
    disabled: false,
    placeholderIcon: 'edit',
    placeholderIconSize: 24,
    direction: 'column',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
};

export const RowDirection: Story = {
  args: {
    label: '브랜드',
    placeholder: '브랜드를 선택해주세요.',
    variant: 'default',
    disabled: false,
    placeholderIcon: 'menu',
    placeholderIconSize: 24,
    direction: 'row',
    options: ['나이키', '아디다스', '퓨마', '언더아머', '뉴발란스'],
    helpMessage: {
      default: '원하는 브랜드를 선택해주세요.',
      success: '브랜드가 선택되었습니다.',
      error: '브랜드를 다시 선택해주세요.',
    },
  },
};
