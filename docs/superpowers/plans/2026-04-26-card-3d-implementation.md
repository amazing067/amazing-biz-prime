# Card 3D Layered Depth — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** v2 메인 랜딩의 모든 카드/박스를 4종의 새 유틸리티 클래스(`.card-v2`, `.card-v2-hover`, `.card-v2-strong`, `.card-v2-flat`)로 통일해 입체감을 강화한다.

**Architecture:** 신규 CSS 토큰을 `:root`에 추가하고 `@layer components`에 4종 클래스를 정의한다. 단일 1px border 대신 inset highlight + 1px ring + drop shadow의 3중 box-shadow 레이어로 입체감을 만든다. 카드 배경은 페이지 베이지(`--bg-1`)보다 한 단계 위인 순백(`#FFFFFF`).

**Tech Stack:** Next.js + Tailwind CSS + CSS variables. 변경은 CSS와 className 교체뿐, JS/TS 로직 변경 없음.

**Spec:** `docs/superpowers/specs/2026-04-26-card-3d-design.md`

**Verification approach:** 단위 테스트가 의미 없는 시각 변경. 각 task 후 `npm run dev`로 개발 서버를 띄우고 메인(`/`) 해당 섹션의 카드가 (1) 떠 있는 느낌이 나는지 (2) 외곽선이 또렷한지 육안 확인한다.

---

## Task 1: CSS 토큰 추가 및 카드 유틸리티 클래스 정의

**Files:**
- Modify: `app/globals.css`

신규 토큰을 `:root`에 추가하고, 신규 `@layer components` 블록에 4종 클래스를 정의한다.

- [ ] **Step 1: `:root`에 카드 토큰 추가**

`app/globals.css`의 `:root { ... }` 블록 마지막 줄(`--accent-glow: rgba(37, 99, 235, 0.35);` 다음)에 다음을 추가:

```css
  /* Card elevation tokens (layered depth) */
  --card-bg: #FFFFFF;
  --card-ring: rgba(10, 11, 16, 0.09);
  --card-highlight: rgba(255, 255, 255, 0.7);
  --card-shadow: 0 1px 2px rgba(10,11,16,0.04), 0 12px 32px -12px rgba(10,11,16,0.18);
  --card-shadow-hover: 0 2px 4px rgba(10,11,16,0.05), 0 24px 48px -16px rgba(10,11,16,0.22);
  --card-shadow-strong: 0 2px 4px rgba(10,11,16,0.05), 0 40px 80px -20px rgba(10,11,16,0.28);
```

- [ ] **Step 2: `@layer components` 블록 신규 추가**

`@layer base { ... }` 블록 뒤, `@layer utilities { ... }` 블록 앞 (즉 line 40과 line 42 사이)에 다음 블록을 통째로 삽입:

```css
@layer components {
  .card-v2 {
    background: var(--card-bg);
    border-radius: 1rem;
    box-shadow:
      inset 0 1px 0 var(--card-highlight),
      0 0 0 1px var(--card-ring),
      var(--card-shadow);
    transition: box-shadow .3s ease, transform .3s ease;
  }
  .card-v2-hover:hover {
    box-shadow:
      inset 0 1px 0 var(--card-highlight),
      0 0 0 1px var(--card-ring),
      var(--card-shadow-hover);
    transform: translateY(-2px);
  }
  .card-v2-strong {
    background: var(--card-bg);
    border-radius: 1.25rem;
    box-shadow:
      inset 0 1px 0 var(--card-highlight),
      0 0 0 1px var(--card-ring),
      var(--card-shadow-strong);
  }
  .card-v2-flat {
    background: var(--bg-1);
    border: 1px solid var(--card-ring);
    border-radius: 0.5rem;
  }
}

```

- [ ] **Step 3: 빌드 검증**

