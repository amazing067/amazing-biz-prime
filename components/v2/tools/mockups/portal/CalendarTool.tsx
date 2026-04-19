"use client";

import { Fragment } from "react";
import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const DAYS = ["월 15", "화 16", "수 17", "목 18", "금 19"];
const HOURS = ["09", "10", "11", "14", "15", "16"];

type Evt = { day: number; start: number; span: number; label: string; sub: string; color: string };
const EVENTS: Evt[] = [
  { day: 0, start: 0, span: 1, label: "TA 콜", sub: "김서연 외 8명", color: TOOL_COLOR.comparison },
  { day: 1, start: 1, span: 1, label: "1차 상담", sub: "박지훈님", color: MOCKUP.accent },
  { day: 2, start: 3, span: 2, label: "본부 교육", sub: "신상품 · 전원", color: TOOL_COLOR.insurance },
  { day: 3, start: 0, span: 1, label: "청약 미팅", sub: "정유진님", color: TOOL_COLOR.consulting },
  { day: 3, start: 4, span: 1, label: "갱신 콜", sub: "12건", color: TOOL_COLOR.disclosure },
  { day: 4, start: 2, span: 1, label: "클로징", sub: "이도현님", color: MOCKUP.accent },
  { day: 4, start: 5, span: 1, label: "회의", sub: "매니저 1:1", color: TOOL_COLOR.medical },
];

const TODAY = [
  { time: "11:00", label: "클로징 · 이도현님", tone: MOCKUP.accent },
  { time: "14:00", label: "알림톡 자동 발송 (24)", tone: TOOL_COLOR.disclosure },
  { time: "16:00", label: "매니저 1:1", tone: TOOL_COLOR.medical },
];

export default function CalendarTool() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>캘린더</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>4월 15 – 19</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {["주간", "월간", "목록"].map((v, i) => (
            <span key={v} className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: i === 0 ? MOCKUP.fg0 : MOCKUP.bg2, color: i === 0 ? "#fff" : MOCKUP.fg1 }}>
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        {/* Week grid */}
        <div className="col-span-9 rounded-lg border flex flex-col overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="grid grid-cols-[40px_repeat(5,1fr)] border-b" style={{ borderColor: MOCKUP.border }}>
            <div />
            {DAYS.map((d, i) => (
              <div key={d} className="px-2 py-1.5 text-[10px] font-bold text-center" style={{ color: i === 4 ? MOCKUP.accent : MOCKUP.fg1, background: i === 4 ? MOCKUP.accentSoft : "transparent" }}>
                {d}
                {i === 4 && <div className="text-[8px] font-medium" style={{ color: MOCKUP.accent }}>오늘</div>}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-[40px_repeat(5,1fr)] relative">
            {HOURS.map((h, hi) => (
              <Fragment key={h}>
                <div className="px-1 py-1 text-[8.5px] text-right tabular-nums" style={{ color: MOCKUP.fg3, borderTop: hi === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                  {h}
                </div>
                {DAYS.map((_, di) => (
                  <div key={`${h}-${di}`} style={{ borderTop: hi === 0 ? "none" : `1px solid ${MOCKUP.border}`, borderLeft: `1px solid ${MOCKUP.border}` }} />
                ))}
              </Fragment>
            ))}
            {/* Event blocks */}
            {EVENTS.map((e, i) => {
              const colWidth = 100 / 6; // (grid cols 40px + 5 equal fractions ≈ ignore 40px for event positioning via inline pct)
              const top = (e.start / HOURS.length) * 100;
              const height = (e.span / HOURS.length) * 100;
              const leftPct = (40 / 480) * 100; // approx offset for the 40px time column (assumes ~480px total)
              const dayWidth = (100 - leftPct) / DAYS.length;
              return (
                <div
                  key={i}
                  className="absolute rounded-md px-1.5 py-1 text-[8.5px] leading-tight overflow-hidden"
                  style={{
                    top: `${top}%`,
                    height: `calc(${height}% - 2px)`,
                    left: `calc(${leftPct}% + ${e.day * dayWidth}% + 2px)`,
                    width: `calc(${dayWidth}% - 4px)`,
                    background: e.color,
                    color: "#fff",
                    boxShadow: MOCKUP.shadowSm,
                  }}
                >
                  <div className="font-bold truncate">{e.label}</div>
                  <div className="opacity-85 truncate">{e.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: today + toggles */}
        <div className="col-span-3 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-2.5 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>오늘 할 일</div>
            <div className="flex-1 flex flex-col gap-1.5">
              {TODAY.map((t) => (
                <div key={t.time} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-1 h-6 rounded-full shrink-0" style={{ background: t.tone }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold tabular-nums" style={{ color: MOCKUP.fg1 }}>{t.time}</div>
                    <div className="truncate text-[9.5px]" style={{ color: MOCKUP.fg0 }}>{t.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: MOCKUP.border }}>
              <div className="text-[9px]" style={{ color: MOCKUP.fg2 }}>알림톡 자동 발송</div>
              <div className="w-7 h-3.5 rounded-full p-0.5" style={{ background: MOCKUP.accent }}>
                <div className="w-2.5 h-2.5 rounded-full bg-white" style={{ transform: "translateX(12px)" }} />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-2.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
            <div className="text-[9px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg2 }}>이번주 요약</div>
            <div className="grid grid-cols-3 gap-1 text-center">
              {[{ l: "콜", v: 12 }, { l: "미팅", v: 8 }, { l: "교육", v: 1 }].map((s) => (
                <div key={s.l}>
                  <div className="text-[14px] font-extrabold tabular-nums" style={{ color: MOCKUP.accent }}>{s.v}</div>
                  <div className="text-[8.5px]" style={{ color: MOCKUP.fg2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
