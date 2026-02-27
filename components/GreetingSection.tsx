"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const quote = "수익보다 신뢰를, 보험 그 이상의 가치를 증명하겠습니다.";
const directorName = "윤성옥";
const directorTitle = "067본부 대표";
const imageSrc = "/067본부윤성옥본부장님.jpg";
const fullText = `안녕하십니까, 어메이징사업부 067본부 대표 윤성옥입니다.

보험은 가족의 삶을 지키는 가장 신중한 선택이어야 합니다. 저희 어메이징사업부는 국내 33개 보험사의 상품을 객관적으로 비교하여, 고객의 상황에 가장 필요한 보장만을 정직하게 제안합니다.

단순히 상품을 판매하는 조직이 아닌, 고객의 이야기를 경청하고 함께 미래를 고민하는 파트너가 되겠습니다. 대한민국에서 가장 신뢰받는 보험 전문 조직으로서, 언제나 한결같은 마음으로 고객 곁을 지킬 것을 약속드립니다.`;

export default function GreetingSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: profile image - tone-on-tone */}
          <div className="relative aspect-[4/5] max-h-[520px] rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={imageSrc}
              alt={`${directorName} 본부장`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Right: quote + typography */}
          <div>
            <div className="text-6xl md:text-7xl font-serif text-slate-200 leading-none mb-6 select-none">
              “
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug tracking-tight mb-8">
              {quote}
            </h2>
            <p className="text-slate-600 font-medium mb-2">{directorName}</p>
            <p className="text-slate-500 text-sm mb-8">{directorTitle}</p>

            <AnimatePresence mode="wait">
              {!expanded ? (
                <motion.button
                  key="more"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpanded(true)}
                  className="text-electric-blue font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-electric-blue rounded px-1"
                >
                  더 읽기
                </motion.button>
              ) : (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="whitespace-pre-line text-slate-600 leading-relaxed mb-4"
                >
                  {fullText}
                </motion.div>
              )}
            </AnimatePresence>
            {expanded && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setExpanded(false)}
                className="text-slate-500 text-sm hover:text-slate-700"
              >
                접기
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
