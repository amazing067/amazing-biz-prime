"use client";

import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const STEPPER = [
  { label: "인증", done: true },
  { label: "생보 조회", done: true },
  { label: "손보 조회", done: true },
  { label: "심평원", done: false, active: true },
  { label: "완료", done: false },
];

const CONTRACTS = [
  { co: "삼성생명", product: "종신 변액 5천", since: "2019-03", premium: "8.2만" },
  { co: "한화손해", product: "실손의료 4세대", since: "2023-07", premium: "1.8만" },
  { co: "DB손해", product: "치아보험 종합", since: "2022-01", premium: "0.9만" },
  { co: "현대해상", product: "운전자보험 종합", since: "2021-05", premium: "1.4만" },
  { co: "메리츠화재", product: "암보험 (갱신형)", since: "2020-11", premium: "2.0만" },
  { co: "교보생명", product: "정기 사망 5천", since: "2024-02", premium: "1.4만" },
  { co: "흥국화재", product: "실비 특약", since: "2022-09", premium: "0.6만" },
  { co: "라이나생명", product: "CI보험", since: "2019-08", premium: "1.8만" },
];

// 60 cells (12 columns x 5 years) — each cell represents a month
const TIMELINE_CELLS = Array.from({ length: 60 }, (_, i) => {
  const v = Math.sin(i * 0.5) * 0.5 + Math.cos(i * 0.9) * 0.4;
  const heat = v > 0.3 ? 3 : v > 0 ? 2 : v > -0.3 ? 1 : 0;
  return heat;
});

const HEAT_COLORS = [MOCKUP.bg2, "#cfd7eb", "#8fa3d4", "#5a8bd8"];

export default function RecordsLookup() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>통합 조회</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>김민지님</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>✓ 동의 완료</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>통합 PDF</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>약관 분석 시작</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="px-4 py-2 shrink-0 flex items-center gap-1">
        {STEPPER.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1 last:flex-none">
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded-md flex-1 border text-[10px] font-bold"
              style={{
                background: s.active ? `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)` : s.done ? "rgba(74,170,110,0.1)" : MOCKUP.bg1,
                borderColor: s.active ? MOCKUP.accent : s.done ? "rgba(74,170,110,0.3)" : MOCKUP.border,
                color: s.active ? "#fff" : s.done ? "#4aaa6e" : MOCKUP.fg3,
                boxShadow: s.active ? "0 2px 8px -2px rgba(91,91,239,0.35)" : "none",
              }}
            >
              <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px]" style={{ background: s.active ? "#fff" : s.done ? "#4aaa6e" : "transparent", color: s.active ? MOCKUP.accent : "#fff", border: !s.done && !s.active ? `1px dashed ${MOCKUP.fg3}` : "none" }}>
                {s.done ? "✓" : s.active ? "●" : ""}
              </span>
              <span className="flex-1">{s.label}</span>
            </div>
            {i < STEPPER.length - 1 && <span className="px-0.5 text-[10px]" style={{ color: MOCKUP.fg3 }}>›</span>}
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* Contracts */}
        <div className="col-span-7 rounded-lg border flex flex-col overflow-hidden min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="px-3 py-1.5 flex items-center justify-between" style={{ borderBottom: `1px solid ${MOCKUP.border}` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>가입 이력 · 생손보 32개사</div>
            <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>8건 · 월납 18.1만</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {CONTRACTS.map((c, i) => (
              <div key={c.co + c.product} className="grid grid-cols-12 items-center px-3 py-1.5 gap-1" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                <div className="col-span-1">
                  <span className="w-1 h-5 rounded-full block" style={{ background: i < 4 ? TOOL_COLOR.insurance : TOOL_COLOR.comparison }} />
                </div>
                <div className="col-span-5 min-w-0">
                  <div className="text-[10.5px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{c.co}</div>
                  <div className="text-[9px] truncate" style={{ color: MOCKUP.fg2 }}>{c.product}</div>
                </div>
                <div className="col-span-3 text-[9.5px] tabular-nums" style={{ color: MOCKUP.fg2 }}>가입 {c.since}</div>
                <div className="col-span-3 text-right text-[10.5px] font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>{c.premium}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical timeline heatmap */}
        <div className="col-span-5 rounded-lg border p-3 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>진료 내역 · 5년</div>
            <div className="flex items-center gap-0.5 text-[8.5px]" style={{ color: MOCKUP.fg2 }}>
              <span>적음</span>
              {HEAT_COLORS.map((c, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
              ))}
              <span>많음</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5 justify-center">
            {["2021", "2022", "2023", "2024", "2025"].map((yr, yi) => (
              <div key={yr} className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold tabular-nums w-8" style={{ color: MOCKUP.fg2 }}>{yr}</span>
                <div className="flex-1 grid grid-cols-12 gap-[2px]">
                  {TIMELINE_CELLS.slice(yi * 12, yi * 12 + 12).map((h, mi) => (
                    <div key={mi} className="aspect-square rounded-sm" style={{ background: HEAT_COLORS[h] }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t grid grid-cols-3 gap-1 text-[9px]" style={{ borderColor: MOCKUP.border }}>
            <div>
              <div style={{ color: MOCKUP.fg3 }}>총 진료</div>
              <div className="font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>48회</div>
            </div>
            <div>
              <div style={{ color: MOCKUP.fg3 }}>처방</div>
              <div className="font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>112건</div>
            </div>
            <div>
              <div style={{ color: MOCKUP.fg3 }}>입원</div>
              <div className="font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>2회</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
