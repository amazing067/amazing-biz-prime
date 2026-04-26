"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, FileEdit, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function sanitizeTel(input: string) {
  return input.replace(/[^\d+]/g, "");
}

const SCROLL_SHOW_RATIO = 0.1;
const FOOTER_FADE_START = 0.88;

export default function FloatingContactDock() {
  const pathname = usePathname();
  const hiddenOnRoutes = useMemo(() => ["/member"], []);
  const shouldHide =
    hiddenOnRoutes.some((p) => pathname === p || pathname.startsWith(p + "/")) || false;

  const phoneRaw = process.env.NEXT_PUBLIC_CONTACT_PHONE || "02-2038-4379";
  const kakaoBaseUrl =
    process.env.NEXT_PUBLIC_KAKAO_CHAT_URL ||
    "https://pf.kakao.com/_JxmxaJn/chat?utm_source=naver_blog&utm_medium=post&utm_campaign=content&utm_content=";
  const kakaoUrl = `${kakaoBaseUrl}${kakaoBaseUrl.includes("?") ? "&" : "?"}source=prime-asset-home`;
  const telHref = phoneRaw ? `tel:${sanitizeTel(phoneRaw)}` : "";

  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (shouldHide) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const h = document.documentElement.scrollHeight - window.innerHeight || 1;
        const ratio = h > 0 ? y / h : 0;
        setVisible(ratio >= SCROLL_SHOW_RATIO);
        if (ratio >= FOOTER_FADE_START) {
          setOpacity(Math.max(0.35, 1 - ((ratio - FOOTER_FADE_START) / (1 - FOOTER_FADE_START)) * 0.65));
        } else {
          setOpacity(1);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [shouldHide]);

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* 모바일: 하단 고정 바 3분할 (전화 / 지원 / 카카오) */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          >
            <div className="flex items-center justify-center gap-2 px-3 py-3 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-soft-lg safe-area-pb min-w-0">
              {telHref ? (
                <a
                  href={telHref}
                  className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  aria-label="전화 걸기"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-xs">전화</span>
                </a>
              ) : null}
              <Link
                href="#recruit"
                className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-electric-blue to-violet-600 shadow-lg"
                aria-label="무료 상담 신청"
              >
                <FileEdit className="w-5 h-5" />
                <span className="text-xs">지원</span>
              </Link>
              <a
                href={kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-3 rounded-xl font-semibold text-[#191919] bg-[#FEE500] hover:bg-[#FDD835] transition-colors"
                aria-label="카카오 1:1 상담"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 3c5.8 0 10.5 4.2 10.5 9.4 0 5.2-4.7 9.4-10.5 9.4-1.1 0-2.2-.2-3.1-.5l-3.5 1.2 1.2-3.4c-1-.7-1.8-1.6-2.4-2.6C3.4 16.2 3 14.7 3 12.4 3 7.2 7.7 3 12 3z" />
                </svg>
                <span className="text-xs">카카오</span>
              </a>
            </div>
          </motion.div>

          {/* 데스크톱: 우측 하단 둥근 도크 */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2"
          >
            <div className="flex flex-col gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-lg border border-slate-200 shadow-soft-lg">
              {telHref ? (
                <a
                  href={telHref}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors font-medium"
                  aria-label="전화 걸기"
                >
                  <Phone className="w-5 h-5" />
                  <span>전화</span>
                </a>
              ) : null}
              <a
                href={kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#191919] bg-[#FEE500] hover:bg-[#FDD835] transition-colors font-medium"
                aria-label="카카오 1:1 상담"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 3c5.8 0 10.5 4.2 10.5 9.4 0 5.2-4.7 9.4-10.5 9.4-1.1 0-2.2-.2-3.1-.5l-3.5 1.2 1.2-3.4c-1-.7-1.8-1.6-2.4-2.6C3.4 16.2 3 14.7 3 12.4 3 7.2 7.7 3 12 3z" />
                </svg>
                <span>카카오 1:1 상담</span>
              </a>
              <p className="text-[10px] text-slate-500 px-2 pb-1 leading-tight">
                평일 09~18시 답변
              </p>
            </div>
            <Link
              href="#recruit"
              className="text-sm font-semibold text-electric-blue hover:text-blue-700 transition-colors"
            >
              지원 문의 →
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
