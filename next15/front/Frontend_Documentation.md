# Z.com 프론트엔드 문서

## 📋 프로젝트 개요

**Z.com**은 트위터를 모방한 소셜 미디어 플랫폼으로, Next.js 15와 App Router를 기반으로 구축된 현대적인 웹 애플리케이션입니다.

### 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **UI 라이브러리**: React 19
- **상태 관리**: React Query (TanStack Query), Zustand
- **인증**: NextAuth.js v5
- **실시간 통신**: Socket.io
- **스타일링**: CSS Modules
- **API 모킹**: MSW (Mock Service Worker)
- **기타 라이브러리**: dayjs, classnames, react-textarea-autosize

## 🏗️ 프로젝트 구조

### 디렉토리 구조

```
src/
├── app/                      # App Router 기반 페이지
│   ├── (beforeLogin)/        # 로그인 전 페이지
│   ├── (afterLogin)/         # 로그인 후 페이지
│   ├── @modal/               # 평행 라우트 모달
│   ├── api/auth/             # NextAuth API 라우트
│   └── globals.css           # 전역 스타일
├── auth.ts                   # NextAuth 설정
├── middleware.ts             # 미들웨어 (인증 보호)
├── model/                    # TypeScript 타입 정의
├── mocks/                    # MSW 핸들러
└── store/                    # Zustand 스토어
```

## 🔐 인증 시스템

### NextAuth.js 설정

- **로그인 페이지**: `/i/flow/login`
- **회원가입 페이지**: `/i/flow/signup`
- **인증 방식**: Credentials Provider
- **세션 관리**: JWT 토큰 + 서버 쿠키

### 보호된 라우트

미들웨어를 통해 다음 페이지들은 로그인이 필요합니다:

- `/compose/tweet` - 게시물 작성
- `/home` - 홈 피드
- `/explore` - 탐색 페이지
- `/messages` - 메시지
- `/search` - 검색

## 📱 주요 기능

### 1. 홈 피드 (`/home`)

- **추천 게시물**: 알고리즘 기반 피드
- **팔로잉 게시물**: 팔로우한 사용자들의 게시물
- **게시물 작성**: 텍스트 + 이미지 업로드 지원
- **무한 스크롤**: React Query의 useInfiniteQuery 사용

### 2. 게시물 기능

- **좋아요/리트윗/댓글**: 상호작용 기능
- **이미지 첨부**: 최대 4개 이미지 지원
- **실시간 업데이트**: 카운트 실시간 반영

### 3. 사용자 프로필 (`/[username]`)

- **프로필 정보**: 닉네임, 이미지, 팔로워/팔로잉 수
- **사용자 게시물**: 해당 사용자의 모든 게시물
- **팔로우/언팔로우**: 실시간 팔로우 상태 관리

### 4. 검색 기능 (`/search`)

- **실시간 검색**: 쿼리 파라미터 기반
- **필터 옵션**: 사용자, 게시물 필터
- **검색 결과**: 동적 메타데이터 생성

### 5. 실시간 메시징 (`/messages`)

- **채팅방 목록**: 참여 중인 채팅방 표시
- **실시간 메시지**: Socket.io 기반
- **메시지 전송**: 텍스트 메시지 지원

### 6. 탐색 페이지 (`/explore`)

- **트렌드**: 인기 해시태그
- **추천 사용자**: 팔로우 추천

## 🎨 UI/UX 특징

### 반응형 레이아웃

- **3단 레이아웃**: 왼쪽 네비게이션, 중앙 콘텐츠, 오른쪽 사이드바
- **모바일 친화적**: CSS Grid/Flexbox 활용

### 모달 시스템

- **인터셉팅 라우트**: `@modal` 폴더 활용
- **게시물 작성 모달**: `/compose/tweet`
- **이미지 확대 모달**: 사진 클릭 시 모달로 표시

### 로딩 상태

- **Suspense**: React 18의 Suspense 경계 활용
- **스켈레톤 UI**: 로딩 중 플레이스홀더 표시
- **무한 스크롤**: 부드러운 콘텐츠 로딩

## 🔄 상태 관리

### React Query (TanStack Query)

- **서버 상태 관리**: API 데이터 캐싱 및 동기화
- **무한 쿼리**: 피드 데이터 무한 스크롤
- **낙관적 업데이트**: 사용자 경험 향상

### Zustand

- **클라이언트 상태**: 모달 상태 등 UI 상태 관리

## 🌐 API 통신

### REST API

