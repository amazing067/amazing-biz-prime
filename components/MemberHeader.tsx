"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MemberHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
            const username = user.email?.split('@')[0] || '';
            setUserProfile({ ...profile, username });
          }
        }
      } catch (error) {
        // 에러 무시
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkUser();
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/member");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg border-b border-slate-200"
          : "bg-gradient-to-b from-electric-blue/10 to-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          <Link
            href="/member/lounge"
            className="text-lg font-bold text-gradient flex items-center space-x-2 flex-shrink-0"
          >
            <span className="whitespace-nowrap">
              Prime Asset
              <span className="text-slate-600"> Amazing</span>
              <span className="text-electric-blue ml-2">회원전용</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Link
              href="/member/lounge"
              className={`text-slate-700 hover:text-electric-blue transition-colors text-sm font-medium whitespace-nowrap ${
                pathname === "/member/lounge" ? "text-electric-blue font-semibold" : ""
              }`}
            >
              회원라운지
            </Link>

            {/* 사용자 정보 - 콤팩트 */}
            {userProfile && (
              <div className="flex items-center h-8 px-2.5 bg-gradient-to-r from-electric-blue/10 to-blue-50 rounded-md border border-electric-blue/20 whitespace-nowrap">
                <div className="flex flex-col justify-center">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">
                    {userProfile.name || '사용자'}
                  </div>
                  <div className="text-[10px] text-slate-600 truncate max-w-[120px] leading-tight">
                    {userProfile.position || ''} | {userProfile.branch || ''}
                  </div>
                </div>
              </div>
            )}

            {/* 로그아웃 - 콤팩트 */}
            <button
              onClick={handleLogout}
              className="flex items-center h-8 space-x-1.5 px-2.5 text-slate-600 hover:text-slate-900 rounded-md border border-slate-300 hover:border-slate-400 transition-all text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>

            {/* 홈으로 */}
            <Link
              href="/"
              className="flex items-center space-x-1 text-slate-600 hover:text-electric-blue transition-colors text-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>홈</span>
            </Link>
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
            className="lg:hidden bg-white border-t border-slate-200 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/member/lounge"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-semibold text-slate-900 hover:text-electric-blue transition-colors"
              >
                회원라운지
              </Link>

              {userProfile && (
                <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-sm font-semibold text-slate-900 mb-1">
                    {userProfile.name || '사용자'}
                  </div>
                  <div className="text-xs text-slate-600">
                    {userProfile.position || ''} | {userProfile.branch || ''}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full px-3 py-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-300 hover:border-slate-400 transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </button>

              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 text-slate-600 hover:text-electric-blue transition-colors text-sm"
              >
                <Home className="w-4 h-4" />
                <span>홈</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

