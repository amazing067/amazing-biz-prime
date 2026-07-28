import { Eyebrow, Mono } from "./Core";

const DAYS = [
  { d: "Day 00", t: "지원", b: "1분 만에 폼 제출" },
  { d: "Day 01", t: "Welcome Kit", b: "즉시 발송 · 사업부 소개서 포함" },
  { d: "Day 02", t: "1:1 인터뷰", b: "본부장 직속 미팅" },
  { d: "Day 03", t: "System Access", b: "포털·AI·청구 권한 부여" },
  { d: "Day 04", t: "Onboarding I", b: "32개사 상품 핵심" },
  { d: "Day 05", t: "Onboarding II", b: "DB 운영·고객 관리" },
  { d: "Day 06", t: "Onboarding III", b: "AI 도구 실전" },
  { d: "Day 07", t: "현장 Shadow", b: "선배 동행 미팅" },
  { d: "Day 08", t: "첫 DB 분배", b: "규칙 기반 자동" },
  { d: "Day 09", t: "첫 상담", b: "후 피드백 세션" },
  { d: "Day 10", t: "Full Operation", b: "모든 시스템 풀 가동" },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-28 md:py-40 border-t border-[color:var(--line)]"
      style={{ ["--card-accent" as string]: "#d8a040" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1760px] px-6">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow>입사 후 10일</Eyebrow>
            <h2 className="mt-5 text-[44px] md:text-[72px] leading-[1] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
              10일,
              <br />
              <span className="text-[color:var(--dim-2)] font-serif-italic font-semibold">
                그리고 풀 가동.
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 self-end">
            <p className="text-[15px] text-[color:var(--ink-2)] leading-[1.7]">
              어메이징사업부의 온보딩은 이론이 아닙니다. 10일 차에는 모든 시스템이 당신의 손 안에서
              돌아갑니다. 그 이전에 회사가 당신을 준비시킵니다.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting line — track + animated progress fill */}
          <div className="hidden lg:block absolute left-0 right-0 top-[34px] h-[2px] bg-[color:var(--card-accent)]/20 rounded-full" />
          <div className="hidden lg:block absolute left-0 top-[34px] h-[2px] bg-[color:var(--card-accent)] rounded-full process-line-anim shadow-[0_0_8px_color-mix(in_srgb,var(--card-accent)_60%,transparent)]" />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-x-3 gap-y-10 lg:gap-y-0">
            {DAYS.map((x, i) => {
              const isStart = i === 1; // Day 01
              const isEnd = i === DAYS.length - 1; // Day 10
              const isAnchor = isStart || isEnd;
              return (
                <div key={x.d} className={`min-w-0 ${isAnchor ? "relative" : ""}`}>
                  {isAnchor && (
                    <span className="absolute -top-5 left-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-[0.18em] bg-[color:var(--card-accent)] text-white">
                      {isStart ? "START" : "GOAL"}
                    </span>
                  )}
                  <Mono
                    className={`text-[10px] lg:text-[10.5px] tracking-[0.12em] block truncate ${
                      isAnchor
                        ? "text-[color:var(--card-accent)] font-bold"
                        : "text-[color:var(--dim)]"
                    }`}
                  >
                    {x.d}
                  </Mono>
                  <div className="relative mt-2.5 h-6 flex items-center">
                    <span
                      className={`relative z-10 rounded-full ${
                        isAnchor
                          ? "w-4 h-4 bg-[color:var(--card-accent)] shadow-[0_0_0_5px_color-mix(in_srgb,var(--card-accent)_25%,transparent)]"
                          : i === 0
                          ? "w-2.5 h-2.5 bg-[color:var(--card-accent)]/70"
                          : "w-2.5 h-2.5 bg-[color:var(--bg-2)] border border-[color:var(--dim-2)]"
                      }`}
                    />
                  </div>
                  <div
                    className={`mt-3 tracking-[-0.01em] leading-[1.2] ${
                      isAnchor
                        ? "text-[15px] lg:text-[16px] font-bold text-[color:var(--ink)]"
                        : "text-[13px] lg:text-[13.5px] font-semibold text-[color:var(--ink)]"
                    }`}
                  >
                    {x.t}
                  </div>
                  <div
                    className={`mt-1.5 leading-[1.45] ${
                      isAnchor
                        ? "text-[12px] lg:text-[12.5px] text-[color:var(--ink-2)]"
                        : "text-[11px] lg:text-[11.5px] text-[color:var(--dim)]"
                    }`}
                  >
                    {x.b}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
