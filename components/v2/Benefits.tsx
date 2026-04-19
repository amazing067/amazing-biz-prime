import { Eyebrow, Icon, Mono } from "./Core";

const TIERS = [
  {
    rank: "01",
    title: "높은 수수료율",
    tag: "Commission",
    stat: "업계 상위권",
    desc: "32개 제휴사 오픈 구조로 고객에게 맞는 상품을 팔면, 그게 곧 최고 수수료입니다.",
    items: ["생·손보 32개사 오픈", "회차별 추가 수수료", "리크루팅·지점장 레버리지"],
  },
  {
    rank: "02",
    title: "DB 전액 지원",
    tag: "Leads",
    stat: "월 100건+",
    desc: "설계사가 DB를 사지 않습니다. 본부가 전액 부담하고 설계사는 상담에만 집중합니다.",
    items: ["본부 배정 DB 무료", "자체 유입 콘텐츠 DB", "기존 고객 RP 지원"],
  },
  {
    rank: "03",
    title: "시스템 무료 이용",
    tag: "Tools",
    stat: "11개 시스템",
    desc: "청구.com, 보장분석 AI, 진료내역 조회, 고지의무 분석 — 전부 무료입니다.",
    items: ["청구대행 자동화", "AI 보장분석 리포트", "고지의무 사전 점검"],
  },
  {
    rank: "04",
    title: "교육비 0원",
    tag: "Education",
    stat: "10일 정규 + 상시",
    desc: "10일 정규 교육, 매주 시니어 1:1 OJT, 월 리프레시 교육까지 전부 무료.",
    items: ["10일 신입 부트캠프", "주 1회 시니어 OJT", "월 리프레시 세션"],
  },
  {
    rank: "05",
    title: "치매검사 게임",
    tag: "Asset",
    stat: "5분 · 무료",
    desc: "전문 검진이 아닌 게임형 인지 자가 체크. 누구나 5분이면 가볍게 해보고 결과 리포트로 자연스럽게 상담까지 연결됩니다.",
    items: ["게임형 5분 자가 체크", "결과 리포트 자동 생성", "상담→제안 자연 연결"],
  },
  {
    rank: "06",
    title: "지점장 커리어",
    tag: "Career",
    stat: "3년 내 본부장",
    desc: "성과가 쌓이면 지점·본부 운영 기회까지 — 커리어 경로가 명확합니다.",
    items: ["시니어→매니저→지점장", "리크루팅 수수료", "본부 지분 참여"],
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative py-32 px-6 bg-[color:var(--bg-2)]"
    >
      <div className="relative max-w-[1400px] mx-auto">
        <div className="max-w-[880px] mb-16">
          <Eyebrow>SECTION 07 · COMPENSATION & SUPPORT</Eyebrow>
          <h2 className="mt-5 text-[clamp(40px,5.5vw,72px)] leading-[0.98] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
            우리가 주는 것은
            <br />
            <span className="font-serif-italic text-[color:var(--accent)]">돈만이 아닙니다.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] max-w-[620px] text-[color:var(--ink-2)]">
            수수료·DB·시스템·교육·자산 — 설계사가 혼자 사 모아야 할 모든 것을 본부가 대신 갖춥니다.
            설계사는 상담과 계약에만 집중하세요.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--line)" }}
        >
          {TIERS.map((t) => (
            <div
              key={t.rank}
              className="p-8 transition-all bg-[color:var(--bg-2)] hover:bg-[color:var(--bg-1)]"
            >
              <div className="flex items-start justify-between mb-5">
                <Mono className="text-[11px] text-[color:var(--dim)]">
                  {t.rank} · {t.tag.toUpperCase()}
                </Mono>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-[color:var(--bg-1)] text-[color:var(--accent)] border border-[color:var(--line)]">
                  {t.stat}
                </span>
              </div>
              <h3 className="text-[24px] font-medium tracking-tight mb-3 text-[color:var(--ink)]">
                {t.title}
              </h3>
              <p className="text-[13px] leading-[1.65] mb-5 text-[color:var(--ink-2)]">{t.desc}</p>
              <ul className="space-y-2">
                {t.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-[12.5px] text-[color:var(--dim)]"
                  >
                    <Icon
                      name="check"
                      size={13}
                      stroke={2}
                      className="mt-0.5 flex-shrink-0 text-[color:var(--accent)]"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
