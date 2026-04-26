"use client";

import { useState } from "react";
import { Eyebrow, Icon, Mono } from "./Core";
import Dashboard from "./tools/mockups/portal/Dashboard";
import CoverageCompare from "./tools/mockups/studio/CoverageCompare";
import ClaimHub from "./tools/mockups/touchpoints/ClaimHub";
import Cognitive from "./tools/mockups/studio/Cognitive";

type MockKind = "portal" | "ai" | "claim" | "cog";

const PILLARS: Array<{
  k: string;
  tag: string;
  t: string;
  lead: string;
  body: string;
  bullet: string[];
  mock: MockKind;
}> = [
  {
    k: "01",
    tag: "PORTAL OS",
    t: "영업지원 포털",
    lead: "업로드·배정·상담·계약이 한 화면에서.",
    body: "입사 Day 1부터 포털 계정이 발급됩니다. DB 분배 센터가 리드를 규칙으로 배정하고, 목표·실적·캘린더가 실시간으로 롤업됩니다. 설계사는 \"오늘 누구를 만나야 하는가\"만 확인하면 됩니다.",
    bullet: [
      "DB 분배 센터 · 배정·이관 자동화",
      "고객 관리 · 계약·납입·AS 단일 프로필",
      "나의 목표·실적 · 월별 달성률 추적",
      "캘린더 · TA·미팅·교육 통합",
    ],
    mock: "portal",
  },
  {
    k: "02",
    tag: "AI 보장분석 · 코칭",
    t: "AI 분석 스튜디오",
    lead: "설계서 한 장으로 보장분석·코칭까지 30초.",
    body: "PDF 증권 한 장을 올리면 32개사 계약이 자동 통합됩니다. 현재 보장·정리 예정·새 제안·최종 월납까지 한 화면으로 보고, 상담 녹음을 올리면 AI 세일즈 코칭 리포트가 약점까지 짚어줍니다.",
    bullet: [
      "보장분석 전후비교 · 5단계 KPI 재계산",
      "AI 세일즈 코칭 · TA·1차·2차·클로징",
      "고지의무 분석 · 5년 진료내역 약관 대조",
      "보장 상담 자동화 · 녹음→제안서 PDF",
    ],
    mock: "ai",
  },
  {
    k: "03",
    tag: "CLAIM HUB",
    t: "청구닷컴 허브",
    lead: "32개 보험사 청구 링크, 한 곳에서 바로.",
    body: "고객이 자주 묻는 \"어디에 뭐부터 해야 해요?\"에 대한 답. 32개 보험사 청구 링크·전산 접속·필요서류·보험금 청구서 PDF·치과치료확인서·인콜·FAX까지 한 페이지에 모아 고객에게 공유 링크 한 번으로 해결합니다.",
    bullet: [
      "32개 보험사 청구·전산 링크 통합",
      "보험금 청구서 PDF · 치과확인서 자동",
      "보험나이·실손의료비 계산기",
      "고객 공유 링크 원클릭",
    ],
    mock: "claim",
  },
  {
    k: "04",
    tag: "COGNITION",
    t: "치매검사 서비스",
    lead: "5분 검사 → 10년 뒤 간병비 리포트 → 상담 연결.",
    body: "15가지 인지기능 온라인 선별검사(기억·주의·계산 등 13개 뇌영역)를 게임처럼 5분 만에. 2026년 현재와 2036년 예상 간병비, 장기요양 등급 예측, 국가 지원금 안내까지 자동 리포트로 생성되어 자연스러운 상담으로 이어집니다.",
    bullet: [
      "15종 인지검사 · 13개 뇌영역 분석",
      "2026년·2036년 간병비 시뮬레이션",
      "장기요양 등급 AI 예측",
      "5단계 위험도 · 맞춤 액션 추천",
    ],
    mock: "cog",
  },
];

