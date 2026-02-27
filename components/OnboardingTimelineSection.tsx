"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const days = [
  { day: 1, title: "계정·시스템 세팅", desc: "접속 권한 부여, 대시보드 안내" },
  { day: 2, title: "스크립트·상담 실습", desc: "상담 시나리오 및 실전 연습" },
  { day: 3, title: "교육 자료 오리엔테이션", desc: "교육 커리큘럼·자료 안내" },
  { day: 4, title: "동행·피드백", desc: "현장 동행 또는 원격 피드백" },
  { day: 5, title: "첫 DB 운용 준비", desc: "배분 룰·확인 방법 안내" },
  { day: 6, title: "상담 루틴 정립", desc: "일일·주간 루틴 세팅" },
  { day: 7, title: "독립 운영 시작", desc: "지속 지원·문의 채널 안내" },
];

export default function OnboardingTimelineSection() {
  return (
    <section id="onboarding" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            7일 온보딩 로드맵
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            초보도 따라올 수 있는 단계별 진행
          </p>
        </motion.div>

        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-px" aria-hidden />

          <ul className="space-y-8">
            {days.map((item, i) => (
              <motion.li
                key={item.day}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start"
              >
                {/* 날짜 점 (모바일: 왼쪽 / 데스크: 중앙 열) */}
                <div className="relative z-10 flex justify-start md:justify-center md:col-start-2">
                  <div className="w-12 h-12 rounded-full bg-electric-blue text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {item.day}
                  </div>
                </div>

                {/* 카드: 짝수는 오른쪽, 홀수는 왼쪽 */}
                <div
                  className={`min-w-0 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-soft ${
                    i % 2 === 0 ? "md:col-start-3" : "md:col-start-1 md:row-start-1"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Day {item.day} · {item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
