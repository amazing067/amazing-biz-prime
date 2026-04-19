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

type Item = {
  name: string;
  code: string;
  date: string;
  rule: "3년" | "1년" | "5년" | "불필요";
  risk: "high" | "mid" | "none";
};

const ITEMS: Item[] = [
  { name: "고혈압", code: "I10 · 투약중", date: "2023-08", rule: "3년", risk: "high" },
  { name: "갑상선 결절", code: "E04 · 추적관찰", date: "2022-12", rule: "5년", risk: "high" },
  { name: "요통 · 디스크", code: "M51 · 물리치료", date: "2024-02", rule: "1년", risk: "mid" },
  { name: "위염 · 역류성", code: "K29 · 14일 투약", date: "2024-05", rule: "불필요", risk: "none" },
  { name: "알레르기 비염", code: "J30 · 경미", date: "2025-01", rule: "불필요", risk: "none" },
];

const RULE_TONE: Record<Item["rule"], { bg: string; fg: string; label: string }> = {
  "3년": { bg: "rgba(239,68,68,0.12)", fg: "#ef4444", label: "3년" },
  "5년": { bg: "rgba(239,68,68,0.12)", fg: "#ef4444", label: "5년" },
  "1년": { bg: "rgba(216,160,64,0.14)", fg: "#d8a040", label: "1년" },
  "불필요": { bg: "rgba(74,170,110,0.12)", fg: "#4aaa6e", label: "✓" },
};

type Grade = "표준체" | "할증" | "부담보" | "거절" | "우량";
const GRADE_STYLE: Record<Grade, { bg: string; fg: string; dot: string }> = {
  표준체: { bg: "rgba(74,170,110,0.14)", fg: "#3d8f5e", dot: "#4aaa6e" },
  우량: { bg: "rgba(91,91,239,0.12)", fg: "#5b5bef", dot: "#5b5bef" },
  할증: { bg: "rgba(216,160,64,0.16)", fg: "#b88528", dot: "#d8a040" },
  부담보: { bg: "rgba(216,160,64,0.16)", fg: "#b88528", dot: "#d8a040" },
  거절: { bg: "rgba(239,68,68,0.14)", fg: "#dc2626", dot: "#ef4444" },
};

const UNDERWRITING: { product: string; co: string; grade: Grade; note: string; premium?: string }[] = [
  { product: "종신 5천만", co: "삼성생명", grade: "할증", note: "고혈압 · +15%", premium: "9.4만" },
  { product: "정기 사망 1억", co: "교보생명", grade: "표준체", note: "3년 기준 통과", premium: "1.4만" },
  { product: "실손 4세대", co: "한화손해", grade: "부담보", note: "갑상선 · 척추 제외", premium: "1.8만" },
  { product: "암보험 (진단)", co: "메리츠화재", grade: "거절", note: "갑상선 결절 심층검사 필요", premium: "—" },
  { product: "운전자보험", co: "현대해상", grade: "표준체", note: "질병 영향 없음", premium: "1.4만" },
];

