"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function LogoWallSection() {
  // 로고/이름 나열 대신: 점 그리드로 "많은 보험사" 비주얼만 (33 숫자 텍스트는 Stats에서만 사용)
  const dots = Array.from({ length: 35 }, (_, i) => i);

  return (
    <section className="py-12 md:py-16 bg-slate-50/80 border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 text-slate-500 mb-4">
            <Scale className="w-5 h-5 text-electric-blue/70" />
            <span className="text-sm font-medium">국내 보험사 상품 비교</span>
          </div>
          <p className="text-slate-400 text-sm mb-8">
            객관적 데이터로 한눈에 비교·제안
          </p>
          {/* 점 그리드: "많은 보험사" 느낌만, 이름 없음 */}
          <div className="inline-flex flex-wrap justify-center gap-2 md:gap-3 max-w-md mx-auto">
            {dots.map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-slate-300/80"
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: [0.5, 1, 0.5] }}
                viewport={{ once: true }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.03 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
