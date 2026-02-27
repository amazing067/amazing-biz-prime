"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PenSquare,
  ClipboardList,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Service = {
  id: string;
  anchorId: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  previews: string[];
};

const services: Service[] = [
  {
    id: "portal",
    anchorId: "proof-portal",
    title: "영업지원 포털",
    tagline: "DB·고객·일정을 한 번에 보는 올인원 포털",
    icon: LayoutDashboard,
    href: "https://어메이징사업부.com",
    previews: ["/proof/portal-1.png", "/proof/portal-2.png"],
  },
  {
    id: "blog-ai",
    anchorId: "proof-blog-ai",
    title: "보험 블로그 AI",
    tagline: "블로그·카페 Q&A·설계서 분석까지 한 번에",
    icon: PenSquare,
    href: "https://blog.xn--2e0bu9h4vczzczpaq.com",
    previews: ["/proof/blogai-1.png", "/proof/blogai-2.png"],
  },
  {
    id: "claim-hub",
    anchorId: "proof-claim-hub",
    title: "청구 허브",
    tagline: "보험금 청구에 필요한 정보를 한 링크로",
    icon: ClipboardList,
    href: "https://청구.com",
    previews: ["/proof/claim-1.png", "/proof/claim-2.png"],
  },
  {
    id: "dementia-test",
    anchorId: "proof-dementia-test",
    title: "치매검사 서비스",
    tagline: "무료 온라인 검사로 뇌 건강과 간병비를 미리 확인",
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

  const openPreview = (service: Service, index: number) => {
    setActiveService(service);
    setActiveIndex(index);
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
            실제 운영 화면 미리보기
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            말이 아니라 화면으로 확인하세요. (클릭하면 확대 미리보기)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                id={service.anchorId}
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-soft hover:shadow-soft-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-electric-blue/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base md:text-lg">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {service.previews.slice(0, 2).map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => openPreview(service, i)}
                        className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-900/5 hover:shadow-soft transition-shadow"
                        aria-label={`${service.title} 미리보기 ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${service.title} 미리보기 ${i + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openPreview(service, 0)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-electric-blue/40 bg-white px-4 py-1.5 text-xs font-semibold text-electric-blue hover:bg-electric-blue/5 transition-colors"
                  >
                    미리보기
                  </button>

                  <a
                    href={service.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-blue hover:text-blue-700 transition-colors"
                  >
                    바로 살펴보기
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
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
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    Preview
                  </p>
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
      </AnimatePresence>
    </section>
  );
}