Run: `npm run build` (또는 dev 서버 실행 중이면 자동 리빌드 대기)
Expected: 빌드 성공. CSS 파싱 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(v2): add card elevation tokens and layered depth utility classes"
```

---

## Task 2: 목업 토큰 강화

**Files:**
- Modify: `components/v2/tools/mockups/_shared/tokens.ts`

Tools 섹션 안 SaaS 목업 박스의 border/shadow 토큰을 강화한다. 토큰 값만 바꾸므로 목업 컴포넌트 개별 수정 불필요.

- [ ] **Step 1: 토큰 값 업데이트**

`components/v2/tools/mockups/_shared/tokens.ts`의 `MOCKUP` 객체에서 4개 키를 다음과 같이 교체:

Before (lines 28~32):
```ts
  border: "rgba(20,20,40,0.07)",
  borderStrong: "rgba(20,20,40,0.13)",

  shadowSm: "0 1px 2px rgba(20,20,40,0.04)",
  shadowMd: "0 4px 16px -4px rgba(20,20,40,0.08), 0 2px 6px rgba(20,20,40,0.04)",
```

After:
```ts
  border: "rgba(20,20,40,0.12)",
  borderStrong: "rgba(20,20,40,0.18)",

  shadowSm: "0 1px 2px rgba(20,20,40,0.06), 0 0 0 1px rgba(20,20,40,0.05)",
  shadowMd: "0 8px 24px -8px rgba(20,20,40,0.12), 0 0 0 1px rgba(20,20,40,0.06)",
```

- [ ] **Step 2: 시각 검증**

Run dev server: `npm run dev`
브라우저에서 `http://localhost:3000` → "Tools" 섹션의 SaaS 목업 박스(예: Dashboard, Customers, BlogAI)들이 이전보다 또렷한 외곽선을 가지는지 확인.

- [ ] **Step 3: Commit**

```bash
git add components/v2/tools/mockups/_shared/tokens.ts
git commit -m "feat(v2): strengthen mockup border and shadow tokens"
```

---

## Task 3: `.card-v2-strong` 적용 — Hero, Pillars, Apply 폼, Tools 클로징

**Files:**
- Modify: `components/v2/Hero.tsx:52`
- Modify: `components/v2/Pillars.tsx:87`
- Modify: `components/v2/Apply.tsx:202`
- Modify: `components/v2/Tools.tsx:386`

가장 강조되어야 할 4개 카드를 `.card-v2-strong`으로 교체한다.

- [ ] **Step 1: `Hero.tsx` 수정**

Line 52를 다음과 같이 교체:

Before:
```tsx
    <div className="relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] overflow-hidden shadow-[0_40px_120px_-24px_rgba(0,0,0,0.18)]">
```

After:
```tsx
    <div className="relative card-v2-strong overflow-hidden">
```

- [ ] **Step 2: `Pillars.tsx` 수정**

Line 87을 다음과 같이 교체:

Before:
```tsx
    <div className="relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-1)] overflow-hidden shadow-[0_40px_120px_-24px_rgba(0,0,0,0.18)]">
```

After:
```tsx
    <div className="relative card-v2-strong overflow-hidden">
```

- [ ] **Step 3: `Apply.tsx` 수정**

Line 202를 다음과 같이 교체:

Before:
```tsx
              className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 md:p-12 space-y-8"
```

After:
```tsx
              className="card-v2-strong p-8 md:p-12 space-y-8"
```

- [ ] **Step 4: `Tools.tsx` 수정**

Line 386을 다음과 같이 교체:

Before:
```tsx
        <div className="mt-24 rounded-3xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-10 md:p-14 relative overflow-hidden">
```

After:
```tsx
        <div className="mt-24 card-v2-strong p-10 md:p-14 relative overflow-hidden">
```

- [ ] **Step 5: 시각 검증**

