# Tools 시각 쇼케이스 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `components/v2/Tools.tsx`의 그룹 3개(설계사 포털 / AI 분석 스튜디오 / 고객접점)를 텍스트 카드 그리드에서 좌·우 분할 시각 쇼케이스(콜라주 + 도구 리스트)로 변환하고, "Gemini 2.5 Pro" 등 모델/벤더 노출을 정리한다. "인프라" 그룹은 기존 카드 유지.

**Architecture:** 신규 디렉터리 `components/v2/tools/` 아래에 공용 셸 1개(`ShowcaseFrame.tsx`)와 그룹별 콜라주 3개(`ShowcasePortal.tsx`, `ShowcaseStudio.tsx`, `ShowcaseTouchpoints.tsx`)를 분리. 각 콜라주는 순수 SVG/CSS만 사용(이미지/차트 라이브러리 없음). `Tools.tsx`는 그룹 렌더링 분기에서 `tag === "infra"`이면 기존 `ToolCard` 그리드, 아니면 매핑 테이블로 적절한 Showcase 컴포넌트를 골라 렌더한다.

**Tech Stack:** Next.js 14 App Router (RSC + `"use client"`), React 18, TypeScript, Tailwind v3 + 토큰 변수(`--bg-1`, `--accent` 등), `components/v2/Core.tsx`의 `Eyebrow` · `Mono` · `Icon` · `GridOverlay` 재사용. 이미지·차트 라이브러리 도입 없음. 테스트 프레임워크 없음 → 검증은 `npm run build`(타입체크 포함) + `npm run lint` + 1440/768/375 폭 시각 검토.

---

## 파일 구조

| 경로 | 책임 |
| --- | --- |
| `components/v2/tools/types.ts` (신규) | `ToolItem`, `ToolGroup`, `ShowcaseProps` 등 공용 타입 + 그룹 식별용 `GroupTag` 유니언 |
| `components/v2/tools/ShowcaseFrame.tsx` (신규) | 좌/우 12-column 셸. `flip` prop으로 좌우 반전, 모바일 스택, 도구 리스트(인라인 행 + 호버 펼침) 렌더 |
| `components/v2/tools/ShowcasePortal.tsx` (신규) | 설계사 포털 콜라주 (KPI 4칸 / DB 분배 테이블 / 캘린더 미니) |
| `components/v2/tools/ShowcaseStudio.tsx` (신규) | AI 분석 스튜디오 콜라주 (5단계 KPI 흐름 / 인지 레이더 / AI 입력 박스). `flip` 적용 |
| `components/v2/tools/ShowcaseTouchpoints.tsx` (신규) | 고객접점 콜라주 (모바일 청구.com / 알림톡 풍선 / 블로그 카드) |
| `components/v2/Tools.tsx` (수정) | 그룹별 렌더 분기, 헤더 카피 정리, 통계 칩/푸터의 "Gemini 2.5 Pro" 제거. `ToolCard`는 인프라 그룹 전용으로 남김 |

각 파일은 한 가지 책임만 가지며 다른 파일 내부 구조에 의존하지 않는다. `ShowcaseFrame`은 props로만 통신.

---

## Task 1: 공용 타입과 그룹 태그 정의

**Files:**
- Create: `components/v2/tools/types.ts`

- [ ] **Step 1: 파일 생성**

```typescript
// components/v2/tools/types.ts
import type { ReactNode } from "react";

export type ToolItem = {
  name: string;
  tag: string;
  desc: string;
  detail: string;
  status: "LIVE" | "AI";
};

export type GroupTag = "portal" | "studio" | "touchpoints" | "infra";

export type ToolGroup = {
  tag: GroupTag;
  label: string;
  sub: string;
  desc: string;
  items: ToolItem[];
};

export type ShowcaseProps = {
  group: ToolGroup;
  index: number; // 0-based, 헤더 번호용
  flip?: boolean; // true면 콜라주 우측·리스트 좌측
  collage: ReactNode; // 그룹별 콜라주 노드(부모가 주입)
};
```

- [ ] **Step 2: 타입체크 통과 확인**

Run: `npx tsc --noEmit`
Expected: 신규 에러 없음 (기존 에러는 그대로 통과)

