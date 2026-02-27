# 프라임에셋(Prime Asset Amazing) 화면 디자인·코드 전체 분석

이 문서는 프라임에셋.com(어메이징사업부) 웹사이트의 **현재 적용된** 화면 구성, 라우트, 컴포넌트, 스타일 시스템을 한눈에 분석할 수 있도록 정리한 문서입니다.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js (App Router) |
| 스타일 | Tailwind CSS + globals.css 유틸 |
| 애니메이션 | Framer Motion |
| 아이콘 | Lucide React |
| 폰트 | Noto Sans KR (Google Font) |
| 기타 | embla-carousel-react (스튜디오 갤러리) |

---

## 2. 라우트 구조 (App Router)

```
app/
├── layout.tsx          # 루트 레이아웃 (메타데이터, 폰트, html/body)
├── page.tsx            # 홈 (메인 랜딩)
├── globals.css         # 전역 스타일 + 유틸 클래스
├── prime-asset/
│   └── page.tsx        # 프라임에셋 소개
├── amazing/
│   └── page.tsx        # 어메이징 사업부 상세 (탭: 본부장/영업방법/교육/지원/지점)
├── member/
│   └── page.tsx        # 설계사 전용 진입 (로그인/가입)
│   ├── signup/page.tsx # 회원가입
│   ├── lounge/page.tsx # 라운지 (로그인 후)
│   ├── badge/page.tsx  # 배지
│   ├── business-card/page.tsx
│   └── education/page.tsx
├── support/
│   ├── badge/page.tsx
│   └── business-card/page.tsx
└── api/                # API 라우트 (auth, members, send-recruit 등)
```

---

## 3. 홈 화면(page.tsx) 구성 순서 (현재 적용)

홈은 **단일 페이지**이며, 아래 컴포넌트가 **위에서 아래로** 순서대로 쌓입니다.

