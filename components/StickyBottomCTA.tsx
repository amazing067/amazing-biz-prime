"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

function sanitizeTel(input: string) {
  return input.replace(/[^\d+]/g, "");
}

export default function StickyBottomCTA() {
  const phoneRaw = process.env.NEXT_PUBLIC_CONTACT_PHONE || "01056040424";
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || "";
  const telHref = phoneRaw ? `tel:${sanitizeTel(phoneRaw)}` : "";

  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const h = document.documentElement.scrollHeight || 1;
        const vh = window.innerHeight || 1;
        const progress = (y + vh) / h;
        setShow(progress > 0.25);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-3"
          >
            <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-soft-lg p-2 flex items-center gap-2">
              {telHref ? (
                <a
                  href={telHref}
                  className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center"
                  aria-label="전화 상담"
                >
                  <Phone className="w-5 h-5 text-slate-700" />
                </a>
              ) : (
                <div className="w-12 h-12" />
              )}

              <a
                href="#recruit"
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold flex items-center justify-center shadow-soft"
                aria-label="무료 상담 신청"
              >
                무료 상담 신청
              </a>

              {kakaoUrl ? (
                <a
                  href={kakaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center"
                  aria-label="카카오 상담"
                >
                  <MessageCircle className="w-5 h-5 text-slate-700" />
                </a>
              ) : (
                <div className="w-12 h-12" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
