"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** 첫 화면(어두움) 위에서는 밝은 글자, 지나가면 밝은 바탕으로 바뀐다. */
export function Nav() {
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setOnDark(e.isIntersecting), {
      // 화면 맨 위 64px 띠(메뉴 바 자리)에 첫 화면이 걸려 있는지만 본다
      rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 64)}px 0px`,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const link = onDark
    ? "text-[var(--sa-on-night-dim)] hover:text-[var(--sa-on-night)]"
    : "text-[var(--sa-ink2)] hover:text-[var(--sa-ink)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        onDark
          ? "border-transparent bg-transparent"
          : "border-[var(--sa-line)] bg-[rgba(242,244,243,0.88)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex min-h-[44px] items-center gap-3" aria-label="프라임에셋 어메이징사업부 처음으로">
          {/* 로고 파일 위아래 여백이 커서 상자로 잘라 보여 준다.
              어두운 바탕에서 흰색으로 바꾸면 로고 상자 속 글자가 묻혀 흰 네모가 된다 → 밝은 받침 위에 원래 색 그대로 */}
          <span
            className={`flex h-8 items-center overflow-hidden rounded-[8px] transition-colors duration-300 ${
              onDark ? "bg-[var(--sa-on-night)] pl-1 pr-0" : ""
            }`}
          >
            <Image
              src="/prime-logo.png"
              alt="프라임에셋"
              width={1180}
              height={345}
              priority
              className="-ml-[9px] -mr-[6px] h-[60px] w-auto max-w-none"
            />
          </span>
          <span className={`hidden h-4 w-px sm:block ${onDark ? "bg-white/25" : "bg-[var(--sa-line)]"}`} />
          <span
            className={`hidden text-[15px] font-bold transition-colors duration-300 sm:block ${
              onDark ? "text-[var(--sa-on-night)]" : "text-[var(--sa-ink)]"
            }`}
          >
            어메이징사업부
          </span>
        </a>
        <nav className="flex items-center gap-1" aria-label="주요 메뉴">
          {[
            ["#bomate", "보메이트"],
            ["#join", "우리에게 오면"],
            ["#faq", "자주 묻는 질문"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`hidden min-h-[44px] items-center px-3 text-[15px] font-medium transition-colors lg:inline-flex ${link}`}
            >
              {label}
            </a>
          ))}
          <a
            href="#apply"
            className={`ml-2 inline-flex h-11 items-center rounded-full px-5 text-[15px] font-semibold transition-[transform,background-color,color] duration-200 active:scale-[0.98] ${
              onDark
                ? "bg-[var(--sa-on-night)] text-[var(--sa-ink)] hover:bg-white"
                : "bg-[var(--sa-brand)] text-[var(--sa-paper)] hover:bg-[var(--sa-brand-deep)]"
            }`}
          >
            지원하기
          </a>
        </nav>
      </div>
    </header>
  );
}