브라우저에서 다음 4곳 확인:
1. Hero: 첫 화면 브라우저 mockup이 또렷하게 떠 있는가
2. Pillars: 6각형 다이어그램이 들어있는 패널이 떠 있는가
3. Tools: 페이지 하단 "STACK · ARCHITECTURE" 박스가 떠 있는가
4. Apply: 지원 폼 카드가 떠 있는가

- [ ] **Step 6: Commit**

```bash
git add components/v2/Hero.tsx components/v2/Pillars.tsx components/v2/Apply.tsx components/v2/Tools.tsx
git commit -m "feat(v2): apply card-v2-strong to hero, pillars, apply form, tools closing"
```

---

## Task 4: `.card-v2` 적용 — Training, ValueChain, Partners

**Files:**
- Modify: `components/v2/Training.tsx:286`
- Modify: `components/v2/Training.tsx:457`
- Modify: `components/v2/ValueChain.tsx:70`
- Modify: `components/v2/ValueChain.tsx:99`
- Modify: `components/v2/Partners.tsx:95`

일반 섹션 카드 5개를 `.card-v2`로 교체.

- [ ] **Step 1: `Training.tsx` line 286 수정**

Before:
```tsx
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] overflow-hidden">
```

After:
```tsx
          <div className="card-v2 overflow-hidden">
```

- [ ] **Step 2: `Training.tsx` line 457 수정**

Before:
```tsx
            <div className="sticky top-24 rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 md:p-10">
```

After:
```tsx
            <div className="sticky top-24 card-v2 p-8 md:p-10">
```

- [ ] **Step 3: `ValueChain.tsx` line 70 수정**

Before:
```tsx
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 md:p-10">
```

After:
```tsx
          <div className="card-v2 p-8 md:p-10">
```

- [ ] **Step 4: `ValueChain.tsx` line 99 수정**

Before:
```tsx
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 md:p-10">
```

After:
```tsx
          <div className="card-v2 p-8 md:p-10">
```

이전 step과 정확히 동일한 문자열이므로 Edit 도구 사용 시 `replace_all: true` 옵션을 쓰거나 더 큰 컨텍스트로 두 인스턴스를 구분해야 함. 컨텍스트 구분 방법:
- line 70은 바로 다음 줄에 `<Mono className="text-[11px] tracking-[0.18em] text-[color:var(--accent)]">PRINCIPLE / 01</Mono>`
- line 99는 바로 다음 줄에 `PRINCIPLE / 02`

- [ ] **Step 5: `Partners.tsx` line 95 수정**

Before:
```tsx
        <div className="relative rounded-2xl border border-[color:var(--line)] overflow-hidden">
```

After:
```tsx
        <div className="relative card-v2 overflow-hidden">
```

- [ ] **Step 6: 시각 검증**

브라우저에서 확인:
1. Training: "교재 mockup" 카드, 우측 sticky DAY 카드
2. ValueChain: 두 PRINCIPLE 카드
3. Partners: 로고 그리드 박스

- [ ] **Step 7: Commit**

```bash
git add components/v2/Training.tsx components/v2/ValueChain.tsx components/v2/Partners.tsx
git commit -m "feat(v2): apply card-v2 to training, value-chain, partners cards"
```

---

## Task 5: `.card-v2` 적용 — `gap-px` 하이라인 그리드 컨테이너

**Files:**
- Modify: `components/v2/CareerPath.tsx:67`
- Modify: `components/v2/Benefits.tsx:75`
- Modify: `components/v2/ValueChain.tsx:131`

내부 셀 사이를 `gap-px + bg: var(--line)`으로 구분하는 그리드 컨테이너 3개. 외곽만 `.card-v2`로 입체감 부여하고 내부 하이라인은 유지.

- [ ] **Step 1: `CareerPath.tsx` line 67 수정**

Before:
```tsx
        <div
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[color:var(--line)]"
          style={{ background: "var(--line)" }}
        >
```

After:
```tsx
        <div
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-px card-v2 overflow-hidden"
          style={{ background: "var(--line)" }}
        >
```

