"use client";

import { motion } from "framer-motion";
import { Building2, Shield, TrendingUp } from "lucide-react";

export default function CompanyInfoSection() {
  return (
    <section id="company-info" className="py-32 bg-gradient-to-b from-white to-cool-gray scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            기업정보
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-12 shadow-soft-lg border border-slate-200/50 max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  보험판매 법인대리점
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  프라임에셋은 보험판매 법인대리점입니다.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                우리는 고객의 삶을 위험에서 보호하고, 고객의 자산을 효율적으로
                관리하고, 우리 자신의 행복을 추구하기 위하여 보험을 판매하는
                멋진 사람들입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <Shield className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 mb-2">고객 보호</h4>
                <p className="text-sm text-slate-600">
                  고객의 삶을 위험에서 보호
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <TrendingUp className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 mb-2">자산 관리</h4>
                <p className="text-sm text-slate-600">
                  고객의 자산을 효율적으로 관리
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <Building2 className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 mb-2">행복 추구</h4>
                <p className="text-sm text-slate-600">
                  우리 자신의 행복을 추구
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

