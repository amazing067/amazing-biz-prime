"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PenSquare,
  ClipboardList,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Service = {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  previews: string[];
};

const services: Service[] = [
  {
    id: "portal",
    title: "영업지원 포털",
    tagline: "DB·고객·일정을 한 번에 보는 올인원 포털",
    bullets: ["DB 분배·대기 현황", "고객관리·일정·알림", "개인·본부 대시보드"],
    icon: LayoutDashboard,
    href: "https://어메이징사업부.com", // 실제 포털 URL로 교체 가능
    previews: ["/proof/portal-1.png", "/proof/portal-2.png"],
  },
  {
    id: "blog-ai",
    title: "보험 블로그 AI",
    tagline: "30초 만에 블로그·Q&A·설계서 분석까지",
    bullets: ["SEO 최적화 포스팅", "보험카페 Q&A 자동 생성", "설계서 이미지 분석 기반 문장"],
    icon: PenSquare,
    href: "https://blog.xn--2e0bu9h4vczzczpaq.com", // blog.어메이징사업부.com
    previews: ["/proof/blogai-1.png", "/proof/blogai-2.png"],
  },
  {
    id: "claim-hub",
    title: "청구 허브",
    tagline: "보험금 청구에 필요한 모든 정보를 한 링크로",
    bullets: ["전산·필요서류·PDF 청구서", "치과확인서·고객센터·FAX", "보험나이·실손 계산기"],
    icon: ClipboardList,
    href: "https://청구.com",
    previews: ["/proof/claim-1.png", "/proof/claim-2.png"],
  },
  {
    id: "dementia-test",
    title: "치매검사 서비스",
    tagline: "무료 온라인 검사로 뇌 건강과 간병비를 미리 확인",
    bullets: ["15가지 인지 평가", "10년 후 간병비 예측", "검사 후 무료 상담 연결"],
    icon: BrainCircuit,
    href: "https://치매검사.com",
    previews: ["/proof/dementia-1.png", "/proof/dementia-2.png"],
  },
];

export default function EcosystemSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const closeModal = () => {
    setActiveService(null);
    setActiveIndex(0);
  };

  return (
    <section id="ecosystem" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Amazing Ecosystem
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            말이 아닌, 실제로 운영 중인 4가지 서비스
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-soft hover:shadow-soft-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-electric-blue/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{service.tagline}</p>
                  <ul className="space-y-1.5 text-xs text-slate-500">
                    {service.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-electric-blue/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-electric-blue/40 bg-white px-4 py-1.5 text-xs font-semibold text-electric-blue hover:bg-electric-blue/5 transition-colors"
                  >
                    미리보기
                  </button>
                  <Link
                    href={service.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-blue hover:text-blue-700 transition-colors"
                  >
                    바로 살펴보기
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 미리보기 모달 */}
      {activeService && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl rounded-2xl bg-white shadow-soft-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Preview</p>
                <h3 className="text-sm md:text-base font-semibold text-slate-900">
                  {activeService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                닫기
              </button>
            </div>
            <div className="bg-slate-900 flex items-center justify-center">
              <div className="relative w-full max-w-2xl aspect-video">
                <Image
                  src={activeService.previews[activeIndex]}
                  alt={`${activeService.title} 미리보기 ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </div>
            {activeService.previews.length > 1 && (
              <div className="flex justify-center gap-2 py-3 bg-white">
                {activeService.previews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full ${
                      i === activeIndex ? "bg-electric-blue" : "bg-slate-300"
                    }`}
                    aria-label={`미리보기 ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

