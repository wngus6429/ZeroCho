# 프론트엔드 아키텍처 및 가이드

이 문서는 Next15 프로젝트 프론트엔드 애플리케이션의 아키텍처, 주요 기능 및 설정 방법에 대해 설명합니다.

## 1. 개요

본 프론트엔드 애플리케이션은 **Next.js** 15 (App Router)를 기반으로 구축된 React 애플리케이션입니다. 서버 사이드 렌더링(SSR)과 클라이언트 사이드 렌더링(CSR)을 함께 활용하여 사용자 경험과 성능을 최적화합니다. 백엔드 API와 통신하여 데이터를 주고받으며, 사용자 인증 및 동적 라우팅을 처리합니다.

## 2. 기술 스택

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **State Management**: React Query (`@tanstack/react-query`) 및 Zustand
-   **Styling**: CSS Modules 또는 Tailwind CSS (선택적, `globals.css` 기반)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **API Mocking**: MSW (Mock Service Worker) (`msw`)
-   **Form Handling**: React Hook Form (추정)

## 3. 프로젝트 구조

주요 디렉토리 구조는 다음과 같습니다.

```
front/
├── src/
│   ├── app/                  # Next.js App Router의 핵심 디렉토리
│   │   ├── (afterLogin)/     # 로그인 후 접근 가능한 레이아웃 및 페이지
│   │   ├── (beforeLogin)/    # 로그인 전 접근 가능한 레이아웃 및 페이지
│   │   ├── api/              # API Route 핸들러
│   │   ├── _component/       # 공용 컴포넌트
│   │   ├── layout.tsx        # 전역 레이아웃
│   │   └── page.tsx          # 메인 페이지
│   ├── auth.ts               # NextAuth.js 설정 파일
│   ├── middleware.ts         # Next.js 미들웨어 (라우팅 제어)
│   ├── mocks/                # MSW를 사용한 API 모킹
│   ├── model/                # 데이터 모델 타입 정의 (User, Post 등)
│   └── store/                # Zustand 스토어
├── public/                 # 정적 파일 (이미지, 폰트 등)
├── .env.local              # 로컬 환경 변수
└── package.json            # 프로젝트 의존성 및 스크립트
```

-   **`src/app/`**: Next.js의 App Router가 적용된 핵심 디렉토리입니다.
    -   **`(afterLogin)` / `(beforeLogin)`**: 라우트 그룹을 사용하여 로그인 상태에 따라 다른 레이아웃과 페이지를 보여줍니다. 괄호로 묶인 폴더는 URL 경로에 영향을 주지 않습니다.
    -   **`_component/`**: 접두사 `_`를 사용하여 내부적으로 사용되는 컴포넌트임을 명시합니다. 여러 페이지에서 재사용되는 UI 조각들이 위치합니다.
    -   **`layout.tsx`**: 모든 페이지에 공통으로 적용되는 최상위 레이아웃입니다. HTML의 `<body>` 태그 등을 포함합니다.
-   **`src/auth.ts`**: `NextAuth.js`의 설정을 담당합니다. 로그인 방식(Credentials), 세션 관리 전략(JWT 또는 Database), 콜백 함수 등을 정의합니다.
-   **`src/middleware.ts`**: 특정 경로에 접근하기 전 실행되는 미들웨어입니다. 주로 사용자의 로그인 상태를 확인하여 페이지 접근을 제어(리다이렉트)하는 역할을 합니다.
-   **`src/mocks/`**: 개발 환경에서 백엔드 API를 모킹하기 위한 MSW 설정 파일이 위치합니다. 이를 통해 백엔드 서버 없이도 프론트엔드 개발을 진행할 수 있습니다.
-   **`src/model/`**: 애플리케이션 전반에서 사용되는 데이터의 타입(TypeScript 인터페이스)을 정의합니다. (예: `User`, `Post`)
-   **`src/store/`**: 클라이언트 사이드 상태 관리를 위한 Zustand 스토어가 위치합니다. (예: 모달 상태 관리)

## 4. 인증 흐름

이 애플리케이션은 **NextAuth.js**를 사용하여 인증을 처리합니다.

1.  **로그인 요청**: 사용자가 로그인 페이지에서 아이디와 비밀번호를 입력합니다.
2.  **Credentials Provider**: `src/auth.ts`에 설정된 `CredentialsProvider`가 백엔드 API 서버의 로그인 엔드포인트로 요청을 보냅니다.
3.  **인증 및 세션 토큰**: 백엔드 서버는 사용자 정보를 확인하고, 성공 시 프론트엔드(NextAuth)에 사용자 정보를 반환합니다. NextAuth는 이 정보를 바탕으로 세션 토큰(주로 JWT)을 생성하여 클라이언트 쿠키에 저장합니다.
4.  **미들웨어 검증**: 사용자가 로그인이 필요한 페이지에 접근할 때, `src/middleware.ts`가 실행됩니다. 미들웨어는 요청에 포함된 세션 토큰을 확인하여 유효성을 검증합니다.
5.  **접근 제어**: 토큰이 유효하면 페이지 접근을 허용하고, 유효하지 않으면 로그인 페이지로 리다이렉트합니다.
6.  **클라이언트 세션**: 클라이언트 컴포넌트에서는 `useSession` 훅을 사용하여 현재 로그인된 사용자의 정보를 가져올 수 있습니다.

## 5. 데이터 페칭

-   **React Query**: 서버 상태 관리를 위해 `@tanstack/react-query`를 사용합니다. API 데이터를 가져오고, 캐싱하며, 자동으로 데이터를 최신 상태로 유지하는 데 사용됩니다.
-   **Fetch API / Axios**: React Query 내부 또는 간단한 API 요청 시 `fetch`나 `axios` 라이브러리를 사용하여 백엔드와 통신합니다.

## 6. 실행 및 개발

1.  **의존성 설치**:
    ```bash
    npm install
    ```
2.  **환경 변수 설정**:
    `.env.local` 파일을 생성하고 백엔드 API 서버 주소, NextAuth 관련 시크릿 키 등을 설정합니다.
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3095
    NEXTAUTH_URL=http://localhost:3090
    NEXTAUTH_SECRET=your-nextauth-secret
    ```
3.  **개발 서버 실행**:
    ```bash
    npm run dev
    ```

이 명령어를 실행하면 프론트엔드 개발 서버가 시작되며, MSW가 활성화되어 API를 모킹합니다.