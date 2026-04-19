"use client";

import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const CUSTOMERS = [
  { name: "김민지", age: 32, last: "2분 전", tag: "보장분석", tagColor: TOOL_COLOR.comparison, status: "진행", active: true },
  { name: "박서영", age: 45, last: "1시간 전", tag: "청구지원", tagColor: TOOL_COLOR.medical, status: "완료" },
  { name: "이도현", age: 28, last: "오늘", tag: "신규 상담", tagColor: TOOL_COLOR.consulting, status: "진행" },
  { name: "정유진", age: 51, last: "어제", tag: "갱신", tagColor: TOOL_COLOR.disclosure, status: "대기" },
  { name: "최승호", age: 39, last: "3일 전", tag: "보험조회", tagColor: TOOL_COLOR.insurance, status: "완료" },
];

const JOURNEY = [
  { label: "첫 상담", date: "3월 28일", state: "done" },
  { label: "보장분석 PDF", date: "4월 5일", state: "done" },
  { label: "청약서 작성", date: "진행중", state: "active" },
  { label: "심사·발행", date: "예정", state: "pending" },
  { label: "갱신 알림", date: "1년 후", state: "pending" },
];

const CONTRACTS = [
  { co: "삼성생명", product: "종신 5천", premium: "8.2만" },
  { co: "한화손해", product: "실손 4세대", premium: "1.8만" },
  { co: "DB손해", product: "치아종합", premium: "0.9만" },
];

export default function Customers() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span style={{ color: MOCKUP.fg2 }}>고객</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>김민지님</span>
          <span className="ml-1.5 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>
            진행중
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {["📞", "💬", "📄"].map((e, i) => (
            <span key={i} className="w-6 h-6 rounded-md flex items-center justify-center text-[11px]" style={{ background: MOCKUP.bg2 }}>{e}</span>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-12">
        {/* Customer list */}
        <div className="col-span-4 border-r flex flex-col min-h-0" style={{ borderColor: MOCKUP.border }}>
          <div className="px-3 pt-2.5 pb-1.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[9px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg2 }}>고객 · 248</div>
              <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>+ 추가</span>
            </div>
            <div className="rounded-md px-2 py-1 text-[10px]" style={{ background: MOCKUP.bg2, color: MOCKUP.fg2 }}>
              🔍 이름·전화로 검색
            </div>
          </div>
          <div className="flex-1 overflow-hidden px-2">
            {CUSTOMERS.map((c) => (
              <div
                key={c.name}
                className="px-2 py-1.5 rounded-md mb-0.5 relative"
                style={{
                  background: c.active ? MOCKUP.bg1 : "transparent",
                  boxShadow: c.active ? `${MOCKUP.shadowSm}, inset 0 0 0 1px ${MOCKUP.borderStrong}` : "none",
                }}
              >
                {c.active && <span className="absolute left-0.5 top-2 bottom-2 w-[3px] rounded-full" style={{ background: MOCKUP.accent }} />}
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: c.active ? MOCKUP.fg0 : MOCKUP.bg3, color: c.active ? "#fff" : MOCKUP.fg1 }}
                  >
                    {c.name[0]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-[11px] font-semibold truncate" style={{ color: MOCKUP.fg0 }}>{c.name} <span className="font-normal text-[9px]" style={{ color: MOCKUP.fg3 }}>{c.age}</span></span>
                      <span className="text-[9px] tabular-nums shrink-0" style={{ color: MOCKUP.fg3 }}>{c.last}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.tagColor }} />
                      <span className="text-[9.5px] truncate" style={{ color: MOCKUP.fg2 }}>{c.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus view */}
        <div className="col-span-8 flex flex-col min-h-0 overflow-hidden p-3 gap-2">
          {/* Customer header */}
          <div className="flex items-center gap-2 pb-2 border-b shrink-0" style={{ borderColor: MOCKUP.border }}>
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold" style={{ background: MOCKUP.fg0, color: "#fff" }}>김</span>
            <div>
              <div className="text-[14px] font-bold leading-tight">김민지님 <span className="font-normal text-[10px]" style={{ color: MOCKUP.fg2 }}>(F · 32세)</span></div>
              <div className="text-[10px]" style={{ color: MOCKUP.fg2 }}>010-1234-5678 · 서울 강남구 · 가족 4인</div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold" style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}>
                보장분석 보기 ›
              </span>
            </div>
          </div>

          {/* Next-up card */}
          <div
            className="rounded-xl border px-4 py-2.5 flex items-center gap-3 shrink-0"
            style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowMd }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px] shrink-0" style={{ background: "rgba(216,160,64,0.14)" }}>
              ⏰
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-medium uppercase tracking-[0.04em]" style={{ color: MOCKUP.fg2 }}>다음 할 일</div>
              <div className="text-[12px] font-bold leading-tight" style={{ color: MOCKUP.fg0 }}>청약서 검토 · 14일 경과</div>
              <div className="text-[10px] mt-0.5" style={{ color: MOCKUP.fg1 }}>고지의무 항목 3건 · 즉시 보완 필요</div>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1" style={{ background: MOCKUP.fg0, color: "#fff" }}>
              지금 →
            </span>
          </div>

          {/* Journey + contracts side-by-side */}
          <div className="flex-1 min-h-0 grid grid-cols-12 gap-2">
            <div className="col-span-7 rounded-lg border p-2.5 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
              <div className="text-[9px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: MOCKUP.fg2 }}>고객 여정</div>
              <div className="flex-1 flex flex-col gap-1 justify-around">
                {JOURNEY.map((j, i) => (
                  <div key={j.label} className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] shrink-0"
                      style={{
                        background: j.state === "done" ? "#4aaa6e" : j.state === "active" ? MOCKUP.accent : "transparent",
                        border: j.state === "pending" ? `1px dashed ${MOCKUP.fg3}` : "none",
                        color: "#fff",
                      }}
                    >
                      {j.state === "done" ? "✓" : j.state === "active" ? "●" : ""}
                    </span>
                    <span className="text-[10.5px] flex-1" style={{ color: j.state === "pending" ? MOCKUP.fg2 : MOCKUP.fg0, fontWeight: j.state === "active" ? 700 : 500 }}>
                      {j.label}
                    </span>
                    <span className="text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>{j.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-5 rounded-lg border p-2.5 flex flex-col" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[9px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg2 }}>계약 3건</div>
                <span className="text-[9px] font-bold tabular-nums" style={{ color: MOCKUP.fg1 }}>월납 10.9만</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 justify-around">
                {CONTRACTS.map((c) => (
                  <div key={c.co} className="flex items-center gap-1.5 text-[10px]">
                    <span className="w-1 h-4 rounded-full" style={{ background: TOOL_COLOR.insurance }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate" style={{ color: MOCKUP.fg0 }}>{c.co}</div>
                      <div className="text-[8.5px]" style={{ color: MOCKUP.fg2 }}>{c.product}</div>
                    </div>
                    <span className="text-[10px] font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>{c.premium}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
