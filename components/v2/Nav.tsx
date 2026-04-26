"use client";

import { useEffect, useState } from "react";
import { Icon, Status } from "./Core";

const NAV_LINKS: [string, string][] = [
  ["핵심 서비스", "#pillars"],
  ["입사 10일", "#process"],
  ["시스템 전체", "#tools"],
  ["회사 지원", "#benefits"],
  ["승격 단계", "#career"],
  ["자주 묻는 질문", "#faq"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1840px] px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-[color:var(--bg-1)]/80 backdrop-blur-xl border border-[color:var(--line)]"
              : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-md bg-[color:var(--accent)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-[2px] bg-[color:var(--accent-ink)]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[13px] font-semibold tracking-tight text-[color:var(--ink)]">
                Prime Asset
              </span>
              <span className="text-[13px] text-[color:var(--dim)] tracking-tight">
                — Amazing
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-[13px]">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="px-3 py-1.5 rounded-full text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-2)] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Status>LIVE · 3개 본부</Status>
            <a
              href="#apply"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[color:var(--accent)] text-[color:var(--accent-ink)] text-[13px] font-medium hover:brightness-110 transition"
            >
              지원하기 <Icon name="arrowRight" size={14} stroke={2} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
