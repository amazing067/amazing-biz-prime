"use client";

import { motion } from "framer-motion";
import { Network, Scale, Share2, TrendingUp } from "lucide-react";

export default function ValueChainSection() {
  return (
    <section id="prime-asset-value" className="py-32 bg-gradient-to-b from-cool-gray to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            성장과 분할의 밸류체인
          </h2>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            개인영업의 한계를 넘어, 관리자로 성장하는 비전을 제시합니다
          </p>
        </motion.div>

        {/* 밸류체인 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 shadow-soft-lg border border-slate-200/50 mb-16"
        >
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            성장은 결과가 아닙니다. 단지 과정의 표현일 뿐입니다.
            그래서 GA에서의 성장은 항상 분열의 결과를 반복했습니다.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            프라임에셋은 설계사의 성장을 공동체와 공유하며,
            공동체의 성장을 다시 설계사와 공유하는 성장의 선순환 시스템을
            구축했습니다. 바로 <span className="font-bold text-electric-blue">밸류체인</span>입니다.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            밸류체인에 의한 성장은 공정기준에 의한 분할로 이어집니다.
            밸류체인에 의한 분할은 가치공유에 의한 소득 상승과 지속성으로 이어집니다.
            그래서 프라임에셋의 밸류체인은
            <span className="font-bold text-electric-blue"> 지속가능한 미래를 약속하는 강력한 비전</span>입니다.
          </p>
        </motion.div>

        {/* 두 가지 핵심 철학 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 공정기준 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                공정기준
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              공정기준은 프라임에셋 공동체 누구에게나 동일한 기준이 적용되고,
              동일한 기준에 의해서 누구나 관리자로 승격할 수 있는 제도입니다.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-electric-blue mr-2" />
                공정기준에 의한 기회의 평등
              </h4>
              <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                <p>
                  모든 GA는 설계사의 증원을 목표로 합니다.
                  일부 GA에 승격 제도가 있지만 기존 관리자와 승격된 관리자 사이에는
                  가치 분배에 대한 이해충돌이 발생합니다.
                </p>
                <p>
                  그래서 기존 관리자와 동일한 지급률의 관리자 승격은 불가능합니다.
                </p>
                <p className="font-semibold text-electric-blue">
                  프라임에셋은 공정기준에 의한 직급 승격을 누구에게나 보장합니다.
                  모든 본부가 밸류체인에 의한 단일가치로 연결되어
                  기존 관리자와 승격된 관리자 사이의 이해충돌이 발생하지 않기 때문입니다.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 가치공유 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                가치공유
              </h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              가치공유란 조직이 분할되어도 기존 관리자와 분할된 관리자 사이에
              가치분배에 대한 이해충돌 대신 가치공유에 의한
              소득의 지속가능성을 약속하는 제도입니다.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <Share2 className="w-5 h-5 text-emerald-500 mr-2" />
                지속가능한 소득
              </h4>
              <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                <p>
                  조직 분할 시 발생하는 일반적인 문제는
                  기존 관리자와 분할된 관리자 사이의 가치 분배 갈등입니다.
                </p>
                <p className="font-semibold text-emerald-600">
                  프라임에셋의 가치공유 제도는 이러한 갈등을 해소하고,
                  양쪽 모두에게 지속가능한 소득을 보장합니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

