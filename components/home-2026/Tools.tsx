"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen, ClipboardList, FileBarChart, FileCheck2, FileText, GitCompareArrows, HeartPulse, Library, Link2,
  ListChecks, MessageSquareText, MessagesSquare, PieChart, Receipt, Scale, ScanLine, Search, Send, Stethoscope, Target,
  type LucideIcon,
} from "lucide-react";
import s from "./home.module.css";
import { EASE } from "./Screens";

// 보메이트 실제 도구 이름(BRIEF 3장). 설명은 숫자·과장 없이 「무엇을 하는지」만.
// 묶음마다 실제 보메이트 화면 한 장(첫 화면 영상의 첫 장면, 예시 고객)과 묶음 색 — 글만 있던 섹션에 실물을 보이고,
// 묶음 제목이 본문과 같은 색이라 묻히던 것을 색으로 가른다(10/8 사장님). 앰버는 「받을 돈」 의미색이라 보험금 묶음에만.
const GROUPS = [
  {
    name: "자료를 모읍니다",
    short: "자료 모으기",
    ink: "var(--sa-brand)",
    soft: "var(--sa-brand-soft)",
    shot: { src: "/videos/home/bomate-data.jpg", alt: "보메이트 진료내역 조회 화면 — 최근 5년 진료를 외래·입원·수술로 나눠 보여 줍니다" },
    // 묶음 길이를 맞춰 보메이트 실제 도구를 더 실었다(10/8 사장님 — 「상담을 준비합니다」만 길었다)
    tools: [
      ["통합조회", "링크 하나로 진료내역, 건강검진, 의료비 기록을 함께 불러옵니다."],
      ["진료내역 조회", "최근 진료 기록을 정리하고 가입 전에 알릴 진료를 짚어 봅니다."],
      ["건강검진 리포트", "공단 검진 결과를 고객이 읽기 쉬운 리포트로 만듭니다."],
      ["의료비·실손 수령 조회", "병원에 낸 의료비와 실손보험금을 받은 기록을 연도별로 불러옵니다."],
      ["실손 지급내역 조회", "보험사가 실손보험금을 언제, 얼마 지급했는지 내역을 불러옵니다."],
      ["보험계약 조회", "고객 인증으로 가입한 보험 계약과 보장 내용을 불러옵니다."],
      ["검사지 사진 분석", "검사지 사진을 올리면 수치를 읽어 알아보기 쉽게 정리합니다."],
    ],
  },
  {
    name: "놓친 보험금을 찾습니다",
    short: "보험금 찾기",
    ink: "var(--sa-amber-ink)",
    soft: "var(--sa-amber-soft)",
    shot: { src: "/videos/home/bomate-report.jpg", alt: "보메이트 리포트 화면 — 지급 기록이 없는 실손보험금과 확인할 진료를 보여 줍니다" },
    tools: [
      ["의료비·실손 미청구", "의료비 기록에서 아직 청구하지 않은 진료를 찾습니다."],
      ["정밀 미청구", "실손 세대와 보장 한도까지 따져 받을 수 있는지 더 자세히 봅니다."],
      ["지급내역 대조", "실손 지급내역과 진료 기록을 한 건씩 맞대어 아직 받지 못한 보험금을 찾습니다."],
      ["청구 누락 체크", "가입한 보장과 진료 기록을 맞춰 빠진 청구를 찾습니다."],
      ["보험금 청구하기", "보험사별 청구서 양식을 채워 고객의 청구를 돕습니다."],
      ["청구 사례집", "질병과 상황별 청구 사례를 찾아봅니다."],
    ],
  },
  {
    name: "상담을 준비합니다",
    short: "상담 준비",
    ink: "var(--sa-violet)",
    soft: "var(--sa-violet-soft)",
    shot: { src: "/videos/home/bomate-analysis.jpg", alt: "보메이트 가입 전 확인 화면 — 청약서에 알려야 할 진료를 정리해 보여 줍니다" },
    tools: [
      ["보장 분석", "보장분석 PDF 를 올리면 가입한 보장을 항목별로 모아 한눈에 정리합니다."],
      ["보장 비교", "지금 보장과 바꾼 뒤를 나란히 놓고 상담 멘트까지 정리합니다."],
      ["통합 리포트", "진료, 검진, 실손, 보장을 고객에게 건넬 리포트 한 권으로 묶습니다."],
      ["세일즈 코칭", "고객 자료를 바탕으로 상담에서 꺼낼 이야기와 순서를 정리합니다."],
      ["약관실", "보험사 약관을 모아 두고 필요한 조항을 찾아봅니다."],
      ["질문방", "약관, 청구, 심사 질문에 근거 조항과 함께 답을 찾아 줍니다."],
    ],
  },
] as const;

