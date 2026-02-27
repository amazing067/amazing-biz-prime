"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Award, ChevronRight, BadgeCheck } from "lucide-react";

const chips = [
  "운영 서비스 4종",
  "7일 온보딩",
  "실전 스크립트",
  "촬영 지원",
  "청구 도구",
  "리드마그넷",
];

export default function SocialProofSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            이미 많은 설계사가 선택한 이유
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            “좋아 보인다”가 아니라, 실제로 굴러가는 시스템과 루틴이 있으니까 선택됩니다.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {chips.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
              >
                <BadgeCheck className="w-4 h-4 mr-1 text-slate-500" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.0 }}
            className="rounded-3xl border border-slate-200 bg-white shadow-soft p-7"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric-blue to-blue-600 flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="mt-5">
              <div className="text-4xl font-extrabold tracking-tight text-slate-900">100명+</div>
              <div className="mt-1 text-base md:text-lg font-semibold text-slate-800">
                함께 성장 중인 설계사
              </div>
              <ul className="mt-4 space-y-2 text-base text-slate-600 leading-relaxed">
                <li>동일한 루틴/템플릿으로 “재현 가능한” 성과 구조</li>
                <li>신입도 따라오는 온보딩 + 실전 피드백 루프</li>
                <li>개인 플레이가 아닌, 팀 단위 지원 체계</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="rounded-3xl border border-slate-200 bg-white shadow-soft p-7"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="mt-5">
              <div className="text-4xl font-extrabold tracking-tight text-slate-900">50+</div>
              <div className="mt-1 text-base md:text-lg font-semibold text-slate-800">
                교육·지원 프로그램
              </div>
              <ul className="mt-4 space-y-2 text-base text-slate-600 leading-relaxed">
                <li>상담 흐름(질문/진단/제안) 표준 스크립트 제공</li>
                <li>콘텐츠/촬영/운영까지 한 번에 연결되는 지원</li>
                <li>실제 사례 기반의 피드백 중심 교육</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white shadow-soft p-7"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="mt-5">
              <div className="text-4xl font-extrabold tracking-tight text-slate-900">5개</div>
              <div className="mt-1 text-base md:text-lg font-semibold text-slate-800">
                운영 거점 + 스튜디오
              </div>
              <ul className="mt-4 space-y-2 text-base text-slate-600 leading-relaxed">
                <li>촬영/편집/기획까지 이어지는 콘텐츠 생산 환경</li>
                <li>현장 상담 동행/코칭을 위한 운영 기반</li>
                <li>개인 역량이 아니라 “환경”으로 성장을 밀어줌</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold shadow-soft hover:shadow-soft-lg transition-all"
          >
            실제 서비스로 확인하기
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
          <a
            href="#recruit"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 shadow-soft hover:shadow-soft-lg transition-all"
          >
            1분 지원 문의
            <ChevronRight className="w-5 h-5 ml-1 text-slate-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
