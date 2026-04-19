"use client";

import { MOCKUP } from "../_shared/tokens";

// Waveform bars — 40 bars of varying height
const WAVE = Array.from({ length: 40 }, (_, i) => {
  const seed = Math.sin(i * 0.7) * 0.5 + Math.cos(i * 1.3) * 0.3 + 0.6;
  return Math.max(0.15, Math.min(1, seed));
});

const TRANSCRIPT = [
  { who: "FC", time: "00:32", text: "안녕하세요 김민지님. 오늘 보장분석 결과 보여드릴게요." },
  { who: "고객", time: "00:45", text: "네, 근데 제가 지금 들어둔 보험이 많아서 헷갈려요." },
  { who: "FC", time: "01:02", text: "그 부분 때문에 분석을 해봤는데요, 중복이 2건 있어요. 정리하면 월납 3만 4천원 절감됩니다." },
  { who: "고객", time: "01:24", text: "정말요? 어떤 거 정리하면 되는데요?" },
  { who: "FC", time: "01:38", text: "현대해상 운전자랑 메리츠 암보험이요. 이 둘은 다른 계약에 이미 포함돼 있습니다." },
];

const OUTPUTS = [
  { title: "고객 카드", sub: "3필드 업데이트", state: "done", tone: "#4aaa6e" },
  { title: "상담일지 PDF", sub: "2.8KB · 자동 요약", state: "done", tone: "#4aaa6e" },
  { title: "제안서 초안", sub: "5쪽 · 생성중 72%", state: "progress", tone: MOCKUP.accent },
  { title: "알림톡 템플릿", sub: "대기", state: "pending", tone: MOCKUP.fg3 },
];

export default function ConsultAuto() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>상담 자동화</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>처리 큐 4건</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>● AI 전사중</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] tabular-nums" style={{ color: MOCKUP.fg3 }}>38:24 / 42:10</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>결과물 저장</span>
        </div>
      </div>

      {/* Waveform */}
      <div className="px-4 py-2 shrink-0">
        <div className="rounded-lg border p-2.5 flex items-center gap-3" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <span className="w-8 h-8 rounded-full flex items-center justify-center text-[14px]" style={{ background: MOCKUP.fg0, color: "#fff" }}>▶</span>
          <div className="flex-1 flex items-center gap-[2px] h-10">
            {WAVE.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h * 100}%`,
                  background: i < 28 ? MOCKUP.accent : MOCKUP.bg3,
                  opacity: i < 28 ? 1 : 0.6,
                }}
              />
            ))}
          </div>
          <div className="text-right shrink-0">
            <div className="text-[9px] font-semibold" style={{ color: MOCKUP.fg2 }}>김민지님 · 1차 상담</div>
            <div className="text-[10px] tabular-nums font-bold" style={{ color: MOCKUP.fg0 }}>00:32:14 / 00:42:10</div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* Transcript */}
        <div className="col-span-7 rounded-lg border flex flex-col min-h-0 overflow-hidden" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] flex items-center justify-between" style={{ borderBottom: `1px solid ${MOCKUP.border}`, color: MOCKUP.fg1 }}>
            <span>자동 전사 · 화자 구분</span>
            <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>정확도 98.2%</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {TRANSCRIPT.map((t, i) => {
              const isFC = t.who === "FC";
              return (
                <div key={i} className="grid grid-cols-[48px_1fr] gap-2 px-3 py-1.5" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}` }}>
                  <div className="text-right">
                    <div className="text-[10px] font-bold" style={{ color: isFC ? MOCKUP.accent : MOCKUP.fg2 }}>{t.who}</div>
                    <div className="text-[8.5px] tabular-nums" style={{ color: MOCKUP.fg3 }}>{t.time}</div>
                  </div>
                  <div className="text-[10.5px] leading-snug pl-2 border-l" style={{ color: MOCKUP.fg0, borderColor: isFC ? MOCKUP.accent : MOCKUP.border }}>
                    {t.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          <div className="rounded-lg border p-2.5 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>자동 생성 자료</div>
            <div className="flex-1 flex flex-col gap-1.5 justify-around">
              {OUTPUTS.map((o) => (
                <div key={o.title} className="flex items-center gap-2 px-2 py-1.5 rounded-md" style={{ background: MOCKUP.bg0 }}>
                  <span className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: o.tone + "22", color: o.tone }}>
                    {o.state === "done" ? "✓" : o.state === "progress" ? "●" : "○"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{o.title}</div>
                    <div className="text-[9px] truncate" style={{ color: MOCKUP.fg2 }}>{o.sub}</div>
                  </div>
                  {o.state === "progress" && (
                    <div className="w-12 h-1 rounded-full shrink-0" style={{ background: MOCKUP.bg2 }}>
                      <div className="h-full rounded-full" style={{ width: "72%", background: o.tone }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-3 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${MOCKUP.accent}, #7c3aed)`, color: "#fff", boxShadow: "0 4px 14px -4px rgba(91,91,239,0.4)" }}>
            <div>
              <div className="text-[9px] font-medium opacity-85 uppercase tracking-[0.06em]">평균 절감</div>
              <div className="text-[18px] font-extrabold leading-none mt-1 tabular-nums">40분 / 건</div>
            </div>
            <div className="text-right text-[9px] leading-tight opacity-90">
              이달 처리 78건<br />
              <span className="font-bold text-[11px]">52시간 세이브</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
