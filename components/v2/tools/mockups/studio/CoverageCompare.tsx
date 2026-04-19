"use client";

import { MOCKUP } from "../_shared/tokens";

const STAGES = [
  { num: "01", label: "현재", sub: "32개사 통합", value: "13.4만" },
  { num: "02", label: "정리 예정", sub: "중복 정리", value: "9.8만" },
  { num: "03", label: "정리 후", sub: "정합성 확보", value: "7.2만" },
  { num: "04", label: "새 제안", sub: "갭 메우기", value: "8.8만" },
  { num: "05", label: "최종", sub: "월납 합계", value: "15.5만", active: true },
];

const KPIS = [
  { label: "보장점수", value: "78", sub: "+12 vs 정리전", tone: "accent" },
  { label: "월납 절감", value: "4.6만", sub: "정리만 반영", tone: "good" },
  { label: "신규 제안", value: "3건", sub: "암·간병·운전자", tone: "default" },
  { label: "GAP 충족", value: "92%", sub: "보장공백 메움", tone: "default" },
];

// 6개 담보 영역, 현재 vs 최종 (천원 단위 보장금액)
const COVERAGE_ROWS = [
  { label: "사망·상해", before: 45, after: 80, beforeAmt: "4.5천", afterAmt: "8천" },
  { label: "암 진단", before: 30, after: 70, beforeAmt: "3천", afterAmt: "7천" },
  { label: "뇌·심혈관", before: 20, after: 60, beforeAmt: "2천", afterAmt: "6천" },
  { label: "입원·수술", before: 55, after: 65, beforeAmt: "일당 5만", afterAmt: "일당 6.5만" },
  { label: "실손의료", before: 70, after: 70, beforeAmt: "4세대", afterAmt: "4세대" },
  { label: "운전자", before: 35, after: 50, beforeAmt: "기본형", afterAmt: "고급형" },
];

const CONTRACTS = [
  { co: "삼성생명", product: "종신 변액 5천", premium: "8.2만", status: "유지", tone: MOCKUP.fg2 },
  { co: "한화손해", product: "실손의료 4세대", premium: "1.8만", status: "유지", tone: MOCKUP.fg2 },
  { co: "현대해상", product: "운전자보험 (중복)", premium: "1.4만", status: "정리", tone: "#d8a040" },
  { co: "메리츠화재", product: "암보험 (해약 권고)", premium: "2.0만", status: "정리", tone: "#d8a040" },
  { co: "DB손해", product: "치아보험 종합", premium: "0.9만", status: "유지", tone: MOCKUP.fg2 },
  { co: "교보생명", product: "정기 사망 (신규)", premium: "1.4만", status: "신규", tone: "#5b5bef" },
  { co: "흥국화재", product: "간병 일당 (신규)", premium: "2.1만", status: "신규", tone: "#5b5bef" },
  { co: "라이나생명", product: "암 직접지원 (신규)", premium: "1.8만", status: "신규", tone: "#5b5bef" },
];

