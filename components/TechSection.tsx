"use client";

import { motion } from "framer-motion";
import { Database, Smartphone, BarChart3 } from "lucide-react";

const techItems = [
  {
    title: "DB Distribution",
    description: "공정한 자동 분배 시스템",
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    title: "Sales App",
    description: "고객 관리, 일정, 계약 현황을 한눈에",
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    title: "Data Analysis",
    description: "영업은 감이 아니라 데이터입니다.",
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500",
    delay: 0.3,
  },
];

export default function TechSection() {
  return (
    <section id="tech" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            System
          </h2>
          <p className="text-xl text-slate-600 font-light">
            완벽한 영업 지원 인프라
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="glass rounded-3xl p-8 h-full shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-slate-200/50">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <div className="glass rounded-3xl p-12 shadow-soft border border-slate-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  실시간 동기화
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  모든 데이터가 클라우드에 실시간으로 동기화되어, 어디서든
                  최신 정보에 접근할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  AI 기반 인사이트
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  머신러닝 알고리즘이 영업 패턴을 분석하여 최적의 전략을
                  제안합니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

