# 회원라운지 → 어메이징 업무도구 이전 (마스터 설계)

## 배경
prime(채용 사이트)의 "회원 전용 라운지"에 설계사용 기능들이 얹혀 있다(명찰·명함 신청,
교육방, 영업자료실(신규), 커뮤니티·전문상담(미구현)). 그러나 설계사 **업무 본진은
amazing-biz-server(어메이징사업부.com)** — React+Vite 업무도구 SaaS이고 회원 DB(Postgres)도
거기에 있다. 라운지를 prime에 두면 인증을 프록시로 우회해야 하고 시스템이 이원화된다.

**결정: 라운지 전체를 amazing-biz-server 업무도구로 이전하고, prime 라운지(`app/member/*`)는 철거한다.**

## 핵심 사실 (조사 결과)
- prime 로그인/검증은 amazing-biz-server `/auth/login`·`/auth/me`로 **프록시만** 한다.
- 회원 데이터는 server `users` 테이블(Postgres). 관리자 = `role='amazing'`(`requireRole(ROLES.AMAZING)`).
- server frontend: React + Vite + react-router-dom(`createBrowserRouter`) + `ProtectedRoute allowedRoles` +
  `AppLayout`(공통 사이드바) + `features/` 패턴. 이미 `jspdf/pdfjs-dist` 등 PDF 도구 보유.
- server backend: Express + pg + JWT + multer(`uploads/`), 마이그레이션 = `db/migrations/*.sql` + pg Pool runner.
- **Supabase는 레거시·paused** — 교육 파일만 의존. 복구 안 함(정리 대상).
- 라운지 기능별 현재 구현:
  - 명찰/명함 신청 = prime API `send-badge`/`send-business-card` → **nodemailer 이메일 발송**(SMTP).
  - 교육방 = Supabase Storage 파일/목록.
  - 커뮤니티·전문상담 = 미구현(준비중).

## 전역 결정
- **저장소/백엔드**: amazing-biz-server 단일 통합 (Postgres + `uploads/`). 프록시 없음.
- **PDF 생성**: server(Express)에서 — prime의 검증된 `lib/flyer/generate.ts`(pdf-lib + fontkit +
  Pretendard, 좌표·U+2011 하이픈·subset:false) 로직을 **server로 이식**.
- **권한**: `requireAuth`(JWT) + `requireRole(ROLES.AMAZING)`(관리자).
- **진행**: 단계별 순차. 각 단계 독립 설계→구현→검증.
- **교육 기존 자료**: 포기, server에서 새로 시작.
- **작업 레포**: 이제부터 주 작업은 **amazing-biz-server**. prime은 라운지 철거 시점에만 수정.

## 전체 로드맵
| Phase | 내용 | 난이도 |
|------|------|------|
| **1** | 영업 자료실 (신규) + 사이드바 "회원 지원" 그룹 골격 | 신규(핵심) |
| **2** | 명찰·명함 신청 (폼 이식 + server 이메일 라우트) | 중 |
| **3** | 교육방 (목록·업로드, server `uploads`, 새 시작) | 상 |
| **4** | 커뮤니티·전문상담 (ComingSoon 자리) | 하 |
| **5** | prime 라운지 철거(`app/member/*`) + 잔여 Supabase 정리 | 하 |

> Phase 1이 사이드바 그룹·권한·PDF 인프라를 함께 깔기 때문에 가장 무겁고, 이후 단계는 그 위에 얹는다.

---

# Phase 1 — 영업 자료실 (상세 설계, 지금 진행)

심의받은 빈 전단지 PDF에 회원 고정정보(이름·직책·전화·협회등록번호)와 전단지별
심의정보(심의필번호·유효기간)를 server에서 벡터 오버레이 → 미리보기 + 다운로드.
관리자는 빈 PDF를 업로드하며 심의필번호·유효기간을 입력하고 미리보기로 확인 후 등록.

## 1-A. server backend

### 마이그레이션 `db/migrations/YYYYMMDD_flyer_resources.sql`
- `users`에 **광고 전용 4필드** 추가(회원 프로필 `full_name`/`phone`과 독립; 미입력 시 화면에서
  full_name/phone을 기본값 prefill):
  - `ad_name VARCHAR(60)`, `ad_position VARCHAR(60)`, `ad_phone VARCHAR(40)`, `ad_registration VARCHAR(40)`
- `flyers` 테이블 신설:
  | 컬럼 | 타입 | 비고 |
  |------|------|------|
  | id | SERIAL PK | |
  | slug | VARCHAR(60) UNIQUE | URL용(관리자 입력, 비우면 자동) |
  | title | VARCHAR(200) NOT NULL | |
  | subtitle | VARCHAR(300) | |
  | category | VARCHAR(60) | |
  | review_number | VARCHAR(60) | 심의필번호 |
  | review_start | VARCHAR(20) | 유효기간 시작 YYYY.MM.DD |
  | review_end | VARCHAR(20) | 유효기간 종료 |
  | pdf_filename | VARCHAR(255) | uploads/flyers 내 파일명 |
  | created_by | INTEGER REFERENCES users(id) | |
  | created_at | TIMESTAMPTZ DEFAULT NOW() | |
- 실행: `run-migration.js` 패턴(pg Pool, BEGIN/COMMIT)으로 로컬·프로덕션 DB에 적용.

