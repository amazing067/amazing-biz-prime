# Card 3D Layered Depth — Design Spec

**Date:** 2026-04-26
**Scope:** v2 메인 랜딩(`app/page.tsx`)의 모든 카드/박스 컴포넌트 + Tools 섹션 내부 SaaS 목업 박스
**Goal:** 종이 톤 에디토리얼 컨셉을 유지하면서, 카드/박스가 배경에서 확실히 떠 보이게 입체감을 강화한다.

---

## 1. 문제 진단

현재 메인 화면의 박스/카드는 다음 이유로 경계가 불분명함:

- `--line: rgba(10,11,16,0.10)` — 베이지 배경(`#FAFAF7`) 위에서 10% 검정은 거의 보이지 않음
- 목업 토큰 `border: rgba(20,20,40,0.07)` — 7%로 더 흐림
- 카드 배경(`--bg-2: #F0EFEA`)과 페이지 배경(`--bg-1: #FAFAF7`)의 명도차가 작아 카드가 "패인" 느낌
- 카드 그림자가 거의 없거나 (Hero/Pillars에만) 매우 무거운 그림자가 일관성 없이 적용되어 있음
- 단일 1px border만으로는 입체감 표현 불가

## 2. 솔루션 개요 (Layered Depth 방식)

Stripe/Apple 스타일 "raised card" 패턴 채택. 단일 border 대신 다음 3중 box-shadow로 입체감을 만든다:

1. **Inner highlight** (위쪽 인너 광택) — 종이 위에서 반사광 느낌
2. **1px ring** (외곽 링) — 명확한 경계
3. **Drop shadow** (드롭 섀도우) — 떠 있는 느낌

카드 배경은 페이지 베이지(`#FAFAF7`)보다 한 단계 위인 **순백(`#FFFFFF`)** 으로 두어 자연스럽게 떠 보이게 한다.

## 3. 토큰 변경 (`app/globals.css` `:root`)

기존 토큰은 유지하되 카드 전용 토큰을 추가:

```css
:root {
  /* 기존 토큰 그대로 유지 */
  --bg-1: #FAFAF7;
  --bg-2: #F0EFEA;
  --ink: #0A0B10;
  --ink-2: rgba(10, 11, 16, 0.72);
  --dim: rgba(10, 11, 16, 0.5);
  --dim-2: rgba(10, 11, 16, 0.3);
  --line: rgba(10, 11, 16, 0.1);
  --accent: #2563EB;
  --accent-ink: #FFFFFF;
  --accent-glow: rgba(37, 99, 235, 0.35);

  /* 신규: 카드 입체감 토큰 */
  --card-bg: #FFFFFF;
  --card-ring: rgba(10, 11, 16, 0.09);
  --card-highlight: rgba(255, 255, 255, 0.7);
  --card-shadow: 0 1px 2px rgba(10,11,16,0.04), 0 12px 32px -12px rgba(10,11,16,0.18);
  --card-shadow-hover: 0 2px 4px rgba(10,11,16,0.05), 0 24px 48px -16px rgba(10,11,16,0.22);
  --card-shadow-strong: 0 2px 4px rgba(10,11,16,0.05), 0 40px 80px -20px rgba(10,11,16,0.28);
}
```

## 4. 유틸리티 클래스 (`app/globals.css` `@layer components`)

신규 `@layer components` 블록 추가 (현재 파일에는 `@layer base`와 `@layer utilities`만 있음):

