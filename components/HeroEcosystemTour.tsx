"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PenSquare,
  ClipboardList,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Tab = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  images: string[];
  proofHref: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const tabs: Tab[] = [
  {
    id: "portal",
    label: "영업지원 포털(OS)",
    title: "DB·고객·일정이 한 화면에서 굴러가는 운영 OS",
    summary: "DB 분배와 고객, 일정·할 일을 본부 단위로 통합 관리하는 영업지원 포털입니다.",
    bullets: [
      "DB 분배·대기·처리 이력을 기록으로 확인",
      "고객·상담 이력과 일정·할 일을 한 곳에서 관리",
      "본부·개인 단위 실시간 성과 대시보드",
    ],
    images: ["/proof/portal-1.png", "/proof/portal-2.png"],
    proofHref: "#ecosystem",
    icon: LayoutDashboard,
  },
  {
    id: "ai-suite",
    label: "AI 영업 제작실",
    title: "블로그·카페·분석까지 몇 번의 클릭으로",
    summary:
      "네이버 블로그, 보험카페 Q&A, 설계서 분석까지 한 번에 돌리는 AI 기반 영업 제작실입니다.",
    bullets: [
      "키워드만 넣으면 SEO 최적화 블로그 초안 생성",
      "보험카페 Q&A용 답변 문장 자동 생성",
      "설계서 이미지를 올리면 보장 분석 문장 자동 정리",
    ],
    images: ["/proof/blogai-1.png"],
    proofHref: "#ecosystem",
    icon: PenSquare,
  },
  {
    id: "claim",
    label: "청구닷컴 허브",
    title: "보험금 청구를 ‘한 링크’로 정리한 허브",
    summary:
      "보험금 청구에 필요한 링크와 서류, 계산기를 한 곳에 모아 고객이 스스로 해결할 수 있게 돕는 도구입니다.",
    bullets: [
      "보험사 전산·필요서류·PDF 청구서 모음",
      "치과 확인서·고객센터·FAX 번호 정리",
      "보험나이·실손 등 필수 계산기 제공",
    ],
    images: ["/proof/claim-1.png"],
    proofHref: "#ecosystem",
    icon: ClipboardList,
  },
  {
    id: "dementia",
    label: "치매검사",
    title: "15가지 인지검사와 미래 간병비 예측",
    summary:
      "무료 온라인 검사를 통해 뇌 건강과 장기 간병비를 먼저 확인하게 하고, 자연스럽게 상담으로 이어지게 하는 도구입니다.",
    bullets: [
      "15가지 인지 기능을 온라인으로 자가 점검",
      "10년 후 예상 간병비를 시나리오로 제시",
      "검사 결과를 바탕으로 무료 상담 연결",
    ],
    images: ["/proof/dementia-1.png"],
    proofHref: "#ecosystem",
    icon: BrainCircuit,
  },
];

export default function HeroEcosystemTour() {
  const [activeId, setActiveId] = useState<Tab["id"]>("portal");
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const [imageIndex, setImageIndex] = useState(0);

  const handleTabChange = (id: Tab["id"]) => {
    setActiveId(id);
    setImageIndex(0);
  };

  return (
    <div className="w-full h-full flex flex-col bg-navy-mid/90">
      {/* 상단 바 + 실제 운영 화면 배지 */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2 text-[11px] text-slate-300">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-[10px] font-medium text-emerald-300">
            실제 운영 화면
          </span>
          <span className="hidden sm:inline text-slate-400">
            포털 + AI + 청구 + 치매검사, 4종 실서비스
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
        </div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* 좌측 탭 네비게이션 */}
        <div className="md:w-40 lg:w-52 border-b md:border-b-0 md:border-r border-white/10">
          <nav className="flex md:flex-col gap-1 px-2.5 py-2 md:py-3 text-xs md:text-[13px]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`group flex-1 md:flex-none inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-left transition-all ${
                    isActive
                      ? "bg-white/10 text-white border border-white/30 shadow-sm"
                      : "text-slate-300/80 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="inline-flex items-center justify-center rounded-lg bg-black/30 p-1.5">
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? "text-electric-blue" : "text-slate-400"
                      }`}
                    />
                  </span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 우측: 설명 + 스크린샷 */}
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="md:w-1/2 p-3 md:p-4 flex flex-col justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-sky-300/80 mb-1">
                Amazing 영업 OS
              </p>
              <h3 className="text-sm md:text-base font-semibold text-white">
                {active.title}
              </h3>
              <p className="mt-1.5 text-xs md:text-[13px] text-slate-200/90 leading-relaxed">
                {active.summary}
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[11px] md:text-[12px] text-slate-200/90">
                {active.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-[5px] h-1 w-3 rounded-full bg-electric-blue/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-1">
              <Link
                href={active.proofHref}
                className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-electric-blue hover:text-blue-300 transition-colors"
              >
                증거 보기
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-white/10 bg-black/50 flex flex-col">
            <div className="relative flex-1">
              <motion.div
                key={`${active.id}-${imageIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={active.images[imageIndex]}
                  alt={active.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            {active.images.length > 1 && (
              <div className="flex gap-2 px-3 py-2 border-t border-white/10 bg-black/70">
                {active.images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImageIndex(idx)}
                    className={`relative flex-1 aspect-video rounded-md overflow-hidden border transition-all ${
                      idx === imageIndex
                        ? "border-electric-blue ring-1 ring-electric-blue/60"
                        : "border-white/15 hover:border-electric-blue/50"
                    }`}
                    aria-label={`${active.label} 미리보기 ${idx + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${active.label} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