export default function CoverageCompare() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: MOCKUP.bg0, color: MOCKUP.fg0, fontFeatureSettings: "'tnum' 1" }}
    >
      {/* Topbar */}
      <div
        className="flex items-center px-4 h-9 border-b shrink-0"
        style={{ background: "rgba(255,255,255,0.85)", borderColor: MOCKUP.border, backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: MOCKUP.fg1 }}>
          <span style={{ color: MOCKUP.fg2 }}>어메이징</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span style={{ color: MOCKUP.fg2 }}>보장분석</span>
          <span style={{ color: MOCKUP.fg3 }}>/</span>
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-semibold mr-1"
            style={{ background: MOCKUP.fg0, color: MOCKUP.bg1 }}
          >
            김
          </span>
          <span className="font-semibold" style={{ color: MOCKUP.fg0 }}>김민지님 보고서</span>
          <span
            className="ml-1.5 px-1.5 py-px rounded-full text-[9px] font-semibold"
            style={{ background: MOCKUP.accentSoft, color: MOCKUP.accent }}
          >
            진행중
          </span>
          <span
            className="ml-1 px-1.5 py-px rounded-full text-[9px] font-semibold"
            style={{ background: "rgba(74,170,110,0.12)", color: "#4aaa6e" }}
          >
            ● AI 자동분석
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px]" style={{ color: MOCKUP.fg3 }}>
            업데이트 2분 전
          </span>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold border"
            style={{ background: MOCKUP.bg1, color: MOCKUP.fg1, borderColor: MOCKUP.border }}
          >
            ⌘ 비교
          </span>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
            style={{ background: MOCKUP.fg0, color: MOCKUP.bg1 }}
          >
            PDF 출력
          </span>
        </div>
      </div>

      {/* Flow stepper */}
      <div className="flex items-stretch gap-1 px-4 py-2 shrink-0" style={{ background: MOCKUP.bg0 }}>
        {STAGES.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg flex-1 border transition-all"
              style={{
                background: s.active ? `linear-gradient(135deg, ${MOCKUP.accent}, #4747d6)` : MOCKUP.bg1,
                borderColor: s.active ? MOCKUP.accent : MOCKUP.border,
                color: s.active ? "#fff" : MOCKUP.fg1,
                boxShadow: s.active ? "0 4px 14px rgba(91,91,239,0.32)" : MOCKUP.shadowSm,
              }}
            >
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold shrink-0"
                style={{
                  background: s.active ? "#fff" : "rgba(20,20,40,0.06)",
                  color: s.active ? MOCKUP.accent : MOCKUP.fg2,
                }}
              >
                {s.num}
              </span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-[10px] font-bold whitespace-nowrap">{s.label}</span>
                <span className="text-[8px] opacity-70 whitespace-nowrap truncate">{s.sub}</span>
              </div>
              <span className="ml-auto text-[10px] font-bold tabular-nums">{s.value}</span>
            </div>
            {i < STAGES.length - 1 && (
              <span className="px-0.5 text-[10px]" style={{ color: MOCKUP.fg3 }}>›</span>
            )}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 px-4 pb-3 grid grid-cols-12 gap-2">
        {/* LEFT col 7 */}
        <div className="col-span-7 flex flex-col gap-2 min-h-0">
          {/* Summary gradient bar */}
          <div
            className="rounded-xl px-4 py-2.5 flex items-center justify-between shrink-0"
            style={{
              background: `linear-gradient(135deg, ${MOCKUP.accent}, #4040cc)`,
              color: "#fff",
              boxShadow: "0 6px 20px -8px rgba(91,91,239,0.5)",
            }}
          >
            <div>
              <div className="text-[9px] opacity-80 font-medium uppercase tracking-[0.08em]">
                최종 월납 합계
              </div>
              <div className="text-[20px] font-extrabold leading-none mt-1 tabular-nums">
                15만 5천원
              </div>
              <div className="text-[9px] opacity-80 mt-1">현재 13.4만 → +2.1만 / 보장 +12점</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div
                className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                ROI 4.8x
              </div>
              <div className="text-[9px] opacity-90">
                <span className="font-bold text-[11px]">92%</span> 보장공백 해소
              </div>
              <div className="text-[8px] opacity-75">예상 청구 회수율 ↑ 38%</div>
            </div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-4 gap-1.5 shrink-0">
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="rounded-lg p-2 border"
                style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}
              >
                <div className="text-[9px] font-semibold" style={{ color: MOCKUP.fg2 }}>
                  {k.label}
                </div>
                <div
                  className="text-[15px] font-extrabold leading-none mt-1 tabular-nums"
                  style={{
                    color:
                      k.tone === "accent"
                        ? MOCKUP.accent
                        : k.tone === "good"
                        ? "#10b981"
                        : MOCKUP.fg0,
                  }}
                >
                  {k.value}
                </div>
                <div className="text-[8px] mt-0.5" style={{ color: MOCKUP.fg3 }}>
                  {k.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Coverage chart */}
          <div
            className="rounded-lg border p-3 flex-1 min-h-0 flex flex-col"
            style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
          >
            <div className="flex items-center justify-between mb-2 shrink-0">
              <div
                className="text-[10px] font-bold uppercase tracking-[0.08em]"
                style={{ color: MOCKUP.fg1 }}
              >
                담보 영역별 커버리지
              </div>
              <div className="flex items-center gap-2 text-[8px]" style={{ color: MOCKUP.fg2 }}>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: MOCKUP.bg3 }} /> 현재
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: MOCKUP.accent }} /> 최종
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 justify-between">
              {COVERAGE_ROWS.map((r) => (
                <div key={r.label} className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-3 text-[10px] font-medium" style={{ color: MOCKUP.fg1 }}>
                    {r.label}
                  </div>
                  <div className="col-span-6 relative h-3.5">
                    <div
                      className="absolute inset-y-0 left-0 rounded-sm"
                      style={{ width: `${r.before}%`, background: MOCKUP.bg3 }}
                    />
                    <div
                      className="absolute left-0 rounded-sm"
                      style={{
                        width: `${r.after}%`,
                        background: MOCKUP.accent,
                        height: 5,
                        bottom: -2,
                      }}
                    />
                  </div>
                  <div className="col-span-3 text-right text-[9px] tabular-nums" style={{ color: MOCKUP.fg2 }}>
                    <span style={{ color: MOCKUP.fg3 }}>{r.beforeAmt}</span>
                    <span className="mx-1" style={{ color: MOCKUP.fg3 }}>→</span>
                    <span className="font-bold" style={{ color: MOCKUP.fg0 }}>{r.afterAmt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two insight strips */}
          <div className="grid grid-cols-2 gap-1.5 shrink-0">
            <div
              className="rounded-lg px-2.5 py-1.5 border-l-[3px] flex items-start gap-1.5"
              style={{
                background: MOCKUP.bg1,
                borderColor: MOCKUP.border,
                borderLeftColor: "#d8a040",
                borderLeftWidth: 3,
              }}
            >
              <span className="text-[10px] mt-px">⚠</span>
              <div className="text-[9px] leading-snug" style={{ color: MOCKUP.fg1 }}>
                <span className="font-bold">중복 보장 2건</span>
                <span style={{ color: MOCKUP.fg2 }}> · 정리 시 월납 3.4만 절감</span>
              </div>
            </div>
            <div
              className="rounded-lg px-2.5 py-1.5 border-l-[3px] flex items-start gap-1.5"
              style={{
                background: MOCKUP.bg1,
                borderColor: MOCKUP.border,
                borderLeftColor: MOCKUP.accent,
                borderLeftWidth: 3,
              }}
            >
              <span className="text-[10px] mt-px">◆</span>
              <div className="text-[9px] leading-snug" style={{ color: MOCKUP.fg1 }}>
                <span className="font-bold">보장 공백 3건 발견</span>
                <span style={{ color: MOCKUP.fg2 }}> · 뇌·심혈관 우선 권장</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT col 5 */}
        <div className="col-span-5 flex flex-col gap-2 min-h-0">
          <div className="flex items-center justify-between shrink-0 px-1">
            <div
              className="text-[9px] font-bold uppercase tracking-[0.08em]"
              style={{ color: MOCKUP.fg2 }}
            >
              계약 32건 · 8사
            </div>
            <div className="flex items-center gap-1 text-[9px]" style={{ color: MOCKUP.fg2 }}>
              <span
                className="px-1.5 py-px rounded font-semibold"
                style={{ background: MOCKUP.bg2 }}
              >
                전체
              </span>
              <span className="px-1.5 py-px rounded font-semibold" style={{ color: MOCKUP.fg3 }}>
                정리
              </span>
              <span className="px-1.5 py-px rounded font-semibold" style={{ color: MOCKUP.fg3 }}>
                신규
              </span>
            </div>
          </div>

          <div
            className="rounded-lg border overflow-hidden flex flex-col flex-1 min-h-0"
            style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border, boxShadow: MOCKUP.shadowSm }}
          >
            <div
              className="grid grid-cols-12 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.06em]"
              style={{ background: MOCKUP.bg0, color: MOCKUP.fg2, borderBottom: `1px solid ${MOCKUP.border}` }}
            >
              <div className="col-span-7">계약</div>
              <div className="col-span-3 text-right">월납</div>
              <div className="col-span-2 text-right">상태</div>
            </div>
            <div className="flex-1 overflow-hidden">
              {CONTRACTS.map((c, i) => (
                <div
                  key={c.co}
                  className="grid grid-cols-12 items-center gap-1 px-2.5 py-[7px]"
                  style={{
                    borderTop: i === 0 ? "none" : `1px solid ${MOCKUP.border}`,
                    opacity: c.status === "정리" ? 0.78 : 1,
                  }}
                >
                  <div className="col-span-7 flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-1 h-5 rounded-full shrink-0"
                      style={{ background: c.tone }}
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold truncate" style={{ color: MOCKUP.fg0 }}>
                        {c.co}
                      </div>
                      <div className="text-[8.5px] truncate" style={{ color: MOCKUP.fg2 }}>
                        {c.product}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 text-right text-[10px] font-bold tabular-nums" style={{ color: MOCKUP.fg0 }}>
                    {c.premium}
                  </div>
                  <div
                    className="col-span-2 text-right text-[8px] font-bold"
                    style={{
                      color:
                        c.status === "정리"
                          ? "#d8a040"
                          : c.status === "신규"
                          ? MOCKUP.accent
                          : MOCKUP.fg3,
                    }}
                  >
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="px-2.5 py-1 text-[9px] text-center cursor-pointer shrink-0"
              style={{
                color: MOCKUP.fg2,
                background: MOCKUP.bg0,
                borderTop: `1px solid ${MOCKUP.border}`,
              }}
            >
              나머지 24건 펼치기 ›
            </div>
          </div>

          {/* AI 추천 micro list */}
          <div
            className="rounded-lg border p-2.5 shrink-0"
            style={{ background: MOCKUP.bg1, borderColor: MOCKUP.border }}
          >
            <div
              className="text-[9px] font-bold uppercase tracking-[0.08em] mb-1.5 flex items-center gap-1"
              style={{ color: MOCKUP.fg1 }}
            >
              <span style={{ color: MOCKUP.accent }}>✦</span> AI 우선순위
            </div>
            <div className="flex flex-col gap-1">
              {[
                { rank: "01", text: "현대해상 운전자 — 즉시 해약 권고" },
                { rank: "02", text: "교보 정기 5천 — 사망보장 GAP" },
                { rank: "03", text: "흥국 간병일당 — 35세 적기 가입" },
              ].map((r) => (
                <div key={r.rank} className="flex items-center gap-2 text-[9.5px]">
                  <span
                    className="font-bold tabular-nums shrink-0"
                    style={{ color: MOCKUP.fg3 }}
                  >
                    {r.rank}
                  </span>
                  <span className="truncate" style={{ color: MOCKUP.fg1 }}>
                    {r.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer shrink-0"
            style={{
              background: `linear-gradient(135deg, ${MOCKUP.accent}, #7c3aed)`,
              color: "#fff",
              boxShadow: "0 4px 12px -2px rgba(91,91,239,0.4)",
            }}
          >
            <div>
              <div className="text-[10px] font-bold leading-tight">상담 자료 PDF 생성</div>
              <div className="text-[8px] opacity-85">고객 공유 · 자동 워터마크</div>
            </div>
            <span className="text-[14px] leading-none">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
