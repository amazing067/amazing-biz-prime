"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";

const cases = [
  {
    id: "m1",
    title: "신입 1~3개월",
    subtitle: "루틴이 잡히는 구간",
    bullets: [
      "온보딩/스크립트 기반 상담 흐름 정착",
      "포털(OS)로 고객/일정/알림 루틴화",
      "콘텐츠 초안으로 유입 채널 시작",
    ],
    result: "예시: 월 수익 범위(실제 데이터로 교체)",
  },
  {
    id: "m2",
    title: "신입 4~6개월",
    subtitle: "재현 가능한 시스템 구간",
    bullets: [
      "유입(블로그/검사) → 상담 연결 루프 형성",
      "DB/고객관리로 파이프라인 관리",
      "청구 도구로 고객 신뢰/리텐션 강화",
    ],
    result: "예시: 월 수익 범위(실제 데이터로 교체)",
  },
  {
    id: "m3",
    title: "신입 7~12개월",
    subtitle: "누적이 성과로 보이는 구간",
    bullets: [
      "콘텐츠/상담 루틴 누적",
      "운영 대시보드 기반 목표 관리",
      "소개/재접촉이 자연스럽게 발생",
    ],
    result: "예시: 월 수익 범위(실제 데이터로 교체)",
  },
];

export default function EarningsProofSection() {
  return (
    <section id="earnings" className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            신입 성과/정산 안내
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            과장 없이 “구조”로 설명합니다. 아래는 익명 사례 템플릿이며, 면담에서 개인 상황에 맞춰 투명하게 안내합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cases.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-soft hover:shadow-soft-lg transition-shadow p-6 md:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  <BadgeCheck className="w-4 h-4" />
                  익명 사례 템플릿
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">{c.title}</h3>
              <p className="mt-1 text-slate-700 font-semibold text-sm md:text-base">{c.subtitle}</p>

              <ul className="mt-4 space-y-2 text-slate-600 text-sm md:text-base leading-relaxed">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-slate-400/70 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {c.result}
              </div>

              <a
                href="#recruit"
                className="mt-5 inline-flex items-center text-sm font-semibold text-electric-blue hover:text-blue-700 transition-colors"
              >
                내 상황으로 상담 요청
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs md:text-sm text-slate-500">
          고지: 개인별 활동/상담/상품 구성 및 시장 상황에 따라 결과는 달라질 수 있습니다. 상세 정산 구조는 면담에서 투명하게 안내합니다.
        </div>
      </div>
    </section>
  );
}
