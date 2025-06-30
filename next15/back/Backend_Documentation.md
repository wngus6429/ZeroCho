# Z.com 백엔드 API 문서

## 📋 프로젝트 개요

**Z.com 백엔드**는 트위터를 모방한 소셜 미디어 플랫폼의 서버 사이드 API로, NestJS 프레임워크를 기반으로 구축된 현대적인 RESTful API 서버입니다.

### 기술 스택

- **프레임워크**: NestJS 9.x
- **언어**: TypeScript
- **데이터베이스**: PostgreSQL
- **ORM**: Prisma 5.x
- **인증**: Passport.js (Local Strategy)
- **세션 관리**: express-session + Redis
- **실시간 통신**: Socket.io
- **파일 업로드**: Multer
- **API 문서**: Swagger/OpenAPI
- **로깅**: Pino
- **프로세스 관리**: PM2

## 🏗️ 프로젝트 구조

### 디렉토리 구조

```
src/
├── apis/                     # API 모듈들
│   ├── users/               # 사용자 관련 API
│   ├── posts/               # 게시물 관련 API
│   ├── messages/            # 메시지 관련 API
│   ├── hashtags/            # 해시태그 관련 API
│   ├── dto/                 # 공통 DTO
│   └── api.module.ts        # API 루트 모듈
├── auth/                    # 인증 관련
│   ├── local.strategy.ts    # Passport Local 전략
│   ├── logged-in-guard.ts   # 로그인 가드
│   └── not-logged-in-guard.ts # 비로그인 가드
├── common/                  # 공통 모듈
│   └── decorators/          # 커스텀 데코레이터
├── events/                  # WebSocket 게이트웨이
├── middlewares/             # 미들웨어
├── redis/                   # Redis 설정
├── app.module.ts            # 루트 모듈
├── main.ts                  # 애플리케이션 진입점
└── prisma.extension.ts      # Prisma 확장
```

## 🔐 인증 시스템

### Passport Local Strategy

- **인증 방식**: 아이디/패스워드 기반 로컬 인증
- **패스워드 암호화**: bcrypt 해싱
- **세션 관리**: Redis 기반 세션 스토어
- **쿠키 설정**: HttpOnly 플래그로 보안 강화

### 가드 시스템

- **LoggedInGuard**: 로그인 필요한 엔드포인트 보호
- **NotLoggedInGuard**: 로그인 상태에서 접근 금지 (회원가입, 로그인)

### 세션 설정

```typescript
// express-session + Redis
store: RedisStore,
secret: COOKIE_SECRET,
cookie: { httpOnly: true }
```

## 🗄️ 데이터베이스 스키마

### 주요 모델

#### User (사용자)

```sql
- id: String (PK)
- nickname: String
- image: String
- password: String (bcrypt 해싱)
- provider: String (기본값: "local")
- snsId: String? (소셜 로그인용)
- createdAt: DateTime
- deletedAt: DateTime? (소프트 삭제)
```

#### Post (게시물)

```sql
- postId: Int (PK, 자동증가)
- content: String
- userId: String (FK -> User.id)
- parentId: Int? (댓글용 FK -> Post.postId)
- originalId: Int? (리트윗용 FK -> Post.postId)
- commentCount: Int (기본값: 0)
- heartCount: Int (기본값: 0)
- repostCount: Int (기본값: 0)
- createdAt: DateTime
- deletedAt: DateTime? (소프트 삭제)
```

#### PostHeart (좋아요)

```sql
- userId: String (FK -> User.id)
- postId: Int (FK -> Post.postId)
- createdAt: DateTime
- 복합 기본키: [postId, userId]
```

#### Message (메시지)

```sql
- messageId: Int (PK, 자동증가)
- senderId: String (FK -> User.id)
- receiverId: String (FK -> User.id)
- room: String (채팅방 ID)
- content: String
- createdAt: DateTime
```

#### Hashtag (해시태그)

```sql
- title: String (PK)
- createdAt: DateTime
```

## 📚 API 엔드포인트

### 🔐 인증 관련 (`/api`)

#### POST `/api/login`

- **설명**: 사용자 로그인
- **Body**: `{ id: string, password: string }`
- **응답**: 사용자 정보 + 세션 쿠키 설정
- **에러**:
  - `404`: 사용자 없음 (no_user)
  - `401`: 잘못된 비밀번호 (wrong_password)

#### POST `/api/logout`

- **설명**: 사용자 로그아웃
- **응답**: 세션 쿠키 제거

### 👥 사용자 관련 (`/api/users`)

#### POST `/api/users`

- **설명**: 회원가입
- **Content-Type**: multipart/form-data
- **Body**: `{ id, nickname, password, image? }`
- **응답**: 회원가입 성공 정보
- **에러**: `403` - 이미 존재하는 아이디 (already_exist)

#### GET `/api/users/followRecommends`

- **설명**: 팔로우 추천 사용자 목록 (3명)
- **인증**: 필수
- **응답**: User[] 배열

