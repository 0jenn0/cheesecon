import type { Meta, StoryObj } from '@storybook/nextjs';
import GlobalNavigationBar from './global-navigation-bar';

const meta: Meta<typeof GlobalNavigationBar> = {
  title: 'UI/Navigation/GlobalNavigationBar',
  component: GlobalNavigationBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `

전역 네비게이션 바 컴포넌트입니다.

## 반응형 동작

이 컴포넌트는 Tailwind CSS의 반응형 클래스를 사용하여 화면 크기에 따라 다른 레이아웃을 제공합니다:

### 모바일 (기본 ~ 767px)
- **햄버거 메뉴 버튼**만 표시 (tablet:hidden flex)
- **네비게이션 메뉴**와 **사용자 프로필**은 숨김 (tablet:flex hidden)
- 햄버거 메뉴 클릭 시 모바일 메뉴가 나타남

### 태블릿/데스크톱 (768px 이상)
- **네비게이션 메뉴**와 **사용자 프로필** 표시 (tablet:flex hidden)
- **햄버거 메뉴 버튼**은 숨김 (tablet:hidden flex)
- 데스크톱과 동일한 레이아웃

## Props

- isLoggedIn: 로그인 상태 (boolean)
- name: 사용자 이름 (로그인 시에만 표시, optional)

## 사용법

Storybook에서 뷰포트 컨트롤을 사용하여 다양한 화면 크기에서의 동작을 확인할 수 있습니다:
1. 상단의 뷰포트 드롭다운에서 "Mobile" 선택 → 햄버거 메뉴만 표시
2. "Tablet" 또는 "Desktop" 선택 → 네비게이션과 사용자 프로필 표시`,
      },
    },
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description:
        '로그인 상태를 나타냅니다. true일 때 사용자 프로필이 표시됩니다.',
    },
    name: {
      control: { type: 'text' },
      value: '최리버',
      description: '사용자 이름입니다. isLoggedIn이 true일 때만 표시됩니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoggedIn: false,
  },
  parameters: {
    docs: {
      description: {
        story: `## 기본 사용법

이 스토리는 로그아웃 상태의 기본 네비게이션 바를 보여줍니다.

### 반응형 테스트 방법

1. **모바일 뷰 테스트**: Storybook 상단의 뷰포트 드롭다운에서 "Mobile" 선택
   - 햄버거 메뉴 버튼만 표시됨
   - 네비게이션과 사용자 프로필은 숨겨짐

2. **태블릿/데스크톱 뷰 테스트**: "Tablet" 또는 "Desktop" 선택
   - 네비게이션 메뉴와 사용자 프로필 표시
   - 햄버거 메뉴는 숨겨짐

### 로그인 상태 테스트

Controls 패널에서 isLoggedIn을 true로 변경하면:
- 로그인 상태의 네비게이션 바를 확인할 수 있습니다
- name prop을 설정하면 사용자 이름이 표시됩니다

### 컴포넌트 구조

- **Logo**: 항상 표시되는 로고
- **Navigation**: 태블릿 이상에서만 표시되는 네비게이션 메뉴
- **MenuButton**: 모바일에서만 표시되는 햄버거 메뉴 버튼
- **UserProfile**: 태블릿 이상에서만 표시되는 사용자 프로필`,
      },
    },
  },
};
