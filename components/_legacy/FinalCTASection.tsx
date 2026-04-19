"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-navy-deep">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex flex-col items-center gap-3 text-slate-300 text-sm">
            <span className="inline-flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" aria-hidden />
              상담 후 불필요하면 권유하지 않습니다
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" aria-hidden />
              분석 결과는 문서로 드립니다
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight break-words">
            지금 무료 상담 받기
          </h2>
          <p className="text-slate-400 text-base sm:text-lg break-words">
            1분만에 문의 남기시면 맞춤 상담을 진행해 드립니다.
          </p>

          <div className="pt-4">
            <Link href="#recruit" className="inline-flex items-center gap-2 group">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-electric-blue to-violet-600 shadow-lg shadow-electric-blue/25 hover:shadow-glow-blue transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                지금 무료 상담 받기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
