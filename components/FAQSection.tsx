"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, BadgeCheck, ArrowRight, ShieldCheck } from "lucide-react";

type FAQ = {
  q: string;
  summary: string;
  bullets: string[];
  href?: string;
  cta?: string;
};

const quickChecks = [
  { icon: BadgeCheck, text: "신입 OK · 7일 온보딩" },
  { icon: ShieldCheck, text: "규칙+기록 기반 운영" },
  { icon: BadgeCheck, text: "원치 않으면 추가 연락 종료" },
];

const faqs: FAQ[] = [
  {
    q: "보험 영업이 처음인데 신입도 바로 시작할 수 있나요?",
    summary:
      "가능합니다. ‘혼자 준비’가 아니라 7일 온보딩 흐름을 따라가며 시작합니다.",
    bullets: [
      "Day1 계정·포털·권한 세팅",
      "상담 스크립트·실습 + 사례 기반 피드백",
      "동행/코칭으로 첫 루틴을 빠르게 고정",
    ],
    href: "#onboarding",
    cta: "7일 온보딩 보기",
  },
  {
    q: "입사 후 어떤 시스템과 도구를 언제부터 쓸 수 있나요?",
    summary:
      "합류 승인 후 온보딩 Day1부터 핵심 도구를 순차적으로 세팅해 드립니다.",
    bullets: [
      "영업지원 포털(대시보드/업무 흐름)",
      "블로그 AI · 청구 허브 · 치매검사(고객도구) 연동",
      "권한/사용 흐름은 온보딩에서 함께 셋업",
    ],
    href: "#ecosystem",
    cta: "실제 서비스 보기",
  },
  {
    q: "DB는 어떤 기준으로 분배되나요? 공정성이 궁금합니다.",
    summary:
      "분배는 ‘느낌’이 아니라 규칙과 기록으로 운영되며, 본인이 확인 가능한 구조입니다.",
    bullets: [
      "입력 → 분배 룰 → 대시보드로 흐름이 정리",
      "본인 배정/대기/상태를 포털에서 확인",
      "운영 예외는 규정 기반으로 처리",
    ],
    href: "#flow",
    cta: "DB 분배 흐름 보기",
  },
  {
    q: "상담 스크립트나 제안 템플릿도 제공되나요?",
    summary:
      "네. 질문→진단→제안 흐름을 표준화한 스크립트/템플릿을 제공합니다.",
    bullets: [
      "초기 상담 질문 리스트 + 니즈 파악 프레임",
      "제안 구조 템플릿(설명/비교/정리)",
      "체크리스트/샘플 문서로 실전 적용",
    ],
    href: "#proof-pack",
    cta: "Proof Pack 보기",
  },
  {
    q: "콘텐츠(블로그/쇼츠) 제작은 어느 정도까지 지원되나요?",
    summary:
      "초안 생성부터 촬영 환경까지 ‘개인 역량’이 아니라 ‘시스템’으로 지원합니다.",
    bullets: [
      "블로그 AI로 글·Q&A 초안 빠르게 생성",
      "스튜디오/촬영 지원으로 영상까지 연결",
      "지속 생산 루틴을 온보딩/교육으로 고정",
    ],
    href: "#studio",
    cta: "스튜디오 보기",
  },
  {
    q: "스튜디오는 누가, 어떻게 예약해서 사용할 수 있나요?",
    summary:
      "합류 설계사는 일정 조율 후 예약 가능하며, 촬영 목적에 맞춰 지원 범위를 안내합니다.",
    bullets: [
      "포털/담당자 통해 일정·목적 접수",
      "장비/세팅/촬영·편집 지원 범위 안내",
      "확정 후 예약 진행(운영 정책 기준)",
    ],
    href: "#studio",
    cta: "스튜디오 환경 보기",
  },
  {
    q: "근무 방식은 지점 출근인가요, 아니면 유연하게 가능한가요?",
    summary:
      "오프라인 거점을 중심으로 협업하되, 일정/미팅/작업은 유연하게 운영됩니다.",
    bullets: [
      "지점/스튜디오 거점 기반 협업 가능",
      "포털·화상·메신저 기반 운영 병행",
      "세부 방식은 상황에 맞춰 조율",
    ],
    href: "#recruit",
    cta: "지원 문의 남기기",
  },
  {
    q: "정산/수수료 구조는 어떻게 안내되나요?",
    summary:
      "정산/수수료 구조는 1:1 면담에서 투명하게 안내합니다.",
    bullets: [
      "정산 주기/방식 및 구조를 설명",
      "본인 상황에 맞춘 시뮬레이션/예시 안내",
      "불필요 비용 강요는 지양",
    ],
    href: "#recruit",
    cta: "면담 요청하기",
  },
  {
    q: "지원하면 어떤 절차로 진행되나요?",
    summary:
      "지원 → 담당자 연락 → 상담(온라인/대면) → 합류 여부 결정 순서로 진행됩니다.",
    bullets: [
      "온보딩/시스템/운영 방식 상세 안내",
      "원치 않으면 추가 연락 없이 종료",
      "지원서는 하단 폼에서 1분 작성",
    ],
    href: "#recruit",
    cta: "지원 폼으로 이동",
  },
  {
    q: "연락은 얼마나 오며, 개인정보는 안전하게 처리되나요?",
    summary:
      "지원 문의 응대를 위한 최소한의 연락만 드리며, 목적 달성 후 파기합니다.",
    bullets: [
      "마케팅성 연락을 무한정 하지 않음",
      "문의 응대/절차 진행 목적에만 사용",
      "Recruit 섹션에서 동의/정책 재확인 가능",
    ],
    href: "#recruit",
    cta: "연락/정책 확인",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            설계사 입사 FAQ
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            지원 전에 가장 많이 묻는 질문만 정리했습니다.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {quickChecks.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={`rounded-2xl border overflow-hidden ${
                  isOpen
                    ? "border-electric-blue/40 bg-white shadow-soft-lg"
                    : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 md:py-6 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-inset rounded-2xl text-base md:text-lg"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pt-4 pb-5 border-t border-slate-100">
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base font-medium">
                          {item.summary}
                        </p>
                        <ul className="mt-3 space-y-2 text-slate-600 text-sm md:text-base leading-relaxed">
                          {item.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-slate-400/70 flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {item.href && item.cta && (
                          <a
                            href={item.href}
                            className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-4 py-2.5 font-semibold shadow-soft hover:shadow-soft-lg transition-all"
                          >
                            {item.cta}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-slate-500">
          고객(청구/서류/계산기) 문의는 <a className="underline hover:text-slate-700" href="https://청구.com" target="_blank" rel="noreferrer">청구.com</a>에서 더 빠르게 해결됩니다.
        </div>
      </div>
    </section>
  );
}