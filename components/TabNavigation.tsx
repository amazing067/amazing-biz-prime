"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Home,
  Building2,
  Briefcase,
  LogIn,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    id: "home",
    label: "메인",
    href: "/",
    icon: Home,
  },
  {
    id: "prime-asset",
    label: "프라임에셋 소개",
    href: "/prime-asset",
    icon: Building2,
    subItems: [
      { label: "대형GA", href: "/prime-asset#prime-asset-ga" },
      { label: "수수료", href: "/prime-asset#prime-asset-fee" },
      { label: "벨류체인", href: "/prime-asset#prime-asset-value" },
      { label: "영업규정집", href: "/prime-asset#prime-asset-rules" },
      { label: "영업지원시스템", href: "/prime-asset#prime-asset-system" },
    ],
  },
  {
    id: "amazing",
    label: "어메이징 사업부",
    href: "/amazing",
    icon: Briefcase,
    subItems: [
      { label: "본부장 소개", href: "/amazing#amazing-director" },
      { label: "영업 방법", href: "/amazing#amazing-sales" },
      { label: "교육시스템", href: "/amazing#amazing-education" },
      { label: "영업지원시스템", href: "/amazing#amazing-support" },
      { label: "지점 소개", href: "/amazing#amazing-branches" },
    ],
  },
  {
    id: "recruit",
    label: "입사문의",
    href: "/#recruit",
    icon: FileText,
  },
  {
    id: "member",
    label: "회원전용",
    href: "/member",
    icon: LogIn,
  },
];

export default function TabNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-20 left-0 right-0 z-40">
      {/* 탑 네비게이션 토글 버튼 */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between py-3 text-white hover:text-electric-blue transition-colors"
          >
            <span className="font-medium">페이지 네비게이션</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="space-y-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href === "/#recruit" && pathname === "/");

                  return (
                    <div key={item.id} className="space-y-2">
                      {/* 메인 메뉴 항목 */}
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                          isActive
                            ? "bg-electric-blue text-white"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>

                      {/* 서브메뉴 항목들 */}
                      {item.subItems && (
                        <div className="pl-6 space-y-1">
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-slate-400 hover:text-electric-blue hover:bg-slate-800/50 rounded-lg transition-colors text-sm font-medium"
                          >
                            전체 보기
                          </Link>
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors text-sm"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