export default function Disclosure() {
  const needCount = ITEMS.filter((i) => i.rule !== "불필요").length;
  const noNeedCount = ITEMS.filter((i) => i.rule === "불필요").length;
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>고지의무 분석</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>김민지님 · 5년 · 3·1·5 룰</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
            ● 고지 대상 {needCount}건
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>청약서 자동작성</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        {/* LEFT */}
        <div className="col-span-7 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-2 flex items-center gap-2 shrink-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px]" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>📄</span>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>건강보험 진료내역 · 2020-04 ~ 2025-04</div>
              <div className="text-[9px]" style={{ color: MOCKUP.fg2 }}>심평원 API · 진료 48건 · 처방 112건 · 입원 2회</div>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: "#4aaa6e", color: "#fff" }}>완료</span>
          </div>

          {/* Timeline */}
          <div className="rounded-lg border p-2.5 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-1.5 shrink-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>진료 타임라인</div>
              <div className="flex items-center gap-1.5 text-[8.5px]" style={{ color: MOCKUP.fg2 }}>
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
            <div className="flex-1 flex flex-col justify-center gap-1.5">
              {["2021", "2022", "2023", "2024", "2025"].map((yr, yi) => (
                <div key={yr} className="flex items-center gap-1.5">
                  <div className="text-[9px] font-bold tabular-nums w-7" style={{ color: MOCKUP.fg2 }}>{yr}</div>
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
          </div>

          {/* 3·1·5 rule strip */}
          <div className="rounded-lg border p-2 shrink-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>3·1·5 고지 룰 체크</div>
              <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>표준 약관 기준</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { k: "3년", sub: "진단·치료·투약", count: 2, tone: "#ef4444" },
                { k: "1년", sub: "검사·정밀검사", count: 1, tone: "#d8a040" },
                { k: "5년", sub: "입원·수술·7일+", count: 1, tone: "#ef4444" },
              ].map((r) => (
                <div key={r.k} className="rounded-md p-1.5 border flex items-center gap-1.5" style={{ background: MOCKUP.bg0, borderColor: MOCKUP.border }}>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded text-[11px] font-extrabold shrink-0" style={{ background: r.tone + "22", color: r.tone }}>
                    {r.k}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[9px]" style={{ color: MOCKUP.fg2 }}>{r.sub}</div>
                    <div className="text-[10.5px] font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>{r.count}건 해당</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border overflow-hidden shrink-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.08em] flex items-center justify-between" style={{ borderBottom: `1px solid ${MOCKUP.border}`, color: MOCKUP.fg1 }}>
              <span>고지 대상 추출</span>
              <span style={{ color: MOCKUP.fg3 }}>
                <span style={{ color: "#ef4444" }}>필요 {needCount}</span> · <span style={{ color: "#4aaa6e" }}>불필요 {noNeedCount}</span>
              </span>
            </div>
            {ITEMS.map((it, i) => {
              const tone = RULE_TONE[it.rule];
              return (
                <div key={it.name} className="px-2.5 py-1 text-[10px]" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span
                        className="inline-flex items-center justify-center h-4 rounded text-[9px] font-bold shrink-0 px-1.5"
                        style={{ background: tone.bg, color: tone.fg, minWidth: 26 }}
                      >
                        {tone.label}
                      </span>
                      <span className="font-bold truncate" style={{ color: it.risk === "none" ? MOCKUP.fg2 : MOCKUP.fg0 }}>{it.name}</span>
                      <span className="text-[8.5px] truncate" style={{ color: MOCKUP.fg3 }}>{it.code}</span>
                    </div>
                    <span className="text-[9px] tabular-nums shrink-0" style={{ color: MOCKUP.fg3 }}>{it.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Underwriting matrix */}
          <div className="rounded-lg border flex-1 flex flex-col min-h-0 overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="px-2.5 py-1.5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)`, color: "#fff" }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.08em] flex items-center gap-1.5">
                <span>✦</span> 가입 가능 상품 · AI 심사
              </div>
              <span className="text-[9px] opacity-85">5개 시뮬레이션</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {UNDERWRITING.map((u, i) => {
                const gs = GRADE_STYLE[u.grade];
                return (
                  <div
                    key={u.product}
                    className="grid grid-cols-12 items-center px-2.5 py-1.5 gap-1"
                    style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}
                  >
                    <div className="col-span-5 min-w-0">
                      <div className="text-[10px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{u.product}</div>
                      <div className="text-[8.5px] truncate" style={{ color: MOCKUP.fg2 }}>{u.co}</div>
                    </div>
                    <div className="col-span-4 flex items-center">
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold"
                        style={{ background: gs.bg, color: gs.fg }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: gs.dot }} />
                        {u.grade}
                      </span>
                    </div>
                    <div className="col-span-3 text-right">
                      {u.premium && u.premium !== "—" ? (
                        <div className="text-[10px] font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>{u.premium}</div>
                      ) : (
                        <div className="text-[9px] font-semibold" style={{ color: "#ef4444" }}>가입불가</div>
                      )}
                      <div className="text-[8px] truncate" style={{ color: MOCKUP.fg3 }}>{u.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-2.5 py-1 text-[8.5px] flex items-center justify-between" style={{ background: MOCKUP.bg0, borderTop: `1px solid ${MOCKUP.border}` }}>
              <span style={{ color: MOCKUP.fg2 }}>표준체 2 · 할증 1 · 부담보 1 · 거절 1</span>
              <span className="font-bold" style={{ color: MOCKUP.accent }}>최적 포트폴리오 제안 ›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
