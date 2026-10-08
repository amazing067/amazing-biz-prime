"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import s from "./home.module.css";
import { FitBox } from "./FitBox";
import { scrollToY } from "./SmoothScroll";
import {
  AgentScreen,
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
  { t: "분석", d: "고지할 진료, 청구해 볼 진료, 지금 보장을 차례로 살핍니다." },
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

/** 「어메이징사업부의 보메이트 영업지원시스템」 — 누가 만든 무엇인지 색·크기로 바로 보이게 */
function SystemTitle({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
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

export function Demo() {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(v * STEP_COUNT)));
    setStep((cur) => (cur === next ? cur : next));
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const len = el.offsetHeight - window.innerHeight;
    scrollToY(top + ((i + 0.5) / STEP_COUNT) * len);
  };

  return (
    <section id="bomate" className="relative scroll-mt-16">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-10 lg:pt-28">
        <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
          링크를 보낸 뒤,
          <br />
          보메이트가 하는 일
        </h2>
        <p className="mt-5 max-w-[36em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)]">
          상담 하루 전 고객에게 링크를 보내 두면, 만나기 전에 자료가 정리됩니다. 실제 보메이트의 순서 그대로입니다.
        </p>
      </div>

      <div ref={track} className="relative" style={{ height: `${100 + (STEP_COUNT - 1) * 75}svh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="mx-auto grid h-full max-w-[1280px] grid-rows-[auto_1fr_auto] px-4 pb-5 pt-[76px] sm:px-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-8 lg:px-10 lg:pb-8 lg:pt-[88px]">
            {/* 휴대폰 폭: 무엇인지 한 줄 + 지금 단계 제목·설명 */}
            <div className="min-h-[124px] lg:hidden">
              <SystemTitle compact />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="text-[13px] font-semibold text-[var(--sa-brand)]">
                    {STEP_COUNT}단계 중 {step + 1}단계
                  </p>
                  <p className={`${s.serif} mt-1 text-[26px] font-bold leading-tight`}>{STEPS[step].t}</p>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[var(--sa-ink2)]">{STEPS[step].d}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* PC: 무엇인지 큰 제목 + 단계 목록 — 섹션 제목이 스크롤로 사라진 뒤에도 무엇을 보는지 알게(10/8 사장님) */}
            <div className="hidden self-center lg:col-span-5 lg:block">
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
                      onClick={() => goTo(i)}
                      className="block w-full py-5 pl-7 pr-2 text-left"
                      aria-current={on ? "step" : undefined}
                    >
                      <span
                        className={`${s.serif} block text-[24px] font-bold leading-tight transition-colors duration-300 ${
                          on ? "text-[var(--sa-ink)]" : "text-[var(--sa-dim)]"
                        }`}
                      >
                        {it.t}
                      </span>
                      <span
                        className={`mt-2 block max-w-[30em] text-[15.5px] leading-[1.6] transition-colors duration-300 ${
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

            {/* 무대 */}
            <div className="relative min-h-0 lg:col-span-7">
              <FitBox w={PHONE_W} h={PHONE_H} className="h-full lg:hidden">
                <SinglePhone step={step} />
              </FitBox>
              <FitBox w={STAGE_W} h={STAGE_H} className="hidden h-full lg:block">
                <DesktopStage step={step} />
              </FitBox>
            </div>

            <p className="pt-3 text-center text-[12px] text-[var(--sa-dim)] lg:absolute lg:bottom-6 lg:right-10 lg:pt-0">
              화면 속 고객 이름과 숫자는 이해를 돕기 위한 예시입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
