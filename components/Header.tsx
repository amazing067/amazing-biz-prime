"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Home, ChevronDown, Users, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // 사용자 로그인 상태 및 프로필 확인
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profile && profile.approved) {
            setIsLoggedIn(true);
            // email에서 아이디 추출 (@ 앞부분)
            const username = user.email?.split('@')[0] || '';
            setUserProfile({ ...profile, username });
            if (profile.is_admin) {
              setIsAdmin(true);
            }
          }
        }
      } catch (error) {
        // 에러 무시
      }
    };
    checkUser();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkUser();
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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
      <nav className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20 gap-2">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-gradient flex items-center space-x-2 flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="whitespace-nowrap">
              Prime Asset
              <span className="text-slate-600"> Amazing</span>
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {/* 홈 버튼 */}
            {pathname !== "/" && (
              <Link
                href="/"
                className="flex items-center space-x-1 text-slate-700 hover:text-electric-blue transition-colors text-base font-medium whitespace-nowrap"
              >
                <Home className="w-5 h-5" />
                <span>홈</span>
              </Link>
            )}

            {/* 프라임에셋 소개 */}
            <Link
              href="/prime-asset"
              className={`text-slate-700 hover:text-electric-blue transition-colors text-base font-medium whitespace-nowrap ${
                pathname === "/prime-asset" ? "text-electric-blue" : ""
              }`}
            >
              프라임에셋 소개
            </Link>

            {/* 어메이징 사업부 */}
            <Link
              href="/amazing"
              className={`text-slate-700 hover:text-electric-blue transition-colors text-base font-medium whitespace-nowrap ${
                pathname === "/amazing" ? "text-electric-blue" : ""
              }`}
            >
              어메이징 사업부
            </Link>

            {/* 업무지원 드롭다운 */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === "support" ? null : "support")}
                className={`flex items-center space-x-1 text-slate-700 hover:text-electric-blue transition-colors text-base font-medium whitespace-nowrap ${
                  openDropdown === "support" ? "text-electric-blue" : ""
                }`}
              >
                <span>업무지원</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === "support" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "support" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden"
                  >
                    <Link
                      href="/support/business-card"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-electric-blue transition-colors"
                    >
                      명함신청
                    </Link>
                    <Link
                      href="/support/badge"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-electric-blue transition-colors border-t border-slate-100"
                    >
                      명찰신청
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 입사문의 */}
            <a
              href="#recruit"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("#recruit");
              }}
              className="text-slate-700 hover:text-electric-blue transition-colors text-base font-medium whitespace-nowrap"
            >
              입사문의
            </a>

            {/* 로그인한 경우: 교육동영상 링크 및 사용자 정보 */}
            {isLoggedIn && userProfile ? (
              <>
                <Link
                  href="/member/education"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors text-base font-medium whitespace-nowrap h-[42px]"
                >
                  <Video className="w-5 h-5" />
                  <span>교육동영상</span>
                </Link>
                <div className="flex items-center px-4 py-2 animated-gradient-bg rounded-lg border border-slate-200 whitespace-nowrap h-[42px]">
                  <div className="flex flex-col justify-center">
                    <div className="text-sm font-semibold text-slate-900 leading-tight">
                      {userProfile.name || '사용자'}
                    </div>
                    <div className="text-xs text-slate-600 truncate max-w-[140px] leading-tight">
                      {userProfile.position || ''} | {userProfile.branch || ''}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* 로그인하지 않은 경우: 회원전용 버튼 */
              <a
                href="/member"
                className="flex items-center space-x-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-base font-medium whitespace-nowrap"
              >
                <LogIn className="w-5 h-5" />
                <span>회원전용</span>
              </a>
            )}

            {/* 회원관리 버튼 (관리자만 표시) */}
            {isAdmin && (
              <Link
                href="/member/dashboard"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-base font-medium whitespace-nowrap"
              >
                <Users className="w-5 h-5" />
                <span>회원관리</span>
              </Link>
            )}
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

              {/* 업무지원 */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "support-mobile" ? null : "support-mobile")}
                  className="flex items-center justify-between w-full font-semibold text-slate-900 hover:text-electric-blue transition-colors"
                >
                  <span>업무지원</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === "support-mobile" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === "support-mobile" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 ml-4 space-y-2"
                    >
                      <Link
                        href="/support/business-card"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="block text-slate-700 hover:text-electric-blue transition-colors"
                      >
                        명함신청
                      </Link>
                      <Link
                        href="/support/badge"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="block text-slate-700 hover:text-electric-blue transition-colors"
                      >
                        명찰신청
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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

              {/* 로그인한 경우: 교육동영상 링크 및 사용자 정보 */}
              {isLoggedIn && userProfile ? (
                <>
                  <Link
                    href="/member/education"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors font-medium"
                  >
                    <Video className="w-4 h-4" />
                    <span>교육동영상</span>
                  </Link>
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm font-semibold text-slate-900 mb-1">
                      {userProfile.name || '사용자'}
                    </div>
                    <div className="text-xs text-slate-600">
                      {userProfile.position || ''} | {userProfile.branch || ''}
                    </div>
                  </div>
                </>
              ) : (
                /* 로그인하지 않은 경우: 회원전용 버튼 */
                <a
                  href="/member"
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>회원전용</span>
                </a>
              )}

              {/* 회원관리 버튼 (관리자만 표시) */}
              {isAdmin && (
                <Link
                  href="/member/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <Users className="w-4 h-4" />
                  <span>회원관리</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