type Group = (typeof GROUPS)[number];

// 폰 타일용 도구 아이콘(돈·동전 모양은 쓰지 않는다 — 보험 광고 심의 기준)
const TOOL_ICON: Record<string, LucideIcon> = {
  통합조회: Link2, "진료내역 조회": Stethoscope, "건강검진 리포트": HeartPulse, "의료비·실손 수령 조회": Receipt,
  "실손 지급내역 조회": FileText, "보험계약 조회": FileCheck2, "검사지 사진 분석": ScanLine,
  "의료비·실손 미청구": Search, "정밀 미청구": Target, "지급내역 대조": GitCompareArrows, "청구 누락 체크": ListChecks,
  "보험금 청구하기": Send, "청구 사례집": BookOpen,
  "보장 분석": PieChart, "보장 비교": Scale, "통합 리포트": FileBarChart, "세일즈 코칭": MessageSquareText,
  약관실: Library, 질문방: MessagesSquare,
};

/** 폰·태블릿 = 묶음 탭(한 번에 한 묶음, 섹션이 짧다) · PC = 세 칸 카드(한눈에) — 10/8 사장님 선택 */
export function Tools() {
  return (
    <section className="relative border-t border-[var(--sa-line)]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
          사서 쓰는 프로그램이
          <br />
          아닙니다
        </h2>
        <p className="mt-5 max-w-[36em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-[var(--sa-ink2)]">
          보메이트는 어메이징사업부 소속 개발자가 직접 만들고 운영합니다. 설계사가 상담하며 불편했던 점을 듣고 고쳐 나갑니다. 입사하면 첫날부터 아래 도구를 휴대폰과 PC에서 씁니다.
        </p>

        <div className="lg:hidden">
          <ToolsTabs />
        </div>
        <div className="hidden lg:block">
          <ToolsCards />
        </div>

        <p className="mt-4 text-[12px] text-[var(--sa-dim)]">화면 속 고객 이름과 숫자는 이해를 돕기 위한 예시입니다.</p>
      </div>
    </section>
  );
}

