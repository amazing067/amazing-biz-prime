"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MemberHeader from "@/components/MemberHeader";

export default function MemberBusinessCardPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // 통합 회원 시스템: localStorage 기반 인증
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedOrientation) {
      alert("명함 디자인을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formObject: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        formObject[key] = value.toString();
      });

      const response = await fetch("/api/send-business-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formObject.name,
          position: "팀장",
          phone: formObject.phone,
          fax: formObject.fax,
          email: formObject.email,
          address: "서울 광진구 천호대로 561, 영창빌딩 8층 (군자역4번출구)",
          orientation: selectedOrientation === "horizontal" ? "가로형" : "세로형",
          shape: selectedShape === "round" ? "라운드형" : selectedShape === "square" ? "사각형" : "없음",
          quantity: "200",
          memo: formObject.memo || "없음",
          subject: `[명함신청] ${formObject.name}님의 명함 신청서`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || "이메일 전송에 실패했습니다.");
      }

      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedOrientation("");
      setSelectedShape("");

      alert("명함 신청이 완료되었습니다!");
    } catch (error: any) {
      alert(`${error.message || "신청 중 오류가 발생했습니다."}`);
    } finally {
      setIsSubmitting(false);
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <MemberHeader />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl mb-6 shadow-lg">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            명함 신청
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            어메이징 사업부 명함 신청 서비스입니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            명함 신청 양식
          </h3>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={userProfile?.name || ""}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  직책
                </label>
                <input
                  type="text"
                  value="팀장"
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  defaultValue={userProfile?.phone || ""}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="연락처를 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  팩스번호
                </label>
                <input
                  type="tel"
                  name="fax"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="팩스번호를 입력하세요"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                주소
              </label>
              <input
                type="text"
                value="서울 광진구 천호대로 561, 영창빌딩 8층 (군자역4번출구)"
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                명함 디자인 선택 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  onClick={() => setSelectedOrientation("horizontal")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedOrientation === "horizontal"
                      ? "border-electric-blue bg-electric-blue/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-slate-50">
                    <Image
                      src="/명함 가로형.jpg"
                      alt="명함 가로형"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">가로형</span>
                    {selectedOrientation === "horizontal" && (
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSelectedOrientation("vertical")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedOrientation === "vertical"
                      ? "border-electric-blue bg-electric-blue/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden bg-slate-50">
                    <Image
                      src="/명함 세로형.jpg"
                      alt="명함 세로형"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">세로형</span>
                    {selectedOrientation === "vertical" && (
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                선택사항
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  onClick={() => setSelectedShape(selectedShape === "round" ? "" : "round")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedShape === "round"
                      ? "border-electric-blue bg-electric-blue/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">라운드형</span>
                    {selectedShape === "round" && (
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSelectedShape(selectedShape === "square" ? "" : "square")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedShape === "square"
                      ? "border-electric-blue bg-electric-blue/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">사각형</span>
                    {selectedShape === "square" && (
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                특이사항
              </label>
              <textarea
                name="memo"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue resize-none"
                placeholder="특이사항이나 요청사항을 입력하세요"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "전송 중..." : "신청하기"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/member/lounge"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-electric-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>회원 라운지로 돌아가기</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

