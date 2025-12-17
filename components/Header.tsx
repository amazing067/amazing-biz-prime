"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 하단 바 제거됨 - 탭 구조로 변경

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleMenuClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    
    // 메인 페이지가 아니면 메인 페이지로 이동
    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    
    // 메인 페이지에서 스크롤
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80; // 헤더 높이
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-soft backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gradient flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span>
              Prime Asset
              <span className="text-slate-600"> Amazing</span>
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* 홈 버튼 */}
            {pathname !== "/" && (
              <Link
                href="/"
                className="flex items-center space-x-2 text-slate-700 hover:text-electric-blue transition-colors font-medium"
              >
                <Image
                  src="/prime-logo.png"
                  alt="Prime Asset"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
                <Home className="w-4 h-4" />
                <span>홈</span>
              </Link>
            )}

            {/* 프라임에셋 소개 */}
            <Link
              href="/prime-asset"
              className={`flex items-center space-x-1 text-slate-700 hover:text-electric-blue transition-colors font-medium ${
                pathname === "/prime-asset" ? "text-electric-blue" : ""
              }`}
            >
              <span>프라임에셋 소개</span>
            </Link>

            {/* 어메이징 사업부 */}
            <Link
              href="/amazing"
              className={`flex items-center space-x-1 text-slate-700 hover:text-electric-blue transition-colors font-medium ${
                pathname === "/amazing" ? "text-electric-blue" : ""
              }`}
            >
              <span>어메이징 사업부</span>
            </Link>

            {/* 입사문의 */}
            <a
              href="#recruit"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("#recruit");
              }}
              className="text-slate-700 hover:text-electric-blue transition-colors font-medium"
            >
              입사문의
            </a>

            {/* 회원전용방 버튼 */}
            <a
              href="/member"
              className="flex items-center space-x-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <LogIn className="w-4 h-4" />
              <span>회원전용</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-slate-200/50 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-6 py-4 space-y-4">
              {/* 프라임에셋 소개 */}
              <Link
                href="/prime-asset"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-semibold text-slate-900 mb-2 hover:text-electric-blue transition-colors"
              >
                프라임에셋 소개
              </Link>

              {/* 어메이징 사업부 */}
              <Link
                href="/amazing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-semibold text-slate-900 mb-2 hover:text-electric-blue transition-colors"
              >
                어메이징 사업부
              </Link>

              {/* 입사문의 */}
              <a
                href="#recruit"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick("#recruit");
                }}
                className="block text-slate-700 hover:text-electric-blue transition-colors font-medium"
              >
                입사문의
              </a>

              {/* 회원전용방 */}
              <a
                href="/member"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                <LogIn className="w-4 h-4" />
                <span>회원전용</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