`background: var(--line)`은 inline style로 `--card-bg`(흰색)를 덮어쓰므로 그리드 셀 사이 1px 라인이 정상적으로 보임. 셀 자체는 각자 `bg-[color:var(--bg-2)]`등 자기 배경을 가짐.

- [ ] **Step 2: `Benefits.tsx` line 75 수정**

Before:
```tsx
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--line)" }}
        >
```

After:
```tsx
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px card-v2 overflow-hidden"
          style={{ background: "var(--line)" }}
        >
```

- [ ] **Step 3: `ValueChain.tsx` line 131 수정**

Before:
```tsx
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: "var(--line)" }}>
```

After:
```tsx
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px card-v2 overflow-hidden" style={{ background: "var(--line)" }}>
```

- [ ] **Step 4: 시각 검증**

브라우저에서 확인:
1. CareerPath: 상단 "transparency proof strip" 3분할 박스
2. Benefits: 3열 티어 그리드
3. ValueChain: FC→팀→지사 3-stage 타임라인

체크 포인트: (a) 외곽에 떠오른 그림자/링이 보이는가, (b) 셀 사이 1px 하이라인이 여전히 보이는가, (c) 모서리 radius가 잘리지 않는가.

- [ ] **Step 5: Commit**

```bash
git add components/v2/CareerPath.tsx components/v2/Benefits.tsx components/v2/ValueChain.tsx
git commit -m "feat(v2): wrap hairline grid containers with card-v2"
```

---

## Task 6: `.card-v2 .card-v2-hover` 적용 — Voices, Apply 직군 탭

**Files:**
- Modify: `components/v2/Voices.tsx:62`
- Modify: `components/v2/Apply.tsx:169`
- Modify: `components/v2/Apply.tsx:185`

호버 시 살짝 떠오르는 인터랙티브 카드 3개.

- [ ] **Step 1: `Voices.tsx` line 62 수정**

Before:
```tsx
              className="group relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-6 md:p-8 transition-colors duration-300 min-h-[260px] flex flex-col hover:border-[#4aaa6e]"
```

After:
```tsx
              className="group relative card-v2 card-v2-hover p-6 md:p-8 min-h-[260px] flex flex-col"
```

기존 `hover:border-[#4aaa6e]`(브랜드 그린 호버)와 `transition-colors`는 제거됨. transform-based 호버로 통일. (그린 호버를 유지하고 싶다면 별도 PR로 변형)

- [ ] **Step 2: `Apply.tsx` line 169 수정 (전화 카드)**

Before:
```tsx
                className="group rounded-xl border border-[color:var(--line)] p-4 hover:border-[color:var(--ink)] transition-colors"
```

After:
```tsx
                className="group card-v2 card-v2-hover p-4"
```

- [ ] **Step 3: `Apply.tsx` line 185 수정 (카카오 카드)**

Before:
```tsx
                className="group rounded-xl border border-[color:var(--line)] p-4 hover:border-[color:var(--ink)] transition-colors"
```

After:
```tsx
                className="group card-v2 card-v2-hover p-4"
```

- [ ] **Step 4: 시각 검증**

브라우저에서 확인:
1. Voices: 3개 후기 카드. 호버 시 살짝 떠오르는지
2. Apply: 좌측 "전화"/"카카오" 박스 2개. 호버 시 떠오르는지

- [ ] **Step 5: Commit**

```bash
git add components/v2/Voices.tsx components/v2/Apply.tsx
git commit -m "feat(v2): apply card-v2 with hover lift to voices and apply contact cards"
```

---

## Task 7: `.card-v2-flat` 적용 — 카드 안 미니 박스

**Files:**
- Modify: `components/v2/Training.tsx:363`
- Modify: `components/v2/Training.tsx:475`
- Modify: `components/v2/Training.tsx:506`
- Modify: `components/v2/Training.tsx:533`
- Modify: `components/v2/Training.tsx:573`
- Modify: `components/v2/ValueChain.tsx:88`
- Modify: `components/v2/ValueChain.tsx:118`

