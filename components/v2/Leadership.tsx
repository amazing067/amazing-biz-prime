import { Eyebrow, Mono } from "./Core";

const UNITS = [
  {
    code: "067",
    name: "1본부",
    lead: "김본부장",
    tag: "Systems-first",
    focus: "시스템 기반 영업",
    desc: "자체 시스템 11종 운영. 청구.com·보장분석 AI 개발을 주도.",
    metric: { value: "41", label: "Active FCs" },
    color: "var(--accent)",
  },
  {
    code: "290",
    name: "2본부",
    lead: "이본부장",
    tag: "RP-driven",
    focus: "고객 RP 특화",
    desc: "기존 고객 리퍼럴 기반 영업. 평균 계약당 1.8건 리퍼럴.",
    metric: { value: "33", label: "Active FCs" },
    color: "#C4FF3E",
  },
  {
    code: "292",
    name: "3본부",
    lead: "박본부장",
    tag: "Senior-track",
    focus: "시니어 컨설팅",
    desc: "50대+ 자산가 컨설팅 전담. 평균 계약 단가 업계 2배.",
    metric: { value: "27", label: "Active FCs" },
    color: "#FF6A3D",
  },
];

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative py-32 px-6 bg-[color:var(--bg-1)]"
    >
      <div className="max-w-[1760px] mx-auto">
        <div className="max-w-[880px] mb-16">
          <Eyebrow>SECTION 08 · ORGANIZATION</Eyebrow>
          <h2 className="mt-5 text-[clamp(44px,6.2vw,96px)] leading-[0.98] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
            본부 3곳, <span className="font-serif-italic text-[color:var(--dim)]">각기 다른 방식.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] max-w-[620px] text-[color:var(--ink-2)]">
            Prime Asset Amazing은 3개 본부로 구성됩니다. 본부마다 접근법이 다르니, 지원할 때 어울리는 본부를 선택할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UNITS.map((u) => (
            <article
              key={u.code}
              className="group relative rounded-2xl border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 transition-all hover:-translate-y-1 duration-500"
            >
              <div
                className="absolute top-0 left-8 right-8 h-px transition-all group-hover:h-[2px]"
                style={{ background: u.color }}
              />

              <div className="flex items-start justify-between mb-8">
                <div>
                  <Mono className="text-[11px] text-[color:var(--dim)]">UNIT / {u.code}</Mono>
                  <h3 className="mt-2 text-[32px] font-medium tracking-tight text-[color:var(--ink)]">
                    {u.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div
                    className="text-[28px] font-medium tracking-tight leading-none"
                    style={{ color: u.color }}
                  >
                    {u.metric.value}
                  </div>
                  <Mono className="text-[10px] mt-1 block text-[color:var(--dim)]">
                    {u.metric.label}
                  </Mono>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-[color:var(--line)] bg-[color:var(--bg-1)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-[28px] font-medium"
                      style={{ background: u.color, color: "#0A0B10" }}
                    >
                      {u.lead.charAt(0)}
                    </div>
                    <div className="text-[14px] font-medium text-[color:var(--ink)]">
                      {u.lead}
                    </div>
                    <Mono className="text-[11px] mt-0.5 text-[color:var(--dim)]">Unit Lead</Mono>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[color:var(--dim)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    <Mono>ACTIVE</Mono>
                  </span>
                  <Mono>{u.tag.toUpperCase()}</Mono>
                </div>
              </div>

              <div className="mb-5">
                <Mono className="text-[10px] block mb-2 text-[color:var(--dim)]">SPECIALTY</Mono>
                <div className="text-[16px] font-medium text-[color:var(--ink)]">{u.focus}</div>
              </div>

              <p className="text-[13px] leading-[1.6] text-[color:var(--ink-2)]">{u.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
