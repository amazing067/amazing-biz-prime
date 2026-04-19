"use client";

import { MOCKUP } from "../_shared/tokens";

const DAYS = Array.from({ length: 19 }, (_, i) => {
  const heights = [32, 45, 28, 52, 38, 0, 0, 48, 62, 41, 55, 70, 48, 0, 0, 58, 72, 48, 85];
  return { d: i + 1, h: heights[i] ?? 0, isToday: i === 18 };
});

const GOALS = [
  { label: "월납 목표", target: "15억", actual: "12.4억", pct: 82 },
  { label: "계약 건수", target: "30건", actual: "18건", pct: 60 },
  { label: "신규 고객", target: "40명", actual: "32명", pct: 80 },
  { label: "상담 완료", target: "60건", actual: "54건", pct: 90 },
];

const CATEGORIES = [
  { name: "생명보험", val: "6.8억", pct: 72, color: "#8577d1" },
  { name: "손해보험", val: "4.2억", pct: 58, color: "#5a8bd8" },
  { name: "연금·변액", val: "1.4억", pct: 42, color: "#4aaa6e" },
];

export default function Performance() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span style={{ color: MOCKUP.fg2 }}>실적</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>김민지 FC · 4월</span>
          <span className="ml-1.5 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>▲ +18% vs 3월</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>4월 ▾</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>PDF 출력</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        {/* Progress ring */}
        <div className="col-span-4 rounded-lg border p-3 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(160px 120px at 50% 0%, ${MOCKUP.accentSoft}, transparent 70%)` }} />
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke={MOCKUP.bg2} strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={MOCKUP.accent} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42 * 0.78} ${2 * Math.PI * 42}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[24px] font-extrabold leading-none tabular-nums" style={{ color: MOCKUP.accent }}>78<span className="text-[14px]">%</span></div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.06em]" style={{ color: MOCKUP.fg2 }}>목표 달성</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-[14px] font-bold" style={{ color: MOCKUP.fg0 }}>월납 12.4억 / 15억</div>
            <div className="text-[10px]" style={{ color: MOCKUP.fg2 }}>남은 영업일 6일 · 일평균 4,300만 필요</div>
          </div>
        </div>

        {/* Daily bar chart */}
        <div className="col-span-8 rounded-lg border p-3 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>일자별 계약 (4월)</div>
            <span className="text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>누적 12.4억 · 18건</span>
          </div>
          <div className="flex-1 flex items-end gap-0.5 pb-2 relative">
            <div className="absolute left-0 right-0" style={{ bottom: "50%", height: 1, background: MOCKUP.bg3, borderTop: `1px dashed ${MOCKUP.fg3}` }} />
            {DAYS.map((d) => (
              <div key={d.d} className="flex-1 flex flex-col items-center justify-end h-full gap-0.5">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${Math.max(d.h, 2)}%`,
                    background: d.h === 0 ? MOCKUP.bg2 : d.isToday ? `linear-gradient(180deg, ${MOCKUP.accent}, #4747d6)` : MOCKUP.fg3,
                    opacity: d.h === 0 ? 0.4 : 1,
                  }}
                />
                {(d.d % 5 === 1 || d.isToday) && (
                  <div className="text-[8px] tabular-nums" style={{ color: d.isToday ? MOCKUP.accent : MOCKUP.fg3, fontWeight: d.isToday ? 700 : 500 }}>
                    {d.d}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Goals table */}
        <div className="col-span-7 rounded-lg border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] border-b" style={{ color: MOCKUP.fg1, borderColor: MOCKUP.border }}>목표 대비 실적</div>
          <div className="flex flex-col">
            {GOALS.map((g, i) => (
              <div key={g.label} className="grid grid-cols-12 items-center px-3 py-1.5 gap-2" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                <div className="col-span-3 text-[10.5px] font-medium" style={{ color: MOCKUP.fg1 }}>{g.label}</div>
                <div className="col-span-5 relative h-2 rounded-full" style={{ background: MOCKUP.bg2 }}>
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${g.pct}%`, background: g.pct >= 90 ? "#4aaa6e" : MOCKUP.accent }} />
                </div>
                <div className="col-span-2 text-right text-[10px] tabular-nums font-bold" style={{ color: MOCKUP.fg0 }}>{g.actual}</div>
                <div className="col-span-2 text-right text-[9px] tabular-nums" style={{ color: MOCKUP.fg3 }}>/ {g.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="col-span-5 rounded-lg border p-3 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>분야별 실적</div>
          <div className="flex-1 flex flex-col gap-1.5 justify-around">
            {CATEGORIES.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5 font-semibold" style={{ color: MOCKUP.fg0 }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} /> {c.name}
                  </span>
                  <span className="tabular-nums font-bold">{c.val}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full" style={{ background: MOCKUP.bg2 }}>
                  <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
