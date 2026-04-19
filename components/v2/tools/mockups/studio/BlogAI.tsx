"use client";

import { MOCKUP } from "../_shared/tokens";

const TYPES = [
  { id: "info", label: "정보성", active: true, desc: "판례·약관 해설" },
  { id: "compare", label: "비교분석", desc: "상품 대비" },
  { id: "story", label: "경험담", desc: "사례 중심" },
];

const QUALITY = [
  { label: "SEO 점수", value: 92, target: 80 },
  { label: "가독성", value: 88, target: 75 },
  { label: "심의 통과", value: 100, target: 100, good: true },
  { label: "중복도", value: 2, target: 5, good: true, inv: true },
];

const QUEUE = [
  { title: "4세대 실손 청구 가이드", when: "오늘 09:00", state: "published" },
  { title: "치매 진단 후 보장 정리", when: "4월 21일 09:00", state: "scheduled" },
  { title: "운전자보험 중복 판례", when: "4월 23일 09:00", state: "scheduled" },
  { title: "암 직접지원 vs 일반", when: "4월 25일 09:00", state: "draft" },
];

export default function BlogAI() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>블로그 자동화</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>큐 12건</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>● 생성 중</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>새 초안</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>네이버 발행</span>
        </div>
      </div>

      {/* Input strip */}
      <div className="px-4 py-2 shrink-0 grid grid-cols-[1fr_auto] gap-2 items-center">
        <div className="rounded-lg border p-2 flex items-center gap-2" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
          <div className="w-10 h-10 rounded border flex items-center justify-center text-[10px]" style={{ background: MOCKUP.bg2, color: MOCKUP.fg2, borderColor: MOCKUP.border }}>IMG</div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>김민지님 보장분석 설계서.jpg</div>
            <div className="text-[9px]" style={{ color: MOCKUP.fg2 }}>OCR 완료 · 32개 담보 인식 · 금액 자동 파싱</div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>✓ 분석</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-0.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
          {TYPES.map((t) => (
            <div key={t.id} className="px-2.5 py-1 rounded-md text-center cursor-pointer" style={{ background: t.active ? MOCKUP.fg0 : "transparent", color: t.active ? "#fff" : MOCKUP.fg2 }}>
              <div className="text-[10px] font-bold">{t.label}</div>
              <div className="text-[8.5px] opacity-80">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* Generated preview */}
        <div className="col-span-7 rounded-lg border p-4 flex flex-col min-h-0 overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="flex items-center justify-between mb-2 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg2 }}>미리보기 · 정보성</div>
            <div className="flex items-center gap-1 text-[9px]" style={{ color: MOCKUP.fg3 }}>
              <span>1,248자</span>
              <span>·</span>
              <span>읽기 3분</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-[16px] font-extrabold leading-tight" style={{ color: MOCKUP.fg0 }}>
              4세대 실손의료보험 청구,<br />
              이것만 알면 <span style={{ color: MOCKUP.accent }}>보험금 놓치지 않는다</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[9.5px]" style={{ color: MOCKUP.fg2 }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: MOCKUP.fg0, color: "#fff" }}>김</span>
              <span className="font-semibold">김민지 FC</span>
              <span>·</span>
              <span>2026년 4월 19일</span>
              <span>·</span>
              <span>#실손 #청구 #4세대</span>
            </div>
            <div className="mt-3 h-px" style={{ background: MOCKUP.border }} />
            <div className="mt-3 text-[10.5px] leading-[1.7] space-y-1.5" style={{ color: MOCKUP.fg1 }}>
              <p>안녕하세요. 오늘은 4세대 실손의료보험 청구 시 자주 놓치는 3가지를 정리해드리겠습니다.</p>
              <p className="font-bold" style={{ color: MOCKUP.fg0 }}>1. 비급여 항목의 정확한 분류</p>
              <p>MRI, 초음파, 도수치료는 항목별로 자기부담률이 다르게 적용됩니다. 최근 판례(2023가합4421)에 따르면 도수치료는...</p>
              <p className="font-bold" style={{ color: MOCKUP.fg0 }}>2. 통원 청구 시 서류 체크리스트</p>
              <p>진료비 세부내역서와 납입확인서가 모두 필요합니다. 영수증만으로는 청구 반려 사례가 많아...</p>
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-2.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>품질 대시보드</div>
            <div className="grid grid-cols-2 gap-1.5">
              {QUALITY.map((q) => {
                const passing = q.inv ? q.value <= q.target : q.value >= q.target;
                return (
                  <div key={q.label} className="rounded-md p-1.5 border" style={{ background: MOCKUP.bg0, borderColor: MOCKUP.border }}>
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-semibold" style={{ color: MOCKUP.fg2 }}>{q.label}</div>
                      <span className="text-[8.5px]" style={{ color: passing ? "#4aaa6e" : "#d8a040" }}>{passing ? "✓" : "!"}</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[14px] font-extrabold tabular-nums" style={{ color: passing ? "#4aaa6e" : "#d8a040" }}>{q.value}</span>
                      {q.label !== "중복도" && <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>/ {q.target}+</span>}
                      {q.label === "중복도" && <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>%</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border flex flex-col flex-1 min-h-0 overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] flex items-center justify-between" style={{ borderBottom: `1px solid ${MOCKUP.border}`, color: MOCKUP.fg1 }}>
              <span>발행 스케줄</span>
              <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>주 2–3회</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {QUEUE.map((q, i) => (
                <div key={q.title} className="px-3 py-1.5" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full shrink-0" style={{ background: q.state === "published" ? "#4aaa6e" : q.state === "scheduled" ? MOCKUP.accent : MOCKUP.fg3 }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold truncate" style={{ color: MOCKUP.fg0 }}>{q.title}</div>
                      <div className="text-[8.5px] tabular-nums" style={{ color: MOCKUP.fg2 }}>{q.when}</div>
                    </div>
                    <span className="text-[8.5px] font-bold shrink-0" style={{ color: q.state === "published" ? "#4aaa6e" : q.state === "scheduled" ? MOCKUP.accent : MOCKUP.fg3 }}>
                      {q.state === "published" ? "발행됨" : q.state === "scheduled" ? "예약" : "초안"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
