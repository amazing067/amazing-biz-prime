"use client";

import { motion } from "framer-motion";
import { ShieldCheck, GitBranch, Video, ChevronRight } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "DB 불안 없이 시작",
    subtitle: "분배가 ‘느낌’이 아니라, 규칙과 기록으로 운영됩니다.",
    bullets: [
      "분배 기준/상태를 확인 가능한 구조",
      "운영 흐름이 대시보드로 정리",
      "신입도 따라오는 온보딩 루틴 포함",
    ],
    href: "#flow",
    cta: "분배 흐름 보기",
  },
  {
    icon: GitBranch,
    title: "고객 설득이 쉬워짐",
    subtitle: "자료·템플릿·도구가 준비돼 있으니 상담이 단단해집니다.",
    bullets: [
      "표준 질문/진단/제안 템플릿 제공",
      "설계서 분석/콘텐츠 생성 등 시스템 지원",
      "청구/검사 등 고객용 도구로 신뢰 강화",
    ],
    href: "#proof-pack",
    cta: "Proof Pack 보기",
  },
  {
    icon: Video,
    title: "콘텐츠·촬영까지 시스템화",
    subtitle: "개인이 밤새지 않아도, 생산이 돌아가게 만듭니다.",
    bullets: [
      "블로그/콘텐츠 생성 흐름을 빠르게 적용",
      "스튜디오 환경 + 예약 운영",
      "결과물을 ‘지속적으로’ 쌓는 루틴 중심",
    ],
    href: "#studio",
    cta: "스튜디오 보기",
  },
];

export default function WhyNowStrip() {
  return (
    <section className="py-20 md:py-24 bg-navy-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-blueprint-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-black/40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight break-words">
            지금 여기서 시작하는 이유
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-titanium-silver/90 leading-relaxed max-w-3xl mx-auto break-words">
            “좋은 말”이 아니라, 실제로 확인 가능한 구조(흐름·도구·루틴)로 시작합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-soft min-w-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="mt-5">
                  <div className="text-xl md:text-2xl font-extrabold tracking-tight">{it.title}</div>
                  <div className="mt-2 text-base md:text-lg text-titanium-silver/90 leading-relaxed">
                    {it.subtitle}
                  </div>
                  <ul className="mt-5 space-y-2 text-base text-titanium-silver/85 leading-relaxed">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={it.href}
                    className="mt-6 inline-flex items-center text-white/90 hover:text-white font-semibold transition-colors"
                  >
                    {it.cta}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm md:text-base text-titanium-silver/80">
          상담 후 결정하셔도 됩니다. 원치 않으면 추가 연락 없이 종료합니다.
        </div>
      </div>
    </section>
  );
}
