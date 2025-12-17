"use client";

import { motion } from "framer-motion";
import { BookOpen, PlayCircle, CheckCircle2, Zap } from "lucide-react";

const curriculumItems = [
  "보험 상품 완벽 이해",
  "고객 상담 시뮬레이션",
  "계약서 작성 실습",
  "법규 및 규정 마스터",
  "영업 전략 수립",
  "데이터 분석 기초",
];

export default function SimulationSection() {
  return (
    <section id="simulation" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Zap className="w-12 h-12 text-electric-blue" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Education
          </h2>
          <p className="text-xl text-slate-600 font-light">
            입사 첫 달, 전문가가 되는 시뮬레이션.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Curriculum List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                커리큘럼
              </h3>
            </div>
            <ul className="space-y-4">
              {curriculumItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-electric-blue mr-3 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Auto Design Program Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                자동 설계 프로그램
              </h3>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
              {/* Mock UI */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-slate-300 rounded-full w-24" />
                  <div className="h-3 bg-electric-blue rounded-full w-16" />
                </div>
                <div className="h-32 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded-full w-full" />
                    <div className="h-2 bg-slate-200 rounded-full w-3/4" />
                    <div className="h-2 bg-slate-200 rounded-full w-1/2" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 bg-white rounded-lg shadow-sm border border-slate-200" />
                  <div className="h-16 bg-white rounded-lg shadow-sm border border-slate-200" />
                  <div className="h-16 bg-white rounded-lg shadow-sm border border-slate-200" />
                </div>
              </div>
            </div>
            <p className="mt-6 text-slate-600 text-center">
              AI 기반 자동 설계로 실수를 방지하고 효율을 극대화합니다.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "교육 시간", value: "120시간", delay: 0.1 },
            { label: "실습 시뮬레이션", value: "50+ 케이스", delay: 0.2 },
            { label: "완료율", value: "98%", delay: 0.3 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: stat.delay }}
              className="glass rounded-2xl p-6 text-center shadow-soft border border-slate-200/50"
            >
              <div className="text-3xl font-bold text-electric-blue mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

