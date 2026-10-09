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

/**
 * 들어오면 있는 것 — 첫 화면의 주어는 「사업부가 설계사를 찾는다」, 이것들은 들어올 이유(무기)다(10/8 사장님 「리크루팅인데 보메이트 앱 홍보가 됐다」 · Codex 진단 · C안).
 *   앞의 두 개(편한 도구 · 현장 개발자)를 강조. 사이트에 이미 있는 사실과 사장님 말씀만 — 숫자를 지어내지 않는다
 */
const REASONS = [
  { title: "상담 준비가 편합니다", body: "링크 하나로 고객 자료부터 상담 리포트까지" },
  { title: "개발자가 현장에 있습니다", body: "쓰다 불편하면 사업부 개발자가 같이 고칩니다" },
  { title: "10일 교육", body: "처음이라면 매월 1일·15일 시작하는 교육부터" },
  { title: "32개 보험사", body: "생명보험 19곳 · 손해보험 13곳 상품 비교" },
];

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
          {/* 누가 찾는지 먼저 — 회사 이름이 첫 5초에 보이게(10/8 사장님) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5"
          >
            <span className="rounded-full bg-[var(--sa-on-night)] px-3.5 py-1 text-[14px] font-bold text-[var(--sa-ink)]">
              프라임에셋 어메이징사업부
            </span>
            <span className="text-[14px] font-semibold text-[var(--sa-glow)]">보험설계사 모집</span>
          </motion.p>
          <h1
            className={`${s.serif} mt-5 text-[clamp(2.1rem,4.8vw,4rem)] font-bold leading-[1.15]`}
          >
            {line("함께 일할", 0)}
            {line("보험설계사를 찾습니다", 1, "text-[var(--sa-glow)]")}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-5 max-w-[36em] text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.7] text-[var(--sa-on-night-dim)]"
          >
            어메이징사업부에는 상담 준비를 덜어 주는 자체 도구가 있고, 그 도구를 만든
            개발자가 사업부 안에서 설계사와 같이 고칩니다. 처음이라면 10일 교육부터 함께합니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#apply"
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[var(--sa-on-night)] px-7 text-[16px] font-semibold text-[var(--sa-ink)] transition-[transform,background-color] duration-200 hover:bg-white active:scale-[0.98]"
            >
              지원하기 <ArrowRight size={18} strokeWidth={2.2} />
            </a>
            <a
              href="#join"
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/25 px-7 text-[16px] font-semibold text-[var(--sa-on-night)] transition-[transform,background-color] duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              우리에게 오면 <ArrowDown size={17} strokeWidth={2.2} />
            </a>
          </motion.div>
          {/* 들어오면 있는 것 — 들어올 이유(무기). 앞의 두 개 강조 */}
          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            className="mt-8 grid max-w-[660px] grid-cols-2 gap-2.5"
            aria-label="어메이징사업부에 들어오면 있는 것"
          >
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className={`rounded-2xl px-4 py-3 ring-1 ${i < 2 ? "bg-white/[0.09] ring-[var(--sa-glow)]/40" : "bg-white/[0.05] ring-white/10"}`}
              >
                <dt className="text-[15px] font-bold text-[var(--sa-on-night)] sm:text-[16px]">{r.title}</dt>
                <dd className="mt-1 text-[14px] leading-[1.5] text-[var(--sa-on-night-dim)]">{r.body}</dd>
              </div>
            ))}
          </motion.dl>
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