- [ ] **Step 3: 커밋**

```bash
git add components/v2/tools/types.ts
git commit -m "Add shared types for Tools showcase modules."
```

---

## Task 2: 공용 셸 `ShowcaseFrame` 구현

**Files:**
- Create: `components/v2/tools/ShowcaseFrame.tsx`

`ToolList` 내부 컴포넌트는 같은 파일 안에 둠(외부에서 재사용하지 않음).

- [ ] **Step 1: 파일 작성**

```tsx
// components/v2/tools/ShowcaseFrame.tsx
"use client";

import { useState } from "react";
import { Mono, Icon } from "../Core";
import type { ShowcaseProps, ToolItem } from "./types";

function ToolRow({ item, index }: { item: ToolItem; index: number }) {
  const [open, setOpen] = useState(false);
  const isAi = item.status === "AI";
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative pl-5 py-4 border-b border-[color:var(--line)] cursor-default group"
    >
      <span
        className="absolute left-0 top-4 bottom-4 w-px transition-colors duration-300"
        style={{ background: open ? "var(--accent)" : "transparent" }}
      />
      <div className="flex items-baseline gap-3">
        <Mono className="text-[10px] text-[color:var(--dim-2)]">
          /{String(index + 1).padStart(2, "0")}
        </Mono>
        <h4 className="text-[16px] font-medium tracking-tight text-[color:var(--ink)]">
          {item.name}
        </h4>
        {isAi && (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-px rounded-full text-[9px] font-medium tracking-[0.08em]"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <Icon name="sparkles" size={8} stroke={2} /> AI
          </span>
        )}
      </div>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-[color:var(--ink-2)]">
        {item.desc}
      </p>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pt-3 text-[12px] leading-[1.65] text-[color:var(--dim)]">
          {item.detail}
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseFrame({ group, index, flip = false, collage }: ShowcaseProps) {
  return (
    <section aria-labelledby={`group-${group.tag}`}>
      <div className="flex items-end justify-between mb-3 pb-5 border-b border-[color:var(--line)]">
        <div>
          <Mono className="text-[11px] tracking-[0.14em] text-[color:var(--dim)]">
            0{index + 1} / {group.sub.toUpperCase()}
          </Mono>
          <h3
            id={`group-${group.tag}`}
            className="mt-2 text-[28px] font-medium tracking-tight text-[color:var(--ink)]"
          >
            {group.label}
          </h3>
          <p className="mt-2 text-[13px] max-w-[560px] text-[color:var(--ink-2)]">
            {group.desc}
          </p>
        </div>
        <Mono className="text-[11px] whitespace-nowrap ml-6 text-[color:var(--dim)]">
          {group.items.length} tools
        </Mono>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
        <div
          className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
          role="img"
          aria-label={`${group.label} 시각 요약`}
        >
          <div className="relative aspect-[4/3] rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] overflow-hidden">
            {collage}
          </div>
        </div>
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}>
          <div className="border-t border-[color:var(--line)]">
            {group.items.map((item, i) => (
              <ToolRow key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 타입체크 통과 확인**

Run: `npx tsc --noEmit`
Expected: 신규 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add components/v2/tools/ShowcaseFrame.tsx
git commit -m "Add ShowcaseFrame shell with tool list and collage slot."
```

---

## Task 3: `ShowcasePortal` — 설계사 포털 콜라주

**Files:**
- Create: `components/v2/tools/ShowcasePortal.tsx`

콜라주 영역은 `ShowcaseFrame`이 만들어주는 4:3 박스 안을 채움. 내부는 `grid-rows-[auto_1fr]`.

- [ ] **Step 1: 파일 작성**

