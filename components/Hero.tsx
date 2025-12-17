"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cool-gray to-titanium-silver pt-28">
      {/* Background Wave Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 로고 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <Image
              src="/prime-logo.png"
              alt="Prime Asset Amazing"
              width={200}
              height={66}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-slate-900">System makes Money.</span>
            <br />
            <span className="text-gradient">감정을 배제한</span>
            <br />
            <span className="text-slate-700">완벽한 영업 지원 시스템.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Amazing Division.
          </motion.p>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          className="relative mt-16"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <div className="relative mx-auto w-64 md:w-80">
            {/* Phone Frame */}
            <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-soft-lg">
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                {/* Screen Content */}
                <div className="aspect-[9/19.5] bg-gradient-to-br from-electric-blue/20 to-slate-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-electric-blue rounded-2xl mx-auto mb-4 shadow-lg" />
                    <div className="h-2 bg-slate-200 rounded-full w-24 mx-auto mb-2" />
                    <div className="h-2 bg-slate-200 rounded-full w-32 mx-auto" />
                  </div>
                </div>
              </div>
              {/* Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full" />
            </div>

            {/* Floating Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-electric-blue/20 rounded-[3rem] blur-2xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-slate-400 w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}