```css
@layer components {
  /* 기본 카드 — 거의 모든 섹션 카드의 기본 */
  .card-v2 {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow:
      inset 0 1px 0 var(--card-highlight),
      0 0 0 1px var(--card-ring),
      var(--card-shadow);
    transition: box-shadow .3s ease, transform .3s ease;
  }

  /* 호버 시 떠오름 — Voices, Apply 직군 탭 등 인터랙티브 카드에 추가 */
  .card-v2-hover:hover {
    box-shadow:
      inset 0 1px 0 var(--card-highlight),
      0 0 0 1px var(--card-ring),
      var(--card-shadow-hover);
    transform: translateY(-2px);
  }

  /* 임팩트 카드 — Hero, Pillars, Apply 폼, Tools 클로징 박스 */
  .card-v2-strong {
    background: var(--card-bg);
    border-radius: 1.25rem;
    box-shadow:
      inset 0 1px 0 var(--card-highlight),
      0 0 0 1px var(--card-ring),
      var(--card-shadow-strong);
  }

  /* 카드 안에 들어가는 미니 박스 — 이중 그림자 방지용 (얇은 라인만) */
  .card-v2-flat {
    background: var(--bg-1);
    border: 1px solid var(--card-ring);
    border-radius: 0.5rem;
  }
}
```

**rounded 처리:** 클래스에 `border-radius`가 포함되어 있으므로, 기존 `rounded-2xl/3xl/xl`은 제거해도 되고, 그대로 두면 Tailwind가 우선해 덮어씀. 마이그레이션 일관성을 위해 **기존 rounded 클래스는 제거**한다.

## 5. 적용 매핑

총 22개 카드 인스턴스 (검색 결과 기준).

### 5.1 `.card-v2-strong` (4개) — 강조 카드

| 파일 | 라인 | 현재 |
|---|---|---|
| `components/v2/Hero.tsx` | 52 | `rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] overflow-hidden shadow-[0_40px_120px_-24px_rgba(0,0,0,0.18)]` |
| `components/v2/Pillars.tsx` | 87 | `rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-1)] overflow-hidden shadow-[...]` |
| `components/v2/Apply.tsx` | 202 | `rounded-3xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 md:p-12 space-y-8` |
| `components/v2/Tools.tsx` | 386 | `mt-24 rounded-3xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-10 md:p-14 relative overflow-hidden` |

**변환 규칙:** `rounded-*`, `border border-[color:var(--line)]`, `bg-[color:var(--bg-1|2)]`, 인라인 `shadow-[...]` 제거 → `card-v2-strong` 추가. `overflow-hidden`, `relative`, `mt-*`, `p-*`, `space-y-*` 등은 유지.

### 5.2 `.card-v2` (8개) — 일반 섹션 카드

| 파일 | 라인 | 비고 |
|---|---|---|
| `components/v2/Training.tsx` | 286, 457 | 일반 카드 |
| `components/v2/ValueChain.tsx` | 70, 99 | 일반 카드 |
| `components/v2/Partners.tsx` | 95 | 일반 카드 |
| `components/v2/CareerPath.tsx` | 67 | `gap-px` 하이라인 그리드 컨테이너 — `.card-v2`로 외곽만 입히고 내부 셀 하이라인 유지 |
| `components/v2/Benefits.tsx` | 75 | `gap-px` 하이라인 그리드 — 외곽 wrap |
| `components/v2/ValueChain.tsx` | 131 | `gap-px` 하이라인 그리드 (FC→팀→지사 타임라인) — 외곽 wrap |

### 5.3 `.card-v2 .card-v2-hover` (3개) — 호버 카드

| 파일 | 라인 | 비고 |
|---|---|---|
| `components/v2/Voices.tsx` | 62 | 기존 `hover:border-[#4aaa6e]` 제거하고 호버 transform으로 통일. 단, 색상 강조가 의도라면 `hover:ring-1 hover:ring-[#4aaa6e]` 등으로 보존 가능 — 본 spec에서는 호버 transform로 통일 |
| `components/v2/Apply.tsx` | 169, 185 | 직군 선택 탭. 기존 `hover:border-[color:var(--ink)]` 제거 |

### 5.4 `.card-v2-flat` (6개) — 카드 안 미니 박스

| 파일 | 라인 |
|---|---|
| `components/v2/Training.tsx` | 363, 475, 506, 533, 573 |
| `components/v2/ValueChain.tsx` | 88, 118 |

상위 카드 안에 중첩되는 작은 항목 박스들. 그림자가 누적되면 지저분해지므로 얇은 1px 라인만 유지.

### 5.5 제외 대상

