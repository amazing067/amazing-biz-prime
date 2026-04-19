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
