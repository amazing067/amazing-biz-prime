"use client";

import { Icon, Mono } from "./Core";

const BURGUNDY = "#6B1E2A";
const BURGUNDY_DARK = "#4F1520";
const GOLD = "#B8863A";
const IVORY = "#F5EFE0";
const IVORY_SOFT = "#FAF5E8";
const INK = "#1A0F11";

const INCLUDED = [
  { n: "16", l: "자체 시스템", sub: "포털 · AI · 청구 · 치매" },
  { n: "32", l: "제휴 보험사", sub: "생·손보 전산 통합" },
  { n: "74p", l: "교육 교재", sub: "10일 · 1:1 멘토링" },
  { n: "₩0", l: "추가 결제", sub: "월 이용료 · 리스 없음" },
];

export default function FullAccess() {
  return (
    <section
      id="full-access"
      className="relative py-24 md:py-32 border-t overflow-hidden"
      style={{ background: IVORY, borderColor: "rgba(26,15,17,0.08)" }}
      aria-label="Day 1 — 전체 시스템 공개"
    >
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            `linear-gradient(${BURGUNDY} 1px, transparent 1px), linear-gradient(90deg, ${BURGUNDY} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />
      {/* Decorative corner — burgundy stamp */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-[340px] h-[340px] rounded-full opacity-10"
        style={{ background: BURGUNDY }}
      />

      <div className="relative mx-auto max-w-[1700px] px-6">
        <div className="grid grid-cols-12 gap-8 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <div
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: BURGUNDY }}
            >
              <span className="w-4 h-px" style={{ background: BURGUNDY, opacity: 0.6 }} />
              DAY 1 · FULL ACCESS
              <span
                className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background: BURGUNDY,
                  color: IVORY_SOFT,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
                LIVE
              </span>
            </div>
            <h2
              className="text-[clamp(36px,6vw,80px)] leading-[1.02] tracking-[-0.03em] font-semibold"
              style={{ color: INK, textWrap: "balance" } as React.CSSProperties}
            >
              지금까지 본 이 모든 시스템,
              <br />
              <span className="font-serif-italic font-light" style={{ color: BURGUNDY }}>
                입사 첫날 전부 오픈됩니다.
              </span>
            </h2>
            <p
              className="mt-8 text-[16px] md:text-[18px] leading-[1.6] max-w-[640px]"
              style={{ color: "rgba(26,15,17,0.78)" }}
            >
              어메이징 사업부에 합류하면 <strong style={{ color: INK }}>16개 자체 시스템 · 32개사 통합 전산 · AI 보장분석 · 청구.com · 치매검사 · 교육 74페이지</strong>까지, 설계사가 써야 할 모든 도구가 입사 Day 1에 ID 하나로 열립니다.
            </p>
            <p className="mt-3 text-[14px]" style={{ color: "rgba(26,15,17,0.55)" }}>
              추가 결제 없음 · 리스 없음 · 월 이용료 없음. 교육 수료 즉시 풀 액세스.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 md:pl-4">
            <div
              className="flex items-center justify-end gap-2 text-[11px] tracking-[0.16em] uppercase font-semibold"
              style={{ color: BURGUNDY }}
            >
              <span>활성화 시점</span>
              <Icon name="arrowRight" size={12} stroke={2} />
            </div>
            <div
              className="mt-3 rounded-2xl border p-5"
              style={{
                background: IVORY_SOFT,
                borderColor: "rgba(107,30,42,0.18)",
                boxShadow: "0 20px 40px -20px rgba(107,30,42,0.18), 0 4px 12px -4px rgba(26,15,17,0.06)",
              }}
            >
              {[
                { n: "01", t: "지원", s: "온라인 폼 · 1분" },
                { n: "02", t: "교육 10일", s: "74p · 1:1 멘토" },
                { n: "03", t: "입사 · 수료", s: "계약서 · ID 발급", active: true },
                { n: "04", t: "Day 1 풀 액세스", s: "모든 시스템 오픈", highlight: true },
              ].map((s, i) => (
                <div key={s.n} className="flex items-start gap-3 py-2 relative">
                  {i < 3 && (
                    <span
                      className="absolute left-[14px] top-[30px] bottom-[-4px] w-px"
                      style={{ background: "rgba(107,30,42,0.2)" }}
                    />
                  )}
                  <span
                    className="relative shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold tabular-nums"
                    style={{
                      background: s.highlight
                        ? BURGUNDY
                        : s.active
                        ? "rgba(107,30,42,0.12)"
                        : IVORY,
                      color: s.highlight ? IVORY_SOFT : s.active ? BURGUNDY : "rgba(26,15,17,0.5)",
                      border: s.highlight
                        ? "none"
                        : `1px solid ${s.active ? "rgba(107,30,42,0.35)" : "rgba(26,15,17,0.12)"}`,
                      boxShadow: s.highlight
                        ? `0 4px 14px -2px rgba(107,30,42,0.45)`
                        : "none",
                    }}
                  >
                    {s.n}
                  </span>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div
                      className="text-[13px] font-semibold leading-tight flex items-center gap-1.5"
                      style={{ color: s.highlight ? BURGUNDY : INK }}
                    >
                      {s.t}
                      {s.highlight && (
                        <span
                          className="inline-flex items-center px-1.5 py-px rounded text-[9px] font-bold tabular-nums"
                          style={{ background: BURGUNDY, color: IVORY_SOFT }}
                        >
                          HERE
                        </span>
                      )}
                    </div>
                    <div
                      className="text-[11px] mt-0.5"
                      style={{ color: "rgba(26,15,17,0.55)" }}
                    >
                      {s.s}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-14 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{
            borderColor: "rgba(107,30,42,0.15)",
            background: "rgba(107,30,42,0.1)",
          }}
        >
          {INCLUDED.map((x) => (
            <div
              key={x.l}
              className="p-5 md:p-7"
              style={{ background: IVORY_SOFT }}
            >
              <Mono className="text-[10px] tracking-[0.16em] uppercase" style={{ color: BURGUNDY }}>
                {x.l}
              </Mono>
              <div
                className="mt-2 text-[40px] md:text-[56px] leading-none tabular-nums font-medium tracking-[-0.03em]"
                style={{ color: BURGUNDY_DARK }}
              >
                {x.n}
              </div>
              <div
                className="mt-3 text-[12px]"
                style={{ color: "rgba(26,15,17,0.6)" }}
              >
                {x.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Gold hairline divider — subtle luxury touch */}
        <div
          className="mt-10 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)`,
          }}
        />
      </div>
    </section>
  );
}