- `components/v2/Leadership.tsx` — `app/page.tsx`에 import 안 됨, **변경 제외**
- `components/v2/_legacy/*` — 사용 안 함, **변경 제외**
- `components/v2/Training.tsx:308` — 외곽 카드(286) 안에 중첩된 `gap-px` 그리드. 이중 그림자 방지를 위해 그대로 유지
- `components/v2/FullAccess.tsx:162` — 자체 burgundy 색상 테마 사용 중. 본 spec의 중성 톤 카드와 결이 달라 별도 작업으로 분리
- 작은 pill/badge (예: `rounded-full`, `inline-flex` + `border` 조합) — 카드가 아니므로 변경 제외
- 버튼 (`Core.tsx`의 Button 컴포넌트) — 자체 그림자 시스템 보유, 변경 제외

## 6. 목업 토큰 보강 (`components/v2/tools/mockups/_shared/tokens.ts`)

Tools 섹션 안에 표시되는 SaaS 목업의 내부 박스들도 흐리므로 토큰만 한 단계 강화:

```ts
export const MOCKUP = {
  // ... 기존 색상 토큰 유지

  border: "rgba(20,20,40,0.12)",         // 0.07 → 0.12
  borderStrong: "rgba(20,20,40,0.18)",   // 0.13 → 0.18

  shadowSm:
    "0 1px 2px rgba(20,20,40,0.06), 0 0 0 1px rgba(20,20,40,0.05)",
  shadowMd:
    "0 8px 24px -8px rgba(20,20,40,0.12), 0 0 0 1px rgba(20,20,40,0.06)",
} as const;
```

목업 컴포넌트들(`components/v2/tools/mockups/**`)은 이 토큰을 인라인 스타일로 참조 중이므로 토큰만 바꾸면 일괄 반영됨. **개별 파일 수정 불필요.**

## 7. 작업 순서

1. `app/globals.css`에 토큰 + `@layer components` 추가
2. `components/v2/tools/mockups/_shared/tokens.ts` 토큰 값 업데이트
3. v2 컴포넌트 21개 카드 인스턴스 클래스 교체 (5.1 → 5.2 → 5.3 → 5.4 순서)
4. 로컬 dev 서버 띄우고 메인 페이지 전체 시각 검증 (각 섹션 스크린샷 비교)
5. 호버 인터랙션 (Voices, Apply 탭) 동작 확인

## 8. 위험/주의사항

- **카드 배경 흰색 전환:** 종이 베이지 위 흰 카드는 의도된 대비. 만약 너무 "튄다"고 느껴지면 `--card-bg`를 `#FBFAF6`(따뜻한 흰색)으로 한 단계 낮출 수 있음 (토큰만 수정).
- **Voices 카드의 그린 호버:** 현재 `hover:border-[#4aaa6e]`로 브랜드 그린이 들어가는데, 본 spec에서는 transform 호버로 통일. 그린 호버 유지가 더 좋다고 판단되면 `.card-v2-hover` 대신 `:hover` 인라인으로 `box-shadow` ring 색상만 그린으로 덮는 변형 가능.
- **Hero/Pillars 인라인 무거운 그림자 제거:** 기존 `shadow-[0_40px_120px_-24px_rgba(0,0,0,0.18)]`는 `.card-v2-strong`의 `--card-shadow-strong`(`0 40px 80px -20px rgba(10,11,16,0.28)`)으로 대체됨. 시각적으로 더 또렷해지지만 톤은 동일.
- **`gap-px` 그리드 카드 (CareerPath line 67):** `.card-v2`의 `box-shadow` ring이 `overflow-hidden`과 함께 작동할 때 자식 셀 1px 라인이 ring과 겹쳐 보일 수 있음 — 시각 검증에서 확인 후 필요 시 spread 조정.

## 9. 비범위 (Out of scope)

- `/recruit`, `/member/*` 등 메인 외 페이지 — 별도 PR
- Hero 섹션 내부 탭 시스템(line 72) — 카드가 아닌 탭 트리거이므로 별도 처리
- 색상/타이포/간격 변경 — 본 spec은 입체감(elevation) 한정
