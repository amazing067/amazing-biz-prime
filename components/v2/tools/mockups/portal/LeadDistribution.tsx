"use client";

import { MOCKUP } from "../_shared/tokens";

const STATS = [
  { label: "대기", value: "142", tone: MOCKUP.fg2 },
  { label: "분배중", value: "87", tone: MOCKUP.accent },
  { label: "클로징", value: "31", tone: "#4aaa6e" },
  { label: "종료", value: "18", tone: MOCKUP.fg3 },
];

const FCS = [
  { name: "박지훈 FC", stage: 3, count: 28, conv: 24, hot: true },
  { name: "김민지 FC", stage: 2, count: 21, conv: 18 },
  { name: "이서윤 FC", stage: 2, count: 19, conv: 21 },
  { name: "정태현 FC", stage: 1, count: 15, conv: 12 },
  { name: "최예린 FC", stage: 1, count: 12, conv: 9 },
  { name: "한승우 FC", stage: 0, count: 8, conv: 5 },
];

const RULES = [
  { name: "자동 라운드로빈", on: true, sub: "FC당 균등 배정" },
  { name: "등급 우선", on: true, sub: "VIP → A → B → C" },
  { name: "지역 매칭", on: true, sub: "동일 시·구 우선" },
  { name: "재배정 임계", on: false, sub: "48h 무응답 시" },
];

export default function LeadDistribution() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}
    >
      <div
        className="flex items-center px-4 h-9 border-b shrink-0"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>DB 분배 센터</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>
            본부 풀 · 248건
          </span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(216,160,64,0.14)", color: "#d8a040" }}>
            ⚠ 중복 12
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px]" style={{ color: MOCKUP.fg3 }}>동기화 1분 전</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, color: MOCKUP.fg1, borderColor: MOCKUP.border }}>
            엑셀 업로드
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: MOCKUP.bg1 }}>
            분배 시작
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 px-4 py-2 shrink-0">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg p-2 border flex items-center justify-between" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.06em]" style={{ color: MOCKUP.fg2 }}>{s.label}</div>
              <div className="text-[18px] font-extrabold leading-none mt-1 tabular-nums" style={{ color: s.tone }}>{s.value}</div>
            </div>
            <div className="w-1 h-8 rounded-full" style={{ background: s.tone }} />
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        <div
          className="col-span-8 rounded-lg border flex flex-col min-h-0 overflow-hidden"
          style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
        >
          <div className="grid grid-cols-12 px-3 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.06em]" style={{ background: MOCKUP.bg0, color: MOCKUP.fg2, borderBottom: `1px solid ${MOCKUP.border}` }}>
            <div className="col-span-4">FC</div>
            <div className="col-span-4">진행 단계</div>
            <div className="col-span-2 text-right">배정</div>
            <div className="col-span-2 text-right">전환율</div>
          </div>
          <div className="flex-1 flex flex-col">
            {FCS.map((f, i) => (
              <div key={f.name} className="grid grid-cols-12 items-center px-3 py-2 gap-2" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: f.hot ? MOCKUP.accent : MOCKUP.bg2, color: f.hot ? "#fff" : MOCKUP.fg1 }}>
                    {f.name[0]}
                  </span>
                  <span className="text-[10.5px] font-semibold truncate" style={{ color: MOCKUP.fg0 }}>{f.name}</span>
                  {f.hot && <span className="text-[8px]" style={{ color: MOCKUP.accent }}>🔥</span>}
                </div>
                <div className="col-span-4 flex items-center gap-1">
                  {["TA", "1차", "2차", "클로"].map((label, idx) => (
                    <div
                      key={label}
                      className="flex-1 h-1.5 rounded-full"
                      style={{ background: idx <= f.stage ? MOCKUP.accent : MOCKUP.bg2 }}
                    />
                  ))}
                </div>
                <div className="col-span-2 text-right text-[10px] font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>{f.count}</div>
                <div className="col-span-2 text-right text-[10px] font-bold tabular-nums" style={{ color: f.conv >= f.count ? "#4aaa6e" : MOCKUP.fg1 }}>{Math.round((f.conv / Math.max(f.count, 1)) * 100)}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-3 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: MOCKUP.fg1 }}>분배 규칙</div>
            <div className="flex-1 flex flex-col gap-2 justify-around">
              {RULES.map((r) => (
                <div key={r.name} className="flex items-center gap-2">
                  <div className="w-7 h-3.5 rounded-full p-0.5 shrink-0" style={{ background: r.on ? MOCKUP.accent : MOCKUP.bg3 }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white transition-transform" style={{ transform: r.on ? "translateX(12px)" : "translateX(0)" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold" style={{ color: MOCKUP.fg0 }}>{r.name}</div>
                    <div className="text-[8.5px]" style={{ color: MOCKUP.fg2 }}>{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-l-[3px] border p-2.5 flex items-center gap-2" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, borderLeftColor: "#d8a040", borderLeftWidth: 3 }}>
            <span className="text-[12px]">⚠</span>
            <div className="text-[9.5px] leading-snug">
              <span className="font-bold" style={{ color: MOCKUP.fg0 }}>중복 리드 12건</span>
              <span style={{ color: MOCKUP.fg2 }}> · 같은 번호 자동 병합 가능</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
