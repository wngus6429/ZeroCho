# 백엔드 아키텍처 및 가이드

이 문서는 Next15 프로젝트 백엔드 서버의 아키텍처, 주요 기능 및 설정 방법에 대해 설명합니다.

## 1. 개요

본 백엔드 서버는 **NestJS** 프레임워크를 기반으로 구축된 Node.js 애플리케이션입니다. RESTful API를 제공하며, 사용자 인증, 게시물 관리, 실시간 통신 등의 기능을 담당합니다. 데이터베이스 관리는 **Prisma** ORM을 사용하며, 인증은 **Passport.js**를 이용한 세션 기반 방식을 채택했습니다.

## 2. 기술 스택

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Passport.js](http://www.passportjs.org/) (Session-based)
- **Session Store**: [Redis](https://redis.io/) (`connect-redis`)
- **Real-time**: WebSockets (`@nestjs/websockets`)
- **Database**: PostgreSQL (Prisma를 통해 관리)

## 3. 프로젝트 구조

주요 디렉토리 구조는 다음과 같습니다.

```
back/
├── prisma/             # Prisma 스키마 및 마이그레이션 파일
│   └── schema.prisma
├── src/                # 애플리케이션 소스 코드
│   ├── apis/           # 기능별 API 모듈 (posts, users, etc.)
│   ├── auth/           # 인증 관련 로직 (Passport, Guards)
│   ├── common/         # 공통 데코레이터, DTO 등
│   ├── events/         # WebSocket 게이트웨이
│   ├── redis/          # Redis 모듈 설정
│   ├── main.ts         # 애플리케이션 진입점
│   └── app.module.ts   # 루트 모듈
├── upload/             # 파일 업로드 저장소
├── .env                # 환경 변수 설정 파일
└── package.json        # 프로젝트 의존성 및 스크립트
```

- **`prisma/`**: 데이터베이스 스키마(`schema.prisma`)와 마이그레이션 히스토리를 관리합니다.
- **`src/`**: 핵심 비즈니스 로직이 위치합니다.
  - **`apis/`**: 각 도메인(사용자, 게시물, 메시지 등)에 대한 컨트롤러, 서비스, 모듈을 그룹화합니다.
  - **`auth/`**: Passport 전략, Guard, Serializer 등 인증 및 인가 관련 코드를 포함합니다.
  - **`events/`**: Socket.IO를 사용한 실시간 통신(예: 채팅, 알림)을 처리하는 게이트웨이가 위치합니다.
- **`upload/`**: 사용자가 업로드한 파일(이미지, 동영상 등)이 저장되는 디렉토리입니다.

## 4. 인증 방식

이 서버는 **세션 기반 인증**을 사용합니다.

1.  **로그인**: 사용자가 정확한 자격 증명(이메일, 비밀번호)으로 로그인을 요청합니다.
2.  **세션 생성**: 서버는 `express-session`을 통해 세션을 생성하고, `connect-redis`를 사용하여 이 세션 정보를 **Redis**에 저장합니다. 세션에는 사용자를 식별할 수 있는 최소한의 정보(예: `userId`)만 저장됩니다 (`local.serializer.ts` 참고).
3.  **쿠키 발급**: 생성된 세션의 ID를 클라이언트(브라우저)에게 쿠키로 발급합니다.
4.  **인증 확인**: 이후 클라이언트의 모든 요청에는 이 세션 ID 쿠키가 포함됩니다. 서버는 `LoggedInGuard`와 같은 Guard를 통해 쿠키를 확인하고, Redis에 저장된 세션 정보를 바탕으로 사용자를 인증합니다.
5.  **사용자 정보**: `deserializeUser`는 각 요청마다 세션 ID를 이용해 데이터베이스에서 최신 사용자 정보를 조회하여 `request.user` 객체에 담아줍니다.

이 방식은 데이터베이스에 직접 세션을 저장하지 않아 부하를 줄이고, 수평적으로 확장 가능한 구조를 만드는 데 유리합니다.

## 5. 데이터베이스

- **Prisma**: `prisma/schema.prisma` 파일에서 데이터베이스 모델을 정의합니다.
- **마이그레이션**: `npx prisma migrate dev` 명령어를 통해 스키마 변경사항을 데이터베이스에 안전하게 적용할 수 있습니다.
- **시딩**: `prisma/seed.ts` 파일을 통해 개발 초기 단계에서 필요한 기본 데이터를 생성할 수 있습니다.

## 6. 실시간 통신

`src/events/events.gateway.ts` 파일은 WebSocket을 사용한 실시간 통신을 처리합니다. 클라이언트는 Socket.IO 라이브러리를 통해 서버와 연결하고, 특정 이벤트(예: `message`)를 구독하거나 발생시킬 수 있습니다.

## 7. 설정 및 실행

1.  **의존성 설치**:
    ```bash
    npm install
    ```
2.  **환경 변수 설정**:
    `.env` 파일을 생성하고 데이터베이스 연결 정보, 세션 시크릿 키 등을 설정합니다.
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    COOKIE_SECRET=your-secret-key
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```
3.  **데이터베이스 마이그레이션**:
    ```bash
    npx prisma migrate dev
    ```
4.  **서버 실행**:
    ```bash
    npm run start:dev
    ```
