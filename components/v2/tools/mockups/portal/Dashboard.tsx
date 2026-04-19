"use client";

import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const KPIS = [
  { label: "업로드", value: "142", sub: "+18 today" },
  { label: "배정", value: "87", sub: "61% 진도" },
  { label: "상담중", value: "31", sub: "TA·1·2차" },
  { label: "계약", value: "18", sub: "월 목표 92%" },
  { label: "월납", value: "12.4억", sub: "본부 합계", accent: true },
];

const MONTHS = [
  { m: "1월", current: 42, target: 60 },
  { m: "2월", current: 58, target: 60 },
  { m: "3월", current: 71, target: 65 },
  { m: "4월", current: 92, target: 70, active: true },
];

const RANK = [
  { name: "박지훈 FC", val: "2.8억", pct: 100, badge: "🏆" },
  { name: "김민지 FC", val: "2.1억", pct: 75 },
  { name: "이서윤 FC", val: "1.9억", pct: 68 },
  { name: "정태현 FC", val: "1.4억", pct: 50 },
  { name: "최예린 FC", val: "1.1억", pct: 39 },
];

const FEED = [
  { time: "09:42", who: "김민지", what: "삼성생명 종신 1억 계약 클로징", tone: TOOL_COLOR.consulting },
  { time: "09:21", who: "박지훈", what: "DB 신규 12건 자동 배정 완료", tone: MOCKUP.accent },
  { time: "08:55", who: "AI", what: "이서윤 고객 보장분석 PDF 생성", tone: TOOL_COLOR.coaching },
  { time: "08:30", who: "정태현", what: "한화 실손 갱신 알림톡 발송", tone: TOOL_COLOR.disclosure },
];

export default function Dashboard() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}
    >
      {/* Topbar */}
      <div
        className="flex items-center px-4 h-9 border-b shrink-0"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>대시보드</span>
          <span
            className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold"
            style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}
          >
            서울 본부 ▾
          </span>
          <span
            className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold"
            style={{ background: "rgba(74,170,110,0.12)", color: "#4aaa6e" }}
          >
            ● LIVE
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px]" style={{ color: MOCKUP.fg3 }}>4월 19일 (금)</span>
          <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px]" style={{ background: MOCKUP.bg2 }}>
            🔔
            <span className="absolute -top-px -right-px w-1.5 h-1.5 rounded-full" style={{ background: "#ef4444" }} />
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: MOCKUP.bg1 }}>+ 신규</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-5 gap-1.5 px-4 py-2 shrink-0">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-lg p-2 border"
            style={{
              background: k.accent ? `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)` : MOCKUP.bg1,
              borderColor: k.accent ? MOCKUP.accent : MOCKUP.border,
              color: k.accent ? "#fff" : MOCKUP.fg0,
              boxShadow: k.accent ? "0 4px 14px -4px rgba(91,91,239,0.4)" : MOCKUP.shadowSm,
            }}
          >
            <div className="text-[9px] font-semibold opacity-80 uppercase tracking-[0.06em]">{k.label}</div>
            <div className="text-[18px] font-extrabold leading-none mt-1 tabular-nums">{k.value}</div>
            <div className="text-[8.5px] opacity-75 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* Bar chart */}
        <div
          className="col-span-8 rounded-lg border p-3 flex flex-col min-h-0"
          style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
        >
          <div className="flex items-center justify-between mb-2 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>본부 월간 실적</div>
            <div className="flex items-center gap-2 text-[9px]" style={{ color: MOCKUP.fg2 }}>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm" style={{ background: MOCKUP.accent }} /> 실적
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-px" style={{ background: MOCKUP.fg3, height: 2 }} /> 목표
              </span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-3 items-end pb-2">
            {MONTHS.map((m) => (
              <div key={m.m} className="flex flex-col items-center justify-end h-full relative">
                <div className="absolute left-0 right-0" style={{ bottom: `${m.target * 0.6}%`, height: 1, background: MOCKUP.fg3 }} />
                <div
                  className="w-full rounded-t-md relative"
                  style={{
                    height: `${m.current * 0.7}%`,
                    background: m.active ? `linear-gradient(180deg, ${MOCKUP.accent}, #4747d6)` : MOCKUP.bg3,
                    boxShadow: m.active ? "0 4px 12px -2px rgba(91,91,239,0.3)" : "none",
                  }}
                >
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold tabular-nums whitespace-nowrap"
                    style={{ color: m.active ? MOCKUP.accent : MOCKUP.fg2 }}
                  >
                    {m.current}건
                  </div>
                </div>
                <div className="text-[10px] mt-1.5 font-semibold" style={{ color: m.active ? MOCKUP.fg0 : MOCKUP.fg2 }}>
                  {m.m}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FC ranking */}
        <div
          className="col-span-4 rounded-lg border p-3 flex flex-col min-h-0"
          style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: MOCKUP.fg1 }}>FC 랭킹 · 4월</div>
          <div className="flex-1 flex flex-col gap-1.5 justify-around">
            {RANK.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2">
                <span className="text-[9px] font-bold tabular-nums w-3 text-center" style={{ color: i === 0 ? MOCKUP.accent : MOCKUP.fg3 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="truncate font-semibold" style={{ color: MOCKUP.fg0 }}>
                      {r.name} {r.badge}
                    </span>
                    <span className="font-bold tabular-nums" style={{ color: MOCKUP.fg1 }}>{r.val}</span>
                  </div>
                  <div className="h-1 rounded-full mt-1" style={{ background: MOCKUP.bg2 }}>
                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: i === 0 ? MOCKUP.accent : MOCKUP.fg2 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div
          className="col-span-12 rounded-lg border px-3 py-2"
          style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>실시간 활동</div>
            <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>최근 1시간 · 24건</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {FEED.map((f) => (
              <div key={f.time} className="flex items-start gap-1.5 text-[9.5px]">
                <span className="w-1 h-3 rounded-full mt-0.5 shrink-0" style={{ background: f.tone }} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold tabular-nums" style={{ color: MOCKUP.fg2 }}>{f.time}</span>
                    <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>{f.who}</span>
                  </div>
                  <div className="truncate leading-snug" style={{ color: MOCKUP.fg1 }}>{f.what}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
