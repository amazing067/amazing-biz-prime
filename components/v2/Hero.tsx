"use client";

import { useState } from "react";
import { BtnV2, Icon, Mono } from "./Core";
import Dashboard from "./tools/mockups/portal/Dashboard";
import CoverageCompare from "./tools/mockups/studio/CoverageCompare";
import ClaimHub from "./tools/mockups/touchpoints/ClaimHub";
import Cognitive from "./tools/mockups/studio/Cognitive";

const FACTS: [string, string][] = [
  ["32개사", "제휴 생·손보"],
  ["3개 본부", "서울 직영 운영"],
  ["10일", "신입 온보딩 과정"],
  ["100%", "DB 분배 내역 공개"],
];

function FactBand() {
  return (
    <div className="border-y border-[color:var(--line)]">
      <div className="mx-auto max-w-[1760px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[color:var(--line)]">
          {FACTS.map(([n, l]) => (
            <div key={l} className="py-6 px-4 md:px-8 first:pl-0">
              <div className="text-[22px] md:text-[26px] font-bold tracking-[-0.02em] text-[color:var(--ink)]">
                {n}
              </div>
              <div className="mt-1 text-[13px] text-[color:var(--dim)]">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          실시간
        </span>
      </div>

      <div className="relative px-2 md:px-3 pt-2 md:pt-3 border-b border-[color:var(--line)] bg-[color:var(--bg-1)]/30">
        <div className="mb-1.5 px-1 text-[12px] font-medium text-[color:var(--dim)]">
          탭을 눌러 실제 시스템 화면을 확인하세요
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
                  i === tab ? "bg-[color:var(--ink)] opacity-100" : "bg-[color:var(--ink)] opacity-0"
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
  const scrollToPillars = () => {
    document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative pt-36 pb-0 overflow-hidden">
      <div className="relative mx-auto max-w-[1760px] px-6">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center pb-20">
          {/* LEFT: Slogan */}
          <div className="col-span-12 md:col-span-6 space-y-7 md:space-y-8">
            <h1
              className="font-bold leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "clamp(44px, 6.4vw, 100px)" }}
            >
              <span className="block text-[color:var(--ink)]">영업은</span>
              <span className="block">
                <span className="font-serif-italic text-[color:var(--accent)]">시스템</span>
                <span className="text-[color:var(--ink)]">이다.</span>
              </span>
            </h1>

            <div className="max-w-[560px]">
              <p className="text-[19px] md:text-[24px] leading-[1.4] text-[color:var(--ink)] font-bold tracking-[-0.01em]">
                보장분석, AI 코칭, 청구 자동화, 치매검사까지.
              </p>
              <p className="mt-3 text-[15px] md:text-[17px] leading-[1.6] text-[color:var(--ink-2)]">
                직접 개발한 영업 지원 시스템을 소속 설계사에게 무상으로 드립니다.
                서류와 반복 업무에 쓰던 시간을{" "}
                <strong className="text-[color:var(--ink)] font-bold">고객 만나는 시간</strong>으로
                되돌려 드립니다.
              </p>
            </div>

            <ul className="space-y-2">
              {[
                "32개사 보장분석 자동 통합",
                "TA부터 클로징까지 AI 세일즈 코칭",
                "고지의무 리스크 청약 전 점검",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-[15px] font-medium text-[color:var(--ink-2)]"
                >
                  <Icon name="check" size={15} stroke={2.5} className="text-[color:var(--accent)] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>

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
              <p className="mt-3 text-[13px] text-[color:var(--dim)]">
                상담 후 원치 않으시면 추가 연락을 드리지 않습니다.
              </p>
            </div>
          </div>

          {/* RIGHT: Mockup */}
          <div className="col-span-12 md:col-span-6">
            <LivePreview />
          </div>
        </div>
      </div>

      <FactBand />
    </section>
  );
}
