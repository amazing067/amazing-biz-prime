"use client";

import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Briefcase,
  FileText,
  LogIn,
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
    href: "/#prime-asset-ga",
    icon: Building2,
    subItems: [
      { label: "대형GA", href: "/#prime-asset-ga" },
      { label: "수수료", href: "/#prime-asset-fee" },
      { label: "벨류체인", href: "/#prime-asset-value" },
      { label: "영업규정집", href: "/#prime-asset-rules" },
      { label: "영업지원시스템", href: "/#prime-asset-system" },
    ],
  },
  {
    id: "amazing",
    label: "어메이징 사업부",
    href: "/#amazing-director",
    icon: Briefcase,
    subItems: [
      { label: "본부장 소개", href: "/#amazing-director" },
      { label: "영업 방법", href: "/#amazing-sales" },
      { label: "교육시스템", href: "/#amazing-education" },
      { label: "영업지원시스템", href: "/#amazing-support" },
      { label: "지점 소개", href: "/#amazing-branches" },
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

export default function NavigationBar() {
  const pathname = usePathname();

  const handleClick = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.replace("/#", "#");
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-4 space-y-4">
          {/* 메인 메뉴 */}
          <div className="flex items-center gap-3 flex-wrap">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/#recruit" && pathname === "/") ||
                (item.href === "/" && pathname === "/");

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#")) {
                      e.preventDefault();
                      handleClick(item.href);
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-electric-blue text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* 서브메뉴 그룹 */}
          <div className="flex flex-wrap gap-3">
            {/* 프라임에셋 소개 서브메뉴 */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 text-sm px-2">프라임에셋 소개:</span>
              {navigationItems
                .find((item) => item.id === "prime-asset")
                ?.subItems?.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(subItem.href);
                    }}
                    className="px-3 py-1.5 text-sm text-slate-400 hover:text-electric-blue hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {subItem.label}
                  </Link>
                ))}
            </div>

            {/* 어메이징 사업부 서브메뉴 */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 text-sm px-2">어메이징 사업부:</span>
              {navigationItems
                .find((item) => item.id === "amazing")
                ?.subItems?.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(subItem.href);
                    }}
                    className="px-3 py-1.5 text-sm text-slate-400 hover:text-electric-blue hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {subItem.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