상위 카드 안에 중첩되는 작은 박스 7개. 이중 그림자 방지를 위해 얇은 1px 라인만 유지.

- [ ] **Step 1: `Training.tsx` line 363 수정 (DB hot/warm/cold rows)**

Before:
```tsx
                      className="flex items-center gap-4 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-1)] px-4 py-3"
```

After:
```tsx
                      className="flex items-center gap-4 card-v2-flat px-4 py-3"
```

- [ ] **Step 2: `Training.tsx` line 475 수정 (sticky 카드 안 mockup wrapper)**

Before:
```tsx
              <div className="mt-8 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] overflow-hidden">
```

After:
```tsx
              <div className="mt-8 card-v2-flat overflow-hidden">
```

`.card-v2-flat`의 `border-radius: 0.5rem`은 기존 `rounded-xl`(0.75rem)보다 살짝 작음. 시각 검증에서 어색하면 inline style로 `style={{ borderRadius: '0.75rem' }}` 추가하거나 spec의 `.card-v2-flat` 정의 자체를 0.75rem로 조정.

- [ ] **Step 3: `Training.tsx` line 506 수정 (CORE CONTENT items)**

Before:
```tsx
                          className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-2)] px-3.5 py-2.5 flex items-start gap-3"
```

After:
```tsx
                          className="card-v2-flat px-3.5 py-2.5 flex items-start gap-3"
```

원래 배경이 `bg-[color:var(--bg-2)]`였는데 `.card-v2-flat`은 `var(--bg-1)`을 씀. Training 안 sticky 카드 자체가 `--card-bg`(흰색)이 되었으므로, 안쪽 미니 박스가 `--bg-1`(베이지)이면 적절한 대비가 나옴. 시각 검증 필수.

- [ ] **Step 4: `Training.tsx` line 533 수정 (KEY NUMBERS items)**

Before:
```tsx
                          className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-2)] px-3 py-2.5"
```

After:
```tsx
                          className="card-v2-flat px-3 py-2.5"
```

- [ ] **Step 5: `Training.tsx` line 573 수정 (형식/평가/교재 박스)**

Before:
```tsx
                    className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-3"
```

After:
```tsx
                    className="card-v2-flat p-3"
```

기존 `rounded-xl`(0.75rem)이 `.card-v2-flat`의 기본값 0.5rem으로 줄어듦. line 475와 같은 케이스. 시각 검증에서 어색하면 inline `style={{ borderRadius: '0.75rem' }}` 추가.

- [ ] **Step 6: `ValueChain.tsx` line 88 수정 (PRINCIPLE 01 mini cards)**

Before:
```tsx
                  className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-1)] p-3"
```

After:
```tsx
                  className="card-v2-flat p-3"
```

- [ ] **Step 7: `ValueChain.tsx` line 118 수정 (PRINCIPLE 02 mini rows)**

Before:
```tsx
                  className="flex items-center justify-between rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-1)] px-3 py-2.5"
```

After:
```tsx
                  className="flex items-center justify-between card-v2-flat px-3 py-2.5"
```

- [ ] **Step 8: 시각 검증**

브라우저에서 다음 영역 확인:
1. Training: DB hot/warm/cold 3행 행 표시
2. Training: 우측 sticky DAY 카드 안 mockup 영역 (8단계 + KEY NUMBERS + KEY TOPICS)
3. Training: sticky 카드 하단 형식/평가/교재 3박스
4. ValueChain: PRINCIPLE 01 안 5천만/4억/12억 3박스
5. ValueChain: PRINCIPLE 02 안 관리수수료/분할수수료/운영수수료 3행

체크: 상위 흰색 카드 안에 베이지 톤 작은 박스가 잘 가라앉아 보이고 그림자 충돌 없는가.

