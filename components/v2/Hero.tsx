"use client";

import { useEffect, useRef, useState } from "react";
import { BtnV2, Eyebrow, GridOverlay, Icon, Mono, Status } from "./Core";
import Dashboard from "./tools/mockups/portal/Dashboard";
import CoverageCompare from "./tools/mockups/studio/CoverageCompare";
import ClaimHub from "./tools/mockups/touchpoints/ClaimHub";
import Cognitive from "./tools/mockups/studio/Cognitive";

const TICKER_ITEMS: [string, string][] = [
  ["32", "제휴 보험사"],
  ["3", "운영 본부"],
  ["10", "일 온보딩"],
  ["100", "% DB 투명 공개"],
  ["0", "감정 개입 영업"],
  ["24/7", "시스템 가동"],
  ["4", "플래그십 서비스"],
];

function Ticker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-[color:var(--line)] py-5 mask-fade-v2">
      <div className="flex items-center gap-10 whitespace-nowrap animate-marquee-v2">
        {row.map(([n, l], i) => (
          <div key={i} className="flex items-baseline gap-3 shrink-0">
            <Mono className="text-[color:var(--accent)] text-2xl font-medium">{n}</Mono>
            <span className="text-[13px] uppercase tracking-[0.14em] text-[color:var(--dim)]">
              {l}
            </span>
            <span className="w-6 h-px bg-[color:var(--line)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Legacy inline views removed — now using polished mockups from ./tools/mockups. */


function LivePreview() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: "포털 OS", url: "portal.amazing-biz.kr / dashboard", view: <Dashboard /> },
    { label: "AI 보장분석", url: "brain.amazing-biz.kr / compare", view: <CoverageCompare /> },
    { label: "청구 허브", url: "청구.com / search", view: <ClaimHub /> },
    { label: "치매검사", url: "치매검사.kr / cognitive", view: <Cognitive /> },
  ];

  return (
    <div className="relative card-v2-strong overflow-hidden">
      <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border-b border-[color:var(--line)] bg-[color:var(--bg-1)]/50 gap-2">
        <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[color:var(--line)]" />
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[color:var(--line)]" />
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[color:var(--line)]" />
        </div>
        <div className="flex-1 min-w-0 text-center px-2">
          <Mono className="text-[10px] md:text-[11px] text-[color:var(--dim)] truncate block">
            {tabs[tab].url}
          </Mono>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden md:inline">REAL-TIME</span>
          <span className="md:hidden">LIVE</span>
        </span>
      </div>

      <div className="relative px-2 md:px-3 pt-2 md:pt-3 border-b border-[color:var(--line)] bg-[color:var(--bg-1)]/30">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <div className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold tracking-[0.16em] uppercase text-[color:var(--dim)]">
            <Icon name="target" size={10} stroke={2} />
            탭하여 시스템 보기
          </div>
          <Mono className="hidden md:block text-[9px] text-[color:var(--dim-2)]">
            {String(tab + 1).padStart(2, "0")} / {String(tabs.length).padStart(2, "0")}
          </Mono>
        </div>
        <div className="flex gap-0 overflow-x-auto -mb-px">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setTab(i)}
              aria-pressed={i === tab}
              className={`relative px-3 md:px-4 py-2.5 text-[12px] md:text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                i === tab
                  ? "text-[color:var(--ink)]"
                  : "text-[color:var(--dim)] hover:text-[color:var(--ink)] active:scale-[0.98]"
              }`}
            >
              {t.label}
              <span
                aria-hidden
                className={`absolute left-2 right-2 bottom-0 h-[2px] rounded-full transition-all ${
                  i === tab
                    ? "bg-[color:var(--ink)] opacity-100"
                    : "bg-[color:var(--ink)] opacity-0 group-hover:opacity-30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative bg-[color:var(--bg-2)] overflow-hidden hero-mock-container"
        style={{ aspectRatio: "16/10" }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left hero-mock-inner"
          style={{ width: "760px", aspectRatio: "16/10" }}
        >
          {tabs[tab].view}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const kst = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
      const hh = String(kst.getHours()).padStart(2, "0");
      const mm = String(kst.getMinutes()).padStart(2, "0");
      const ss = String(kst.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const scrollToPillars = () => {
    document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" ref={ref} className="relative pt-32 pb-0 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${
            mouse.y * 100
          }%, var(--accent-glow), transparent 60%)`,
        }}
      />
      <GridOverlay opacity={0.5} />

      <div className="relative mx-auto max-w-[1760px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 text-[12px]">
          <div className="flex items-center gap-6">
            <Eyebrow>A Recruiting System · v2026.04</Eyebrow>
            <span className="hidden md:flex items-center gap-2 text-[color:var(--dim)]">
              <Icon name="dot" size={8} stroke={4} className="text-emerald-400" />
              Seoul · KST <Mono className="text-[color:var(--ink-2)]">{time}</Mono>
            </span>
          </div>
          <span className="text-[color:var(--dim)] hidden md:block">
            Prime Asset — Amazing Division / 067 · 290 · 292
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center pb-20">
          {/* LEFT: Slogan + 4가지 carry */}
          <div className="col-span-12 md:col-span-6 space-y-6 md:space-y-7">
            <h1
              className="font-bold leading-[0.92] tracking-[-0.03em] relative"
              style={{ fontSize: "clamp(48px, 7vw, 110px)" }}
            >
              <span className="block text-[color:var(--ink)]">영업은</span>
              <span className="block relative">
                <span className="font-serif-italic font-semibold text-[color:var(--dim-2)]">
                  시스템
                </span>
                <span className="text-[color:var(--ink)]">이다.</span>
                <span className="absolute -top-2 -right-1 md:relative md:top-auto md:right-auto md:ml-3 inline-flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)] bg-[color:var(--bg-1)] px-2 py-1 rounded-full border border-[color:var(--accent)]/30 align-middle">
                  <Icon name="bolt" size={10} stroke={2} /> since 2019
                </span>
              </span>
            </h1>

            <div>
              <Eyebrow className="mb-3">01 — The Offer</Eyebrow>
              <p
                className="text-[20px] md:text-[26px] leading-[1.35] text-[color:var(--ink)] font-bold tracking-[-0.01em]"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                보장분석 <span className="text-[color:var(--accent)]">·</span> AI 코칭{" "}
                <span className="text-[color:var(--accent)]">·</span> 청구 자동화{" "}
                <span className="text-[color:var(--accent)]">·</span> 치매검사.
              </p>
              <p className="mt-3 text-[15px] md:text-[17px] leading-[1.55] text-[color:var(--ink-2)]">
                네 가지가 설계사의{" "}
                <strong className="text-[color:var(--ink)] font-bold">시간을 영업으로</strong>{" "}
                되돌려 드립니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { t: "32개사 보장분석 자동", a: true },
                { t: "AI 세일즈 코칭", a: true },
                { t: "고지의무 사전 점검", a: false },
                { t: "설계서 비교 30초", a: false },
              ].map((c) => (
                <span
                  key={c.t}
                  className={`inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border font-bold transition-colors ${
                    c.a
                      ? "border-[color:var(--accent)] text-[color:var(--accent)] bg-[color:var(--accent)]/5"
                      : "border-[color:var(--line)] text-[color:var(--ink-2)]"
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${
                      c.a ? "bg-[color:var(--accent)]" : "bg-[color:var(--dim-2)]"
                    }`}
                  />
                  {c.t}
                </span>
              ))}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <BtnV2
                  variant="accent"
                  size="lg"
                  icon={<Icon name="arrowRight" size={16} stroke={2} />}
                  onClick={scrollToApply}
                >
                  1분 무료 상담
                </BtnV2>
                <BtnV2
                  variant="ghost"
                  size="lg"
                  icon={<Icon name="arrowDown" size={16} stroke={2} />}
                  onClick={scrollToPillars}
                >
                  시스템 먼저 보기
                </BtnV2>
              </div>
              <p className="mt-3 text-[12px] text-[color:var(--dim)]">
                상담 후 원치 않으시면 추가 연락 없습니다.{" "}
                <span className="text-[color:var(--ink-2)]">— 감정을 배제한 완벽한 영업 지원.</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Mockup */}
          <div className="col-span-12 md:col-span-6">
            <LivePreview />
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}
