"use client";

import { motion } from "framer-motion";
import {
  Building2,
  DollarSign,
  Network,
  FileText,
  Monitor,
} from "lucide-react";

const primeAssetItems = [
  {
    id: "prime-asset-ga",
    title: "대형GA",
    description: "국내 최고 수준의 대형 일반대리점 네트워크",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    id: "prime-asset-rules",
    title: "영업규정집",
    description: "명확하고 투명한 영업 규정으로 공정한 업무 환경",
    icon: FileText,
    gradient: "from-amber-500 to-orange-500",
    delay: 0.2,
  },
  {
    id: "prime-asset-system",
    title: "영업지원시스템",
    description: "최첨단 디지털 시스템으로 영업 효율성 극대화",
    icon: Monitor,
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.3,
  },
];

export default function PrimeAssetSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            프라임에셋 소개
          </h2>
          <p className="text-xl text-slate-600 font-light">
            신뢰와 혁신을 바탕으로 한 보험 영업의 새로운 표준
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primeAssetItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative scroll-mt-20"
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
      </div>
    </section>
  );
}

