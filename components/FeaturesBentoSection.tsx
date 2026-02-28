"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PenSquare,
  ClipboardList,
  BrainCircuit,
} from "lucide-react";

const bentoItems = [
  {
    id: "portal-os",
    title: "영업지원 포털 OS",
    benefit: "DB·고객·일정이 한 화면에서 굴러가는 운영 시스템",
    description:
      "입사 Day1부터 포털 계정을 발급받아, DB 분배와 고객·일정을 구조적으로 관리합니다.",
    icon: LayoutDashboard,
    gradient: "from-electric-blue to-cyan-500",
    size: "col-span-1",
    delay: 0.05,
    href: "#proof-portal",
    cta: "포털 실제 화면 보기",
  },
  {
    id: "ai-suite",
    title: "AI 영업 제작실",
    benefit: "블로그·카페·설계서 분석 초안을 30초 안에",
    description:
      "네이버 블로그, 보험카페 Q&A, 설계서 분석까지 한 번에 돌리는 AI 도구로 ‘초안 스트레스’를 줄입니다.",
    icon: PenSquare,
    gradient: "from-violet-500 to-fuchsia-500",
    size: "col-span-1",
    delay: 0.1,
    href: "#proof-blog-ai",
    cta: "AI 실제 화면 보기",
  },
  {
    id: "claim-hub",
    title: "청구닷컴 허브",
    benefit: "고객이 진짜 고마워하는 청구 도구",
    description:
      "보험금 청구에 필요한 링크와 서류, 계산기를 한 곳에 모아, 고객이 스스로 해결할 수 있게 돕습니다.",
    icon: ClipboardList,
    gradient: "from-sky-500 to-electric-blue",
    size: "col-span-1",
    delay: 0.15,
    href: "#proof-claim-hub",
    cta: "청구닷컴 실제 화면 보기",
  },
  {
    id: "dementia-lead",
    title: "치매검사",
    benefit: "게임처럼 즐겁고 쉽게 검사 → 간병비 예측 → 상담 연결",
    description:
      "15가지 인지검사를 게임하듯 즐겁고 쉽게 진행할 수 있어요. 10년 후 간병비 예측까지 보고, 자연스럽게 상담으로 이어집니다.",
    icon: BrainCircuit,
    gradient: "from-emerald-500 to-teal-500",
    size: "col-span-1",
    delay: 0.2,
    href: "#proof-dementia-test",
    cta: "치매검사 실제 화면 보기",
  },
];

export default function FeaturesBentoSection() {
  return (
    <section id="offer" className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight break-words">
            타 본부를 압도하는 지원 인프라
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto break-words">
            유입(블로그·검사) → 상담·운영(포털/DB) → 신뢰·유지(청구)까지, 입사 즉시 쓰는 영업 OS입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {bentoItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: item.delay }}
                className={`${item.size} group min-w-0`}
              >
                <div className="h-full rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[240px] min-w-0">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                        실제 운영 서비스 기반
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-electric-blue font-semibold text-sm md:text-base mb-2 break-words">
                      {item.benefit}
                    </p>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed break-words">
                      {item.description}
                    </p>
                  </div>
                  {item.href && item.cta && (
                    <div className="mt-4">
                      <a
                        href={item.href}
                        className="inline-flex items-center text-sm font-semibold text-electric-blue hover:text-blue-700 transition-colors"
                      >
                        {item.cta}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