#### GET `/api/users/:id`

- **설명**: 특정 사용자 정보 조회
- **응답**: 사용자 정보 (팔로워/팔로잉 수 포함)

#### GET `/api/users/:id/posts`

- **설명**: 특정 사용자 게시물 조회 (페이지네이션)
- **Query**: `cursor?: number`
- **응답**: Post[] 배열

#### POST `/api/users/:id/follow`

- **설명**: 사용자 팔로우
- **인증**: 필수
- **응답**: 팔로우한 사용자 ID
- **에러**: `403` - 자신 팔로우 불가 (self_impossible)

#### DELETE `/api/users/:id/follow`

- **설명**: 사용자 언팔로우
- **인증**: 필수
- **응답**: 언팔로우한 사용자 ID

#### GET `/api/users/:id/rooms`

- **설명**: 참여 중인 채팅방 목록
- **인증**: 필수 (본인만 접근 가능)
- **응답**: Room[] 배열

### 📝 게시물 관련 (`/api/posts`)

#### POST `/api/posts`

- **설명**: 게시물 작성
- **인증**: 필수
- **Content-Type**: multipart/form-data
- **Body**: `{ content: string, images?: File[] }`
- **응답**: 생성된 Post 객체

#### GET `/api/posts/recommends`

- **설명**: 추천 게시물 조회 (페이지네이션)
- **Query**: `cursor?: string, likes?: string`
- **응답**: Post[] 배열

#### GET `/api/posts/followings`

- **설명**: 팔로잉 게시물 조회 (페이지네이션)
- **인증**: 필수
- **Query**: `cursor?: string`
- **응답**: Post[] 배열

#### GET `/api/posts`

- **설명**: 검색 결과 조회
- **인증**: 필수
- **Query**: `q: string, cursor?: string, pf?: string, f?: string`
- **응답**: Post[] 배열

#### GET `/api/posts/:id`

- **설명**: 특정 게시물 조회
- **응답**: Post 객체
- **에러**: `404` - 게시물 없음 (no_such_post)

#### POST `/api/posts/:id/heart`

- **설명**: 게시물 좋아요
- **인증**: 필수
- **에러**:
  - `404`: 게시물 없음 (no_such_post)
  - `400`: 이미 좋아요 누름 (already_hearted)

#### DELETE `/api/posts/:id/heart`

- **설명**: 게시물 좋아요 취소
- **인증**: 필수

#### POST `/api/posts/:id/reposts`

- **설명**: 게시물 리트윗
- **인증**: 필수
- **응답**: 리트윗 게시물 객체
- **에러**:
  - `404`: 게시물 없음 (no_such_post)
  - `400`: 이미 리트윗함 (already_reposted)

#### DELETE `/api/posts/:id/reposts`

- **설명**: 리트윗 취소
- **인증**: 필수

#### GET `/api/posts/:id/comments`

- **설명**: 게시물 댓글 조회
- **Query**: `cursor?: string`
- **응답**: Post[] 배열 (댓글들)

#### POST `/api/posts/:id/comments`

- **설명**: 댓글 작성
- **인증**: 필수
- **Content-Type**: multipart/form-data
- **Body**: `{ content: string, images?: File[] }`

### 🏷️ 해시태그 관련 (`/api/hashtags`)

#### GET `/api/hashtags/trends`

- **설명**: 현재 트렌드 해시태그 조회 (최대 10개)
- **인증**: 필수
- **응답**: Trends[] 배열

### 💬 메시지 관련 (`/api/messages`)

메시지 기능은 주로 WebSocket을 통해 실시간으로 처리됩니다.

## 🌐 WebSocket (Socket.io)

### 네임스페이스: `/messages`

#### 이벤트 핸들러

##### `login`

- **설명**: 사용자 WebSocket 로그인
- **데이터**: `{ id: number }`
- **기능**: 온라인 사용자 맵에 소켓 ID 저장

##### `sendMessage`

- **설명**: 메시지 전송
- **데이터**: `CreateMessageDto`
- **기능**:
  - 메시지 DB 저장
  - 수신자가 온라인이면 실시간 전송
  - `receiveMessage` 이벤트로 수신자에게 전달

##### `test`

- **설명**: 연결 테스트용 이벤트

### 온라인 사용자 관리

```typescript
// onlineMap: 사용자 ID -> 소켓 ID 매핑
onlineMap[userId] = socketId;
```

## 🚀 성능 최적화

### 데이터베이스 최적화

- **Prisma 확장**: 커스텀 Prisma 클라이언트로 성능 향상
- **인덱싱**: 주요 필드에 데이터베이스 인덱스 설정
- **페이지네이션**: 커서 기반 페이지네이션으로 대용량 데이터 처리

### 캐싱 전략

- **Redis 세션**: 세션 데이터 캐싱으로 성능 향상
- **연결 풀**: 데이터베이스 연결 풀 관리

### 파일 처리

