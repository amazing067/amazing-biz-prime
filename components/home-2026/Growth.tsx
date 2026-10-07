"use client";

import { motion } from "framer-motion";
import s from "./home.module.css";
import { EASE } from "./Screens";

const STEPS = [
  {
    role: "FC 설계사",
    condition: "입사 시",
    rate: "70~80%",
    added: "",
    position: "lg:col-start-1 lg:col-span-9",
    tone: "bg-[var(--sa-paper)]",
  },
  {
    role: "팀장",
    condition: "분기 전환성적 5천만 원",
    rate: "70~80%",
    added: "증원수수료",
    position: "lg:col-start-2 lg:col-span-9",
    tone: "bg-[var(--sa-paper)]",
  },
  {
    role: "지사장",
    condition: "2분기 합산 4억 원, FC 5명",
    rate: "최대 90%",
    added: "지사관리수수료, 지사분할수수료",
    position: "lg:col-start-3 lg:col-span-9",
    tone: "bg-[var(--sa-brand-soft)]",
  },
  {
    role: "본부장",
    condition: "2분기 합산 12억 원, FC 20명",
    rate: "97%",
    added: "본부관리수수료, 본부분할수수료",
    position: "lg:col-start-4 lg:col-span-9",
    tone: "bg-[var(--sa-brand)] text-[var(--sa-paper)]",
  },
];

export function Growth() {
  return (
    <section id="growth" className="relative scroll-mt-16 border-t border-[var(--sa-line)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2] lg:col-span-6`}>
            승격은 숫자로
            <br />
            정해집니다
          </h2>
          <p className="max-w-[36em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)] lg:col-span-6 lg:justify-self-end">
            본부장의 재량이 아닙니다. 규정집에 적힌 숫자를 달성하면 승격합니다. 규정집 61쪽은 설계사 누구나 볼 수 있습니다.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-y-4">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.role}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
              className={`${step.position} ${step.tone} rounded-[24px] p-5 sm:p-6`}
            >
              <div className="grid gap-5 sm:grid-cols-[minmax(8rem,1fr)_2fr] sm:items-start lg:grid-cols-[minmax(8rem,1fr)_2fr_1fr_1.6fr] lg:gap-6">
                <div>
                  <span className="mb-3 block h-1 w-8 rounded-full bg-[var(--sa-amber)]" />
                  <p className={`${s.serif} text-[24px] font-bold leading-tight`}>{step.role}</p>
                </div>
                <div>
                  <p className={`text-[12px] font-semibold ${index === 3 ? "text-[var(--sa-brand-soft)]" : "text-[var(--sa-dim)]"}`}>
                    승격 조건
                  </p>
                  <p className="mt-1 text-[16px] font-semibold leading-[1.55]">{step.condition}</p>
                </div>
                <div>
                  <p className={`text-[12px] font-semibold ${index === 3 ? "text-[var(--sa-brand-soft)]" : "text-[var(--sa-dim)]"}`}>
                    장기보험 지급률
                  </p>
                  <p className={`${s.num} mt-1 text-[20px] font-bold leading-[1.4]`}>{step.rate}</p>
                </div>
                <div>
                  <p className={`text-[12px] font-semibold ${index === 3 ? "text-[var(--sa-brand-soft)]" : "text-[var(--sa-dim)]"}`}>
                    더해지는 것
                  </p>
                  {step.added && <p className="mt-1 text-[15px] font-medium leading-[1.55]">{step.added}</p>}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-7 max-w-[72em] text-[12px] leading-[1.7] text-[var(--sa-dim)]">
          2026 영업규정집 제12조~제26조(승격), 제34조·별표 1(장기보험 지급률) 기준. 지사·본부 승격에는 유지율 90%, 자기계약 10% 이하, 민원 기준 등 추가 조건이 있습니다.
        </p>
      </div>
    </section>
  );
}