function PillarMock({ kind }: { kind: MockKind }) {
  const url =
    kind === "portal" ? "portal.amazing-biz.kr / dashboard" :
    kind === "ai" ? "brain.amazing-biz.kr / coverage-compare" :
    kind === "claim" ? "청구.com / hub" :
    "치매검사.kr / cognitive";

  return (
    <div className="relative card-v2-strong overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[color:var(--line)] bg-[color:var(--bg-2)]">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <Mono className="ml-3 text-[10px] text-[color:var(--dim)]">{url}</Mono>
      </div>

      <div className="relative bg-[color:var(--bg-2)]">
        <div className="overflow-x-auto overflow-y-hidden">
          <div
            className="relative w-full min-w-[760px] md:min-w-0"
            style={{ aspectRatio: "16/10" }}
          >
            {kind === "portal" && <Dashboard />}
            {kind === "ai" && <CoverageCompare />}
            {kind === "claim" && <ClaimHub />}
            {kind === "cog" && <Cognitive />}
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Pillars() {
  const [active, setActive] = useState(0);
  const cur = PILLARS[active];

  return (
    <section
      id="pillars"
      className="relative py-28 md:py-40 border-t border-[color:var(--line)] bg-[color:var(--bg-2)]"
      style={{
        ["--accent" as string]: "#39a2b8",
        ["--accent-ink" as string]: "#ffffff",
        ["--accent-glow" as string]: "rgba(57,162,184,0.35)",
        ["--bg-1" as string]: "#0F1428",
        ["--bg-2" as string]: "#1A2138",
        ["--ink" as string]: "#E8ECF5",
        ["--ink-2" as string]: "rgba(232,236,245,0.92)",
        ["--dim" as string]: "rgba(232,236,245,0.78)",
        ["--dim-2" as string]: "rgba(232,236,245,0.58)",
        ["--line" as string]: "rgba(232,236,245,0.32)",
        ["--card-ring" as string]: "rgba(232,236,245,0.32)",
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div>
            <Eyebrow>03 — The Four Pillars</Eyebrow>
            <h2 className="mt-5 text-[40px] md:text-[56px] leading-[1] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
              네 개의 기둥,
              <br />
              <span className="text-[color:var(--dim-2)] font-serif-italic font-light">
                하나의 운영체제.
              </span>
            </h2>
          </div>
          <p className="text-[13px] text-[color:var(--dim)] max-w-sm">
            클릭하여 각 시스템을 살펴보세요. 모든 시스템은 실제로 운영 중이며, 입사 즉시 사용
            가능합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-[color:var(--line)]">
          {PILLARS.map((p, i) => (
            <button
              key={p.k}
              onClick={() => setActive(i)}
              className={`relative text-left p-6 md:p-8 border-r last:border-r-0 border-[color:var(--line)] transition-all duration-500 ${
                i === active
                  ? "bg-[color:var(--ink)] text-[color:var(--bg-1)]"
                  : "hover:bg-[color:var(--bg-1)] text-[color:var(--ink)]"
              }`}
            >
              <Mono
                className={`text-[56px] md:text-[80px] leading-none font-medium ${
                  i === active ? "text-[color:var(--accent)]" : "text-[color:var(--dim-2)]"
                }`}
              >
                {p.k}
              </Mono>
              <div
                className={`mt-3 text-[11px] uppercase tracking-[0.18em] ${
                  i === active ? "text-[color:var(--accent)]" : "text-[color:var(--dim)]"
                }`}
              >
                {p.tag}
              </div>
              <div className="mt-1 text-[18px] font-semibold tracking-[-0.01em]">{p.t}</div>
              {i === active && (
                <span className="absolute -top-px left-0 right-0 h-px bg-[color:var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8 mt-14">
          <div className="col-span-12 md:col-span-5">
            <Mono className="text-[11px] text-[color:var(--accent)] tracking-[0.18em]">
              {cur.tag}
            </Mono>
            <h3 className="mt-3 text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-semibold text-[color:var(--ink)]">
              {cur.lead}
            </h3>
            <p className="mt-5 text-[15px] text-[color:var(--ink-2)] leading-[1.7]">{cur.body}</p>
            <ul className="mt-8 space-y-3">
              {cur.bullet.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-[14px] text-[color:var(--ink)]"
                >
                  <Icon
                    name="check"
                    size={14}
                    stroke={2}
                    className="text-[color:var(--accent)]"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-7">
            <PillarMock kind={cur.mock} />
          </div>
        </div>
      </div>
    </section>
  );
}
