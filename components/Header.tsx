"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Home, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// 통합 회원 시스템: Supabase 제거, localStorage 사용
export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // 통합 회원 시스템: localStorage에서 사용자 정보 확인
  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          
          // 승인된 사용자만 로그인 상태로 표시
          if (user.status === 'approved' && user.is_active) {
            setIsLoggedIn(true);
            setUserProfile({
              username: user.username,
              name: user.full_name,
              position: user.role,
              branch: user.branch_name_text || '',
              is_admin: user.role === 'amazing' || user.role === 'admin',
            });
            if (user.role === 'amazing' || user.role === 'admin') {
              setIsAdmin(true);
            }
          } else {
            setIsLoggedIn(false);
            setUserProfile(null);
            setIsAdmin(false);
          }
        } else {
          setIsLoggedIn(false);
          setUserProfile(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('사용자 정보 확인 오류:', error);
        setIsLoggedIn(false);
        setUserProfile(null);
        setIsAdmin(false);
      }
    };

    checkUser();

    // localStorage 변경 감지 (다른 탭에서 로그인/로그아웃 시)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 같은 탭에서의 변경 감지 (커스텀 이벤트)
    const handleAuthChange = () => {
      checkUser();
    };
    
    window.addEventListener('auth-changed', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, []);


  const handleMenuClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
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

            {/* 로그인한 경우: 설계사 전용 링크 및 사용자 정보 */}
            {isLoggedIn && userProfile ? (
              <>
                <Link
                  href="/member/lounge"
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-electric-blue to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors text-sm font-medium whitespace-nowrap h-8"
                >
                  <LogIn className="w-4 h-4" />
                  <span>설계사 전용</span>
                </Link>
                <div className="flex items-center px-3 py-1.5 animated-gradient-bg rounded-md border border-slate-200 whitespace-nowrap h-8">
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
              /* 로그인하지 않은 경우: 설계사 전용 버튼 */
            <a
              href="/member"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-electric-blue text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium whitespace-nowrap h-8"
            >
                <LogIn className="w-4 h-4" />
              <span>설계사 전용</span>
            </a>
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

              {/* 로그인한 경우: 설계사 전용 링크 및 사용자 정보 */}
              {isLoggedIn && userProfile ? (
                <>
                  <Link
                    href="/member/lounge"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-electric-blue to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors text-sm font-medium"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>설계사 전용</span>
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
                /* 로그인하지 않은 경우: 설계사 전용 버튼 */
              <a
                href="/member"
                className="flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-electric-blue text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>설계사 전용</span>
              </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
