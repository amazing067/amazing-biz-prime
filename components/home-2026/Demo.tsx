"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import s from "./home.module.css";
import { FitBox } from "./FitBox";
import {
  AgentScreen,
  CLIP_SECONDS,
  CustomerScreen,
  EASE,
  PHONE_H,
  PHONE_W,
  PhoneFrame,
  SinglePhone,
  STEP_COUNT,
} from "./Screens";

// 문구는 Codex 「AI 티」 검수(2026-10-07) 제안. 인증은 기관 3곳을 각각 승인하는 것이 사실이다.
const STEPS = [
  { t: "링크 보내기", d: "조회할 자료를 고른 뒤 고객에게 카카오톡 링크를 보냅니다." },
  { t: "고객 인증", d: "고객은 세 기관의 요청을 자기 휴대폰에서 각각 승인합니다." },
  { t: "자료 모으기", d: "승인이 끝나면 진료내역, 건강검진, 의료비 기록이 들어옵니다." },
  { t: "분석", d: "가입 때 알려야 할 진료(고지), 청구해 볼 진료, 지금 보장을 차례로 살핍니다." },
  { t: "상담 리포트", d: "정리된 자료를 펴 놓고 고객과 이야기합니다." },
];

// PC 무대: 설계사 휴대폰 + (인증 단계에만) 고객 휴대폰
const STAGE_W = 700;
const STAGE_H = 700;
const CUSTOMER_SCALE = 0.86;

