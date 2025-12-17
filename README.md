# Prime Asset Amazing Division

프라임에셋 어메이징 사업부 공식 홈페이지

## 기술 스택

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

기본 포트는 **3001**입니다. 브라우저에서 [http://localhost:3001](http://localhost:3001)을 열어 확인하세요.

만약 3000 포트를 사용하고 싶다면:
```bash
npm run dev:3000
```

다른 포트를 사용하고 싶다면:
```bash
next dev -p [원하는포트번호]
```

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
amazing-biz-prime/
├── app/
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 글로벌 스타일
├── components/
│   ├── Header.tsx      # 헤더 네비게이션
│   ├── Hero.tsx        # 히어로 섹션
│   ├── TechSection.tsx # 시스템 섹션
│   ├── MediaSection.tsx # 스튜디오 섹션
│   ├── SimulationSection.tsx # 교육 섹션
│   ├── RecruitSection.tsx # 채용 섹션
│   └── Footer.tsx      # 푸터
├── public/             # 정적 파일 (로고, 이미지 등)
│   └── .gitkeep
└── package.json
```

## 이미지 및 로고 사용법

### 정적 파일 위치
모든 이미지, 로고, 아이콘은 `public` 폴더에 넣으세요.

### 사용 예시

**일반 img 태그:**
```tsx
<img src="/logo.png" alt="로고" />
```

**Next.js Image 컴포넌트 (권장):**
```tsx
import Image from "next/image";

<Image src="/logo.png" alt="로고" width={200} height={50} />
```

### 파일 구조 예시
```
public/
├── logo.png              # 메인 로고
├── logo-white.png        # 흰색 로고 (다크 배경용)
├── images/
│   ├── hero-bg.jpg       # 히어로 배경 이미지
│   ├── phone-mockup.png  # 스마트폰 목업
│   └── studio-camera.jpg # 스튜디오 카메라 이미지
└── icons/
    └── favicon.ico       # 파비콘
```

## 디자인 컨셉

- **테마**: Cold, Intelligent, Future-Fintech
- **컬러**: Electric Blue (#2563EB), Titanium Silver, Cool Gray
- **스타일**: Glassmorphism, Soft Shadows, 넓은 여백
