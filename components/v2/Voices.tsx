import { Eyebrow, Icon, Mono } from "./Core";

const TESTIMONIALS = [
  {
    q: "DB 분배가 투명하게 공개되는 게 낯설 정도였어요. 덕분에 영업에만 집중합니다.",
    a: "한*진",
    r: "067본부",
    y: "3년차",
  },
  {
    q: "AI로 블로그 초안이 30초 만에 나와요. 밤새던 시간이 없어졌습니다.",
    a: "윤*호",
    r: "290본부",
    y: "온라인",
  },
  {
    q: "32개사 상품 비교가 시스템으로 나오니 고객 앞에서 자신 있어졌어요.",
    a: "박*희",
    r: "292본부",
    y: "기업컨설팅",
  },
];

export default function Voices() {
  return (
    <section
      id="voices"
      className="relative py-28 md:py-40 border-t border-[color:var(--line)] bg-[color:var(--bg-2)]"
      style={{ ["--card-accent" as string]: "#4aaa6e" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1760px] px-6">
        <Eyebrow>05 — Voices</Eyebrow>

        <blockquote className="mt-10 mb-20 max-w-5xl">
          <Icon name="sparkles" size={28} className="text-[#4aaa6e]" />
          <p
            className="mt-5 text-[32px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-semibold text-[color:var(--ink)]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            <span className="text-[color:var(--dim-2)]">&ldquo;</span>예전엔 감정 때문에 지쳤어요.
            <br />
            지금은{" "}
            <span className="font-serif-italic font-semibold text-[#4aaa6e]">
              시스템이 나를 지켜줍니다
            </span>
            .<span className="text-[color:var(--dim-2)]">&rdquo;</span>
          </p>
          <footer className="mt-8 flex items-center gap-4 text-[13px]">
            <div className="w-10 h-10 rounded-full bg-[#4aaa6e] text-white flex items-center justify-center font-semibold">
              한
            </div>
            <div>
              <div className="font-semibold text-[color:var(--ink)]">한*진</div>
              <div className="text-[color:var(--dim)]">067본부 · 3년차</div>
            </div>
          </footer>
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-4">
          {TESTIMONIALS.map((x, i) => (
            <div
              key={i}
              className="group relative card-v2 card-v2-hover p-4 md:p-5 flex flex-col"
            >
              <span
                aria-hidden
                className="absolute top-1.5 right-2.5 font-serif-italic text-[42px] leading-none text-[color:var(--card-accent)]/25 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <Mono className="text-[10px] tracking-[0.14em] text-[color:var(--dim)] font-bold">
                0{i + 1}
              </Mono>
              <p className="mt-2 text-[14px] md:text-[15px] leading-[1.5] text-[color:var(--ink-2)] relative">
                &ldquo;{x.q}&rdquo;
              </p>
              <div className="mt-3 pt-3 border-t border-[color:var(--line)] flex items-center justify-between gap-2">
                <div className="text-[12px] min-w-0 flex-1">
                  <span className="font-bold text-[color:var(--ink)]">{x.a}</span>
                  <span className="text-[color:var(--dim)]"> · {x.r} · {x.y}</span>
                </div>
                <Icon
                  name="arrowUpRight"
                  size={14}
                  stroke={2}
                  className="text-[color:var(--dim)] group-hover:text-[#4aaa6e] transition-colors shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
