"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrolled(ratio);
      setVisible(ratio > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="flex items-center justify-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-soft-lg safe-area-pb min-w-0">
            <Link
              href="#recruit"
              className="flex-1 min-w-0 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-electric-blue to-violet-600 shadow-lg"
              aria-label="무료 상담 신청"
            >
              <MessageCircle className="w-5 h-5" />
              <span>무료 상담 신청</span>
            </Link>
            <a
              href="tel:01056040424"
              className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="전화 걸기"
            >
              <Phone className="w-5 h-5" />
              <span>전화</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
