"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

/* 보메이트 상담 준비 흐름을 휴대폰 화면으로 보여 준다 — 그린 흉내가 아니라 실제 보메이트 화면을 녹화한 영상.
   단계: 0 링크 보내기 · 1 고객 인증 · 2 자료 모으기 · 3 분석 · 4 상담 리포트
   화면 속 설계사·고객·병원·숫자는 전부 예시다(실명·실제 병원명 없음). 실제 인증 요청은 보내지 않고 녹화했다.
   영상: public/videos/home/bomate-<이름>.mp4 (+ 같은 이름 .jpg = 첫 장면) · 2026-10-08 */

export const STEP_COUNT = 5;
export const EASE = [0.16, 1, 0.3, 1] as const;

export const PHONE_W = 320;
export const PHONE_H = 660;

// analysis-goji / analysis-claim = 분석 영상을 두 화면으로 자른 것(0~6.4초 가입 전 확인 · 6.8초~ 정밀 실손 미청구) —
// PC 무대에서 분석 단계를 휴대폰 두 대로 갈라 보여 준다(10/9 사장님 「고객 인증처럼 갈라져서」)
type ClipName = "send" | "customer" | "data" | "analysis" | "analysis-goji" | "analysis-claim" | "report";
/** 단계별 영상과 길이(초). 첫 화면은 영상이 끝나면 다음 단계로 넘어간다 — 길이는 재생이 막혔을 때의 대비용. */
const STEP_CLIP: ClipName[] = [
  "send",
  "customer",
  "data",
  "analysis",
  "report",
];
// 실제 mp4 길이(ffprobe, 끝 장면 멈춤 포함). 첫 화면 대비 타이머가 영상보다 먼저 넘기지 않게 이 값을 쓴다(Codex 10/8 P1)
export const CLIP_SECONDS = [10.2, 15.7, 11.3, 13.7, 12.2];
/** 영상 맨 윗줄 색 — 휴대폰 위쪽 상태 표시줄을 같은 색으로 칠해 앱 화면과 이어 보이게 한다(첫 장면에서 잰 값) */
const CLIP_TOP: Record<ClipName, string> = {
  send: "#1e2a3a",
  customer: "#f0f5f8",
  data: "#ffffff",
  analysis: "#ffffff",
  "analysis-goji": "#ffffff",
  "analysis-claim": "#ffffff",
  report: "#f6f7fb",
};
const CLIP_LABEL: Record<ClipName, string> = {
  send: "보메이트에서 고객에게 보낼 조회를 고르고 링크를 만드는 화면",
  customer:
    "고객이 링크를 열어 정보를 넣고, 세 기관의 인증 요청을 각각 승인하는 화면",
  data: "들어온 진료내역을 정리한 화면",
  analysis: "고지할 진료와 청구해 볼 진료를 살피는 화면",
  "analysis-goji": "청약서에 알려야 할 진료를 정리한 가입 전 확인 화면",
  "analysis-claim": "지급 기록이 없는 진료를 찾아 청구 여부를 확인할 금액을 보여 주는 정밀 실손 미청구 화면",
  report: "고객과 펴 놓고 이야기하는 상담 리포트 화면",
};

/* ───────── 휴대폰 틀 ───────── */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative rounded-[48px] bg-[var(--sa-bezel)] p-[10px] shadow-[0_44px_80px_-34px_rgba(15,30,36,0.55),0_2px_6px_rgba(15,30,36,0.18)]"
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[var(--sa-paper)] text-[var(--sa-ink)]">
        <div className="absolute left-1/2 top-[10px] z-20 h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-[var(--sa-bezel)]" />
        <div className="h-full pt-[46px]">{children}</div>
      </div>
    </div>
  );
}

