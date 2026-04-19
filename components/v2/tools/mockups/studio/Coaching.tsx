"use client";

import { MOCKUP } from "../_shared/tokens";

const STAGES = [
  { label: "TA", done: true },
  { label: "1차", done: true, active: true },
  { label: "2차", done: false },
  { label: "클로징", done: false },
];

const CHAT = [
  { who: "고객", text: "보험이 너무 많은 것 같은데요, 이미 한화에서 들어둔 게 있어서...", time: "14:02" },
  { who: "ai", text: "기존 보장과 겹치지 않도록 GAP 분석 먼저 해드릴게요. 실손·암·사망 세 영역만 빠르게 보시겠어요?", time: "14:02" },
  { who: "고객", text: "네, 근데 매달 나가는 돈이 부담스러워요. 솔직히 필요한 건지도 모르겠고.", time: "14:03" },
  { who: "ai", text: "월납 부담은 충분히 공감해요. 다만 지금 계약 중 2건은 중복이라 오히려 3.4만 줄일 수 있습니다. 보여드릴까요?", time: "14:03" },
  { who: "고객", text: "정말요? 어떻게 줄인다는 거죠?", time: "14:04" },
];

const METRICS = [
  { label: "말하기 비율", value: "65%", ideal: "60–70%", good: true },
  { label: "질문 횟수", value: "8회", ideal: "10+", good: false },
  { label: "반론 처리", value: "78점", ideal: "75+", good: true },
  { label: "고객 발화 길이", value: "평균 14초", ideal: "12+", good: true },
];

const SCRIPTS = [
  { title: "월납 부담 → GAP 분석 피벗", hot: true },
  { title: "중복 보장 발견 시 3단계 구조" },
  { title: "감정 공감 → 수치 제시" },
];

export default function Coaching() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>세일즈 코칭</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>김민지 FC · 시뮬 3회차</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>● 실시간</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>녹음 업로드</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>피드백 리포트</span>
        </div>
      </div>

      {/* Stage stepper */}
      <div className="flex items-center gap-1 px-4 py-2 shrink-0">
        {STAGES.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded-md flex-1 border text-[10px] font-bold"
              style={{
                background: s.active ? `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)` : s.done ? MOCKUP.bg2 : MOCKUP.bg1,
                borderColor: s.active ? MOCKUP.accent : MOCKUP.border,
                color: s.active ? "#fff" : s.done ? MOCKUP.fg1 : MOCKUP.fg3,
                boxShadow: s.active ? "0 2px 8px -2px rgba(91,91,239,0.35)" : "none",
              }}
            >
              <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px]" style={{ background: s.active ? "#fff" : s.done ? "#4aaa6e" : "transparent", color: s.active ? MOCKUP.accent : "#fff", border: !s.done && !s.active ? `1px dashed ${MOCKUP.fg3}` : "none" }}>
                {s.done && !s.active ? "✓" : s.active ? "●" : ""}
              </span>
              <span className="flex-1">{s.label} 상담</span>
            </div>
            {i < STAGES.length - 1 && <span className="px-0.5 text-[10px]" style={{ color: MOCKUP.fg3 }}>›</span>}
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* Chat */}
        <div className="col-span-7 rounded-lg border p-2.5 flex flex-col overflow-hidden min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="flex items-center justify-between mb-1.5 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>대화 시뮬 · 1차</div>
            <span className="text-[9px] tabular-nums" style={{ color: MOCKUP.fg3 }}>14:02–14:08</span>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col gap-1.5 justify-end">
            {CHAT.map((m, i) => {
              const isAi = m.who === "ai";
              return (
                <div key={i} className={`flex items-start gap-1.5 ${isAi ? "flex-row-reverse" : ""}`}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: isAi ? MOCKUP.accent : MOCKUP.bg3, color: isAi ? "#fff" : MOCKUP.fg1 }}>
                    {isAi ? "AI" : "고"}
                  </span>
                  <div className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-[10.5px] leading-snug ${isAi ? "rounded-tr-sm" : "rounded-tl-sm"}`} style={{ background: isAi ? MOCKUP.accentSoft : MOCKUP.bg2, color: MOCKUP.fg0 }}>
                    {m.text}
                    <div className="text-[8px] mt-0.5 tabular-nums" style={{ color: MOCKUP.fg3 }}>{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-2.5" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>진단 지표</div>
            <div className="grid grid-cols-2 gap-1.5">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-md p-1.5 border" style={{ background: MOCKUP.bg0, borderColor: MOCKUP.border }}>
                  <div className="text-[9px] font-semibold" style={{ color: MOCKUP.fg2 }}>{m.label}</div>
                  <div className="flex items-baseline justify-between gap-1 mt-0.5">
                    <div className="text-[13px] font-extrabold tabular-nums" style={{ color: m.good ? "#4aaa6e" : "#d8a040" }}>{m.value}</div>
                    <div className="text-[8px]" style={{ color: MOCKUP.fg3 }}>권장 {m.ideal}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-2.5 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>추천 스크립트</div>
            <div className="flex-1 flex flex-col gap-1 justify-around">
              {SCRIPTS.map((s) => (
                <div key={s.title} className="flex items-center gap-2 px-2 py-1.5 rounded-md" style={{ background: s.hot ? MOCKUP.accentSoft : MOCKUP.bg0 }}>
                  <span className="w-1 h-5 rounded-full shrink-0" style={{ background: s.hot ? MOCKUP.accent : MOCKUP.fg3 }} />
                  <span className="text-[10.5px] flex-1 truncate font-medium" style={{ color: s.hot ? MOCKUP.accent : MOCKUP.fg1 }}>{s.title}</span>
                  <span className="text-[10px]" style={{ color: MOCKUP.fg3 }}>›</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-l-[3px] border p-2 text-[9.5px] leading-snug" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, borderLeftColor: "#d8a040", borderLeftWidth: 3 }}>
            <span className="font-bold" style={{ color: MOCKUP.fg0 }}>질문 빈도 +20% 권장</span>
            <span style={{ color: MOCKUP.fg2 }}> · 고객이 2번 연속 반론 전 질문으로 전환</span>
          </div>
        </div>
      </div>
    </div>
  );
}
