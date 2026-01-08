"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Lock, Video, BookOpen } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

// 어메이징사업부.com API URL (환경 변수 또는 하드코딩)
// 개발 환경: http://localhost:3000/api
// 프로덕션: https://어메이징사업부.com/api
// 클라이언트 사이드에서는 환경 변수만 사용 (서버 사이드 API Route를 통해 프록시되므로 직접 사용하지 않음)
const AMAZING_BIZ_API_URL = process.env.NEXT_PUBLIC_AMAZING_BIZ_API_URL || "http://localhost:3000/api";

export default function MemberPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 통합 회원 시스템: Next.js API Route를 통해 프록시 요청 (CORS 문제 해결)
      console.log('로그인 시도:', { username });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          // 통합 회원 시스템: service_type 파라미터 제거 (어디서 가입했든 로그인 가능)
        }),
      });

      // 네트워크 오류 체크
      if (!response) {
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON 파싱 오류:', jsonError);
        throw new Error('서버 응답을 처리할 수 없습니다.');
      }

      if (!response.ok) {
        console.error('로그인 오류:', data);
        
        // 네트워크 오류인 경우
        if (!response.status) {
          setError("서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.");
          setLoading(false);
          return;
        }
        
        // 서버 오류 메시지 표시
        setError(data.error || "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        setLoading(false);
        return;
      }

        // 로그인 성공
        if (data.ok && data.token && data.user) {
          console.log('로그인 성공:', { username: data.user.username, role: data.user.role });
          
          // JWT 토큰과 사용자 정보를 localStorage에 저장
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // 다른 컴포넌트에 로그인 알림 (Header, MemberHeader 등)
          window.dispatchEvent(new Event('auth-changed'));

        // 승인되지 않은 사용자
        if (data.user.status !== 'approved' || !data.user.is_active) {
          setError("관리자 승인 후 이용하실 수 있습니다. 승인 대기 중입니다.");
          setLoading(false);
          return;
        }

        // 통합 회원 시스템: 모든 사용자(관리자 포함)는 회원 라운지로 이동
        // 회원 관리는 어메이징사업부.com에서만 가능
        router.push("/member/lounge");
      } else {
        setError("로그인 응답 형식이 올바르지 않습니다. 관리자에게 문의해주세요.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error('로그인 예외:', err);
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <Header />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-electric-blue to-blue-600 rounded-3xl mb-6 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            회원전용 서비스
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            어메이징 사업부 설계사만 이용 가능한 전용 서비스입니다
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            본 서비스는 어메이징 사업부에 소속된 설계사만 이용하실 수 있습니다.
            <br />
            로그인 후 회원전용방과 설계사교육방에 접근하여 다양한 자료와 교육 콘텐츠를
            이용하실 수 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 회원전용방 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-3xl p-8 shadow-soft border border-slate-200/50 cursor-pointer group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                회원전용방
              </h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              어메이징 사업부 설계사 전용 커뮤니티 공간입니다.
              <br />
              동료 설계사들과의 정보 공유, 영업 노하우, 각종 자료실 등을
              이용하실 수 있습니다.
            </p>
            <div className="flex items-center text-electric-blue group-hover:translate-x-2 transition-transform">
              <span className="font-medium">로그인 후 이용</span>
              <span className="ml-2">→</span>
            </div>
          </motion.div>

          {/* 설계사교육방 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-3xl p-8 shadow-soft border border-slate-200/50 cursor-pointer group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                설계사교육방
              </h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              어메이징 사업부 설계사 전용 교육 콘텐츠입니다.
              <br />
              전문가 특강 동영상, 전산 시스템 활용 교육, 온라인 영업 노하우 등
              체계적인 교육 자료를 제공합니다.
            </p>
            <div className="flex items-center text-electric-blue group-hover:translate-x-2 transition-transform">
              <span className="font-medium">로그인 후 이용</span>
              <span className="ml-2">→</span>
            </div>
          </motion.div>
        </div>

        {/* 로그인 폼 영역 */}
        <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            로그인
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                아이디
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "로그인 중..." : "로그인"}
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <a
              href="https://어메이징사업부.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-1"
            >
              회원가입
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-xs text-slate-500 mt-2">
              통합 회원 시스템: 어메이징사업부.com에서 가입하시면<br />
              프라임에셋.com에서도 로그인하실 수 있습니다.
            </p>
          </div>
        </motion.div>
        </div>

        {/* 홈으로 돌아가기 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-slate-600 hover:text-electric-blue transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

