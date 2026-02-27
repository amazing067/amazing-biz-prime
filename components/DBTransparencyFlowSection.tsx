"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, GitBranch, LayoutDashboard } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "입력",
    desc: "상담·문의 데이터 일원화",
  },
  {
    icon: GitBranch,
    title: "분배 룰",
    desc: "공정 자동 배분·대기 순서",
  },
  {
    icon: LayoutDashboard,
    title: "대시보드",
    desc: "실시간 현황·이력 조회",
  },
];

export default function DBTransparencyFlowSection() {
  return (
    <section id="flow" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            DB 투명 분배 흐름
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            입력부터 확인까지 한눈에
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-center gap-2 md:gap-0 flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-6 text-center relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.15), transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center flex-shrink-0 w-8">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-slate-300" />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
