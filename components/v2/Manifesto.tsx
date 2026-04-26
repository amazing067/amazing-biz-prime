import { Eyebrow, Mono } from "./Core";

const PRINCIPLES = [
  {
    n: "01",
    h: "감정을 배제합니다.",
    b: "DB 배정, 상담 우선순위, 재방문 주기 — 모두 규칙으로 돌아갑니다. 당신의 하루는 결과가 아닌 실행에만 쓰입니다.",
  },
  {
    n: "02",
    h: "투명함을 약속합니다.",
    b: "32개 제휴사의 모든 상품 정보, DB 분배 내역, 수수료 구조를 숨기지 않습니다. 신뢰는 투명함에서 시작됩니다.",
  },
  {
    n: "03",
    h: "도구로 승부합니다.",
    b: "포털 OS · AI 제작실 · 청구 허브 · 치매검사. 네 개의 시스템이 당신 한 사람의 생산성을 열 명으로 만듭니다.",
  },
];

export default function Manifesto() {
  return (
    <section id="system" className="relative py-28 md:py-40 border-t border-[color:var(--line)]">
      <div className="mx-auto max-w-[1760px] px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>02 — Manifesto</Eyebrow>
            <h2 className="mt-6 text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.02em] font-semibold text-[color:var(--ink)]">
              System <br />
              makes <br />
              <span className="font-serif-italic font-semibold text-[color:var(--accent)]">
                Money.
              </span>
            </h2>
            <p className="mt-6 text-[13px] text-[color:var(--dim)] leading-relaxed max-w-xs">
              영업은 재능이 아니라 시스템입니다. 어메이징사업부는 당신의 감정, 시간, 에너지를
              보호하기 위해 설계된 하나의 운영체제입니다.
            </p>
          </div>

          <div className="col-span-12 md:col-span-8 md:pl-12 md:border-l border-[color:var(--line)] space-y-12">
            {PRINCIPLES.map((i) => (
              <div key={i.n} className="grid grid-cols-12 gap-4 items-baseline">
                <Mono className="col-span-2 md:col-span-1 text-[color:var(--accent)] text-sm pt-2">
                  {i.n}
                </Mono>
                <h3 className="col-span-10 md:col-span-4 text-[20px] md:text-[22px] font-semibold text-[color:var(--ink)] tracking-[-0.01em]">
                  {i.h}
                </h3>
                <p className="col-span-12 md:col-span-7 text-[15px] text-[color:var(--ink-2)] leading-[1.65]">
                  {i.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