### PDF 생성 모듈 `src/services/flyerGenerator.js` (prime generate.ts 이식)
- pdf-lib + @pdf-lib/fontkit 의존성 server에 추가. Pretendard 4종을 server `assets/fonts/`로 복사.
- 함수 `generatePersonalizedFlyer(flyer, member, pdfBytes) → Uint8Array`.
- prime 로직 그대로: 상담문의 오버레이, 푸터 9줄, U+2011 하이픈, `subset:false`.
- Part C 개선(아래)도 여기서 반영.

### 라우트 `src/routes/resources.js` → server.js `app.use('/api/resources', ...)`
- `GET  /api/resources/flyers` (requireAuth) → 목록(최신순).
- `GET  /api/resources/flyers/:id` (requireAuth) → 단건 메타.
- `POST /api/resources/flyers` (requireAuth + requireRole(AMAZING), multer single 'file')
  → `uploads/flyers/{ts}_{rand}.pdf` 저장 + `flyers` insert → row.
- `POST /api/resources/flyers/:id/render` (requireAuth, body=member)
  → 저장된 빈 PDF + member로 generate → PDF 스트림(inline).
- `POST /api/resources/flyers/preview` (requireAuth+AMAZING, multer single 'file', body=메타+member)
  → 업로드 **전** 임시 generate(저장 없음) → PDF. (관리자 업로드 미리보기용)
- `GET  /api/resources/ad-profile` (requireAuth)
  → `{name, position, phone, registration}` (저장값, 비면 full_name/phone fallback).
- `PUT  /api/resources/ad-profile` (requireAuth) → 본인 `ad_*` 4필드 upsert.

## 1-B. server frontend (`features/salesMaterials/`)
- 페이지: `SalesMaterialsListPage`(전단지 목록 + 관리자 업로드 버튼/모달),
  `SalesMaterialDetailPage`(광고정보 폼 + 미리보기 iframe + 다운로드).
- 라우트: `routes/index.tsx`에 `ProtectedRoute`(전 역할) 하위로 등록.
  관리자 업로드는 페이지 내부에서 `role==='amazing'` 조건 렌더.
- **사이드바**: `AppLayout` 메뉴에 "회원 지원" 그룹(향후 명찰·명함·교육 추가) + "영업 자료실" 항목.
- 광고정보 폼: ad-profile GET으로 prefill(없으면 full_name/phone) → PUT 저장 → render 호출로 미리보기.
- 관리자 모달: PDF 선택 + slug·제목·부제·카테고리·심의필번호·유효기간 입력 →
  `/preview`로 샘플 회원("홍길동 팀장…") 미리보기 → 확인 후 `POST /flyers` 등록.
- PDF 표시/다운로드: render 응답 blob → iframe + download(파일명 `{title}_{이름}.pdf`).

## 1-C. 렌더링 개선 (generator, 옛 Part C)
- **로고**: server `assets/prime-logo.png`(prime `public/prime-logo.png` 복사)를 `embedPng`.
  위치/크기는 미리보기로 확정(후보: 푸터 회사줄 좌측 또는 상담문의 박스).
- **상담문의 fit-to-box**(이름·직책·전화): 고정 size27 → 박스 가용폭 `maxW`에 맞춰 size 자동
  (상한 30, 하한 18) 루프 탐색해 꽉 채움.
- **심의필 푸터 확대**: 변수줄 size8 → 8.5~9pt, centered 유지, 페이지폭 초과 금지.
- 검증: 짧은/긴 이름 둘 다로 생성 → 렌더 확인.

## Phase 1 영향 파일
**server**: `db/migrations/*_flyer_resources.sql`, `src/services/flyerGenerator.js`,
`src/routes/resources.js`, `src/server.js`(라우트 등록), `assets/fonts/*`·`assets/prime-logo.png`,
`package.json`(pdf-lib, @pdf-lib/fontkit), `frontend/src/features/salesMaterials/*`,
`frontend/src/routes/index.tsx`, `frontend/src/ui/AppLayout`(메뉴).
**prime**: 이번 단계에선 변경 없음(라운지 카드 정리는 Phase 5).

## 미정(구현 중 확정)
- 로고 위치/크기, 상담문의 `maxW`·size 상하한, 심의필 확대 크기 (미리보기로).
- slug 자동생성 규칙(비울 때).
- AppLayout 메뉴 그룹의 정확한 위치/아이콘.

---

# Phase 2~5 — 개요 (각 단계 시작 시 상세화)
- **2. 명찰·명함**: prime `badge`/`business-card` 폼을 frontend 페이지로 이식 +
  server에 nodemailer 라우트(`/api/resources/badge`, `/card`). SMTP env는 server로.
- **3. 교육방**: `education` 테이블 + `uploads/education` + 목록/업로드 페이지. 기존 Supabase 자료 미이전.
- **4. 커뮤니티·전문상담**: 메뉴 + `ComingSoonPage` 재사용.
- **5. 철거**: prime `app/member/*`, `app/api/{send-badge,send-business-card,upload-*,members,...}`,
  `lib/supabase.ts`, Supabase 관련 API 제거. 라운지 진입점은 어메이징사업부.com으로.

## 비고
- 커밋은 사용자 명시 승인 후에만 (메모리 규칙).
- prime의 검증된 좌표·폰트·하이픈 자산은 폐기가 아니라 server로 이식.