- [ ] **Step 9: Commit**

```bash
git add components/v2/Training.tsx components/v2/ValueChain.tsx
git commit -m "feat(v2): apply card-v2-flat to nested mini boxes inside cards"
```

---

## Task 8: 전체 통합 검증 및 마무리

각 task에서 부분 검증을 했지만, 모든 변경을 합친 후 전체 페이지를 처음부터 끝까지 스크롤하며 회귀를 확인한다.

- [ ] **Step 1: dev 서버 띄우고 메인 페이지 전체 스크롤**

Run: `npm run dev`
브라우저에서 `http://localhost:3000`을 열고 다음 14개 섹션을 처음부터 끝까지 스크롤:

1. Hero — 브라우저 mockup 카드 떠 있음 (Task 3)
2. Manifesto — 카드 없음 (텍스트 섹션)
3. Pillars — 6각형 패널 떠 있음 (Task 3)
4. Process — 변경 없음
5. Voices — 3개 카드, 호버 시 떠오름 (Task 6)
6. Training — 메인 카드 + sticky DAY 카드 + 내부 미니 박스 (Task 4, 7)
7. Tools — SaaS 목업 (Task 2 토큰 강화) + 클로징 박스 (Task 3)
8. FullAccess — 상단 카드 (변경 없음, burgundy 그리드는 제외)
9. Benefits — 3열 티어 그리드 떠 있음 (Task 5)
10. ValueChain — 두 PRINCIPLE 카드 + 3-stage 타임라인 (Task 4, 5, 7)
11. CareerPath — 상단 transparency strip (Task 5)
12. Partners — 로고 박스 (Task 4)
13. FAQ — 변경 없음
14. Apply — 좌측 연락 카드 + 우측 폼 (Task 3, 6)

- [ ] **Step 2: 빌드 검증**

Run: `npm run build`
Expected: 빌드 에러 없음. CSS 컴파일 정상.

- [ ] **Step 3: 회귀 검사 — 메인 외 페이지 영향 없음 확인**

본 spec은 `components/v2/**`만 수정. `/recruit`, `/member/*`, `/amazing` 등은 v2 컴포넌트를 쓰지 않거나 다른 카드 시스템을 씀. 영향 없어야 정상.

빠른 확인: 다음 grep 결과가 비어있어야 함 (legacy 디렉토리 제외):

```bash
grep -rn "card-v2" app/ components/ --include="*.tsx" | grep -v "components/v2/"
```

Expected: 비어있음 (v2 외부에 card-v2 클래스 사용 없음).

- [ ] **Step 4: 최종 commit (필요시)**

이전 task들에서 모두 commit 했으므로 추가 변경이 없으면 skip. dev 서버 띄우고 발견된 미세 조정이 있으면 별도 commit.

```bash
git status
# 깨끗하면 종료. 변경 있으면 commit.
```

---

## Summary

총 8개 task, ~22개 카드 인스턴스 변경. CSS 토큰 6개 + 유틸 클래스 4종 신규. 변경된 파일:

- `app/globals.css` (Task 1)
- `components/v2/tools/mockups/_shared/tokens.ts` (Task 2)
- `components/v2/Hero.tsx`, `Pillars.tsx`, `Apply.tsx`, `Tools.tsx` (Task 3)
- `components/v2/Training.tsx`, `ValueChain.tsx`, `Partners.tsx` (Task 4, 5, 7)
- `components/v2/CareerPath.tsx`, `Benefits.tsx` (Task 5)
- `components/v2/Voices.tsx`, `Apply.tsx` (Task 6)

Commits: 7개 (Task 1~7 각 1개, Task 8은 검증만).

**Rollback strategy:** 각 task가 독립 commit이므로 문제 발견 시 해당 commit만 revert 가능. 토큰 단위(Task 1, 2)만 revert해도 시각적으로 거의 원복.
