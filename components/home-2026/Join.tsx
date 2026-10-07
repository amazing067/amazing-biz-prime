"use client";

import { motion } from "framer-motion";
import s from "./home.module.css";
import { EASE } from "./Screens";

// 이미 공개된 사실만 쓴다(BRIEF 3장).
const FACTS = [
  { n: 10, u: "일", k: "신입 교육", d: "매월 1일과 15일에 시작합니다" },
  { n: 32, u: "개", k: "제휴 보험사", d: "생명보험 19곳, 손해보험 13곳" },
  { n: 74, u: "쪽", k: "교육 교재", d: "교육 내용을 한 권에 담았습니다" },
];

// 지금 홈페이지에 공개된 10일 커리큘럼
const DAYS = [
  "보험영업 전체 흐름과 꼭 알아야 할 용어",
  "실손보험, 세대별 차이와 4세대 구조",
  "암, 뇌, 심장 3대 질병",
  "수술비와 치료비",
  "운전자, 상해, 치아보험",
  "첫 통화 대본과 거절 대응",
  "고객 역할극으로 1차 미팅 연습",
  "2차 미팅, 설계와 비교와 마무리",
  "모바일 청약, 고지의무, 증권 전달",
  "처음부터 끝까지 실전 모의 훈련",
];

export function Join() {
  return (
    <section id="join" className="relative scroll-mt-16 border-t border-[var(--sa-line)] bg-[var(--sa-paper)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-6"
          >
            <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
              입사 첫날부터
              <br />
              보메이트로 일합니다
            </h2>
            <p className="mt-6 max-w-[32em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.7] text-[var(--sa-ink2)]">
              자료를 모으고 정리하는 일은 보메이트가 맡고, 설계사는 고객과 마주 앉는 시간에 집중합니다.
              처음 시작하는 분은 10일 교육부터 함께합니다. 한 회사 상품만 파는 곳이 아니라, 32개 보험사 상품을 비교해 설계합니다.
            </p>
          </motion.div>

          <dl className="lg:col-span-5 lg:col-start-8">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="grid grid-cols-[minmax(7.5rem,auto)_1fr] items-baseline gap-x-6 border-t border-[var(--sa-line)] py-7 first:border-t-0 first:pt-0 lg:first:pt-2"
              >
                <dt className={`${s.serif} ${s.num} text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none text-[var(--sa-brand)]`}>
                  {f.n}
                  <span className="ml-1 text-[0.4em] font-bold text-[var(--sa-ink)]">{f.u}</span>
                </dt>
                <dd>
                  <p className="text-[18px] font-bold">{f.k}</p>
                  <p className="mt-1 text-[15px] leading-[1.55] text-[var(--sa-dim)]">{f.d}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* 10일 교육 — 하루 하나씩 짧게 */}
        <div className="mt-20 rounded-[24px] bg-[var(--sa-bg)] p-6 sm:p-8 lg:p-10">
          <p className={`${s.serif} text-[24px] font-bold leading-snug sm:text-[28px]`}>10일 동안 배우는 것</p>
          <ol className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {DAYS.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="flex items-baseline gap-4 border-t border-[var(--sa-line)] py-4"
              >
                <span className={`${s.num} w-12 shrink-0 text-[14px] font-bold text-[var(--sa-brand)]`}>{i + 1}일차</span>
                <span className="text-[16px] leading-[1.5] text-[var(--sa-ink)]">{d}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