/** 폰·태블릿 — 묶음 세 개를 색 탭으로, 고른 묶음의 화면(가운데 위)과 도구 2열 타일(아이콘)만 보인다(10/8 사장님 「나」) */
function ToolsTabs() {
  const [cur, setCur] = useState(0);
  const g = GROUPS[cur];
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
      <div role="tablist" aria-label="보메이트 도구 묶음" className="grid grid-cols-3 gap-2 lg:col-span-4 lg:grid-cols-1 lg:content-start lg:gap-3">
        {GROUPS.map((x, k) => {
          const on = k === cur;
          return (
            <button
              key={x.name}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setCur(k)}
              className="relative rounded-[18px] border px-3 py-3 text-left transition-[background-color,border-color] duration-300 lg:rounded-[22px] lg:px-6 lg:py-5"
              style={{ background: on ? x.soft : "var(--sa-paper)", borderColor: on ? x.ink : "var(--sa-line)" }}
            >
              <span className="block text-[12px] font-bold lg:text-[13px]" style={{ color: x.ink }}>
                0{k + 1}
              </span>
              <span className={`${s.serif} mt-0.5 block text-[16px] font-bold leading-tight lg:hidden`} style={{ color: x.ink, opacity: on ? 1 : 0.72 }}>
                {x.short}
              </span>
              <span className={`${s.serif} mt-1 hidden text-[24px] font-bold leading-tight lg:block`} style={{ color: x.ink, opacity: on ? 1 : 0.72 }}>
                {x.name}
              </span>
              <span className="mt-1 hidden text-[14px] text-[var(--sa-dim)] lg:block">도구 {x.tools.length}개</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="relative overflow-hidden rounded-[24px] border border-[var(--sa-line)] bg-[var(--sa-paper)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {/* 화면은 가운데 위에 크게 — 한쪽 구석에 작게 붙어 있으면 어색했다(10/8 사장님) */}
            <div className="flex justify-center px-5 pb-6 pt-7" style={{ background: g.soft }}>
              <ToolShot g={g} className="w-[150px] sm:w-[176px]" />
            </div>
              <ul className="grid grid-cols-2 gap-2.5 p-4 sm:gap-3 sm:p-5">
                {g.tools.map(([name, desc], k) => {
                  const Icon = TOOL_ICON[name] ?? ClipboardList;
                  // 개수가 홀수면 마지막 칸은 두 칸 폭(혼자 남은 빈자리가 생기지 않게)
                  const wide = g.tools.length % 2 === 1 && k === g.tools.length - 1;
                  return (
                    <li key={name} className={`rounded-[16px] border border-[var(--sa-line)] bg-white p-3.5 ${wide ? "col-span-2" : ""}`}>
                      <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: g.soft, color: g.ink }}>
                        <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <p className="mt-2 text-[14.5px] font-bold leading-snug text-[var(--sa-ink)]">{name}</p>
                      <p className="mt-1 text-[12.5px] leading-[1.5] text-[var(--sa-dim)]">{desc}</p>
                    </li>
                  );
                })}
              </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** PC — 세 묶음을 나란히 세 칸 카드로, 카드마다 색 머리 + 휴대폰 화면 전체 + 도구 목록 */
function ToolsCards() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
      {GROUPS.map((g, k) => (
        <motion.div
          key={g.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: k * 0.08, ease: EASE }}
          className="flex flex-col overflow-hidden rounded-[24px] border border-[var(--sa-line)] bg-[var(--sa-paper)]"
        >
          <div className="px-6 pb-4 pt-6" style={{ background: g.soft }}>
            <span className="text-[13px] font-bold" style={{ color: g.ink }}>0{k + 1}</span>
            <p className={`${s.serif} mt-1 text-[22px] font-bold leading-tight`} style={{ color: g.ink }}>{g.name}</p>
            {/* 휴대폰 화면 전체(반만 자르면 무엇이 있는지 안 보였다 — 10/8 사장님) */}
            <div className="mt-5 flex justify-center">
              <ToolShot g={g} className="w-[180px] xl:w-[200px]" />
            </div>
          </div>
          <ul className="flex-1 space-y-3 px-6 py-5">
            {g.tools.map(([name, desc]) => (
              <li key={name}>
                <p className="text-[15.5px] font-bold text-[var(--sa-ink)]">{name}</p>
                <p className="mt-0.5 text-[13.5px] leading-[1.55] text-[var(--sa-dim)]">{desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

/** 실제 보메이트 화면 한 장을 휴대폰 틀에 */
function ToolShot({ g, className = "" }: { g: Group; className?: string }) {
  return (
    <div className={`shrink-0 rounded-[18px] bg-[var(--sa-bezel)] p-[4px] shadow-[0_24px_40px_-24px_rgba(15,30,36,0.55)] lg:rounded-[28px] lg:p-[6px] ${className}`}>
      <div className="overflow-hidden rounded-[14px] bg-[var(--sa-paper)] lg:rounded-[22px]">
        <Image src={g.shot.src} alt={g.shot.alt} width={600} height={1188} sizes="(min-width: 1024px) 200px, 140px" className="block h-auto w-full" />
      </div>
    </div>
  );
}
