"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const days = [
  {
    day: 1,
    title: "보험영업 전체 프로세스 + 필수 용어",
    desc: "DB 생성, 온라인 운영, 개척, 블로그/카페 유입 대응과 필수 용어를 2시간 집중 정리",
  },
  {
    day: 2,
    title: "TA 대본 + 거절 멘트 대응",
    desc: "자주 나오는 거절 유형별 받아치기까지 읽기·쓰기·암기 훈련",
  },
  {
    day: 3,
    title: "자기소개 멘트 개인화",
    desc: "기존 멘트를 개인 화법으로 다듬어 신뢰도 높은 1차 대화 오프닝 완성",
  },
  {
    day: 4,
    title: "실손 + 암보험 핵심",
    desc: "실손 변천사와 암보험(고액암/일반암/소액암, 표적항암) 구조를 디테일하게 학습",
  },
  {
    day: 5,
    title: "뇌·심장 + 수술비·치료비",
    desc: "보장 우선순위와 설계 포인트를 고객 설명 중심으로 훈련",
  },
  {
    day: 6,
    title: "운전자·상해·치아보험",
    desc: "생활형 보장 상품 3종을 비교·설명·추천하는 실전형 학습",
  },
  {
    day: 7,
    title: "RP 1차 미팅 (대화/태도/질문)",
    desc: "고객과 첫 만남에서 신뢰 형성부터 니즈 파악까지 대화 흐름을 디테일하게 연습",
  },
  {
    day: 8,
    title: "RP 2차 미팅 (설계/비교/마무리)",
    desc: "필요 자료 제시, 설계 비교, 마무리 멘트까지 전 과정을 실전처럼 진행",
  },
  {
    day: 9,
    title: "모바일 청약 + 고지의무 + 사후관리",
    desc: "모바일 청약 체험, 고지의무 설명, 모니터링/증권 전달까지 실무형으로 학습",
  },
  {
    day: 10,
    title: "전체 과정 종합 시뮬레이션",
    desc: "첫 상담부터 청약/사후관리까지 1~9일차 전체 내용을 처음부터 끝까지 통합 실습",
  },
];

export default function OnboardingTimelineSection() {
  return (
    <section id="onboarding" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 break-words">
            10일 완성 온보딩 로드맵
          </h2>
          <p className="text-slate-600 text-sm md:text-base break-words">
            신입 기준, 1일차부터 10일차까지 실전 투입을 목표로 한 디테일 교육 과정
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
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 mb-1 break-words">Day {item.day} · {item.title}</h3>
                      <p className="text-slate-600 text-sm break-words">{item.desc}</p>
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
