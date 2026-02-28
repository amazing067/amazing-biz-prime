"use client";

import { motion } from "framer-motion";
import { MessageCircle, Key, Headphones } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "상담",
    description: "입사 문의 후 맞춤 상담. 궁금한 점을 편하게 남겨주세요.",
    icon: MessageCircle,
  },
  {
    step: 2,
    title: "시스템 제공",
    description: "승인 즉시 영업지원 시스템·DB·AI 도구 접근 권한을 드립니다.",
    icon: Key,
  },
  {
    step: 3,
    title: "영업 지원",
    description: "교육, 스튜디오, 콘텐츠 생성까지. 영업에만 집중하세요.",
    icon: Headphones,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight break-words">
            어떻게 진행되나요?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto break-words">
            세 단계로 시작하는 어메이징 사업부
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative min-w-0"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-slate-200" aria-hidden />
                )}
                <div className="relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft hover:shadow-soft-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-blue to-blue-600 flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-bold text-electric-blue">STEP {item.step}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