/** 실제 화면 녹화 한 편. 움직임 줄이기 설정이면 재생하지 않고 첫 장면만 보인다. */
function RealClip({
  name,
  loop = true,
  onEnded,
}: {
  name: ClipName;
  loop?: boolean;
  onEnded?: () => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  // 보일 때만 튼다(자동재생 속성 대신) — 화면 밖·숨은 분기(PC/휴대폰 중 안 보이는 쪽)는 불러오지도 않는다(Codex 10/8 P2).
  // 절전 모드 등으로 재생이 거부되면 「화면 재생」 버튼을 띄워 누르면 튼다(Codex 10/8 P1).
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play()
            .then(() => setBlocked(false))
            .catch(() => setBlocked(true));
        } else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <>
      {/* 상태 표시줄 자리(휴대폰 틀이 비워 둔 46px)를 이 영상의 윗줄 색으로 덮는다 */}
      <div
        aria-hidden
        className="-mt-[46px] h-[46px]"
        style={{ background: CLIP_TOP[name] }}
      />
      <div className="relative h-full">
        <video
          ref={ref}
          key={name}
          className="block h-full w-full object-cover object-top"
          src={`/videos/home/bomate-${name}.mp4`}
          poster={`/videos/home/bomate-${name}.jpg`}
          muted
          playsInline
          loop={loop}
          preload="metadata"
          onEnded={onEnded}
          aria-label={CLIP_LABEL[name]}
        />
        {blocked && (
          <button
            type="button"
            onClick={() => {
              ref.current
                ?.play()
                .then(() => setBlocked(false))
                .catch(() => {});
            }}
            className="absolute inset-0 grid place-items-center bg-[rgba(15,30,36,0.18)]"
            aria-label="화면 재생"
          >
            <span className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--sa-paper)] px-5 text-[15px] font-semibold text-[var(--sa-ink)] shadow-[0_8px_24px_-10px_rgba(15,30,36,0.5)]">
              <Play size={16} strokeWidth={2.4} /> 화면 재생
            </span>
          </button>
        )}
      </div>
    </>
  );
}

/* ───────── 바깥에서 쓰는 화면 ───────── */

/** 설계사 쪽 보메이트 화면. step 1(고객 인증 중)에는 설계사 화면이 링크 보내기 그대로 머문다.
 *  split = PC 무대처럼 분석 단계를 두 대로 가를 때 — 이 휴대폰은 「가입 전 확인」 만, 「미청구」 는 ClaimScreen 이 맡는다. */
export function AgentScreen({
  step,
  loop = true,
  onEnded,
  split = false,
}: {
  step: number;
  loop?: boolean;
  onEnded?: () => void;
  split?: boolean;
}) {
  const name: ClipName = split && step === 3 ? "analysis-goji" : STEP_CLIP[step <= 1 ? 0 : step];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="h-full"
      >
        <RealClip name={name} loop={loop} onEnded={onEnded} />
      </motion.div>
    </AnimatePresence>
  );
}

export function CustomerScreen({
  loop = true,
  onEnded,
}: {
  loop?: boolean;
  onEnded?: () => void;
}) {
  return <RealClip name="customer" loop={loop} onEnded={onEnded} />;
}

/** 분석 단계 두 번째 휴대폰 — 정밀 실손 미청구(청구해 볼 진료) */
export function ClaimScreen() {
  return <RealClip name="analysis-claim" />;
}

/** 휴대폰 한 대로 전부 보여 줄 때(첫 화면·휴대폰 폭): step 1 만 고객 휴대폰.
 *  onEnded 를 주면 영상을 한 번만 틀고 끝났다고 알린다(첫 화면 자동 넘김). */
export function SinglePhone({
  step,
  onEnded,
}: {
  step: number;
  onEnded?: () => void;
}) {
  const isCustomer = step === 1;
  const loop = !onEnded;
  return (
    <PhoneFrame>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={STEP_CLIP[step]}
          initial={{ opacity: 0, x: isCustomer ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isCustomer ? -40 : 40 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="h-full"
        >
          <RealClip name={STEP_CLIP[step]} loop={loop} onEnded={onEnded} />
        </motion.div>
      </AnimatePresence>
    </PhoneFrame>
  );
}
