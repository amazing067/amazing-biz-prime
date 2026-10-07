"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** 단계 목록을 눌렀을 때처럼 코드로 스크롤할 때. Lenis 가 켜져 있으면 그쪽으로 보낸다. */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** 마우스 휠 스크롤만 부드럽게(터치는 손대지 않음). 움직임 줄이기 설정이면 켜지 않는다. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: { offset: -64 }, lerp: 0.12 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
