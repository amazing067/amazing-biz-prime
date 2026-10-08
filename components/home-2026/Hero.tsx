"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import s from "./home.module.css";
import { FitBox } from "./FitBox";
import {
  CLIP_SECONDS,
  EASE,
  PHONE_H,
  PHONE_W,
  SinglePhone,
  STEP_COUNT,
} from "./Screens";

const STEP_NAMES = [
  "링크 보내기",
  "고객 인증",
  "자료 모으기",
  "분석",
  "상담 리포트",
];

export function Hero() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(true);
  const next = () => setStep((v) => (v + 1) % STEP_COUNT);

  // 첫 화면이 안 보이면 단계 넘김을 멈춘다 — 아래로 내려간 뒤에 다음 영상을 계속 불러오지 않게(Codex 10/8 P2)
  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      setStep(STEP_COUNT - 1);
      return;
    }
    if (!inView) return;
    // 실제 화면 영상이 끝나면 다음 단계로 넘어간다(onEnded). 영상 재생이 막힌 기기(절전 모드 등)를 위해 길이+2초 뒤에도 넘긴다.
    const t = setTimeout(next, (CLIP_SECONDS[step] + 2) * 1000);
    return () => clearTimeout(t);
  }, [step, reduce, inView]);

  const line = (text: string, i: number, cls = "") => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${cls}`}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="hero" className={`${s.night} relative overflow-hidden`}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 pb-14 pt-28 sm:px-6 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-10 lg:pt-24">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[14px] font-semibold text-[var(--sa-glow)]"
          >
            보험설계사 모집
          </motion.p>
          <h1
            className={`${s.serif} mt-4 text-[clamp(2.25rem,5.4vw,4.5rem)] font-bold leading-[1.12]`}
          >
            {line("상담 준비는", 0)}
            {line("보메이트가 합니다", 1, "text-[var(--sa-glow)]")}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-[34em] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--sa-on-night-dim)]"
          >
            고객에게 카카오톡 링크를 보내면 진료내역, 건강검진, 실손 미청구 확인
            자료와 상담 리포트까지 한곳에 정리됩니다. 어메이징사업부가 직접 만든
            프로그램이라, 소속 설계사는 입사 첫날부터 씁니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#apply"
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[var(--sa-on-night)] px-7 text-[16px] font-semibold text-[var(--sa-ink)] transition-[transform,background-color] duration-200 hover:bg-white active:scale-[0.98]"
            >
              지원하기 <ArrowRight size={18} strokeWidth={2.2} />
            </a>
            <a
              href="#bomate"
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/25 px-7 text-[16px] font-semibold text-[var(--sa-on-night)] transition-[transform,background-color] duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              보메이트 살펴보기 <ArrowDown size={17} strokeWidth={2.2} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative lg:col-span-5"
        >
          {/* 휴대폰 아래로 번지는 빛 — 무대 조명 하나 */}
          <div className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-[26%] rounded-full bg-[rgba(64,150,170,0.45)] blur-[60px]" />
          <p className="relative mb-3 h-5 text-center text-[13px] font-semibold text-[var(--sa-on-night-dim)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={step === 1 ? "c" : "a"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {step === 1 ? "고객 휴대폰" : "설계사의 보메이트"}
              </motion.span>
            </AnimatePresence>
          </p>
          <FitBox
            w={PHONE_W}
            h={PHONE_H}
            className="relative h-[min(560px,70svh)] lg:h-[min(660px,calc(100svh-230px))]"
          >
            <div className="rounded-[48px] ring-1 ring-white/10">
              <SinglePhone step={step} onEnded={reduce ? undefined : next} />
            </div>
          </FitBox>
          {/* 단계 이름을 누르면 그 단계 영상으로 바로 넘어간다(10/8 사장님). 폰에서도 보이게 — 줄이 모자라면 두 줄로 */}
          <ol
            className="relative mt-5 flex flex-wrap justify-center gap-x-0.5 gap-y-1 text-[13px] md:mt-6 md:gap-x-2"
            aria-label="보메이트 상담 준비 순서"
          >
            {STEP_NAMES.map((n, i) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={i === step}
                  className={`relative whitespace-nowrap rounded-full px-1.5 pb-2.5 pt-1.5 transition-colors md:px-2.5 duration-300 hover:text-[var(--sa-on-night)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sa-glow)] ${
                    i === step
                      ? "font-semibold text-[var(--sa-on-night)]"
                      : "text-[var(--sa-on-night-dim)]"
                  }`}
                >
                  {n}
                  {i === step && (
                    <motion.span
                      layoutId="hero-step"
                      className="absolute inset-x-1.5 bottom-0.5 h-[2px] rounded-full bg-[var(--sa-glow)] md:inset-x-2.5"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