- **게시물 관련**: CRUD 작업
- **사용자 관련**: 프로필, 팔로우 관리
- **검색**: 키워드 기반 검색
- **인증**: 로그인/로그아웃/회원가입

### WebSocket (Socket.io)

- **실시간 메시징**: 채팅방 메시지
- **온라인 상태**: 사용자 접속 상태
- **실시간 알림**: 좋아요, 댓글 등

## 🧪 개발 도구

### MSW (Mock Service Worker)

- **API 모킹**: 개발 중 백엔드 API 모킹
- **개발 환경**: `NEXT_PUBLIC_MSW_ENABLED` 환경변수로 제어
- **핸들러**: 다양한 API 엔드포인트 모킹

### 타입 정의

```typescript
// 주요 모델 타입
interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  Hearts: UserID[];
  Reposts: UserID[];
  Comments: UserID[];
  _count: { Hearts: number; Reposts: number; Comments: number };
}

interface User {
  id: string;
  nickname: string;
  image: string;
  Followers: UserID[];
  _count: { Followers: number; Followings: number };
}
```

## 🚀 성능 최적화

### Next.js 기능 활용

- **SSR/SSG**: 서버 사이드 렌더링으로 초기 로딩 속도 향상
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **폰트 최적화**: 로컬 폰트 사용으로 FOUT 방지

### React Query 최적화

- **Prefetching**: 서버에서 데이터 미리 가져오기
- **Stale While Revalidate**: 백그라운드 데이터 업데이트
- **Query Invalidation**: 적절한 캐시 무효화

## 🔧 설정 파일

### Next.js 설정 (`next.config.ts`)

- **리라이트**: 업로드 파일 프록시
- **서버 액션**: 50MB 바디 크기 제한
- **실험적 기능**: 활성화된 기능들

### TypeScript 설정

- **Path Mapping**: `@/` 별칭으로 절대 경로 사용
- **Strict Mode**: 엄격한 타입 체크

## 📚 주요 컴포넌트

### 레이아웃 컴포넌트

- `layout.tsx`: 전체 앱 레이아웃
- `AfterLoginLayout`: 로그인 후 3단 레이아웃
- `NavMenu`: 왼쪽 네비게이션 메뉴

### 기능별 컴포넌트

- `PostForm`: 게시물 작성 폼
- `Post`: 게시물 표시 컴포넌트
- `SearchForm`: 검색 입력 폼
- `MessageForm`: 메시지 전송 폼
- `LogoutButton`: 로그아웃 버튼

## 🔍 라우팅 구조

### 기본 라우트

- `/` - 메인 페이지 (로그인 전)
- `/home` - 홈 피드 (로그인 후)
- `/explore` - 탐색 페이지
- `/search` - 검색 페이지
- `/messages` - 메시지 페이지

### 동적 라우트

- `/[username]` - 사용자 프로필
- `/[username]/status/[id]` - 게시물 상세
- `/messages/[room]` - 채팅방

### 병렬 & 인터셉팅 라우트

- `@modal` - 모달 표시
- `(.)compose/tweet` - 게시물 작성 모달
- `(.)photo/[id]` - 이미지 확대 모달

## 🎯 사용자 경험 (UX)

### 접근성

- **시맨틱 HTML**: 적절한 HTML 태그 사용
- **키보드 네비게이션**: 키보드로 모든 기능 접근 가능
- **대체 텍스트**: 이미지에 적절한 alt 텍스트

### 반응성

- **즉시 피드백**: 사용자 액션에 즉각적인 반응
- **낙관적 업데이트**: 서버 응답 전 UI 먼저 업데이트
- **에러 처리**: 사용자 친화적인 에러 메시지

## 🔄 개발 워크플로우

### 개발 서버

```bash
npm run dev  # Turbopack으로 빠른 개발 서버 실행
```

### 빌드 & 배포

```bash
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버 실행
```

### 코드 품질

```bash
npm run lint  # ESLint로 코드 검사
```

## 📋 향후 개선 사항

1. **PWA 지원**: 서비스 워커를 통한 오프라인 기능
2. **다크 모드**: 테마 전환 기능
3. **국제화 (i18n)**: 다국어 지원
4. **성능 모니터링**: 실시간 성능 추적
5. **접근성 향상**: WCAG 가이드라인 준수
6. **테스트 코드**: Unit/Integration/E2E 테스트 추가

이 문서는 Z.com 프론트엔드의 현재 상태를 반영하며, 프로젝트가 발전함에 따라 지속적으로 업데이트될 예정입니다.
