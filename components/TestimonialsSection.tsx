"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "예전에는 DB 분배 때문에 스트레스가 많았는데, 여기 오니까 투명하게 다 공개돼 있어서 영업에만 집중하게 됐어요. 상담만 잘하면 되니까 체감이 완전히 달라요.",
    author: "김*민",
    role: "067본부",
    detail: "영업 3년차",
  },
  {
    quote: "AI로 블로그 초안이랑 Q&A 자동 생성해 주니까 밤새 자료 만들 일이 없어졌어요. 스튜디오 예약해서 유튜브도 찍고, 타 본부 동기들한테 자랑하고 다닙니다.",
    author: "이*준",
    role: "290본부",
    detail: "온라인 영업 주력",
  },
  {
    quote: "33개사 상품 비교해 주는 시스템이 있어서 고객 상담할 때 자신 있게 말할 수 있어요. 객관적 데이터 보여주니까 신뢰도가 확 올라가더라고요.",
    author: "박*희",
    role: "292본부",
    detail: "기업컨설팅",
  },
  {
    quote: "교육이 체계적이에요. 원수사 교육, 특별교육 받으면서 실력이 쑥쑥 느는 게 느껴져요. 지점 분위기도 좋고요.",
    author: "최*영",
    role: "067본부",
    detail: "영업 1년차",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-12"
        >
          함께하는 분들의 이야기
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8"
            >
              <Quote className="absolute top-5 right-6 w-10 h-10 text-electric-blue/20" aria-hidden />
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-electric-blue/20 flex items-center justify-center text-electric-blue font-bold text-sm">
                  {t.author.replace(/\*/g, "").charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">
                    {t.role}
                    {t.detail && <span className="text-slate-400"> · {t.detail}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
