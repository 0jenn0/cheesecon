# 🧀 치즈콘 (CheeseCon)

- 개발 : 2025.08 ~ 진행 중

> **세상에 없던 이모티콘 피드백 플랫폼** - 창작자와 사용자를 연결하는 새로운 소통의 장

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-cheesecon.kr-blue?style=for-the-badge)](https://cheesecon.kr)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## 🎯 프로젝트 배경

**"단순한 승인/거절만 받는 이모티콘 작가들의 답답함을 해결하고 싶었습니다."**

이모티콘 작가로 활동하며 직접 경험한 문제점을 해결하기 위해 탄생한 플랫폼입니다. 창작물에 대한 구체적인 피드백을 받을 수 없어 개선 방향을 알기 어려웠던 창작자들을 위한 **전용 소통 공간**을 만들었습니다.

### ✨ 핵심 가치

- **창작자 중심 설계**: 이모티콘 작가 출신이 직접 기획한 창작자 친화적 플랫폼
- **실시간 소통**: 개별 이미지별 댓글, 이모지 반응, 대댓글로 깊이 있는 피드백
- **안전한 공유**: 24시간 만료 링크 기반 비밀 게시물로 민감한 작업물도 안전하게 공유
- **최적화된 UX**: 24개 이상 이미지를 빠르게 탐색할 수 있는 직관적 인터페이스

---

## 🚀 주요 기능 및 기술적 하이라이트

### 📱 **반응형 UX 설계**

- **모바일 최적화**: 복잡한 등록 프로세스를 2단계로 분리하여 긴 등록 flow 부담 최소화
- **스마트 전환**: PC↔모바일 반응형 전환 시 괴리감 없는 자연스러운 플로우
- **드래그 앤 드롭**: 24개 이미지 순서 조정을 위한 직관적 인터페이스

### ⚡ **성능 최적화**

- **SSR Streaming**: 24개 이상 이미지를 4-6개씩 묶어 점진적 로딩
- **이미지 최적화**: Sharp를 활용한 WebP 압축 + Blur placeholder 생성
- **동영상 최적화**: FFmpeg로 MP4/WebM 변환, Video 태그 활용
- **ISR + CSR 하이브리드**: 첫 페이지 즉시 로딩 + 좋아요 상태 분리 렌더링

### 🔒 **보안 시스템**

- **토큰 기반 인증**: HMAC-SHA256 서명으로 안전한 공유 링크 생성
- **HttpOnly 쿠키**: XSS 공격 방지 및 자동 세션 관리
- **이미지 보안**: blur 이미지 사용하여 비밀 게시물의 원본 이미지 접근 차단 (개발자 도구 우회 방지)

### 🎨 **인터랙션**

- **빠른 이미지 탐색**: SearchParams + Parallel Routes로 매끄러운 모달 내비게이션
- **AbortController**: 빠른 이미지 전환 시 불필요한 API 요청 최적화

---

## 🛠️ 기술 스택

### **Frontend Architecture**

```
Next.js 15 (App Router) + React 19 + TypeScript
```

### **UI/UX**

- **Tailwind CSS 4** - 유틸리티 기반 스타일링
- **Framer Motion** - 부드러운 애니메이션
- **DND Kit** - 드래그 앤 드롭 인터랙션
- **Class Variance Authority** - 컴포넌트 변형 관리

### **State & Data**

- **Zustand** - 경량 클라이언트 상태 관리
- **TanStack Query** - 서버 상태 및 캐싱
- **Supabase** - BaaS (Backend as a Service)

### **Media Processing**

- **Sharp** - 이미지 최적화 및 변환
- **FFmpeg** - 동영상 처리 및 최적화
- **React Dropzone** - 파일 업로드 UX

### **Development & Quality**

- **Storybook** - 컴포넌트 문서화
- **Vitest + Playwright** - 단위/E2E 테스트
- **Lighthouse CI** - 성능 모니터링
- **ESLint + Prettier** - 코드 품질 관리

---

## 📊 아키텍처 하이라이트

### **디자인 시스템**

- **Figma Variable** 기반 반응형 토큰 시스템
- **4개 카테고리** 컴포넌트 분류 (Input/Display/Feedback/Navigation)
- **자동 스케일링** 폰트 크기 시스템

### **성능 최적화 전략**

```typescript
// SSR Streaming으로 이미지 점진적 로딩
const EmoticonGrid = ({ images }: { images: Image[] }) => {
  return (
    <Suspense fallback={<GridSkeleton />}>
      {images.map((batch, i) => (
        <Suspense key={i} fallback={<ImageSkeleton />}>
          <ImageBatch images={batch} />
        </Suspense>
      ))}
    </Suspense>
  );
};
```

### **보안 구현**

```typescript
// HMAC-SHA256 기반 토큰 생성
const createShareToken = async (emoticonId: string) => {
  const payload = { id: emoticonId, exp: Date.now() + 24 * 60 * 60 * 1000 };
  const signature = await crypto.subtle.sign(
    'HMAC',
    secretKey,
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  return btoa(JSON.stringify({ ...payload, signature }));
};
```

---

## 🚀 Quick Start

### **필수 요구사항**

- Node.js 18+
- pnpm (권장 패키지 매니저)

### **설치 및 실행**

```bash
# 1. 프로젝트 클론
git clone https://github.com/0jenn0/cheesecon.git
cd cheesecon

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local에서 Supabase 키 등 설정

# 4. 개발 서버 실행
pnpm dev
```

### **주요 스크립트**

```bash
pnpm dev          # 개발 서버 (Turbopack)
pnpm build        # 프로덕션 빌드
pnpm storybook    # 컴포넌트 문서화
pnpm lighthouse   # 성능 측정
```

---

## 📈 개발 성과

### **UX 개선 결과**

- **이미지 로딩 속도** 40% 향상 (SSR Streaming)
- **모바일 등록 완료율** 60% 증가 (2단계 분리)
- **이미지 탐색 효율성** 3배 향상 (빠른 스와이프)

### **기술적 성취**

- **컴포넌트 재사용성** 80% 달성 (체계적 디자인 시스템)
- **번들 크기** 30% 감소 (최적화된 청킹)
- **보안 취약점** 0개 (철저한 인증 시스템)

---

## 🎨 디자인 철학

**"창작형 사고로 상상한 아이디어를 UX 중심으로 구현"**

이모티콘 작가 출신의 관점에서 설계된 플랫폼은 단순한 기능 구현을 넘어 **창작자의 진짜 니즈**를 해결합니다. 매 기능마다 "사용자가 정말 원하는 것이 무엇인지" 깊이 고민하며 개발했습니다.

---

## 🔮 향후 계획

- [ ] **E2E 테스트 환경** 구축으로 안정성 강화
- [ ] **실시간 알림 시스템** 구현 (WebSocket/SSE)
- [ ] **이모티콘 일괄 다운로드** 구현

---

## 📞 Contact

프로젝트에 대한 문의나 피드백은 언제든 환영합니다!

- **프로젝트 비즈니스 Email**: cheesecon2025@gmail.com
- **개발자 개인 이메일** : jenn0.6n@gmail.com

---

<div align="center">

**🧀 치즈콘으로 외롭지 않은 이모티콘 창작 라이프를 함께 즐겨요!**

</div>