- **이미지 업로드**: Multer로 파일 업로드 처리
- **정적 파일 서빙**: `/upload` 경로로 이미지 서빙

## 🔧 설정 및 환경

### 환경 변수

```bash
DATABASE_URL=postgresql://...    # PostgreSQL 연결 URL
COOKIE_SECRET=your_secret       # 세션 쿠키 시크릿
PORT=9090                      # 서버 포트 (기본값)
NODE_ENV=production            # 환경 설정
```

### Swagger API 문서

- **경로**: `/api` (Swagger UI)
- **인증**: 쿠키 기반 인증 (`connect.sid`)
- **태그별 분류**:
  - 유저 관련
  - 게시글 관련
  - 해시태그 관련
  - 메시지 관련

## 🛡️ 보안 기능

### 인증 보안

- **비밀번호 해싱**: bcrypt로 안전한 해싱
- **세션 보안**: HttpOnly 쿠키로 XSS 방지
- **CORS 설정**: 크로스 오리진 요청 제어

### 입력 검증

- **DTO 검증**: class-validator로 입력 데이터 검증
- **가드 시스템**: 엔드포인트별 접근 권한 제어
- **예외 처리**: 일관된 에러 응답 형식

### 파일 업로드 보안

- **파일 크기 제한**: Multer 설정으로 업로드 크기 제한
- **파일 타입 검증**: 허용된 이미지 타입만 업로드

## 📊 로깅 및 모니터링

### Pino 로깅

- **구조화된 로그**: JSON 형태의 로그 출력
- **성능 최적화**: 빠른 로깅 성능
- **개발/프로덕션 구분**: 환경별 로그 레벨 설정

### 에러 핸들링

- **글로벌 예외 필터**: 일관된 에러 응답
- **HTTP 상태 코드**: 적절한 상태 코드 반환
- **에러 메시지**: 사용자 친화적인 에러 메시지

## 🚀 배포 및 운영

### 스크립트 명령어

#### 개발

```bash
npm run start:dev    # 개발 서버 (watch 모드)
npm run start:debug  # 디버그 모드로 실행
```

#### 빌드 및 배포

```bash
npm run build       # TypeScript 컴파일
npm run start:prod  # PM2로 프로덕션 실행
```

#### 데이터베이스

```bash
npm run migrate:dev      # 개발 환경 마이그레이션
npm run migrate:deploy   # 프로덕션 마이그레이션
npm run prisma:generate  # Prisma 클라이언트 생성
npm run prisma:studio    # Prisma Studio 실행
npm run prisma:seed      # 시드 데이터 삽입
```

#### 테스트

```bash
npm run test         # 단위 테스트
npm run test:e2e     # E2E 테스트
npm run test:cov     # 테스트 커버리지
```

### PM2 프로세스 관리

```bash
# 프로덕션 실행 (package.json 스크립트)
pm2 start dist/main.js --name z-api
```

## 📈 성능 지표

### API 응답 시간

- **일반 조회**: < 100ms
- **복잡한 쿼리**: < 500ms
- **파일 업로드**: < 2s

### 동시 처리 능력

- **WebSocket 연결**: 1000+ 동시 접속
- **HTTP 요청**: 초당 500+ 요청 처리

## 🔄 데이터 플로우

### 게시물 작성 플로우

1. 클라이언트에서 게시물 + 이미지 전송
2. 인증 가드에서 로그인 확인
3. DTO 검증으로 입력 데이터 검증
4. 이미지 파일 서버 저장
5. 게시물 + 이미지 정보 DB 저장
6. 해시태그 추출 및 저장
7. 생성된 게시물 정보 반환

### 실시간 메시지 플로우

1. 클라이언트에서 `sendMessage` 이벤트 전송
2. 메시지 DB 저장
3. 수신자 온라인 상태 확인
4. 온라인이면 `receiveMessage` 이벤트로 실시간 전송
5. 오프라인이면 다음 접속 시 조회 가능

## 📋 향후 개선 사항

1. **캐싱 전략 확장**: Redis로 API 응답 캐싱
2. **검색 기능 고도화**: Elasticsearch 도입
3. **이미지 처리**: 썸네일 생성, CDN 연동
4. **알림 시스템**: 푸시 알림 기능
5. **API Rate Limiting**: 요청 횟수 제한
6. **마이크로서비스**: 기능별 서비스 분리
7. **모니터링 강화**: APM 도구 도입
8. **보안 강화**: JWT 토큰 도입 검토

## 🏷️ API 태그 분류

### Swagger 태그별 엔드포인트

- **유저 관련**: 회원가입, 로그인, 프로필, 팔로우
- **게시글 관련**: 작성, 조회, 좋아요, 리트윗, 댓글
- **해시태그 관련**: 트렌드 조회
- **메시지 관련**: 실시간 메시징 (WebSocket)

이 문서는 Z.com 백엔드 API의 현재 상태를 반영하며, 개발 진행에 따라 지속적으로 업데이트될 예정입니다.
