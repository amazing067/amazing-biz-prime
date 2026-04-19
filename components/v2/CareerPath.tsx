import { Eyebrow, Mono } from "./Core";

/**
 * 2026 영업규정집 기준
 * - 제15조 팀 승격기준: 분기연결전환성적 5천만 원 이상
 * - 제17조 지사 승격기준: 4분기 내 2분기 합산 4억 원 이상, 인원 5명, 유지율 90%
 * - 제21조 본부 승격기준: 4분기 내 2분기 합산 12억 원 이상, 인원 20명, 비전UP 과정
 * - 별표 1 / 제34조 장기보험 지급률: FC·팀장 70~80% / 지사장 90% / 본부장 97%
 */
const TRACKS = [
  {
    stage: "FC 설계사",
    code: "S.01",
    period: "입사 시",
    milestone: "생·손보 모집자격 취득",
    rate: "장기 70 ~ 80%",
    rateNote: "연동지급률",
    perks: ["10일 정규 교육 무료", "본부 배정 DB 전액 지원", "시니어 1:1 OJT"],
  },
  {
    stage: "팀장",
    code: "S.02",
    period: "분기 전환성적 5천만 원",
    milestone: "팀 분할 · 증원수수료 발생",
    rate: "장기 70 ~ 80%",
    rateNote: "+ 증원수수료",
    perks: ["증원한 FC 지사관리수수료 배분", "팀 단위 운영 권한", "고정지급률 관리자 합의"],
  },
  {
    stage: "지사장",
    code: "S.03",
    period: "2분기 합산 4억 원 · FC 5명",
    milestone: "지사 분할 · 지사관리수수료 발생",
    rate: "장기 최대 90%",
    rateNote: "+ 지사분할수수료",
    perks: ["지사관리수수료 (지급률 차액)", "지사분할수수료", "독립 지점 운영 가능"],
  },
  {
    stage: "본부장",
    code: "S.04",
    period: "2분기 합산 12억 원 · FC 20명",
    milestone: "본부 분할 · 본부관리수수료 발생",
    rate: "장기 97%",
    rateNote: "+ 본부분할수수료",
    perks: ["본부관리수수료", "본부분할수수료 (회사 사업비 지급)", "운영수수료 · 수금수수료"],
  },
];

export default function CareerPath() {
  return (
    <section id="career" className="relative py-32 px-6 bg-[color:var(--bg-2)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[880px] mb-12">
          <Eyebrow>SECTION 09 · 승격 단계</Eyebrow>
          <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[0.98] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
            수수료에{" "}
            <span className="font-serif-italic text-[color:var(--accent)]">장난이</span> 없습니다.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] max-w-[700px] text-[color:var(--ink-2)]">
            프라임에셋의 승격·수수료는 본부장 재량이 아닙니다. 회사가 정한 숫자를 달성하면 누구나 자동으로 관리자로 올라갑니다. 그 숫자와 지급률은{" "}
            <strong className="text-[color:var(--ink)]">2026 영업규정집 61쪽 전체</strong>에 문서로 공개되어 있고, 모든 설계사에게 동일하게 적용됩니다.
          </p>
        </div>

        {/* Transparency proof strip */}
        <div
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[color:var(--line)]"
          style={{ background: "var(--line)" }}
        >
          {[
            {
              k: "61쪽",
              t: "규정집 전면 공개",
              d: "제1장 총칙부터 제6장 복리후생 + 부칙 + 별표 1~6 전체 문서. 설계사 누구나 열람 가능.",
            },
            {
              k: "0%",
              t: "본부장 재량",
              d: "승격 기준 숫자 달성 → 정기평가월 익익월 1일 자동 승격. 관리자 협상·조율 불가.",
            },
            {
              k: "동일",
              t: "지급률 테이블",
              d: "FC·팀장 70~80% · 지사장 90% · 본부장 97%. 별표 1에 명시, 본부별 차등 없음.",
            },
          ].map((p) => (
            <div key={p.t} className="bg-[color:var(--bg-1)] p-7 md:p-8">
              <div className="flex items-baseline gap-2 mb-4">
                <Mono className="text-[36px] md:text-[44px] font-medium tracking-[-0.02em] text-[color:var(--accent)] leading-none">
                  {p.k}
                </Mono>
              </div>
              <div className="text-[16px] font-semibold tracking-tight text-[color:var(--ink)] mb-2">
                {p.t}
              </div>
              <p className="text-[12.5px] leading-[1.65] text-[color:var(--ink-2)]">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute top-[22px] left-0 right-0 h-px bg-[color:var(--line)]" />
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-px"
            style={{ background: "var(--line)" }}
          >
            {TRACKS.map((t, i) => (
              <div
                key={t.code}
                className="relative p-8 transition-colors bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-1)]"
              >
                <div className="relative flex items-center mb-8 h-[44px]">
                  <div className="relative w-11 h-11 rounded-full flex items-center justify-center z-10 border-2 bg-[color:var(--bg-2)] border-[color:var(--accent)] text-[color:var(--accent)]">
                    <Mono className="text-[11px] font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </Mono>
                  </div>
                  {i < TRACKS.length - 1 && (
                    <div className="flex-1 h-px ml-3 bg-[color:var(--line)]" />
                  )}
                </div>

                <Mono className="text-[10px] text-[color:var(--dim)]">{t.code}</Mono>
                <h3 className="mt-2 text-[22px] font-medium tracking-tight mb-1 text-[color:var(--ink)]">
                  {t.stage}
                </h3>

                <div className="mt-5 mb-4 pb-4 border-b border-[color:var(--line)]">
                  <Mono className="text-[9px] block mb-1.5 text-[color:var(--dim)]">
                    승격 조건
                  </Mono>
                  <div className="text-[13px] font-medium text-[color:var(--ink)] leading-[1.45]">
                    {t.period}
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-[color:var(--line)]">
                  <Mono className="text-[9px] block mb-1.5 text-[color:var(--dim)]">
                    승격 시 권한
                  </Mono>
                  <div className="text-[13px] text-[color:var(--ink-2)] leading-[1.45]">
                    {t.milestone}
                  </div>
                </div>

                <div className="mb-5">
                  <Mono className="text-[9px] block mb-1.5 text-[color:var(--dim)]">
                    장기보험 지급률
                  </Mono>
                  <div className="flex items-baseline gap-2">
                    <div className="text-[20px] font-medium tracking-tight text-[color:var(--accent)]">
                      <Mono>{t.rate}</Mono>
                    </div>
                  </div>
                  <Mono className="text-[10px] text-[color:var(--dim)] mt-1 block">
                    {t.rateNote}
                  </Mono>
                </div>

                <ul className="space-y-1.5">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-[11.5px] text-[color:var(--ink-2)] leading-[1.5]"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-[color:var(--accent)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Rules footer */}
        <div className="mt-10 pt-8 border-t border-[color:var(--line)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[12px] text-[color:var(--dim)] leading-[1.6] max-w-[720px]">
            * 2026 영업규정집 제12조~제26조(승격) 및 제34조·별표 1(장기보험 지급률) 기준.
            지사·본부 승격에는 유지율 90% · 자기계약 10% 이하 · 민원 20~30점 미만 등 추가 기준이 적용됩니다.
          </p>
          <Mono className="text-[11px] tracking-[0.14em] text-[color:var(--dim)] whitespace-nowrap">
            PRIME ASSET · THE RULES 2026
          </Mono>
        </div>
      </div>
    </section>
  );
}
