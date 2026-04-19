"use client";

import { MOCKUP, TOOL_COLOR } from "../_shared/tokens";

const TEMPLATES = [
  { name: "갱신 안내", sub: "D-30 · 자동", count: 48, tone: TOOL_COLOR.disclosure, active: true },
  { name: "납입 완료", sub: "당일 · 자동", count: 112, tone: TOOL_COLOR.consulting },
  { name: "청구 접수", sub: "1시간 내", count: 38, tone: TOOL_COLOR.comparison },
  { name: "AS 완료", sub: "처리 후 즉시", count: 24, tone: TOOL_COLOR.medical },
  { name: "신규 상품", sub: "수동 · 승인 후", count: 18, tone: TOOL_COLOR.insurance },
  { name: "생일 축하", sub: "연 1회 · 자동", count: 72, tone: TOOL_COLOR.coaching },
];

const STATS = [
  { label: "오늘 발송", value: "312", sub: "6개 템플릿", tone: MOCKUP.accent },
  { label: "수신 확인", value: "287", sub: "92% 열람률", tone: "#4aaa6e" },
  { label: "회신", value: "18", sub: "5.8% 응답", tone: TOOL_COLOR.disclosure },
  { label: "차단", value: "4", sub: "1.3%", tone: MOCKUP.fg3 },
];

const WEEK = [
  { d: "월", v: 42 }, { d: "화", v: 58 }, { d: "수", v: 71 }, { d: "목", v: 54 },
  { d: "금", v: 88, today: true }, { d: "토", v: 24 }, { d: "일", v: 18 },
];

export default function Alimtalk() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}>
      <div className="flex items-center px-4 h-9 border-b shrink-0" style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>알림톡</span>
          <span className="ml-1.5 px-1.5 py-px rounded text-[9px] font-semibold" style={{ background: "#FEE500", color: "#3C1E1E" }}>카카오 비즈</span>
          <span className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold" style={{ background: "rgba(74,170,110,0.14)", color: "#4aaa6e" }}>● 발송 큐 24</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, color: MOCKUP.fg1 }}>템플릿 추가</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: MOCKUP.fg0, color: "#fff" }}>새 발송</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3 grid grid-cols-12 gap-2">
        {/* Templates */}
        <div className="col-span-3 rounded-lg border flex flex-col overflow-hidden min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="px-3 py-1.5 flex items-center justify-between" style={{ borderBottom: `1px solid ${MOCKUP.border}` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>템플릿</div>
            <span className="text-[9px]" style={{ color: MOCKUP.fg3 }}>6개</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {TEMPLATES.map((t) => (
              <div
                key={t.name}
                className="px-3 py-2 relative"
                style={{
                  background: t.active ? MOCKUP.bg0 : "transparent",
                  borderBottom: `1px solid ${MOCKUP.border}`,
                }}
              >
                {t.active && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full" style={{ background: MOCKUP.accent }} />}
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.tone }} />
                  <span className="text-[10.5px] font-bold flex-1 truncate" style={{ color: MOCKUP.fg0 }}>{t.name}</span>
                  <span className="text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>{t.count}</span>
                </div>
                <div className="text-[8.5px] mt-0.5 pl-3" style={{ color: MOCKUP.fg3 }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Kakao preview */}
        <div className="col-span-5 rounded-lg border p-3 flex flex-col items-center justify-center" style={{ background: "#B2C7D9", borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
          <div className="w-full max-w-[260px] flex items-start gap-1.5">
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ background: "#FEE500", color: "#3C1E1E" }}>카</span>
            <div className="flex-1 min-w-0">
              <div className="rounded-xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
                <div className="text-[9px] font-bold" style={{ color: MOCKUP.accent }}>[Amazing]</div>
                <div className="text-[10.5px] font-bold leading-tight mt-1" style={{ color: MOCKUP.fg0 }}>김민지 고객님, 갱신 안내</div>
                <div className="text-[9.5px] mt-1.5 leading-snug" style={{ color: MOCKUP.fg1 }}>
                  고객님의 <b>한화 실손의료 4세대</b>가<br />
                  2026년 <b>5월 12일</b> 갱신 예정입니다.<br />
                  <br />
                  담당 FC <b>김민지</b>가 청구 이력을<br />
                  분석한 결과, 현 수준 유지가<br />
                  적절합니다.
                </div>
                <div className="mt-2 pt-2 border-t flex items-center gap-1" style={{ borderColor: MOCKUP.border }}>
                  <span className="flex-1 rounded-md px-2 py-1 text-center text-[9px] font-bold" style={{ background: MOCKUP.bg2, color: MOCKUP.fg1 }}>분석 보기</span>
                  <span className="flex-1 rounded-md px-2 py-1 text-center text-[9px] font-bold" style={{ background: MOCKUP.fg0, color: "#fff" }}>상담 예약</span>
                </div>
              </div>
              <div className="text-[8px] mt-0.5 ml-1" style={{ color: MOCKUP.fg1 }}>오전 09:14</div>
            </div>
          </div>
          <div className="mt-auto pt-2 text-[8.5px] text-center" style={{ color: MOCKUP.fg1 }}>실시간 미리보기 · 치환 변수 자동 적용</div>
        </div>

        {/* Stats + chart */}
        <div className="col-span-4 flex flex-col gap-2 min-h-0">
          <div className="grid grid-cols-2 gap-1.5">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-lg p-2 border" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.06em]" style={{ color: MOCKUP.fg2 }}>{s.label}</div>
                <div className="text-[16px] font-extrabold leading-none mt-1 tabular-nums" style={{ color: s.tone }}>{s.value}</div>
                <div className="text-[8.5px] mt-0.5" style={{ color: MOCKUP.fg3 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border p-2.5 flex-1 flex flex-col min-h-0" style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: MOCKUP.fg1 }}>이번 주 발송</div>
              <span className="text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>누적 355건</span>
            </div>
            <div className="flex-1 flex items-end gap-1 pb-2">
              {WEEK.map((w) => (
                <div key={w.d} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm" style={{ height: `${w.v}%`, background: w.today ? `linear-gradient(180deg, ${MOCKUP.accent}, #4747d6)` : MOCKUP.fg3, opacity: w.today ? 1 : 0.55 }} />
                  <div className="text-[8.5px] font-semibold" style={{ color: w.today ? MOCKUP.accent : MOCKUP.fg3 }}>{w.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
