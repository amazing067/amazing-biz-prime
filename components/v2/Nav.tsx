"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon, Status } from "./Core";
import { DARK_SECTION_IDS, NAV_LINKS } from "./nav-links";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  // 어두운 섹션 위를 지날 때는 Nav 글자가 배경에 묻히므로 밝은 색으로 바꾼다.
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);

      const probe = 44; // Nav 알약의 세로 중심
      const dark = DARK_SECTION_IDS.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      setOnDark(dark);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      data-on-dark={onDark || undefined}
    >
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? onDark
                ? "bg-white/10 backdrop-blur-xl border border-white/20"
                : "bg-[color:var(--bg-1)]/80 backdrop-blur-xl border border-[color:var(--line)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* 모회사(프라임에셋) + 사업부(어메이징) 락업.
              두 로고 모두 고유 색을 가져서, 어두운 섹션 위에서도 색이 살도록
              흰 판 위에 얹는다. */}
          <a
            href="#top"
            aria-label="프라임에셋 어메이징사업부 — 맨 위로"
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_1px_2px_rgba(10,11,16,0.06)] ring-1 ring-[rgba(10,11,16,0.08)] sm:gap-2.5 sm:px-3.5"
          >
            <Image
              src="/prime-logo.png"
              alt="프라임에셋"
              width={1180}
              height={345}
              priority
              className="h-[22px] w-auto sm:h-[24px]"
            />
            <span aria-hidden className="h-5 w-px bg-[rgba(10,11,16,0.14)]" />
            <Image
              src="/amazing-logo.png"
              alt=""
              width={226}
              height={193}
              priority
              className="h-[26px] w-auto sm:h-[28px]"
            />
            {/* 어메이징 로고는 심볼+영문 조합형이라 이 크기에서 사업부명이
                읽히지 않는다. 한글 표기를 항상 함께 둔다. */}
            <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-[color:var(--ink)] sm:text-[14px]">
              어메이징사업부
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-[13px]">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  onDark
                    ? "text-white/75 hover:text-white hover:bg-white/10"
                    : "text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-2)]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* 모바일에서는 하단 ActionBar 가 이동과 지원을 맡으므로 상단은 비워 둔다. */}
            {/* Status 는 --dim 을 쓰는데 Nav 는 섹션 스코프 밖이라
                어두운 배경 위에서는 변수를 여기서 되돌려 준다. */}
            <span
              className="hidden lg:inline-flex"
              style={
                onDark
                  ? ({ ["--dim" as string]: "rgba(255,255,255,0.72)" } as React.CSSProperties)
                  : undefined
              }
            >
              <Status>서울 3개 본부 운영중</Status>
            </span>
            <a
              href="#apply"
              className={`hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-medium transition ${
                onDark
                  ? "bg-white text-[#0F1428] hover:bg-white/90"
                  : "bg-[color:var(--accent)] text-[color:var(--accent-ink)] hover:brightness-110"
              }`}
            >
              지원하기 <Icon name="arrowRight" size={14} stroke={2} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