| 순서 | 컴포넌트 | 역할 |
|------|----------|------|
| 1 | `Header` | 고정 상단 네비(로고, 프라임에셋 소개, 어메이징 사업부, 입사문의, 설계사 전용/로그인 상태) |
| 2 | `Hero` | 첫 화면: 4레이어 배경(Mesh+Noise+Grid+Light Streak), 로고, 메인 카피, CTA, 시스템 미리보기 3패널 |
| 3 | `StatsSection` | **수치 3개**: 3개 본부, 33개사, 100% DB 투명 |
| 4 | `SectionDivider` | 섹션 구분선 + 중앙 점 (light) |
| 5 | `SocialProofSection` | **사회적 증거**: 100명+ 설계사, 50+ 교육·지원 프로그램, 5개 지점 |
| 6 | `WhyNowStrip` | **지금 시작하는 이유**: DB 제로/객관적 비교/프로 스튜디오 (다크 배경) |
| 7 | `DBTransparencyFlowSection` | **DB 투명 분배 흐름** 3단 도식 (입력 → 분배 룰 → 대시보드) |
| 8 | `SectionDivider` | 섹션 구분선 (light) |
| 9 | `FeaturesBentoSection` | **지원 인프라** (id="offer): AI 자동생성, DB 투명성, 스튜디오 벤토 카드 |
| 10 | `SectionDivider` | 섹션 구분선 (light) |
| 11 | `EcosystemSection` | **실제 서비스 4종**: 포털/블로그AI/청구허브/치매검사 카드 |
| 12 | `ProcessSection` | **진행 단계**: 상담 → 시스템 제공 → 영업 지원 |
| 13 | `SectionDivider` | 섹션 구분선 (light) |
| 14 | `OnboardingTimelineSection` | **7일 온보딩 로드맵** |
| 15 | `SectionDivider` | 섹션 구분선 (light) |
| 16 | `ProofPackSection` | **Proof Pack**: 리포트/대시보드/교육 체크리스트 샘플 |
| 17 | `SectionDivider` | 섹션 구분선 (light) |
| 18 | `StudioGallerySection` | **스튜디오 환경** embla 캐러셀 6장 |
| 19 | `SectionDivider` | 섹션 구분선 (light) |
| 20 | `TestimonialsSection` | **후기**: 김*민, 이*준 등 설계사 인용 |
| 21 | `RecruitSection` | **입사 문의 폼** (id="recruit") + 개인정보 안심 장치 |
| 22 | `FAQSection` | 자주 묻는 질문 |
| 23 | `FinalCTASection` | 최종 CTA "지금 무료 상담 받기" |
| 24 | `Footer` | 브랜드·연락처 |
| 25 | `StickyBottomCTA` | 모바일 하단 고정 "무료 상담 신청" |

**참고:** `LogoWallSection`은 홈에는 사용하지 않음 (컴포넌트 파일은 존재). "33개사/국내 보험사 비교" 메시지는 StatsSection의 "33개사 · 국내 보험사 상품 비교" 한 곳에서만 강조.

---

## 4. 컴포넌트별 요약

### 4.1 레이아웃·공통

- **Header**  
  - 상단 고정, 스크롤 시 glass 스타일.  
  - 링크: 홈, 프라임에셋 소개, 어메이징 사업부, 입사문의(#recruit), 설계사 전용(/member 또는 /member/lounge).  
  - 로그인 상태는 localStorage 기반.

- **Footer**  
  - Prime Asset Amazing 브랜드 문구, 이메일·전화 연락처.

- **SectionDivider**  
  - 섹션 사이 얇은 구분선 + 중앙 점 펄스.  
  - `variant`: light / dark / gradient.

- **StickyBottomCTA**  
  - 모바일에서만 표시, 스크롤 25% 이상 시 등장.  
  - "무료 상담 신청"(#recruit), "전화" 버튼.

### 4.2 Hero (첫 화면)

- **배경 4레이어**  
  - **Mesh**: `bg-mesh-gradient` + 그라데이션 오버레이.  
  - **Noise**: `bg-noise` (globals.css, SVG 노이즈 ::before, z-index 1).  
  - **Grid**: `bg-blueprint-grid` (24px 설계도 그리드).  
  - **Light Streak**: Framer로 가로 1줄·세로 1줄 스캔 라인 (`.hero-light-streak-h`, `.hero-light-streak-v`).
- **콘텐츠**:  
  - 로고(prime-logo.png)  
  - 메인 카피: "영업은 시스템이다." / "DB 걱정 없는 어메이징한 성장"  
  - 서브 카피, 뱃지("3개 본부 · 통합 영업지원 시스템")  
  - CTA: "1분 만에 무료 상담 신청", "지원 시스템 보기"(#offer)
- **시스템 미리보기**  
  - `NEXT_PUBLIC_HERO_VIDEO_URL` 있으면 YouTube 등 임베드 영상.  
  - 없으면 3패널: AI 블로그 생성(문서 라인·타이핑·30초 바), DB 현황판(미니 차트·스캔), 스튜디오 예약(필름 프레임·REC·날짜 그리드).

### 4.3 StatsSection

- **역할**: 메인 수치 3개 (중복 없이 이 구간만 사용).
- **수치**:  
  - 3개 본부 (067·290·292 본부 운영)  
  - 33개사 (국내 보험사 상품 비교)  
  - 100% (DB 투명 분배 시스템)  
- CountUp 애니메이션 + viewport 진입 시 재생.

### 4.4 SocialProofSection

- **역할**: "이미 많은 설계사가 선택한 이유" — 수치를 다른 관점으로 제시.
- **수치**: 100명+ 설계사, 50+ 교육·지원 프로그램, 5개 지점.  
- 아이콘: Users, TrendingUp, Award.

### 4.5 WhyNowStrip

- **역할**: 다크 배경의 "지금 여기서 시작하는 이유" 3줄.
- **내용**: DB 걱정 제로 / 객관적 상품 비교·전문 데이터 / 프로 스튜디오·AI 콘텐츠.

### 4.6 DBTransparencyFlowSection

- **역할**: "DB 투명 분배 흐름" 시각화.
- **구성**: 3단 도식(입력 → 분배 룰 → 대시보드), 아이콘(Database, GitBranch, LayoutDashboard), 연결 화살표, 카드 위 스캔 라인 느낌 모션.

### 4.7 FeaturesBentoSection (id="offer")

- **역할**: "타 본부를 압도하는 지원 인프라" 벤토 카드 3개.
- **카드**: AI 기반 자동 생성, 실시간 DB 투명성, 유튜브 스튜디오 지원.

### 4.8 EcosystemSection

- **역할**: 실제 운영 중인 4개 서비스를 한눈에 보여주는 Ecosystem 섹션.
- **카드 4개**:  
  - 영업지원 포털: DB 분배·고객관리·일정·알림·대시보드  
  - 보험 블로그 AI: 30초 생성·SEO·Q&A·설계서 분석  
  - 청구 허브: 필요서류·전산·PDF·치과확인서·계산기 등 고객도구  
  - 치매검사 서비스: 무료 검사·인지 평가·간병비 예측·상담 연결  
- 각 카드: icon, 제목, 1줄 태그라인, 2~3개 bullet, 외부 링크 CTA.

### 4.9 ProcessSection

- **역할**: "어떻게 진행되나요?" 3단계.
- **단계**: 상담 → 시스템 제공 → 영업 지원.  
- 아이콘: MessageCircle, Key, Headphones.

### 4.10 OnboardingTimelineSection

- **역할**: "7일 온보딩 로드맵".
- **구성**: Day 1~7 타임라인(계정 세팅 → 스크립트·상담 → 교육 → 동행 → 첫 DB → 루틴 정립 → 독립 운영).

### 4.11 ProofPackSection

- **역할**: Proof Pack(샘플 3장)으로 실제 운영 증거를 문서 형태로 보여줌.
- **카드**: Report Sample / DB Dashboard Sample / Education Checklist Sample.

### 4.12 StudioGallerySection

- **역할**: "스튜디오 환경" 시각 강조.
- **구성**: embla-carousel-react 캐러셀 6장, 그라데이션 플레이스홀더 + Video 아이콘, 도트 인디케이터.

### 4.13 TestimonialsSection

- **역할**: 설계사 후기 (김*민, 이*준, 박*희, 최*영 형식).  
- 인용문 + 본부·역할.

### 4.14 RecruitSection (id="recruit")

- **역할**: 입사 문의 폼.  
- **개선점**: 개인정보 수집·이용 동의(필수 체크박스), 연락 빈도/보관기간/파기 안내 1줄, inline 성공/에러 메시지.  
- **API**: POST `/api/send-recruit`.

### 4.15 FAQSection

- **역할**: 아코디언 형태 FAQ.

### 4.16 FinalCTASection

- **역할**: "지금 무료 상담 받기" + 입사문의 링크(#recruit).

---

## 5. 디자인 시스템 (Tailwind + globals.css)

### 5.1 색상 (tailwind.config.ts)

| 이름 | 용도 |
|------|------|
| `electric-blue` | #2563EB, 메인 CTA·강조 |
| `navy-deep` | #0f172a, 히어로/다크 배경 |
| `navy-mid` | #1e293b, 카드 배경 |
| `titanium-silver` | #E2E8F0 |
| `cool-gray` | #F8FAFC |

### 5.2 배경·그림자

- **mesh-gradient**: 파란/보라 radial 그라데이션 (Hero).
- **boxShadow**: `soft`, `soft-lg`, `glow-blue`.

### 5.3 유틸 클래스 (globals.css)

- **.glass**: 반투명 배경 + backdrop-blur.
- **.text-gradient**: electric-blue → slate 그라데이션 텍스트.
- **.animated-gradient**, **.animated-gradient-bg**: 그라데이션 애니메이션.
- **.logo-wall-marquee**: 마키 애니메이션 (다른 섹션에서 재사용 가능).
- **.bg-noise**: 노이즈 오버레이(::before), z-index 1. Hero 등에서 사용.
- **.bg-blueprint-grid**: 24px 설계도 그리드. Hero에서 사용.
- **.hero-light-streak**, **.hero-light-streak-h**, **.hero-light-streak-v**: Hero 스캔 라인 스타일.

### 5.4 폰트

- **layout.tsx**: Noto Sans KR (400, 500, 600, 700), `--font-sans-kr`.  
- **body**: `font-sans`.

---

## 6. 메타데이터 (SEO·OG)

- **title**: "Prime Asset Amazing Division | 프라임에셋 어메이징사업부"
- **description**: "System makes Money. 감정을 배제한 완벽한 영업 지원 시스템..."
- **openGraph / twitter**: siteName, url, images (og-image.png).

---

## 7. 중복 제거 정책 (현재 반영)

- **StatsSection**: 3개 본부, 33개사, 100% — 메인 수치만 사용.
- **SocialProofSection**: 100명+, 50+ 프로그램, 5개 지점 — 본부/개사 숫자 반복 없음.
- **WhyNowStrip**: "33개사" 문구 없이 "객관적 상품 비교" 등으로만 표현.
- **홈에는 LogoWallSection 미사용** — "국내 보험사 상품 비교"는 StatsSection "33개사" 한 곳에서만 강조.

---

## 8. 주요 파일 경로 참조

| 용도 | 경로 |
|------|------|
| 홈 구성 | `app/page.tsx` |
| 루트 레이아웃 | `app/layout.tsx` |
| 전역 스타일 | `app/globals.css` |
| Tailwind 설정 | `tailwind.config.ts` |
| 헤더 | `components/Header.tsx` |
| 히어로 | `components/Hero.tsx` |
| 수치(본부/개사/100%) | `components/StatsSection.tsx` |
| 섹션 구분선 | `components/SectionDivider.tsx` |
| 사회적 증거 | `components/SocialProofSection.tsx` |
| 지금 시작하는 이유 | `components/WhyNowStrip.tsx` |
| DB 투명 흐름 도식 | `components/DBTransparencyFlowSection.tsx` |
| 지원 인프라 벤토 | `components/FeaturesBentoSection.tsx` |
| 진행 단계 | `components/ProcessSection.tsx` |
| 스튜디오 갤러리 | `components/StudioGallerySection.tsx` |
| 후기 | `components/TestimonialsSection.tsx` |
| 입사 문의 폼 | `components/RecruitSection.tsx` |

이 문서를 기준으로 현재 화면 흐름, 컴포넌트 역할, 디자인 토큰, 중복 제거 방향을 한 번에 파악할 수 있습니다.
