"use client";

import { MOCKUP } from "../_shared/tokens";

type Dot = { month: number; tone: "red" | "amber" | "grey" };
const TIMELINE: Dot[] = [
  { month: 1, tone: "grey" },  { month: 3, tone: "grey" },  { month: 6, tone: "amber" },
  { month: 9, tone: "grey" },  { month: 12, tone: "red" },  { month: 15, tone: "amber" },
  { month: 18, tone: "grey" }, { month: 21, tone: "red" },  { month: 24, tone: "grey" },
  { month: 27, tone: "grey" }, { month: 30, tone: "grey" }, { month: 33, tone: "amber" },
  { month: 36, tone: "red" },  { month: 39, tone: "grey" }, { month: 42, tone: "grey" },
  { month: 45, tone: "amber" }, { month: 48, tone: "grey" }, { month: 54, tone: "grey" },
  { month: 57, tone: "red" },  { month: 60, tone: "amber" },
];

const ITEMS = [
  { name: "고혈압", code: "I10", date: "2023-08", risk: "high", clause: "약관 §3.2 · 심뇌혈관 제한", cite: "2021가합1234" },
  { name: "갑상선 결절", code: "E04.1", date: "2022-12", risk: "high", clause: "약관 §4.1 · 종양 의심", cite: "2020다56789" },
  { name: "요통 · 디스크", code: "M51.2", date: "2024-02", risk: "mid", clause: "약관 §5.3 · 척추 관련", cite: "2023나3421" },
  { name: "위염 · 역류성", code: "K29.3", date: "2024-05", risk: "low", clause: "고지 불필요", cite: "경미" },
  { name: "알레르기 비염", code: "J30.4", date: "2025-01", risk: "low", clause: "고지 불필요", cite: "경미" },
];

const RISK_COLOR = { high: "#ef4444", mid: "#d8a040", low: "#a8a8b8" };

export default function Disclosure() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>고지의무 분석</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>김민지님 · 5년</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
            ● 고위험 2건
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>청약서 자동작성</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        <div className="col-span-7 flex flex-col gap-2 min-h-0">
          {/* Input strip */}
          <div className="rounded-lg border p-2.5 flex items-center gap-2 shrink-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px]" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>📄</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>건강보험 진료내역 · 2020-04 ~ 2025-04</div>
              <div className="text-[9.5px]" style={{ color: MOCKUP.fg2 }}>심평원 API · 진료 48건 · 처방 112건 · AI 추출 100%</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: "#4aaa6e", color: "#fff" }}>완료</span>
          </div>

          {/* Timeline */}
          <div className="rounded-lg border p-3 flex-1 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>진료 타임라인</div>
              <div className="flex items-center gap-2 text-[8.5px]" style={{ color: MOCKUP.fg2 }}>
                {[
                  { l: "고위험", c: "#ef4444" },
                  { l: "중간", c: "#d8a040" },
                  { l: "경미", c: "#a8a8b8" },
                ].map((lg) => (
                  <span key={lg.l} className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: lg.c }} /> {lg.l}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-3">
              {["2021", "2022", "2023", "2024", "2025"].map((yr, yi) => (
                <div key={yr} className="flex items-center gap-2">
                  <div className="text-[9.5px] font-bold tabular-nums w-8" style={{ color: MOCKUP.fg2 }}>{yr}</div>
                  <div className="flex-1 h-1 relative rounded-full" style={{ background: MOCKUP.bg2 }}>
                    {TIMELINE.filter((d) => Math.floor((d.month - 1) / 12) === yi).map((d, i) => {
                      const pos = ((d.month - 1) % 12) / 11;
                      return (
                        <span
                          key={i}
                          className="absolute w-2 h-2 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2"
                          style={{
                            left: `${pos * 100}%`,
                            background: d.tone === "red" ? "#ef4444" : d.tone === "amber" ? "#d8a040" : "#a8a8b8",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t text-[9px] flex items-center gap-3" style={{ borderColor: MOCKUP.border, color: MOCKUP.fg2 }}>
              <span>전체 진료 <b style={{ color: MOCKUP.fg0 }}>48회</b></span>
              <span>고위험 <b style={{ color: "#ef4444" }}>5회</b></span>
              <span>평균 간격 <b style={{ color: MOCKUP.fg0 }}>38일</b></span>
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border overflow-hidden flex flex-col flex-1 min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] flex items-center justify-between" style={{ borderBottom: `1px solid ${MOCKUP.border}`, color: MOCKUP.fg1 }}>
              <span>고지 대상 추출</span>
              <span style={{ color: MOCKUP.fg3 }}>{ITEMS.length}건</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {ITEMS.map((it, i) => (
                <div key={it.name} className="px-3 py-2 text-[10px]" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: RISK_COLOR[it.risk as keyof typeof RISK_COLOR] }} />
                      <span className="font-bold truncate" style={{ color: MOCKUP.fg0 }}>{it.name}</span>
                      <span className="text-[8.5px] tabular-nums" style={{ color: MOCKUP.fg3 }}>{it.code}</span>
                    </div>
                    <span className="text-[9px] tabular-nums shrink-0" style={{ color: MOCKUP.fg2 }}>{it.date}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[9px]" style={{ color: MOCKUP.fg2 }}>
                    <span>{it.clause}</span>
                    <span style={{ color: MOCKUP.fg3 }}>·</span>
                    <span className="italic">{it.cite}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 shrink-0">
            <div className="rounded-lg border-l-[3px] border p-2 text-[9.5px] leading-snug" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, borderLeftColor: "#ef4444", borderLeftWidth: 3 }}>
              <div className="font-bold" style={{ color: MOCKUP.fg0 }}>가입거절 리스크 2건</div>
              <div style={{ color: MOCKUP.fg2 }}>고혈압 · 갑상선 결절</div>
            </div>
            <div className="rounded-lg border-l-[3px] border p-2 text-[9.5px] leading-snug" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, borderLeftColor: "#d8a040", borderLeftWidth: 3 }}>
              <div className="font-bold" style={{ color: MOCKUP.fg0 }}>해지 리스크 1건</div>
              <div style={{ color: MOCKUP.fg2 }}>척추 · 미고지 시 해지</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
