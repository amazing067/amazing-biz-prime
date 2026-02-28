"use client";

import { motion } from "framer-motion";
import { FileText, LayoutDashboard, ClipboardList } from "lucide-react";
import Image from "next/image";

const cards = [
  {
    icon: FileText,
    title: "Report Sample",
    subtitle: "상담·분석 리포트 샘플",
    image: "/proof/portal-1.png",
    caption: "상담 내용과 보장 분석을 한눈에 보는 리포트 예시",
  },
  {
    icon: LayoutDashboard,
    title: "DB Dashboard Sample",
    subtitle: "실시간 현황·배분 샘플",
    image: "/proof/portal-2.png",
    caption: "DB 대기·배분·상담 진행 상황을 보여주는 대시보드 예시",
  },
  {
    icon: ClipboardList,
    title: "Education Checklist Sample",
    subtitle: "교육 이수·체크리스트 샘플",
    image: "/proof/claim-1.png",
    caption: "온보딩·교육 진행 상황을 관리하는 체크리스트 예시",
  },
];

export default function ProofPackSection() {
  return (
    <section id="proof-pack" className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 break-words">
            실제로 제공되는 것들
          </h2>
          <p className="text-slate-600 text-sm md:text-base break-words">
            리포트·대시보드·교육 체크리스트 샘플
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-soft-lg transition-shadow min-w-0"
              >
                <div className="flex items-center gap-3 mb-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 break-words">{card.title}</h3>
                    <p className="text-xs text-slate-500 break-words">{card.subtitle}</p>
                  </div>
                </div>
                <div className="min-h-[160px] flex flex-col gap-2">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-900/80">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug break-words">{card.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
