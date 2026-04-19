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
