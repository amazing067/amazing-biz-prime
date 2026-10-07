"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** 고정 크기(w×h)로 그린 장면을 상자 크기에 맞춰 통째로 줄인다. 휴대폰 화면 속 글자 비율이 깨지지 않게. */
export function FitBox({
  w,
  h,
  max = 1,
  className = "",
  children,
}: {
  w: number;
  h: number;
  max?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return setScale(0);
      setScale(Math.min(max, width / w, height / h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h, max]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: w,
          height: h,
          transform: `translate(-50%, -50%) scale(${scale || 1})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
