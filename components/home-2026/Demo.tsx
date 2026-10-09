"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowDown, ArrowLeft, Check, HeartPulse, ReceiptText, Stethoscope } from "lucide-react";
import s from "./home.module.css";
import { FitBox } from "./FitBox";
import { scrollToY } from "./SmoothScroll";
import {
  AgentScreen,
  ClaimScreen,
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

// PC 무대: 설계사 휴대폰 + 단계마다 옆에 갈라져 나오는 것(10/9 사장님 「고객 인증처럼 갈라져서 자세하게」)
//   1 고객 인증 = 고객 휴대폰 · 2 자료 모으기 = 세 기관 자료 도착 · 3 분석 = 휴대폰 두 대(가입 전 확인 | 청구해 볼 진료)
//   4 상담 리포트 = 리포트 4쪽이 휴대폰 뒤에서 양옆으로 겹치지 않게 펼쳐짐(1·2쪽 왼쪽, 3·4쪽 오른쪽)
const STAGE_W = 700;
const STAGE_H = 700;
const SIDE_SCALE = 0.86;

// 자료 모으기 — 이름·기간은 보메이트 「어떤 조회를 보낼까요?」 화면과 진료내역 화면에 적힌 그대로
const SOURCES = [
  { Icon: Stethoscope, t: "진료내역", d: "건강보험심사평가원 · 최근 5년" },
  { Icon: HeartPulse, t: "건강검진", d: "국민건강보험공단 · 10년" },
  { Icon: ReceiptText, t: "의료비·실손", d: "홈택스 · 5년치" },
];

/** 고객 인증 뒤 세 기관 자료가 차례로 들어와 설계사 휴대폰으로 모이는 모습 */
function SourcesPanel() {
  return (
    <div className="w-[290px]">
      <p className="mb-3 text-[13.5px] font-bold text-[var(--sa-dim)]">고객 인증이 끝나면 세 곳에서 들어옵니다</p>
      <ul className="space-y-3">
        {SOURCES.map(({ Icon, t, d }, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.3, ease: EASE }}
            className="relative flex items-center gap-3 rounded-2xl border border-[var(--sa-line)] bg-white px-4 py-3.5 shadow-[0_12px_26px_-16px_rgba(15,30,36,0.4)]"
          >
            {/* 설계사 휴대폰 쪽으로 들어가는 선 */}
            <span aria-hidden className="absolute -left-[34px] top-1/2 flex -translate-y-1/2 items-center text-[var(--sa-brand)]">
              <ArrowLeft size={15} strokeWidth={2.4} />
              <span className="h-0 w-4 border-t-2 border-dashed border-current opacity-50" />
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--sa-brand-soft)] text-[var(--sa-brand)]">
              <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-bold leading-tight text-[var(--sa-ink)]">{t}</span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--sa-dim)]">{d}</span>
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.55 + i * 0.3, ease: EASE }}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--sa-brand)] px-2.5 py-1 text-[12px] font-bold text-[var(--sa-paper)]"
            >
              <Check size={12} strokeWidth={3} aria-hidden="true" /> 도착
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** 오른쪽에 작게 들어오는 두 번째 휴대폰(고객 인증 · 분석) */
function SidePhone({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <motion.div
      key={id}
      className="absolute top-[64px]"
      style={{ left: STAGE_W - PHONE_W * SIDE_SCALE - 10, transformOrigin: "top left" }}
      initial={{ opacity: 0, x: 90 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 90 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div style={{ transform: `scale(${SIDE_SCALE})`, transformOrigin: "top left" }}>
        <PhoneFrame>{children}</PhoneFrame>
        <p className="mt-4 text-center text-[15px] font-semibold text-[var(--sa-dim)]">{label}</p>
      </div>
    </motion.div>
  );
}

// 상담 리포트 4쪽 — 리포트 녹화 영상(예시 고객)을 이어 붙여 한 장으로 되살린 뒤 카드 사이 빈 줄에서 A4 비율로 자른 것
const REPORT_PAGES = [
  { src: "/videos/home/bomate-report-page-1.jpg", alt: "상담 리포트 1쪽 — 지급 기록이 없는 실손보험금, 진료·검진 요약" },
  { src: "/videos/home/bomate-report-page-2.jpg", alt: "상담 리포트 2쪽 — 한 줄로 보면, 지금 할 일" },
  { src: "/videos/home/bomate-report-page-3.jpg", alt: "상담 리포트 3쪽 — 이번 상담 뒤 할 일, 자세히 보기" },
  { src: "/videos/home/bomate-report-page-4.jpg", alt: "상담 리포트 4쪽 — 실손보험금, 확인할 보장, 오늘 정할 것" },
];
// 겹치지 않게 쫙 펼친다(10/9 사장님) — 가운데 휴대폰 뒤에서 나와 왼쪽 두 장(1·2쪽) · 오른쪽 두 장(3·4쪽)
const PAGE_W = 168;
const PAGE_H = Math.round(PAGE_W * 1.414);
const SPREAD = [
  { left: 14, top: 96, rotate: -1.5 },
  { left: 14, top: 352, rotate: 1 },
  { left: STAGE_W - 14 - PAGE_W, top: 96, rotate: 1.5 },
  { left: STAGE_W - 14 - PAGE_W, top: 352, rotate: -1 },
];

/** 상담 리포트 4쪽이 휴대폰 뒤에서 양옆으로 펼쳐져 나오고, 1→4쪽 차례로 살짝 떠올라 읽는 순서를 보여 준다 */
function ReportPages() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setInterval> | undefined;
    // 다 펼쳐진 뒤부터 차례 표시를 시작한다
    const start = setTimeout(() => {
      setActive(0);
      t = setInterval(() => setActive((a) => (a + 1) % REPORT_PAGES.length), 1600);
    }, 1300);
    return () => {
      clearTimeout(start);
      if (t) clearInterval(t);
    };
  }, [reduce]);

  return (
    <>
      {REPORT_PAGES.map((p, i) => {
        const pos = SPREAD[i];
        const on = i === active;
        // 가운데 휴대폰 한복판에서 출발한다
        const fromX = STAGE_W / 2 - (pos.left + PAGE_W / 2);
        const fromY = STAGE_H / 2 - (pos.top + PAGE_H / 2);
        return (
          <motion.div
            key={p.src}
            className={`absolute rounded-[6px] bg-white p-[6px] ${
              on
                ? "shadow-[0_22px_40px_-18px_rgba(15,30,36,0.55),0_0_0_2px_var(--sa-brand)]"
                : "shadow-[0_16px_30px_-18px_rgba(15,30,36,0.45),0_1px_3px_rgba(15,30,36,0.12)]"
            }`}
            style={{ left: pos.left, top: pos.top, width: PAGE_W, height: PAGE_H }}
            initial={{ opacity: 0, x: fromX, y: fromY, scale: 0.55, rotate: 0 }}
            animate={{ opacity: 1, x: 0, y: on ? -8 : 0, scale: on ? 1.05 : 1, rotate: pos.rotate }}
            exit={{ opacity: 0, x: fromX * 0.6, y: fromY * 0.6, scale: 0.6 }}
            transition={{ duration: active < 0 ? 0.75 : 0.45, delay: active < 0 ? 0.15 + i * 0.12 : 0, ease: EASE }}
          >
            <Image src={p.src} alt={p.alt} width={600} height={848} sizes="180px" className="block h-full w-full rounded-[3px] object-cover object-top" />
            <span
              className={`absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full text-[12px] font-bold transition-colors duration-300 ${
                on ? "bg-[var(--sa-brand)] text-[var(--sa-paper)]" : "bg-[var(--sa-paper)] text-[var(--sa-ink2)] ring-1 ring-[var(--sa-line)]"
              }`}
            >
              {i + 1}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}

function DesktopStage({ step }: { step: number }) {
  // 1~3 단계는 오른쪽에 무언가 들어와 휴대폰이 왼쪽으로 비킨다. 4(상담 리포트)는 휴대폰을 가운데 두고 양옆으로 펼친다
  const split = step >= 1 && step <= 3;
  return (
    <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
      {/* 설계사 휴대폰 — 리포트 쪽들이 이 뒤에서 나오도록 위에 둔다 */}
      <motion.div
        className="absolute top-[20px] z-10"
        style={{ left: (STAGE_W - PHONE_W) / 2 }}
        animate={{ x: split ? -150 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <PhoneFrame>
          <AgentScreen step={step} split />
        </PhoneFrame>
        <p className="mt-4 text-center text-[13px] font-semibold text-[var(--sa-dim)]">
          {step === 3 ? "① 가입 전 확인 — 알려야 할 진료" : step === 4 ? "상담 리포트 — 고객에게 건네는 한 권 · 4쪽" : "설계사의 보메이트"}
        </p>
      </motion.div>

      <AnimatePresence>
        {step === 1 && (
          <SidePhone id="customer" label="고객 휴대폰">
            <CustomerScreen />
          </SidePhone>
        )}
        {step === 2 && (
          <motion.div
            key="sources"
            className="absolute top-[200px]"
            style={{ left: 404 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <SourcesPanel />
          </motion.div>
        )}
        {step === 3 && (
          <SidePhone id="claim" label="② 청구해 볼 진료 — 정밀 미청구">
            <ClaimScreen />
          </SidePhone>
        )}
        {step === 4 && (
          <motion.div
            key="report"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ReportPages />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 휴대폰 폭에선 두 대를 나란히 두면 글씨가 안 읽혀 — 같은 내용을 설명 아래 이름표로(자료 모으기 · 분석)
const PHONE_CHIPS: Record<number, string[]> = {
  2: ["진료내역", "건강검진", "의료비·실손"],
  3: ["① 가입 전 확인(고지)", "② 청구해 볼 진료"],
  4: ["한 줄 요약", "지금 할 일", "상담 뒤 할 일", "자세히 보기"],
};

/** 「어메이징사업부의 보메이트 영업지원시스템」 — 누가 만든 무엇인지 색·크기로 바로 보이게(10/8 사장님) */
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

/**
 * 「들어오면 있는 것」 중 상담 준비 도구가 실제로 이렇게 움직인다 — 실물 증거.
 * 스크롤을 내리면 화면이 고정된 채 단계가 하나씩 넘어간다(10/9 사장님 「원래대로 하나씩 내려가게」).
 *   10/8 한 화면 단계 버튼 + 자동 진행으로 바꿨다가 되돌림. 대신 섹션 머리의 「교육·입사 조건 바로 보기」 로 건너뛸 수 있다.
 */
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
          {/* 단계를 다 넘기지 않고 교육·입사 조건으로 바로 가는 길 */}
          <a
            href="#join"
            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-[var(--sa-line)] px-5 text-[15px] font-semibold text-[var(--sa-ink)] transition-colors hover:bg-[var(--sa-paper)]"
          >
            교육·입사 조건 바로 보기 <ArrowDown size={16} strokeWidth={2.2} />
          </a>
        </div>
      </div>

      <div ref={track} className="relative" style={{ height: `${100 + (STEP_COUNT - 1) * 75}svh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* 폰: 아래 고정 「문의 · 지원하기」 바(약 76px + 안전 영역)에 화면이 가리지 않게 그만큼 띄운다 */}
          <div className="mx-auto grid h-full max-w-[1280px] grid-rows-[auto_1fr_auto] px-4 pb-[calc(84px+env(safe-area-inset-bottom))] pt-[76px] sm:px-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-8 lg:px-10 lg:pb-8 lg:pt-[88px]">
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
                  {/* 이름표 자리는 모든 단계에서 같은 높이로 비워 둔다 — 단계마다 휴대폰 크기가 들썩이지 않게 */}
                  <div className="mt-2 flex h-[26px] gap-1.5 overflow-hidden">
                    {(PHONE_CHIPS[step] ?? []).map((c) => (
                      <span
                        key={c}
                        className="inline-flex h-[26px] shrink-0 items-center gap-1 rounded-full bg-[var(--sa-brand-soft)] px-2.5 text-[12.5px] font-bold text-[var(--sa-brand)]"
                      >
                        {step === 2 && <Check size={12} strokeWidth={3} aria-hidden="true" />}
                        {c}
                      </span>
                    ))}
                  </div>
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

            <p className="pt-3 text-center text-[13px] text-[var(--sa-dim)] lg:absolute lg:bottom-6 lg:right-10 lg:pt-0">
              화면 속 고객 이름과 숫자는 이해를 돕기 위한 예시입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
