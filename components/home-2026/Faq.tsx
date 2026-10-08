"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import s from "./home.module.css";
import { EASE } from "./Screens";

// 어메이징사업부 카카오톡 채널 1:1 상담(Footer·ApplyForm 과 같은 주소)
const KAKAO = "https://pf.kakao.com/_mSxkxgn/chat";

const QUESTIONS = [
  {
    question: "경력이 없어도 할 수 있나요?",
    answer: "가능합니다. 처음 시작하는 분은 10일 교육부터 함께합니다. 교육은 매월 1일과 15일에 시작합니다.",
  },
  {
    question: "보메이트는 무엇인가요?",
    answer:
      "사서 쓰는 외부 프로그램이 아니라, 어메이징사업부 소속 개발자가 직접 만들고 운영하는 상담 준비 프로그램입니다. 고객에게 카카오톡 링크를 보내면 진료내역, 건강검진, 의료비 기록을 불러와 고지 분석, 실손 미청구 찾기, 보장 비교, 상담 리포트까지 이어집니다.",
  },
  {
    question: "본부는 어떻게 되어 있나요?",
    answer:
      "067본부와 290본부, 두 본부가 하나의 어메이징사업부로 함께 일합니다. 어느 본부에서 일하든 보메이트를 입사 첫날부터 똑같이 씁니다.",
  },
  {
    question: "수수료와 승격 기준은 어떻게 되나요?",
    answer:
      "2026 영업규정집에 적힌 지급률과 승격 기준을 모든 설계사에게 똑같이 적용합니다. 자세한 내용은 면접에서 규정집으로 직접 보여 드립니다.",
  },
  {
    question: "근무 형태는 어떻게 되나요?",
    answer:
      "고객 미팅 외에는 자율 근무가 기본입니다. 다만 신입 6개월은 교육과 동행 미팅 때문에 사무실 출근을 권합니다.",
  },
  {
    question: "다니던 회사의 고객을 이어서 관리할 수 있나요?",
    answer:
      "가능합니다. 보험업법과 개인정보 보호법을 지키는 절차를 밟아야 하며, 그 절차를 함께 도와드립니다.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-16 border-t border-[var(--sa-line)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="lg:col-span-4">
          <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
            자주 묻는
            <br />
            질문
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="min-w-0 lg:col-span-8"
        >
          <div className="border-t border-[var(--sa-line)]">
            {QUESTIONS.map((item) => (
              <details key={item.question} className={`${s.faq} group border-b border-[var(--sa-line)]`}>
                <summary className="flex min-h-[72px] cursor-pointer items-center justify-between gap-4 py-4 text-left text-[17px] font-bold leading-[1.5] text-[var(--sa-ink)] sm:text-[18px]">
                  <span>{item.question}</span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--sa-brand-soft)] text-[var(--sa-brand)]">
                    <Plus className={`${s.chev} transition-transform duration-200`} size={20} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-[44em] pb-6 pr-14 text-[15.5px] leading-[1.7] text-[var(--sa-ink2)] sm:text-[16px]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-[var(--sa-brand)] p-6 text-[var(--sa-paper)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            {/* 전화·카카오톡을 바로 누를 수 있게(10/8 사장님 「카카오톡으로 문의해도 된다고」) */}
            <p className="max-w-[34em] text-[16px] font-medium leading-[1.65]">
              더 궁금한 점은 지원서에 적어 주시거나 전화{" "}
              <a href="tel:02-2038-4379" className="whitespace-nowrap font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white">
                02-2038-4379
              </a>
              , 또는{" "}
              <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white">
                카카오톡
              </a>
              으로 편하게 물어보세요.
            </p>
            <div className="mt-5 flex shrink-0 flex-wrap gap-2 sm:mt-0">
              <a
                href={KAKAO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#FEE500] px-6 text-[15px] font-semibold text-[#191919] transition-transform duration-200 active:scale-[0.98]"
              >
                <MessageCircle size={17} strokeWidth={2.2} /> 카카오톡 문의
              </a>
              <a
                href="#apply"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--sa-paper)] px-6 text-[15px] font-semibold text-[var(--sa-brand-deep)] transition-transform duration-200 active:scale-[0.98]"
              >
                지원서 쓰기 <ArrowRight size={17} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
