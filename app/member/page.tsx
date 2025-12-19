"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Lock, Video, BookOpen } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

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
      // 아이디를 이메일 형식으로 변환
      const autoEmail = `${username}@amazing-biz.com`;
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: autoEmail,
        password,
      });

      if (signInError) {
        // "Email not confirmed" 에러인 경우 이메일 확인 없이 직접 프로필 조회 시도
        if (signInError.message.includes('Email not confirmed') || signInError.message.includes('email_not_confirmed')) {
          // 이메일 확인 API 호출 (백그라운드, 결과 무시)
          fetch('/api/confirm-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: autoEmail }),
          }).catch(() => {}); // 에러 무시

          // 바로 프로필 조회 시도 (이메일 확인 없이)
          try {
            const profileResponse = await fetch('/api/get-profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                email: autoEmail,
                password: password,
              }),
            });

            if (profileResponse.ok) {
              const { profile } = await profileResponse.json();
              
              if (profile) {
                if (!profile.approved) {
                  setError("관리자 승인 후 이용하실 수 있습니다. 승인 대기 중입니다.");
                  setLoading(false);
                  return;
                }

                if (profile.is_admin) {
                  router.push("/member/dashboard");
                } else {
                  // 일반 회원 로그인 성공 - 설계사 교육방으로 이동
                  router.push("/member/education");
                }
                return;
              }
            } else {
              const errorData = await profileResponse.json().catch(() => ({}));
              console.error('프로필 조회 실패:', errorData);
              setError(errorData.error || "로그인에 실패했습니다. 비밀번호를 확인해주세요.");
              setLoading(false);
              return;
            }
          } catch (profileErr) {
            console.error('프로필 조회 예외:', profileErr);
            setError("로그인에 실패했습니다. 비밀번호를 확인해주세요.");
            setLoading(false);
            return;
          }
        }
        
        // 다른 에러인 경우
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // 로그인 성공한 경우
      if (data.user) {
        // 사용자 프로필 가져오기
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          // 프로필이 없는 경우 (트리거가 작동하지 않았을 수 있음)
          console.error('프로필 조회 에러:', profileError);
          
          // 프로필이 없으면 자동 생성 시도
          if (profileError?.code === 'PGRST116' || !profile) {
            // auth.users의 metadata에서 정보 가져오기
            const userMetadata = data.user.user_metadata || {};
            
            try {
              // 서버 사이드 API를 통해 프로필 생성 (RLS 우회)
              const createResponse = await fetch('/api/create-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: data.user.id,
                  name: userMetadata.name || '',
                  phone: userMetadata.phone || '',
                  branch: userMetadata.branch || '',
                  office: userMetadata.office || '',
                  position: userMetadata.position || '',
                }),
              });

              if (!createResponse.ok) {
                const errorData = await createResponse.json();
                console.error('프로필 생성 에러:', errorData);
                setError(`프로필 생성 중 오류가 발생했습니다: ${errorData.error || '알 수 없는 오류'}`);
                setLoading(false);
                return;
              }

              const { profile: newProfile } = await createResponse.json();

              if (!newProfile) {
                setError("프로필을 생성했지만 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
                setLoading(false);
                return;
              }

              // 새로 생성된 프로필 사용
              const finalProfile = newProfile;

              // 승인되지 않은 사용자
              if (!finalProfile.approved) {
                setError("관리자 승인 후 이용하실 수 있습니다. 승인 대기 중입니다.");
                setLoading(false);
                return;
              }

              // 관리자인 경우 회원관리 페이지로 이동
              if (finalProfile.is_admin) {
                router.push("/member/dashboard");
              } else {
                // 일반 회원 로그인 성공 - 설계사 교육방으로 이동
                router.push("/member/education");
              }
              return;
            } catch (createErr: any) {
              setError(`프로필 생성 중 오류가 발생했습니다: ${createErr.message}`);
              setLoading(false);
              return;
            }
          }

          setError(`프로필을 불러올 수 없습니다: ${profileError?.message || '알 수 없는 오류'}`);
          setLoading(false);
          return;
        }

        // 승인되지 않은 사용자
        if (!profile.approved) {
          setError("관리자 승인 후 이용하실 수 있습니다. 승인 대기 중입니다.");
          setLoading(false);
          return;
        }

        // 관리자인 경우 회원관리 페이지로 이동
        if (profile.is_admin) {
          router.push("/member/dashboard");
        } else {
          // 일반 회원 로그인 성공 - 설계사 교육방으로 이동
          router.push("/member/education");
        }
      }
    } catch (err: any) {
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
            <Link
              href="/member/signup"
              className="text-electric-blue hover:text-blue-700 font-medium transition-colors"
            >
              회원가입
            </Link>
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