```tsx
// components/v2/tools/ShowcasePortal.tsx
"use client";

import { Eyebrow, Icon, Mono } from "../Core";

const KPIS = [
  { label: "업로드", value: 142, pct: 72 },
  { label: "배정", value: 87, pct: 58 },
  { label: "상담중", value: 31, pct: 41 },
  { label: "계약", value: 18, pct: 100 },
];

const DISTRIBUTION = [
  { fc: "김 FC", count: 24, stage: 2 },
  { fc: "박 FC", count: 18, stage: 3 },
  { fc: "이 FC", count: 31, stage: 1 },
];

const CALENDAR = [
  { day: "오늘", labels: ["TA 콜 09:00", "본부 교육 14:00"] },
  { day: "내일", labels: ["갱신 미팅", "상담 11:30"] },
  { day: "모레", labels: ["신규 상담"] },
];

export default function ShowcasePortal() {
  return (
    <div className="absolute inset-0 grid grid-rows-[auto_1fr] gap-3 p-5">
      {/* A. KPI 4칸 */}
      <div className="grid grid-cols-4 gap-px rounded-xl overflow-hidden border border-[color:var(--line)] bg-[color:var(--line)]">
        {KPIS.map((k) => {
          const isMax = k.pct === 100;
          return (
            <div key={k.label} className="bg-[color:var(--bg-1)] p-3">
              <div className="flex items-center justify-between">
                <Mono className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--dim)]">
                  {k.label}
                </Mono>
                {isMax && (
                  <Icon name="check" size={11} stroke={2.5} style={{ color: "var(--accent)" }} />
                )}
              </div>
              <div
                className="mt-1 text-[clamp(20px,2.6vw,32px)] tabular-nums font-medium tracking-tight"
                style={{ color: isMax ? "var(--accent)" : "var(--ink)" }}
              >
                {k.value}
              </div>
              <div className="mt-2 h-[2px] w-full bg-[color:var(--line)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${k.pct}%`,
                    background: isMax ? "var(--accent)" : "var(--ink)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* B+C 좌우 */}
      <div className="grid grid-cols-2 gap-3 min-h-0">
        {/* B. DB 분배 테이블 */}
        <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
          <Eyebrow>DB DISTRIBUTION</Eyebrow>
          <div className="mt-3 flex-1 flex flex-col justify-around">
            {DISTRIBUTION.map((d) => (
              <div key={d.fc} className="flex items-center justify-between text-[12px]">
                <span className="text-[color:var(--ink)]">{d.fc}</span>
                <span className="flex items-center gap-3">
                  <Mono className="text-[color:var(--dim)]">{d.count}건</Mono>
                  <span className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            i <= d.stage ? "var(--accent)" : "var(--line)",
                        }}
                      />
                    ))}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* C. 캘린더 미니 */}
        <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
          <Eyebrow>CALENDAR · 3D</Eyebrow>
          <div className="mt-3 grid grid-cols-3 gap-2 flex-1">
            {CALENDAR.map((c, i) => (
              <div key={c.day} className="flex flex-col">
                {i === 0 && (
                  <span className="h-[3px] w-6 rounded-full mb-2" style={{ background: "var(--accent)" }} />
                )}
                <Mono className="text-[10px] text-[color:var(--dim)]">{c.day}</Mono>
                <div className="mt-2 flex flex-col gap-1.5">
                  {c.labels.map((l) => (
                    <div key={l} className="flex items-center gap-1.5 text-[10px] text-[color:var(--ink-2)]">
                      <span className="w-1 h-1 rounded-full bg-[color:var(--ink)]" />
                      <span className="truncate">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 타입체크 통과**

Run: `npx tsc --noEmit`
Expected: 신규 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add components/v2/tools/ShowcasePortal.tsx
git commit -m "Add ShowcasePortal collage with KPI/distribution/calendar."
```

---

## Task 4: `ShowcaseStudio` — AI 분석 스튜디오 콜라주

**Files:**
- Create: `components/v2/tools/ShowcaseStudio.tsx`

벤더/모델명 표기 절대 금지. AI 배지만 사용.

- [ ] **Step 1: 파일 작성**

```tsx
// components/v2/tools/ShowcaseStudio.tsx
"use client";

import { Eyebrow, Icon, Mono } from "../Core";

const STAGES = [
  { label: "현재", value: "₩134k" },
  { label: "정리 예정", value: "₩98k" },
  { label: "정리 후", value: "₩72k" },
  { label: "새 제안", value: "₩88k" },
  { label: "최종", value: "₩155k", final: true },
];

const REGIONS = [
  "기억력",
  "주의력",
  "언어",
  "시공간",
  "실행",
  "계산",
  "추론",
  "속도",
];

// 8각 polygon 좌표 — 100x100 viewBox, 중심 50,50, 반지름 r
function radarPoints(values: number[], r = 40) {
  return values
    .map((v, i) => {
      const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
      const ratio = v / 100;
      const x = 50 + Math.cos(angle) * r * ratio;
      const y = 50 + Math.sin(angle) * r * ratio;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

const BASELINE = [100, 100, 100, 100, 100, 100, 100, 100];
const SCORE = [78, 64, 88, 70, 55, 82, 60, 74];

export default function ShowcaseStudio() {
  return (
    <div className="absolute inset-0 grid grid-rows-[auto_1fr] gap-3 p-5">
      {/* A. 5단계 KPI 흐름 */}
      <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4">
        <Eyebrow>COVERAGE · 5 STAGES</Eyebrow>
        <div className="mt-3 flex items-center gap-1">
          {STAGES.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div
                className={`flex-1 px-2 py-2 rounded-lg ${
                  s.final
                    ? "border border-[color:var(--accent)]"
                    : "border border-[color:var(--line)]"
                }`}
                style={{
                  background: s.final ? "var(--accent)" : "transparent",
                  color: s.final ? "var(--accent-ink)" : "var(--ink)",
                }}
              >
                <Mono
                  className="text-[9px] uppercase tracking-[0.12em]"
                  style={{ color: s.final ? "var(--accent-ink)" : "var(--dim)" }}
                >
                  {s.label}
                </Mono>
                <div className="text-[14px] tabular-nums font-medium mt-0.5">
                  {s.value}
                </div>
              </div>
              {i < STAGES.length - 1 && (
                <Icon
                  name="arrowRight"
                  size={12}
                  className="mx-1 shrink-0"
                  style={{ color: "var(--dim-2)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* B+C 좌우 */}
      <div className="grid grid-cols-2 gap-3 min-h-0">
        {/* B. 인지 레이더 */}
        <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
          <Eyebrow>COGNITIVE · 8 REGIONS</Eyebrow>
          <div className="mt-2 flex-1 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full max-h-[180px]" aria-hidden>
              <polygon
                points={radarPoints(BASELINE)}
                fill="none"
                stroke="var(--line)"
                strokeWidth={0.5}
                strokeDasharray="2 2"
              />
              <polygon
                points={radarPoints([60, 60, 60, 60, 60, 60, 60, 60])}
                fill="none"
                stroke="var(--line)"
                strokeWidth={0.4}
              />
              <polygon
                points={radarPoints(SCORE)}
                fill="var(--accent)"
                fillOpacity={0.18}
                stroke="var(--accent)"
                strokeWidth={0.8}
              />
              {REGIONS.map((r, i) => {
                const angle = (Math.PI * 2 * i) / REGIONS.length - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 47;
                const y = 50 + Math.sin(angle) * 47;
                return (
                  <text
                    key={r}
                    x={x}
                    y={y}
                    fontSize={3.6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--dim)"
                  >
                    {r}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* C. AI 입력 박스 */}
        <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
          <Eyebrow>AI INPUT</Eyebrow>
          <div className="mt-3 rounded-lg border border-dashed border-[color:var(--line)] p-4 flex items-center justify-center gap-2 text-[12px] text-[color:var(--ink-2)]">
            <Icon name="sparkles" size={14} stroke={2} style={{ color: "var(--accent)" }} />
            <span>PDF 증권 업로드</span>
            <span
              className="ml-1 px-1.5 py-px rounded-full text-[9px] font-medium tracking-[0.08em]"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              AI
            </span>
          </div>
          <div className="mt-3 space-y-1.5 flex-1 flex flex-col justify-center">
            {["32개사 자동 매칭", "5단계 KPI 재계산", "근거 n건 표시"].map((line) => (
              <div key={line} className="flex items-center gap-2 text-[11px] text-[color:var(--dim)]">
                <span className="w-1 h-1 rounded-full bg-[color:var(--accent)]" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 타입체크 통과**

Run: `npx tsc --noEmit`
Expected: 신규 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add components/v2/tools/ShowcaseStudio.tsx
git commit -m "Add ShowcaseStudio collage with KPI flow/radar/AI input."
```

---

## Task 5: `ShowcaseTouchpoints` — 고객접점 콜라주

**Files:**
- Create: `components/v2/tools/ShowcaseTouchpoints.tsx`

내부 그리드: 좌측 폰 프레임은 `col-span-5 row-span-2`, 우측 알림톡/블로그는 `col-span-7`로 두 행 분할.

- [ ] **Step 1: 파일 작성**

```tsx
// components/v2/tools/ShowcaseTouchpoints.tsx
"use client";

import { Eyebrow, Mono } from "../Core";

const CARRIERS = ["삼", "한", "DB", "흥", "교", "현", "메", "라"];

const BLOG_CARDS = [
  { title: "실손 4세대 청구 가이드", date: "2026-04-12", tag: "가이드" },
  { title: "치매 진단 후 보장 정리 케이스", date: "2026-04-08", tag: "사례" },
];

export default function ShowcaseTouchpoints() {
  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-2 gap-3 p-5">
      {/* A. 모바일 청구.com — 좌측 풀높이 */}
      <div className="col-span-5 row-span-2 rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-3 flex items-center justify-center">
        <div className="w-full max-w-[180px] aspect-[9/19] rounded-[28px] border-[6px] border-[color:var(--ink)] bg-[color:var(--bg-1)] p-3 flex flex-col gap-2">
          <div className="text-center">
            <Mono className="text-[9px] tracking-[0.14em] text-[color:var(--dim)]">
              청구.com
            </Mono>
          </div>
          <div className="rounded-md border border-[color:var(--line)] px-2 py-1 text-[9px] text-[color:var(--dim-2)]">
            보험사 검색…
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-1">
            {CARRIERS.map((c) => (
              <div
                key={c}
                className="aspect-square rounded-md border border-[color:var(--line)] flex items-center justify-center text-[11px] font-medium text-[color:var(--ink)]"
              >
                {c}
              </div>
            ))}
          </div>
          <div className="mt-auto text-center text-[8px] leading-tight text-[color:var(--dim)]">
            PDF 청구서 · 인콜 · FAX
          </div>
        </div>
      </div>

      {/* B. 알림톡 풍선 — 우상단 */}
      <div className="col-span-7 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
        <Eyebrow>ALIMTALK</Eyebrow>
        <div className="mt-3 flex items-start gap-2 flex-1">
          <span className="w-6 h-6 shrink-0 rounded-full bg-[#FEE500] flex items-center justify-center text-[10px] font-bold text-[#3C1E1E]">
            카
          </span>
          <div className="flex-1">
            <div className="rounded-2xl rounded-tl-sm bg-[color:var(--bg-2)] px-3 py-2 text-[12px] leading-[1.55] text-[color:var(--ink)]">
              <span className="font-medium">[Amazing]</span> 김ㅇㅇ님 갱신 안내 — 5월 12일까지
              진행 부탁드립니다.
            </div>
            <Mono className="block mt-1 text-[9px] text-[color:var(--dim)]">
              오전 09:14
            </Mono>
          </div>
        </div>
      </div>

      {/* C. 블로그 카드 2개 — 우하단 */}
      <div className="col-span-7 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-1)] p-4 flex flex-col">
        <Eyebrow>BLOG · LATEST</Eyebrow>
        <div className="mt-3 space-y-2 flex-1 flex flex-col justify-center">
          {BLOG_CARDS.map((b) => (
            <div
              key={b.title}
              className="pl-3 border-l-[3px] border-[color:var(--accent)]"
            >
              <div className="text-[12px] font-medium text-[color:var(--ink)] leading-tight">
                {b.title}
              </div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-[color:var(--dim)]">
                <Mono>{b.date}</Mono>
                <span>·</span>
                <span>{b.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 타입체크 통과**

Run: `npx tsc --noEmit`
Expected: 신규 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add components/v2/tools/ShowcaseTouchpoints.tsx
git commit -m "Add ShowcaseTouchpoints collage with phone/alimtalk/blog."
```

---

## Task 6: `Tools.tsx` 분기 + 텍스트 정리

**Files:**
- Modify: `components/v2/Tools.tsx`

핵심 수정:
1. `GROUPS` 각 항목에 `tag: GroupTag` 추가.
2. AI 그룹 `sub`: `"Gemini 2.5 Pro"` → `"AI Studio"`.
3. 헤더 통계 칩: `"AI · Gemini 2.5 Pro"` → `"AI · Native"`.
4. 아키텍처 푸터 본문 문장에서 `·Gemini 2.5 Pro` 제거.
5. 아키텍처 푸터 칩 배열에서 `"Gemini 2.5 Pro"` 항목 제거.
6. 그룹 렌더 분기:
   - `tag === "infra"` → 기존 `ToolCard` 그리드 유지.
   - 그 외 → `ShowcaseFrame` 사용, `tag`에 따라 적절한 콜라주 컴포넌트 주입. `tag === "studio"`이면 `flip` 적용.

- [ ] **Step 1: import 추가 및 GROUPS에 `tag` 추가**

`Tools.tsx` 상단부 import 블록에 다음 추가:

```tsx
import type { ToolGroup } from "./tools/types";
import ShowcaseFrame from "./tools/ShowcaseFrame";
import ShowcasePortal from "./tools/ShowcasePortal";
import ShowcaseStudio from "./tools/ShowcaseStudio";
import ShowcaseTouchpoints from "./tools/ShowcaseTouchpoints";
```

`GROUPS` 배열의 타입을 `const GROUPS: ToolGroup[] = [...]`로 변경하고, 기존 4개 그룹 객체 각각에 첫 필드로 `tag`를 추가:
- 설계사 포털 → `tag: "portal",`
- AI 분석 스튜디오 → `tag: "studio",`
- 고객 접점 · 콘텐츠 → `tag: "touchpoints",`
- 인프라 · 일체형 → `tag: "infra",`

같은 동작에서 기존 로컬 타입 선언 `type ToolItem = { ... }`와 `type ToolGroup = { label: ... }` 두 블록을 **삭제**한다(이제 `./tools/types`에서 import).

- [ ] **Step 2: 텍스트 4곳 정리**

수정 1 — AI 그룹 sub:
```tsx
// 변경 전
sub: "Gemini 2.5 Pro",
// 변경 후
sub: "AI Studio",
```

수정 2 — 헤더 통계 칩 4번째(`{aiCount} AI · Gemini 2.5 Pro`):
```tsx
<span className="inline-flex items-center gap-2">
  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" /> {aiCount} AI ·
  Native
</span>
```

수정 3 — 아키텍처 푸터 본문 문장:
```tsx
// 변경 전
React·TypeScript·PostgreSQL·Gemini 2.5 Pro 기반으로
// 변경 후
React·TypeScript·PostgreSQL 기반으로
```

수정 4 — 푸터 칩 배열에서 `"Gemini 2.5 Pro"` 제거:
```tsx
{[
  "React 18",
  "TypeScript",
  "Node / Express",
  "PostgreSQL",
  "공공 API",
  "알림톡",
  "PWA · Android",
].map((t) => ( ... ))}
```

- [ ] **Step 3: 그룹 렌더 분기 추가**

`<div className="space-y-20">` 내부의 `{GROUPS.map((g, gi) => ( ... ))}` 블록을 다음으로 교체:

```tsx
{GROUPS.map((g, gi) => {
  if (g.tag === "infra") {
    return (
      <div key={g.label}>
        <div className="flex items-end justify-between mb-3 pb-5 border-b border-[color:var(--line)]">
          <div>
            <Mono className="text-[11px] tracking-[0.14em] text-[color:var(--dim)]">
              0{gi + 1} / {g.sub.toUpperCase()}
            </Mono>
            <h3 className="mt-2 text-[28px] font-medium tracking-tight text-[color:var(--ink)]">
              {g.label}
            </h3>
            <p className="mt-2 text-[13px] max-w-[560px] text-[color:var(--ink-2)]">
              {g.desc}
            </p>
          </div>
          <Mono className="text-[11px] whitespace-nowrap ml-6 text-[color:var(--dim)]">
            {g.items.length} tools
          </Mono>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px mt-8"
          style={{ background: "var(--line)" }}
        >
          {g.items.map((it, i) => (
            <ToolCard key={it.name} item={it} index={i} />
          ))}
        </div>
      </div>
    );
  }

  const collage =
    g.tag === "portal" ? <ShowcasePortal /> :
    g.tag === "studio" ? <ShowcaseStudio /> :
    <ShowcaseTouchpoints />;

  return (
    <ShowcaseFrame
      key={g.label}
      group={g}
      index={gi}
      flip={g.tag === "studio"}
      collage={collage}
    />
  );
})}
```

- [ ] **Step 4: 타입체크 통과**

Run: `npx tsc --noEmit`
Expected: 신규 에러 없음

- [ ] **Step 5: "Gemini" 문자열이 페이지에서 사라졌는지 확인**

Run (Grep tool): `Gemini` 패턴, glob `components/v2/**`
Expected: 일치 0건

- [ ] **Step 6: 빌드 통과 확인**

Run: `npm run build`
Expected: 빌드 성공, 신규 ESLint 경고 없음

- [ ] **Step 7: 커밋**

```bash
git add components/v2/Tools.tsx
git commit -m "Wire Tools section to per-group showcases; drop vendor name."
```

---

## Task 7: 시각 검증 및 회귀 확인

**Files:** (없음 — 수동 확인)

- [ ] **Step 1: dev 서버 띄우기**

Run: `npm run dev`
Expected: `http://localhost:7777` (또는 dev-safe.js가 잡은 첫 빈 포트)에서 부팅 성공

- [ ] **Step 2: 데스크톱 1440 폭 시각 확인**

브라우저로 `/` 진입, "SECTION 06 · SYSTEM STACK" 섹션으로 스크롤. 다음 확인:
- 설계사 포털: 좌측 콜라주 / 우측 도구 리스트 6개
- AI 분석 스튜디오: **좌측 도구 리스트 / 우측 콜라주** (반전)
- 고객접점: 좌측 콜라주 / 우측 도구 리스트 4개
- 인프라: 기존 3열 카드 그리드
- 도구 행 호버 시 detail 펼침 + 좌측 액센트 바 표시
- 헤더 통계: "AI · Native" 표기, "Gemini" 어디에도 없음
- 아키텍처 푸터: "PostgreSQL 기반" 문장, 칩에 Gemini 없음

- [ ] **Step 3: 768 폭 (태블릿) 확인**

브라우저 폭 768로 축소. 콜라주가 도구 리스트 위로 단순 스택, 콜라주 4:3 비율 유지, 깨짐 없음.

- [ ] **Step 4: 375 폭 (모바일) 확인**

브라우저 폭 375로 축소. 콜라주 내부 요소 가독성 유지, 도구 리스트 1열, 호버 대신 탭으로도 detail 펼치는 게 가능한지(터치 디바이스 시뮬) 확인. 가독성이 너무 떨어지면 후속 작업으로 모바일 콜라주 단순화 — 이 플랜에선 깨짐만 없으면 통과.

- [ ] **Step 5: 빌드 재확인**

Run: `npm run build && npm run lint`
Expected: 둘 다 신규 에러/경고 없이 통과

- [ ] **Step 6: 마무리 커밋 (필요 시)**

만약 시각 확인에서 미세한 토큰/spacing 조정이 필요했다면 별도 커밋:

```bash
git add components/v2/tools/
git commit -m "Polish showcase spacing per visual review."
```

---

## 수용 기준 (스펙 §10 매핑)

| 스펙 기준 | 검증 단계 |
| --- | --- |
| `npm run build` 통과, lint 경고 없음 | Task 6 Step 6 + Task 7 Step 5 |
| 1440 / 768 / 375 폭 시각 깨짐 없음 | Task 7 Step 2~4 |
| "Gemini 2.5 Pro" 문자열 검색 0건 | Task 6 Step 5 |
| 3개 그룹 콜라주 구성이 모두 다름 | Task 3·4·5에서 KPI/레이더/모바일프레임 등 명시적으로 차별화 |
| 호버 detail 인터랙션 유지 | `ShowcaseFrame` `ToolRow`(Task 2) + 인프라 그룹의 기존 `ToolCard`(Task 6) |
