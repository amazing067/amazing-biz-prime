"use client";

import { useState } from "react";
import { Eyebrow, Icon, Mono } from "./Core";

const ITEMS = [
  {
    q: "수수료 체계는 어떻게 되나요?",
    a: "32개 제휴사 오픈 구조 기반으로 업계 상위권 수수료율을 지급합니다. 회차별 추가 수수료와 리크루팅·지점장 오버라이드까지 포함된 누적 구조로, 장기적으로 커리어와 함께 수익이 쌓이는 모델입니다. 정확한 체계는 면접 단계에서 본부별로 공개됩니다.",
  },
  {
    q: "기존 회사에서 고객을 가져올 수 있나요?",
    a: "가능합니다. 다만 보험업법과 개인정보 보호법을 준수한 절차를 밟아야 하며, 내부 컴플라이언스 팀이 이전 절차를 지원합니다. 청구.com·보장분석 AI를 활용해 기존 고객 RP(리퍼럴)로 자연스럽게 연결하는 방식을 추천합니다.",
  },
  {
    q: "교육비나 시스템 이용료가 있나요?",
    a: "전부 무료입니다. 10일 정규 부트캠프, 주 1회 시니어 OJT, 월 리프레시 교육, 그리고 자체 시스템 11종(청구.com / 보장분석 AI / 진료내역 조회 등) 모두 본부가 부담합니다.",
  },
  {
    q: "DB(고객 데이터베이스)는 직접 구매해야 하나요?",
    a: "아닙니다. 본부가 전액 지원합니다. 월 100건+ 규모의 배정 DB + 자체 콘텐츠·카페 유입 DB + 기존 고객 RP를 통합 지원해, 설계사가 DB 구매 비용으로 고민할 일이 없습니다.",
  },
  {
    q: "초보자도 가능한가요? 경력이 없어도 되나요?",
    a: "가능합니다. 오히려 타사 경력자의 습관을 다시 잡는 것보다, 처음부터 시스템 기반으로 교육받는 편이 빠릅니다. 신입 전용 10일 부트캠프가 준비되어 있고, 수료 후 첫 계약까지 평균 3주입니다.",
  },
  {
    q: "본부는 어떻게 선택하나요?",
    a: "3개 본부(067 / 290 / 292)는 각각 \"시스템 기반\", \"RP 기반\", \"시니어 컨설팅\" 특화입니다. 1차 면접 후 본부장과 매칭 면담을 통해 어울리는 본부로 배정됩니다. 이동도 가능합니다.",
  },
  {
    q: "근무 형태는 어떻게 되나요?",
    a: "기본은 하이브리드입니다. 고객 미팅·출동 외에는 자율 근무. 다만 신입 6개월은 사무실 출근 권장(OJT·동행 미팅 때문)입니다. 이후에는 개인 스타일에 맞춥니다.",
  },
  {
    q: "청구.com·보장분석 AI는 어떤 건가요?",
    a: "자체 개발한 사내 시스템입니다. 청구.com은 실손 청구 대행 자동화, 보장분석 AI는 고객 계약·진료내역·고지의무를 분석해 제안서 PDF까지 자동 생성합니다. 실제 설계사 업무의 40%+를 자동화합니다.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-32 px-6 bg-[color:var(--bg-1)]">
      <div className="max-w-[1500px] mx-auto grid md:grid-cols-[420px_1fr] gap-16">
        <div className="md:sticky md:top-28 self-start">
          <Eyebrow>자주 묻는 질문</Eyebrow>
          <h2 className="mt-5 text-[clamp(40px,4.6vw,72px)] leading-[0.98] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
            자주 묻는 <br />
            <span className="font-serif-italic text-[color:var(--dim)]">질문들.</span>
          </h2>
          <p className="mt-6 text-[14px] leading-[1.7] text-[color:var(--ink-2)]">
            지원하기 전에 궁금할 만한 것들을 모았습니다. 이 외 질문은{" "}
            <a
              href="#apply"
              className="underline decoration-[color:var(--accent)] underline-offset-4"
            >
              지원하기
            </a>{" "}
            폼에서 직접 물어보세요.
          </p>
          <div className="mt-10 pt-8 border-t border-[color:var(--line)]">
            <span className="text-[12px] font-medium block mb-3 text-[color:var(--dim)]">더 궁금한 점이 있다면</span>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--ink)]"
            >
              직접 물어보기 <Icon name="arrowRight" size={14} />
            </a>
          </div>
        </div>

        <div className="border-t border-[color:var(--line)]">
          {ITEMS.map((it, i) => (
            <div key={i} className="border-b border-[color:var(--line)]">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="group w-full flex items-start justify-between gap-6 py-6 text-left transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <span
                    className="text-[17px] md:text-[19px] font-medium tracking-tight leading-[1.4]"
                    style={{ color: open === i ? "var(--ink)" : "var(--ink-2)" }}
                  >
                    {it.q}
                  </span>
                </div>
                <span
                  className="mt-1.5 flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all"
                  style={{
                    borderColor: open === i ? "var(--accent)" : "var(--line)",
                    background: open === i ? "var(--accent)" : "transparent",
                    color: open === i ? "var(--accent-ink)" : "var(--ink)",
                  }}
                >
                  <Icon name={open === i ? "minus" : "plus"} size={14} stroke={2} />
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{ maxHeight: open === i ? "340px" : "0" }}
              >
                <div className="pb-7 pl-10 pr-12">
                  <p className="text-[14px] leading-[1.75] text-[color:var(--ink-2)]">{it.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
