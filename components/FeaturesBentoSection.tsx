"use client";

import { motion } from "framer-motion";
import { Sparkles, Database, Video } from "lucide-react";

const bentoItems = [
  {
    id: "ai",
    title: "AI 기반 자동 생성",
    benefit: "블로그 포스팅, 밤새우지 마세요. 30초 만에 상위 노출 세팅.",
    description: "보험 상품에 맞는 전문 블로그·Q&A 자동 생성. 영업에만 집중하세요.",
    icon: Sparkles,
    gradient: "from-electric-blue to-violet-600",
    size: "col-span-1 md:col-span-2 row-span-1",
    delay: 0.1,
  },
  {
    id: "db",
    title: "실시간 DB 투명성",
    benefit: "DB 걱정 없는 공정한 분배.",
    description: "DB 현황판·자동 분배로 누가 봐도 투명한 영업 환경.",
    icon: Database,
    gradient: "from-cyan-500 to-electric-blue",
    size: "col-span-1 row-span-1",
    delay: 0.2,
  },
  {
    id: "studio",
    title: "유튜브 스튜디오 지원",
    benefit: "당신은 카메라 앞에 서기만 하세요.",
    description: "4K 카메라·DiGiCo 콘솔·프로 오디오. 풀스택 미디어 팀이 촬영부터 편집까지.",
    icon: Video,
    gradient: "from-violet-500 to-fuchsia-500",
    size: "col-span-1 md:col-span-2 row-span-1",
    delay: 0.3,
  },
];

export default function FeaturesBentoSection() {
  return (
    <section id="offer" className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            타 본부를 압도하는 지원 인프라
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            기능이 아니라 혜택으로. 설레는 경험을 드립니다.
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
                className={`${item.size} group`}
              >
                <div className="h-full rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-[220px]">
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-electric-blue font-semibold text-sm md:text-base mb-2">
                      {item.benefit}
                    </p>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
