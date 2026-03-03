"use client";

import { motion } from "framer-motion";
import { FileText, Youtube, Share2, MessageSquare, ArrowRight } from "lucide-react";

const items = [
  {
    id: "blog",
    title: "네이버 블로그",
    subtitle: "상위 노출을 목표로 한 SEO 구조 + 초안 자동화",
    bullets: ["키워드/구조 기반 글 초안 생성", "Q&A/설계서 분석 콘텐츠 확장", "업로드 가능한 형태로 정리"],
    href: "#proof-blog-ai",
    cta: "AI 화면 보기",
    icon: FileText,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "youtube",
    title: "유튜브/쇼츠",
    subtitle: "촬영 환경 + 루틴으로 ‘지속 생산’이 가능하게",
    bullets: ["촬영/세팅 지원(스튜디오 기반)", "콘텐츠 루틴으로 누적", "신뢰/인지도 상승 구조"],
    href: "#studio",
    cta: "스튜디오 보기",
    icon: Youtube,
    gradient: "from-sky-500 to-electric-blue",
  },
  {
    id: "sns",
    title: "SNS 운영",
    subtitle: "리텐션/재접촉을 만드는 짧은 콘텐츠 운영",
    bullets: ["짧은 콘텐츠 재활용 구조", "고객 재접촉 루틴 설계", "운영 템플릿 제공"],
    href: "#proof-pack",
    cta: "Proof Pack 보기",
    icon: Share2,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "cafe",
    title: "카페 운영 (Q&A)",
    subtitle: "자주 묻는 질문에 대한 답변을 쉽게 만들고, 꾸준히 답해 전문성을 쌓는 지원",
    bullets: [
      "보험카페에서 자주 나오는 질문에 맞는 답변 문장 자동 생성",
      "일관된 톤으로 전문 답변 포스팅 가능",
      "답변 누적으로 검색 유입·신뢰 모두 올리기",
    ],
    href: "#proof-blog-ai",
    cta: "Q&A 도구 보기",
    icon: MessageSquare,
    gradient: "from-amber-400 to-orange-500",
  },
];

export default function ChannelGrowthSection() {
  return (
    <section id="channels" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            채널 성장 지원 시스템
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            “최상단 노출 보장”이 아니라, 상위 노출을 목표로 설계된 콘텐츠·운영 시스템을 제공합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 shadow-soft hover:shadow-soft-lg transition-shadow p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${it.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700">
                    운영 루틴 제공
                  </span>
                </div>

                <h3 className="mt-4 text-xl md:text-2xl font-bold text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-2 text-slate-700 font-semibold text-sm md:text-base">
                  {it.subtitle}
                </p>

                <ul className="mt-4 space-y-2 text-slate-600 text-sm md:text-base leading-relaxed">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-slate-400/70 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={it.href}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-electric-blue hover:text-blue-700 transition-colors"
                >
                  {it.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
