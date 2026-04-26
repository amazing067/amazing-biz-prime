import { Eyebrow, Icon, Mono } from "./Core";

/**
 * 2026 영업규정집 서문 기반
 * "성장과 분할"의 밸류체인 — 공정기준 + 가치공유
 */
const STAGES = [
  {
    k: "01",
    title: "FC가 팀을 만듭니다",
    body: "분기 전환성적 5천만 원을 달성한 설계사는 팀장으로 승격합니다. 공정한 기준만 충족하면 관리자로 올라갈 수 있습니다.",
    caption: "TEAM",
  },
  {
    k: "02",
    title: "팀이 지사로 분할됩니다",
    body: "관리자는 성장한 팀을 지사로 분할합니다. 이때 발생하는 지사분할수수료는 母지사장에게 지급됩니다 (본부 사업비).",
    caption: "BRANCH",
  },
  {
    k: "03",
    title: "지사가 본부로 분할됩니다",
    body: "지사가 본부 기준(2분기 합산 12억 원·FC 20명)을 달성하면 독립 본부로 분할됩니다. 본부분할수수료는 회사 사업비로 지급됩니다.",
    caption: "DIVISION",
  },
];

export default function ValueChain() {
  return (
    <section
      id="value-chain"
      className="relative py-28 md:py-40 border-t border-[color:var(--line)] bg-[color:var(--bg-1)] overflow-hidden"
      style={{ ["--card-accent" as string]: "#4aaa6e" } as React.CSSProperties}
    >
      {/* Ambient grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-[1840px] px-6">
        {/* Header */}
        <div className="max-w-[880px] mb-20">
          <Eyebrow>SECTION 03 · VALUE CHAIN</Eyebrow>
          <h2 className="mt-5 text-[clamp(40px,5.5vw,80px)] leading-[0.98] tracking-[-0.03em] font-semibold text-[color:var(--ink)]">
            성장과 분할.
            <br />
            <span className="font-serif-italic font-light text-[color:var(--accent)]">
              한계를 뛰어넘는 구조.
            </span>
          </h2>
          <p className="mt-6 text-[16px] md:text-[17px] leading-[1.7] max-w-[720px] text-[color:var(--ink-2)]">
            대부분의 GA에서 관리자는 자기 밑에 설계사를 종속시켜야 소득이 유지됩니다. 그래서 설계사의 성장에는 넘을 수 없는 벽이 있습니다.
            <br />
            <br />
            프라임에셋은{" "}
            <strong className="text-[color:var(--ink)]">&ldquo;공정기준&rdquo;</strong>과{" "}
            <strong className="text-[color:var(--ink)]">&ldquo;가치공유&rdquo;</strong> 두 원칙으로
            밸류체인을 만들었습니다. 회사가 정한 기준을 달성하면 누구나 자동으로 관리자로 승격되고, 조직이 성장·분할될 때마다 그 가치는 관리자와 공유됩니다.
          </p>
        </div>

        {/* Two principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
          <div className="card-v2 p-8 md:p-10">
            <Mono className="text-[11px] tracking-[0.18em] text-[color:var(--accent)]">
              PRINCIPLE / 01
            </Mono>
            <h3 className="mt-3 text-[26px] md:text-[30px] font-medium text-[color:var(--ink)] tracking-[-0.01em]">
              공정기준 — <span className="font-serif-italic font-light">종속이 아닌 기준</span>
            </h3>
            <p className="mt-4 text-[14px] leading-[1.75] text-[color:var(--ink-2)]">
              팀 승격은 분기 전환성적 5천만 원, 지사는 2분기 합산 4억 원·FC 5명, 본부는 12억 원·FC 20명. 숫자만 달성하면 누구든 올라갑니다. 본부장의 재량이 아니라 문서화된 기준이 결정합니다.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["5천만", "팀장"],
                ["4억", "지사장"],
                ["12억", "본부장"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="card-v2-flat p-3"
                >
                  <Mono className="text-[18px] font-medium text-[color:var(--accent)] block">
                    {n}원
                  </Mono>
                  <Mono className="text-[10px] text-[color:var(--dim)]">{l}</Mono>
                </div>
              ))}
            </div>
          </div>

          <div className="card-v2 p-8 md:p-10">
            <Mono className="text-[11px] tracking-[0.18em] text-[color:var(--accent)]">
              PRINCIPLE / 02
            </Mono>
            <h3 className="mt-3 text-[26px] md:text-[30px] font-medium text-[color:var(--ink)] tracking-[-0.01em]">
              가치공유 —{" "}
              <span className="font-serif-italic font-light">조직 성장이 곧 수익</span>
            </h3>
            <p className="mt-4 text-[14px] leading-[1.75] text-[color:var(--ink-2)]">
              조직이 커지면 관리수수료(지급률 차액)로, 조직이 분할되면 분할수수료(정액)로 환원됩니다. 성장 전에는 관리자와 설계사가, 분할 후에는 회사와 관리자가 그 가치를 나눕니다.
            </p>
            <div className="mt-6 space-y-2">
              {[
                ["관리수수료", "성장 단계 · 관리자 ↔ 설계사"],
                ["분할수수료", "분할 단계 · 회사 ↔ 관리자"],
                ["운영수수료", "지사·본부 실적 비율로 배분"],
              ].map(([n, l]) => (
                <div
                  key={n}
                  className="flex items-center justify-between card-v2-flat px-3 py-2.5"
                >
                  <Mono className="text-[12px] text-[color:var(--ink)]">{n}</Mono>
                  <span className="text-[11px] text-[color:var(--dim)]">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline: FC → 팀 → 지사 → 본부 */}
        <div className="mb-16">
          <Eyebrow className="mb-10">GROWTH & DIVISION FLOW</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px card-v2 overflow-hidden" style={{ background: "var(--line)" }}>
            {STAGES.map((s, i) => (
              <div
                key={s.k}
                className="relative p-8 pt-7 bg-[color:var(--bg-2)] min-h-[260px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Mono className="block text-[64px] md:text-[80px] leading-none font-medium text-[color:var(--card-accent)] tracking-[-0.04em]">
                      {s.k}
                    </Mono>
                    <Mono className="mt-1 block text-[10px] tracking-[0.18em] text-[color:var(--dim)]">
                      STEP
                    </Mono>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-[color:var(--bg-1)] text-[color:var(--card-accent)] border border-[color:var(--card-accent)]/30 tracking-[0.14em]">
                    {s.caption}
                  </span>
                </div>
                <h4 className="mt-4 text-[22px] md:text-[24px] font-semibold text-[color:var(--ink)] tracking-[-0.01em] leading-[1.2]">
                  {s.title}
                </h4>
                <p className="mt-4 text-[13px] leading-[1.7] text-[color:var(--ink-2)] flex-1">
                  {s.body}
                </p>
                {i < STAGES.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden md:flex z-10 items-center justify-center w-10 h-10 rounded-full bg-[color:var(--card-accent)] shadow-lg">
                    <Icon
                      name="arrowRight"
                      size={18}
                      stroke={2.5}
                      className="text-white"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Slogan */}
        <div className="relative mt-24 pt-16 border-t border-[color:var(--line)]">
          <div className="text-center">
            <Mono className="text-[11px] tracking-[0.2em] text-[color:var(--dim)] uppercase">
              Official Slogan
            </Mono>
            <h3 className="mt-6 font-semibold leading-[0.95] tracking-[-0.03em]" style={{ fontSize: "clamp(40px, 7vw, 104px)" }}>
              <span className="text-[color:var(--ink)]">Springboard</span>
              <br />
              <span className="font-serif-italic font-light text-[color:var(--accent)]">to Opportunity</span>
              <span className="text-[color:var(--ink)]">.</span>
            </h3>
            <p className="mt-6 text-[18px] md:text-[20px] text-[color:var(--ink-2)] font-medium">
              기회의 도약대.
            </p>
            <p className="mt-4 text-[13px] text-[color:var(--dim)] max-w-xl mx-auto leading-[1.7]">
              각 구성원은 독립적으로 성장하지만 그 성장은 공동체 전체로 이어지고, 결과는 다시 개인에게 환원됩니다. 우리가 이 구조를 부르는 이름입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
