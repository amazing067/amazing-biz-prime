"use client";

import { motion } from "framer-motion";
import { Video, Camera, Mic, Sparkles } from "lucide-react";

const mediaItems = [
  { icon: Camera, label: "4K 카메라", delay: 0.1 },
  { icon: Video, label: "편집 스튜디오", delay: 0.2 },
  { icon: Mic, label: "프로 오디오", delay: 0.3 },
];

export default function MediaSection() {
  return (
    <section id="media" className="py-32 bg-gradient-to-b from-cool-gray to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-electric-blue" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Studio
          </h2>
          <p className="text-xl text-slate-600 font-light mb-2">
            유튜브 촬영부터 편집까지, Full-Stack Media Team.
          </p>
          <p className="text-lg text-slate-500 italic">
            당신은 카메라 앞에 서기만 하세요.
          </p>
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mediaItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="glass rounded-3xl p-10 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-slate-200/50 text-center">
                  {/* Metallic Icon Container */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-titanium-silver via-slate-200 to-slate-300 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-white via-titanium-silver to-slate-200 rounded-2xl p-6 shadow-lg border border-slate-300/50 group-hover:border-electric-blue/30 transition-colors">
                      <Icon className="w-12 h-12 text-slate-700 mx-auto" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.label}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Studio Description */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-3xl p-12 shadow-soft border border-slate-200/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                전문가가 만드는 콘텐츠
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-4">
                최신 장비와 숙련된 제작팀이 당신의 영업 활동을 고품질 영상으로
                제작합니다.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-electric-blue rounded-full mr-3" />
                  썸네일 디자인 및 최적화
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-electric-blue rounded-full mr-3" />
                  SEO 최적화된 제목 및 설명
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-electric-blue rounded-full mr-3" />
                  데이터 기반 콘텐츠 전략
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-soft-lg flex items-center justify-center">
                <Video className="w-20 h-20 text-slate-400" />
              </div>
              <motion.div
                className="absolute -inset-4 bg-electric-blue/10 rounded-2xl blur-2xl -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

