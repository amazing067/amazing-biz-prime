"use client";

import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const CARRIERS = ["삼성", "한화", "DB", "흥국", "교보", "현대", "메리츠", "라이나", "KB", "신한", "롯데", "MG"];

const STATS = [
  { label: "오늘 청구", value: "78", sub: "+12 vs 어제" },
  { label: "평균 처리", value: "6분", sub: "전산 접속 포함" },
  { label: "자동 매칭", value: "92%", sub: "보험사별 필드" },
  { label: "누적", value: "18,420", sub: "2024년부터" },
];

const DOCS = [
  { name: "진료비 세부내역서", count: "32개사", tone: TOOL_COLOR.medical },
  { name: "사망 진단서", count: "생보 필수", tone: TOOL_COLOR.insurance },
  { name: "입원 확인서", count: "실손 전용", tone: TOOL_COLOR.comparison },
  { name: "암 진단서 (병리)", count: "암보험", tone: TOOL_COLOR.consulting },
];

export default function ClaimHub() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>청구.com</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>통합 허브</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>32개사 통합</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>● 온라인 31</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-[10px]" style={{ color: MOCKUP.fg2 }}>
          <span>인콜 · FAX 활성</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        {/* Mobile phone frame */}
        <div className="col-span-5 flex items-center justify-center">
          <div
            className="w-full max-w-[200px] aspect-[9/19] rounded-[26px] p-3 flex flex-col gap-1.5"
            style={{
              background: MOCKUP.bg1,
              border: `6px solid ${MOCKUP.fg0}`,
              boxShadow: MOCKUP.shadowMd,
            }}
          >
            <div className="flex items-center justify-between text-[8px] tabular-nums" style={{ color: MOCKUP.fg3 }}>
              <span>9:41</span>
              <span>●●●●</span>
            </div>
            <div className="text-center py-1">
              <div className="text-[11px] font-extrabold tracking-tight" style={{ color: MOCKUP.fg0 }}>청구.com</div>
              <div className="text-[7.5px]" style={{ color: MOCKUP.fg2 }}>보험금 청구, 한 곳에서</div>
            </div>
            <div className="rounded-md px-2 py-1 flex items-center gap-1 text-[9px]" style={{ background: MOCKUP.bg2, color: MOCKUP.fg2 }}>
              🔍 보험사 검색…
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1">
              {CARRIERS.slice(0, 9).map((c) => (
                <div key={c} className="aspect-square rounded-md flex items-center justify-center text-[9px] font-bold" style={{ background: MOCKUP.bg0, border: `1px solid ${MOCKUP.border}`, color: MOCKUP.fg0 }}>
                  {c}
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-1">
              <div className="rounded-md px-2 py-1 text-[8.5px] flex items-center justify-between" style={{ background: MOCKUP.accent, color: "#fff" }}>
                <span className="font-bold">인콜 연결</span>
                <span>📞</span>
              </div>
              <div className="rounded-md px-2 py-1 text-[8.5px] flex items-center justify-between" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>
                <span className="font-semibold">청구서 PDF</span>
                <span>📄</span>
              </div>
              <div className="text-center text-[7px] mt-0.5" style={{ color: MOCKUP.fg3 }}>실손계산기 · 종수술 · 병원지도</div>
            </div>
          </div>
        </div>

        {/* Desktop admin */}
        <div className="col-span-7 flex flex-col gap-2 min-h-0">
          <div className="grid grid-cols-4 gap-1.5 shrink-0">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-lg p-2 border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.06em]" style={{ color: MOCKUP.fg2 }}>{s.label}</div>
                <div className="text-[16px] font-extrabold leading-none mt-1 tabular-nums" style={{ color: MOCKUP.fg0 }}>{s.value}</div>
                <div className="text-[8.5px] mt-0.5" style={{ color: MOCKUP.fg3 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border p-3 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>보험사 32개 · 빠른 접속</div>
              <div className="flex items-center gap-2 text-[8.5px]" style={{ color: MOCKUP.fg2 }}>
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4aaa6e" }} /> 온라인</span>
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#d8a040" }} /> 인콜만</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-6 gap-1.5 content-start">
              {Array.from({ length: 24 }, (_, i) => {
                const name = CARRIERS[i % CARRIERS.length];
                const online = i % 11 !== 3;
                return (
                  <div key={i} className="rounded-md px-1.5 py-1 text-center border" style={{ background: MOCKUP.bg0, borderColor: MOCKUP.border }}>
                    <div className="text-[9.5px] font-bold truncate" style={{ color: MOCKUP.fg0 }}>{name}</div>
                    <div className="text-[7.5px] mt-0.5 flex items-center justify-center gap-0.5">
                      <span className="w-1 h-1 rounded-full" style={{ background: online ? "#4aaa6e" : "#d8a040" }} />
                      <span style={{ color: MOCKUP.fg3 }}>{online ? "연결" : "인콜"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border p-2.5 shrink-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: MOCKUP.fg1 }}>필요 서류 · 자동 생성</div>
            <div className="grid grid-cols-4 gap-1.5">
              {DOCS.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 px-1.5 py-1 rounded-md" style={{ background: MOCKUP.bg0 }}>
                  <span className="w-1 h-5 rounded-full shrink-0" style={{ background: d.tone }} />
                  <div className="min-w-0">
                    <div className="text-[9.5px] font-semibold truncate" style={{ color: MOCKUP.fg0 }}>{d.name}</div>
                    <div className="text-[8.5px]" style={{ color: MOCKUP.fg2 }}>{d.count}</div>
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
