"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Video, 
  FileText, 
  Users, 
  Award,
  CreditCard,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import MemberHeader from "@/components/MemberHeader";

// 통합 회원 시스템: localStorage 기반 인증
export default function MemberLoungePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        router.push("/member");
        return;
      }

      const user = JSON.parse(userStr);
      
      // 승인되지 않은 사용자는 접근 불가
      if (user.status !== 'approved' || !user.is_active) {
        alert("관리자 승인 후 이용하실 수 있습니다.");
        router.push("/member");
        return;
      }

      setUserProfile({
        name: user.full_name,
        username: user.username,
        role: user.role,
        branch: user.branch_name_text || '',
        office: user.team_name_text || '',
      });
    } catch (error) {
      console.error('인증 확인 오류:', error);
      router.push("/member");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
        <MemberHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto mb-4"></div>
            <p className="text-slate-600">로딩 중...</p>
          </div>
        </div>
      </main>
    );
  }

  const benefits = [
    {
      id: "education",
      title: "설계사 교육방",
      description: "전문가 특강 동영상, 전산 시스템 활용 교육, 온라인 영업 노하우 등 체계적인 교육 자료를 제공합니다.",
      icon: Video,
      color: "from-emerald-500 to-teal-500",
      href: "/member/education",
      badge: "교육 콘텐츠"
    },
    {
      id: "badge",
      title: "명찰 신청",
      description: "어메이징 사업부 전용 명찰을 신청하고 받아보세요. 고객에게 신뢰감을 주는 전문적인 명찰입니다.",
      icon: Award,
      color: "from-purple-500 to-pink-500",
      href: "/member/badge",
      badge: "영업 지원"
    },
    {
      id: "business-card",
      title: "명함 신청",
      description: "프리미엄 명함을 신청하세요. 가로형, 세로형 중 선택 가능하며 빠른 배송 서비스를 제공합니다.",
      icon: CreditCard,
      color: "from-blue-500 to-cyan-500",
      href: "/member/business-card",
      badge: "영업 지원"
    },
    {
      id: "community",
      title: "회원 커뮤니티",
      description: "동료 설계사들과의 정보 공유, 영업 노하우, 각종 자료실 등을 이용하실 수 있습니다.",
      icon: Users,
      color: "from-orange-500 to-red-500",
      href: "#",
      badge: "커뮤니티",
      comingSoon: true
    },
    {
      id: "resources",
      title: "영업 자료실",
      description: "각종 영업 자료, 제안서 템플릿, 상품 설명서 등 실무에 바로 활용할 수 있는 자료를 제공합니다.",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
      href: "#",
      badge: "자료실",
      comingSoon: true
    },
    {
      id: "consulting",
      title: "전문 상담",
      description: "영업 전략, 고객 관리, 상품 이해 등 전문가의 1:1 상담 서비스를 받을 수 있습니다.",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      href: "#",
      badge: "상담",
      comingSoon: true
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <MemberHeader />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-32">
        {/* 환영 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            회원 전용 라운지
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            {userProfile?.name || "회원"}님, 환영합니다! 👋
          </p>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            어메이징 사업부 설계사만을 위한 특별한 혜택을 만나보세요.
            <br />
            다양한 교육 자료와 영업 지원 서비스를 제공합니다.
          </p>
        </motion.div>

        {/* 혜택 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 cursor-pointer group relative overflow-hidden"
              >
                {benefit.href && benefit.href !== "#" ? (
                  <Link href={benefit.href} className="block">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {benefit.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {benefit.description}
                    </p>
                    <div className="flex items-center text-electric-blue group-hover:translate-x-2 transition-transform text-sm">
                      <span className="font-medium">바로가기</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </div>
                  </Link>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {benefit.comingSoon && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          준비중
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {benefit.description}
                    </p>
                    <div className="flex items-center text-slate-400 text-sm">
                      <span className="font-medium">준비 중입니다</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
