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
      <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--line)] bg-[color:var(--bg-1)]/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--line)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--line)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--line)]" />
        </div>
        <div className="flex-1 text-center">
          <Mono className="text-[11px] text-[color:var(--dim)]">{tabs[tab].url}</Mono>
        </div>
        <Status>REAL-TIME</Status>
      </div>

      <div className="flex gap-1 px-3 pt-3 border-b border-[color:var(--line)] overflow-x-auto">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`px-3 py-2 text-[12px] font-medium rounded-t-md transition-colors whitespace-nowrap ${
              i === tab
                ? "bg-[color:var(--bg-2)] text-[color:var(--ink)] border border-[color:var(--line)] border-b-transparent relative top-px"
                : "text-[color:var(--dim)] hover:text-[color:var(--ink-2)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative bg-[color:var(--bg-2)]">
        <div className="overflow-x-auto overflow-y-hidden">
          <div
            className="relative w-full min-w-[760px] md:min-w-0"
            style={{ aspectRatio: "16/10" }}
          >
            {tabs[tab].view}
          </div>
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

      <div className="relative mx-auto max-w-[1840px] px-6">
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

        <div className="grid grid-cols-12 gap-6 items-end mb-20">
          <h1
            className="col-span-12 md:col-span-10 font-bold leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(56px, 12vw, 220px)" }}
          >
            <span className="block text-[color:var(--ink)]">영업은</span>
            <span className="block relative">
              <span className="font-serif-italic font-light text-[color:var(--dim-2)]">
                시스템
              </span>
              <span className="text-[color:var(--ink)]">이다.</span>
              <span className="absolute -top-2 -right-2 md:-right-4 hidden md:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)] bg-[color:var(--bg-1)] px-2 py-1 rounded-full border border-[color:var(--accent)]/30">
                <Icon name="bolt" size={10} stroke={2} /> since 2019
              </span>
            </span>
          </h1>

          <div className="col-span-12 md:col-span-2 md:text-right space-y-2">
            <div className="inline-block text-[11px] uppercase tracking-[0.18em] text-[color:var(--dim)] border-t border-[color:var(--line)] pt-2">
              — Philosophy
            </div>
            <p className="text-[13px] text-[color:var(--ink-2)] leading-relaxed">
              감정을 배제한
              <br />
              완벽한 영업 지원.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 pb-20">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow className="mb-4">01 — The Offer</Eyebrow>
            <p
              className="text-[22px] md:text-[26px] leading-[1.35] text-[color:var(--ink)] font-semibold tracking-[-0.01em]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              보장분석 <span className="text-[color:var(--dim-2)]">·</span> AI 코칭{" "}
              <span className="text-[color:var(--dim-2)]">·</span> 청구 자동화{" "}
              <span className="text-[color:var(--dim-2)]">·</span> 치매검사.
              <br />
              <span className="text-[color:var(--ink-2)] font-normal">
                네 가지가 설계사의 시간을 영업으로 되돌려 드립니다.
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { t: "32개사 보장분석 자동", a: true },
                { t: "AI 세일즈 코칭", a: true },
                { t: "고지의무 사전 점검", a: false },
                { t: "설계서 비교 30초", a: false },
              ].map((c) => (
                <span
                  key={c.t}
                  className={`inline-flex items-center gap-1.5 text-[11.5px] px-2.5 py-1.5 rounded-full border transition-colors ${
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

            <div className="flex flex-wrap items-center gap-3 mt-8">
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
            <p className="mt-4 text-[12px] text-[color:var(--dim)]">
              상담 후 원치 않으시면 추가 연락 없습니다.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <LivePreview />
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}