function DesktopStage({ step }: { step: number }) {
  return (
    <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
      {/* 설계사 휴대폰 — 고객 휴대폰이 들어오면 왼쪽으로 비켜 선다 */}
      <motion.div
        className="absolute top-[20px]"
        style={{ left: (STAGE_W - PHONE_W) / 2 }}
        animate={{ x: step === 1 ? -150 : 0, scale: step === 4 ? 1.03 : 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <PhoneFrame>
          <AgentScreen step={step} />
        </PhoneFrame>
        <p className="mt-4 text-center text-[13px] font-semibold text-[var(--sa-dim)]">설계사의 보메이트</p>
      </motion.div>

      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="customer"
            className="absolute top-[64px]"
            style={{ left: STAGE_W - PHONE_W * CUSTOMER_SCALE - 10, transformOrigin: "top left" }}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 90 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ transform: `scale(${CUSTOMER_SCALE})`, transformOrigin: "top left" }}>
              <PhoneFrame>
                <CustomerScreen />
              </PhoneFrame>
              <p className="mt-4 text-center text-[15px] font-semibold text-[var(--sa-dim)]">고객 휴대폰</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** 「어메이징사업부의 보메이트 영업지원시스템」 — 누가 만든 무엇인지 색·크기로 바로 보이게(10/8 사장님) */
function SystemTitle({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="rounded-full bg-[var(--sa-brand-soft)] px-2.5 py-0.5 text-[12px] font-bold text-[var(--sa-brand)]">어메이징사업부</span>
        <span className={`${s.serif} text-[20px] font-bold leading-tight text-[var(--sa-ink)]`}>
          <span className="text-[var(--sa-brand)]">보메이트</span> 영업지원시스템
        </span>
      </p>
    );
  }
  return (
    <div className="pl-7">
      <span className="inline-block rounded-full bg-[var(--sa-brand-soft)] px-3.5 py-1 text-[14px] font-bold text-[var(--sa-brand)]">
        어메이징사업부의
      </span>
      <p className={`${s.serif} mt-3 text-[clamp(2rem,3vw,2.75rem)] font-bold leading-[1.15] text-[var(--sa-ink)]`}>
        <span className="text-[var(--sa-brand)]">보메이트</span>
        <br />
        영업지원시스템
      </p>
    </div>
  );
}

/**
 * 「들어오면 있는 것」 중 상담 준비 도구가 실제로 이렇게 움직인다 — 실물 증거.
 * 예전엔 화면 4배 길이 고정 스크롤이라 폰에서 「안 내려간다」 고 느꼈다(Codex 10/8 2차 점검) →
 * 한 화면 안에서 단계를 눌러 고르고, 보이는 동안만 다음 단계로 넘어간다. 교육·입사 조건으로 바로 가는 길도 둔다.
 */
export function Demo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 보이는 동안만 다음 단계로(영상 길이 + 2초). 눌러서 고르면 거기서부터 이어 간다
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => setStep((v) => (v + 1) % STEP_COUNT), (CLIP_SECONDS[step] + 2) * 1000);
    return () => clearTimeout(t);
  }, [step, inView, reduce]);

  return (
    <section id="bomate" ref={ref} className="relative scroll-mt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <p className="text-[14px] font-semibold text-[var(--sa-brand)]">들어오면 있는 것 · 상담 준비 도구</p>
            <h2 className={`${s.serif} mt-3 text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
              링크를 보낸 뒤,
              <br />
              보메이트가 하는 일
            </h2>
            <p className="mt-5 max-w-[36em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)]">
              상담 하루 전 고객에게 링크를 보내 두면, 만나기 전에 자료가 정리됩니다. 실제 보메이트의 순서 그대로입니다.
            </p>
          </div>
          {/* 도구보다 교육·입사 조건이 궁금한 사람을 위한 지름길 */}
          <a
            href="#join"
            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-[var(--sa-line)] px-5 text-[15px] font-semibold text-[var(--sa-ink)] transition-colors hover:bg-[var(--sa-paper)]"
          >
            교육·입사 조건 바로 보기 <ArrowDown size={16} strokeWidth={2.2} />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* PC: 무엇인지 큰 제목 + 단계 목록(눌러서 고름) */}
          <div className="hidden lg:col-span-5 lg:block">
            <SystemTitle />
            <ol className="mt-6">
              {STEPS.map((it, i) => {
                const on = i === step;
                return (
                  <li key={it.t} className="relative">
                    {on && (
                      <motion.span
                        layoutId="sa-step-mark"
                        className="absolute left-0 top-5 h-[calc(100%-40px)] w-[3px] rounded-full bg-[var(--sa-brand)]"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      className="block w-full py-4 pl-7 pr-2 text-left"
                      aria-current={on ? "step" : undefined}
                    >
                      <span
                        className={`${s.serif} block text-[22px] font-bold leading-tight transition-colors duration-300 ${
                          on ? "text-[var(--sa-ink)]" : "text-[var(--sa-dim)]"
                        }`}
                      >
                        {it.t}
                      </span>
                      <span
                        className={`mt-1.5 block max-w-[30em] text-[15.5px] leading-[1.6] transition-colors duration-300 ${
                          on ? "text-[var(--sa-ink2)]" : "text-[var(--sa-dim)]"
                        }`}
                      >
                        {it.d}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 휴대폰: 무엇인지 한 줄 + 단계 버튼(줄바꿈, 가로 스크롤 없음) + 지금 단계 설명 */}
          <div className="lg:hidden">
            <SystemTitle compact />
            <div role="tablist" aria-label="보메이트 상담 준비 순서" className="mt-4 flex flex-wrap gap-1.5">
              {STEPS.map((it, i) => {
                const on = i === step;
                return (
                  <button
                    key={it.t}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setStep(i)}
                    className={`h-10 rounded-full px-3.5 text-[14px] font-semibold transition-colors ${
                      on ? "bg-[var(--sa-brand)] text-[var(--sa-paper)]" : "border border-[var(--sa-line)] bg-[var(--sa-paper)] text-[var(--sa-ink2)]"
                    }`}
                  >
                    {i + 1}. {it.t}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-4 min-h-[3.2em] text-[16px] leading-[1.6] text-[var(--sa-ink2)]"
              >
                {STEPS[step].d}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 무대 */}
          <div className="lg:col-span-7">
            <FitBox w={PHONE_W} h={PHONE_H} className="h-[min(600px,66svh)] lg:hidden">
              <SinglePhone step={step} />
            </FitBox>
            <FitBox w={STAGE_W} h={STAGE_H} className="hidden h-[min(680px,calc(100svh-120px))] lg:block">
              <DesktopStage step={step} />
            </FitBox>
          </div>
        </div>

        <p className="mt-5 text-center text-[13px] text-[var(--sa-dim)] lg:text-right">
          화면 속 고객 이름과 숫자는 이해를 돕기 위한 예시입니다.
        </p>
      </div>
    </section>
  );
}
