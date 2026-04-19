import Image from "next/image";
import { Eyebrow, Mono } from "./Core";

/**
 * 실제 로고 파일: public/logos/{name}.png (cheongu-landing 원본 동일)
 */
/**
 * 2026 영업규정집 <별표 5> 생∙손보 회차별 환수그룹 기준 실제 제휴사만 표시
 * Life 19사 / Non-Life 13사 = 총 32사
 */
const LIFE = [
  "삼성생명",
  "한화생명",
  "교보생명",
  "신한라이프",
  "농협생명",
  "미래에셋생명",
  "ABL생명",
  "흥국생명",
  "DB생명",
  "KB라이프생명",
  "iM라이프생명",
  "IBK연금보험",
  "하나생명",
  "AIA생명",
  "메트라이프",
  "처브라이프",
  "라이나생명",
  "KDB생명",
  "동양생명",
];

const NON_LIFE = [
  "삼성화재",
  "현대해상",
  "DB손해보험",
  "KB손해보험",
  "메리츠화재",
  "롯데손해보험",
  "한화손해보험",
  "흥국화재",
  "농협손해보험",
  "하나손해보험",
  "AIG손해보험",
  "예별손해보험",
  "라이나손해보험",
];

type Partner = { name: string; type: "L" | "N" };
const ALL: Partner[] = [
  ...LIFE.map((n) => ({ name: n, type: "L" as const })),
  ...NON_LIFE.map((n) => ({ name: n, type: "N" as const })),
];

export default function Partners() {
  return (
    <section id="partners" className="relative py-28 px-6 bg-[color:var(--bg-1)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Eyebrow>SECTION 10 · PARTNERS</Eyebrow>
            <h2 className="mt-5 text-[clamp(32px,4.5vw,56px)] leading-[1] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
              생보 {LIFE.length} <span className="text-[color:var(--dim-2)]">·</span> 손보{" "}
              {NON_LIFE.length}{" "}
              <span className="text-[color:var(--dim)] text-[0.6em]">= </span>
              <span className="font-serif-italic text-[color:var(--accent)]">
                {ALL.length}개 제휴사
              </span>
            </h2>
          </div>
          <div className="flex items-end gap-6 text-[12px] text-[color:var(--dim)]">
            <div>
              <Mono className="text-[28px] tracking-tight block text-[color:var(--ink)]">
                {ALL.length}
              </Mono>
              <span>제휴사</span>
            </div>
            <div>
              <Mono className="text-[28px] tracking-tight block text-[color:var(--ink)]">100%</Mono>
              <span>오픈 구조</span>
            </div>
            <div>
              <Mono className="text-[28px] tracking-tight block text-[color:var(--ink)]">
                1<span className="text-[14px]">분</span>
              </Mono>
              <span>통합 조회</span>
            </div>
          </div>
        </div>

        <p className="text-[14px] leading-relaxed max-w-[720px] mb-10 text-[color:var(--ink-2)]">
          한 회사 상품만 파는 전속이 아닙니다. 생·손보 {ALL.length}개사 상품을 동시에 비교해 고객에게 정말 필요한 상품을 조합합니다. 이것이 우리가 &ldquo;비교 가능한 설계&rdquo;를 할 수 있는 이유입니다.
        </p>

        <div className="relative rounded-2xl border border-[color:var(--line)] overflow-hidden">
          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-px"
            style={{ background: "var(--line)" }}
          >
            {ALL.map((p) => (
              <div
                key={p.name}
                className="relative aspect-[5/3] flex items-center justify-center p-3 bg-[color:var(--bg-1)] hover:bg-[color:var(--bg-2)] transition-colors group"
              >
                <Image
                  src={`/logos/${p.name}.png`}
                  alt={p.name}
                  width={120}
                  height={60}
                  className="max-h-[70%] w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  sizes="(min-width: 1280px) 140px, (min-width: 768px) 160px, 120px"
                />
                <span className="pointer-events-none absolute bottom-1.5 left-0 right-0 text-center text-[9px] text-[color:var(--dim)] opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.name} · {p.type === "L" ? "생보" : "손보"}
                </span>
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
            style={{ background: "linear-gradient(to top, var(--bg-1), transparent)" }}
          />
        </div>

        <p className="mt-6 text-[11px] text-[color:var(--dim)]">
          * 2026 영업규정집 별표 5(생·손보 회차별 환수그룹) 기준. 제휴사 목록은 사업연도 중 변경될 수 있으며, 최신 현황은 설계사 전용방에서 확인하세요.
        </p>
      </div>
    </section>
  );
}
