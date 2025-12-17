"use client";

import { motion } from "framer-motion";
import { Eye, FileText, CheckCircle2 } from "lucide-react";

export default function TransparencySection() {
  return (
    <section id="prime-asset-fee" className="py-32 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-lg">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            모든 수수료를 투명하게
          </h2>
          <p className="text-xl text-slate-600 font-light">
            투명성
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* 투명성 설명 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              투명성
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg mb-6">
              프라임에셋은 지급액과 지급률 모두를 명확하게 공개하여,
              투명성을 입증한 최초의 GA입니다.
            </p>
            <div className="flex items-center space-x-2 text-electric-blue">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">지급액 공개</span>
            </div>
            <div className="flex items-center space-x-2 text-electric-blue mt-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">지급률 공개</span>
            </div>
          </motion.div>

          {/* 급여명세서 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                급여명세서
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              프라임에셋의 급여명세서는 모든 정보를 공개합니다.
              수수료 항목을 계약 별로 투명하게 확인할 수 있으며,
              각 수수료의 모수와 개인의 지급율을 명확하게 공개합니다.
            </p>
          </motion.div>
        </div>

        {/* 선지급 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-3xl p-12 shadow-soft-lg border border-slate-200/50 bg-gradient-to-br from-electric-blue/5 to-slate-50"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              노력이 즉시 보상받는 순간
            </h3>
            <p className="text-2xl font-semibold text-electric-blue">
              강력한 선지급
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                선지급
              </h4>
              <p className="text-slate-700 leading-relaxed">
                수수료, 시상금 모두 프라임에셋의 자기자본으로 미리 지급됩니다.
                탁월한 재무 안정성을 바탕으로 지속가능한 선지급을 약속합니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                수수료
              </h4>
              <p className="text-slate-700 leading-relaxed">
                프라임에셋만이 가지고 있는 재무 안정성을 바탕으로
                안정적인 수수료 지급을 약속합니다.
                프라임에셋은 업계에서 경쟁력 있는 수수료 선지급을 보장합니다.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

