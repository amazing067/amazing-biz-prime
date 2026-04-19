"use client";

import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const CATEGORIES = [
  { label: "전체", active: true, count: 248 },
  { label: "보장분석", count: 82, color: TOOL_COLOR.comparison },
  { label: "청구", count: 54, color: TOOL_COLOR.medical },
  { label: "판례", count: 38, color: TOOL_COLOR.insurance },
  { label: "사례", count: 42, color: TOOL_COLOR.consulting },
  { label: "뉴스", count: 32, color: TOOL_COLOR.disclosure },
];

const CARDS = [
  { title: "4세대 실손 청구 가이드 (2026)", cat: "청구", color: TOOL_COLOR.medical, date: "4월 19일", views: "1,248", reads: "3분" },
  { title: "치매 진단 후 보장 정리 케이스", cat: "사례", color: TOOL_COLOR.consulting, date: "4월 17일", views: "892", reads: "5분" },
  { title: "운전자보험 중복 판례 (2023가합4421)", cat: "판례", color: TOOL_COLOR.insurance, date: "4월 14일", views: "614", reads: "6분" },
  { title: "암 직접지원 vs 일반형 비교", cat: "보장분석", color: TOOL_COLOR.comparison, date: "4월 10일", views: "2,108", reads: "4분" },
];

const TAGS = ["#실손4세대", "#보장분석", "#치매보험", "#청구거절", "#판례", "#암보험", "#갱신형", "#종신보험"];

const COMMENTS = [
  { who: "박*영", text: "이거 진짜 도움됐어요. 청구 서류가 다르다는 걸 처음 알았네요.", time: "2시간 전" },
  { who: "이*현", text: "판례 부분 너무 명쾌하게 정리해주셨어요.", time: "5시간 전" },
  { who: "정*진", text: "암 직접지원형 처음 들어봤는데 알아봐야겠어요.", time: "8시간 전" },
];

export default function BlogPlatform() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="font-extrabold" style={{ color: MOCKUP.fg0 }}>amazingbiz.kr</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg1 }}>블로그</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>전체 248</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>● 구독자 4,820</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="rounded-md px-2 py-0.5 text-[10px] flex items-center gap-1" style={{ background: MOCKUP.bg2, color: MOCKUP.fg2 }}>
            🔍 검색
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>구독</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 py-2 shrink-0 flex items-center gap-1 overflow-hidden">
        {CATEGORIES.map((c) => (
          <div key={c.label} className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px]" style={{ background: c.active ? MOCKUP.fg0 : MOCKUP.bg1, color: c.active ? "#fff" : MOCKUP.fg1, border: `1px solid ${c.active ? MOCKUP.fg0 : MOCKUP.border}` }}>
            {c.color && <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />}
            <span className="font-semibold">{c.label}</span>
            <span className="tabular-nums text-[9px] opacity-70">{c.count}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* Hero + cards */}
        <div className="col-span-8 flex flex-col gap-2 min-h-0">
          {/* Hero */}
          <div className="rounded-xl border p-3 flex items-center gap-3 shrink-0 overflow-hidden relative" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowMd }}>
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `radial-gradient(200px 100px at 90% 0%, ${MOCKUP.accentSoft}, transparent 70%)` }} />
            <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 relative" style={{ background: `linear-gradient(135deg, ${MOCKUP.accent}, #7c3aed)`, color: "#fff" }}>
              <span className="text-[20px]">✦</span>
            </div>
            <div className="flex-1 min-w-0 relative">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.06em]" style={{ color: MOCKUP.accent }}>
                <span>오늘의 추천</span>
                <span style={{ color: MOCKUP.fg3 }}>·</span>
                <span style={{ color: MOCKUP.fg2 }}>보장분석</span>
              </div>
              <div className="text-[14px] font-extrabold leading-tight mt-0.5" style={{ color: MOCKUP.fg0 }}>
                4세대 실손 청구, 이것만 알면 보험금 놓치지 않는다
              </div>
              <div className="text-[9.5px] mt-1" style={{ color: MOCKUP.fg2 }}>
                김민지 FC · 4월 19일 · 읽기 3분 · <span className="font-bold" style={{ color: MOCKUP.fg1 }}>1,248회</span>
              </div>
            </div>
          </div>

          {/* Card grid 2x2 */}
          <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
            {CARDS.map((c) => (
              <div key={c.title} className="rounded-lg border p-2.5 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
                <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.06em]">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                  <span style={{ color: c.color }}>{c.cat}</span>
                </div>
                <div className="text-[11.5px] font-bold leading-tight mt-1 line-clamp-2" style={{ color: MOCKUP.fg0 }}>{c.title}</div>
                <div className="mt-auto pt-2 flex items-center justify-between text-[9px]" style={{ color: MOCKUP.fg2 }}>
                  <span className="tabular-nums">{c.date}</span>
                  <span className="flex items-center gap-1.5">
                    <span>👁 {c.views}</span>
                    <span>· {c.reads}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-2.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>인기 태그</div>
            <div className="flex flex-wrap gap-1">
              {TAGS.map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-2.5 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>최근 댓글</div>
            <div className="flex-1 flex flex-col gap-1.5 justify-around">
              {COMMENTS.map((c, i) => (
                <div key={i} className="text-[9.5px] leading-snug">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: MOCKUP.bg3, color: MOCKUP.fg1 }}>{c.who[0]}</span>
                    <span className="font-bold" style={{ color: MOCKUP.fg0 }}>{c.who}</span>
                    <span className="text-[8.5px]" style={{ color: MOCKUP.fg3 }}>{c.time}</span>
                  </div>
                  <div className="mt-0.5 line-clamp-2" style={{ color: MOCKUP.fg1 }}>{c.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-2.5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)`, color: "#fff", boxShadow: "0 4px 12px -2px rgba(91,91,239,0.4)" }}>
            <div>
              <div className="text-[9px] opacity-85 font-medium uppercase tracking-[0.06em]">이번 주 조회</div>
              <div className="text-[16px] font-extrabold leading-none mt-0.5 tabular-nums">12,480</div>
            </div>
            <div className="text-[10px] font-bold opacity-90">▲ +34%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
