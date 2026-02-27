"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Video } from "lucide-react";

const PLACEHOLDERS = [
  { label: "4K 촬영", gradient: "from-violet-600 to-fuchsia-600" },
  { label: "DiGiCo 콘솔", gradient: "from-violet-500 to-purple-700" },
  { label: "프로 오디오", gradient: "from-fuchsia-500 to-pink-600" },
  { label: "편집 지원", gradient: "from-purple-600 to-violet-500" },
  { label: "스튜디오 뷰", gradient: "from-indigo-500 to-violet-600" },
  { label: "녹화 환경", gradient: "from-violet-600 to-indigo-600" },
];

export default function StudioGallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="studio" className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            스튜디오 환경
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            프로 촬영·편집 지원으로 콘텐츠 제작에만 집중하세요
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {PLACEHOLDERS.map((item, i) => (
              <div
                key={item.label}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 py-4"
              >
                <div
                  className={`aspect-video rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <Video className="w-12 h-12 text-white/80" />
                  <span className="absolute bottom-2 left-2 right-2 text-center text-white/90 text-sm font-medium">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {PLACEHOLDERS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`슬라이드 ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === selectedIndex ? "bg-violet-500 w-6" : "bg-slate-300"
              }`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
