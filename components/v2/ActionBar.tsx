"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Core";
import { NAV_LINKS } from "./nav-links";

const PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || "02-2038-4379";
const KAKAO_BASE =
  process.env.NEXT_PUBLIC_KAKAO_CHAT_URL ||
  "https://pf.kakao.com/_JxmxaJn/chat?utm_source=naver_blog&utm_medium=post&utm_campaign=content&utm_content=";
const KAKAO_URL = `${KAKAO_BASE}${KAKAO_BASE.includes("?") ? "&" : "?"}source=prime-asset-home`;
const TEL_HREF = `tel:${PHONE.replace(/[^\d+]/g, "")}`;

// 본문이 2만 픽셀을 넘는 페이지라, 하단 바는 "어디까지 왔는지"를 같이 알려준다.
const SECTIONS: [string, string][] = [["처음", "#top"], ...NAV_LINKS];

const TRACKED: [string, string][] = [...SECTIONS, ["지원하기", "#apply"]];

export default function ActionBar() {
  const [openSheet, setOpenSheet] = useState(false);
  const [current, setCurrent] = useState("처음");
  const currentIndex = Math.max(
    0,
    TRACKED.findIndex(([name]) => name === current)
  );
  const [progress, setProgress] = useState(0);
  const [dockVisible, setDockVisible] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);

        // 화면 상단에서 1/3 지점에 걸친 섹션을 '현재'로 본다.
        const probe = window.innerHeight / 3;
        let label = "처음";
        for (const [name, href] of TRACKED) {
          const el = document.querySelector(href);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= probe) label = name;
        }
        setCurrent(label);

        // 데스크톱 도크는 지원 폼 위에서는 비켜준다.
        const apply = document.querySelector("#apply");
        const overApply = apply
          ? apply.getBoundingClientRect().top < window.innerHeight * 0.9
          : false;
        setDockVisible(y > 400 && !overApply);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!openSheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSheet(false);
    };
    window.addEventListener("keydown", onKey);
    // 첫 링크에 바로 포커스를 주면 터치로 열었을 때도 포커스 링이 보인다.
    // 컨테이너로 옮겨 키보드 탐색만 이어지게 한다.
    sheetRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [openSheet]);

  const go = useCallback((href: string) => {
    setOpenSheet(false);
    const el = document.querySelector(href);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* ---------- 모바일: 하단 고정 바 (스크롤 위치와 무관하게 항상 노출) ---------- */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50">
        {openSheet && (
          <button
            type="button"
            aria-label="목록 닫기"
            onClick={() => setOpenSheet(false)}
            className="fixed inset-0 bg-[color:var(--ink)]/40 backdrop-blur-[2px]"
          />
        )}

        <div
          ref={sheetRef}
          id="actionbar-sheet"
          tabIndex={-1}
          hidden={!openSheet}
          className="relative border-t border-[color:var(--line)] bg-[color:var(--bg-1)] px-3 pt-3 pb-2"
        >
          <p className="px-1 pb-2 text-[11px] font-medium text-[color:var(--dim)]">
            보고 싶은 곳을 고르세요
          </p>
          <ul className="grid grid-cols-2 gap-1.5">
            {TRACKED.map(([label, href], i) => {
              const active = label === current;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(href);
                    }}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-3 text-[13px] font-medium transition-colors ${
                      active
                        ? "bg-[color:var(--accent)] text-[color:var(--accent-ink)]"
                        : "bg-[color:var(--bg-2)] text-[color:var(--ink-2)]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        active ? "opacity-70" : "text-[color:var(--dim-2)]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <a
              href={TEL_HREF}
              className="rounded-xl bg-[color:var(--bg-2)] px-3 py-3 text-center text-[13px] font-medium text-[color:var(--ink-2)]"
            >
              전화 {PHONE}
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#FEE500] px-3 py-3 text-center text-[13px] font-semibold text-[#191919]"
            >
              카카오 1:1 상담
            </a>
          </div>
          <p className="px-1 pt-2 pb-1 text-[11px] text-[color:var(--dim-2)]">
            평일 09~18시 답변
          </p>
        </div>

        <div className="relative border-t border-[color:var(--line)] bg-[color:var(--bg-1)]">
          {/* 읽은 만큼 차오르는 실선 — 긴 페이지에서 현재 위치를 알려주는 유일한 장치 */}
          <div
            aria-hidden
            className="absolute -top-px left-0 h-px bg-[color:var(--accent)] transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="flex items-stretch gap-2 px-3 py-2.5"
            // 홈 인디케이터가 있는 기기에서 바가 잘리지 않도록
            style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
          >
            {/* 누를 수 있다는 게 한눈에 보이도록 테두리·면·행동 문구를 함께 둔다. */}
            <button
              type="button"
              onClick={() => setOpenSheet((v) => !v)}
              aria-expanded={openSheet}
              aria-controls="actionbar-sheet"
              className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-2)] px-3 py-2 text-left transition-colors active:bg-[color:var(--bg-1)]"
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] tabular-nums text-[color:var(--accent)]">
                    {String(currentIndex + 1).padStart(2, "0")}
                    <span className="text-[color:var(--dim-2)]">
                      /{String(TRACKED.length).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="truncate text-[14px] font-semibold text-[color:var(--ink)]">
                    {current}
                  </span>
                </span>
                <span className="mt-0.5 block text-[11px] font-medium text-[color:var(--dim)]">
                  {openSheet ? "닫기" : "눌러서 다른 섹션 보기"}
                </span>
              </span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color:var(--bg-1)] text-[color:var(--ink-2)] ring-1 ring-[color:var(--line)] transition-transform duration-200 ${
                  openSheet ? "rotate-180" : ""
                }`}
              >
                <Icon name="arrowDown" size={14} stroke={2.2} />
              </span>
            </button>

            <a
              href="#apply"
              onClick={(e) => {
                e.preventDefault();
                go("#apply");
              }}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[color:var(--accent)] px-5 text-[14px] font-semibold text-[color:var(--accent-ink)]"
            >
              지원하기
              <Icon name="arrowRight" size={14} stroke={2.2} />
            </a>
          </div>
        </div>
      </div>

      {/* ---------- 데스크톱: 우측 하단 도크 (지원 폼 구간에서는 숨김) ---------- */}
      <div
        className={`hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2 transition-all duration-300 ${
          dockVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {/* 도크는 fixed 라 섹션 토큰을 상속받지 못한다. 어두운 섹션 위에서
            반투명이면 배경이 비쳐 탁해지므로 불투명 흰색으로 고정한다. */}
        <div className="flex flex-col gap-1.5 rounded-2xl border border-[color:var(--line)] bg-white p-2 shadow-[0_20px_48px_-20px_rgba(10,11,16,0.45)]">
          <a
            href={TEL_HREF}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium text-[color:var(--ink-2)] hover:bg-[color:var(--bg-2)] transition-colors"
          >
            전화 {PHONE}
          </a>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#FEE500] px-4 py-2.5 text-[13px] font-semibold text-[#191919] hover:brightness-95 transition"
          >
            카카오 1:1 상담
          </a>
          <p className="px-2 pb-0.5 text-[11px] text-[color:var(--dim-2)]">평일 09~18시 답변</p>
        </div>
      </div>
    </>
  );
}
