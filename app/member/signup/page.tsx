"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

const branchData = {
  "067본부": [
    "067본부 직할지사",
    "김유겸 지사",
    "류명화 지사",
    "류화자 지사",
    "이주은 지사",
    "엄정화 지사",
    "한채은 지사",
  ],
  "290본부": [
    "290본부 직할지사",
    "김미라 지사",
    "한희영 지사",
    "채혜빈 지사",
    "천민아 지사",
    "이수진 지사",
    "송경호 지사",
    "류진순 지사",
  ],
  "292본부": [
    "292본부 직할지사",
    "신정민 지사",
  ],
};

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    position: "",
    phone: "",
  });
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [checkingId, setCheckingId] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');
    
    // 최대 11자리까지만 허용
    const limitedNumbers = numbers.slice(0, 11);
    
    // 3-4-4 형식으로 하이픈 추가
    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    
    // 전화번호 필드인 경우 포맷팅 적용
    if (e.target.name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData({
        ...formData,
        phone: formatted,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
    
    setError("");
    // 아이디가 변경되면 중복 확인 상태 초기화
    if (e.target.name === "username") {
      setIsIdChecked(false);
      setIsIdAvailable(null);
    }
  };

  const checkIdAvailability = async () => {
    if (!formData.username || formData.username.length < 3) {
      setError("아이디는 최소 3자 이상이어야 합니다.");
      return;
    }

    // 아이디 형식 검증 (영문, 숫자, 언더스코어만 허용)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError("아이디는 영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.");
      return;
    }

    setCheckingId(true);
    setError("");

    try {
      // API Route를 통해 중복 확인
      const response = await fetch('/api/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username }),
      });

      const data = await response.json();

      if (data.available) {
        setIsIdAvailable(true);
        setIsIdChecked(true);
        setError("");
      } else {
        setIsIdAvailable(false);
        setIsIdChecked(true);
        setError(data.error || "이미 사용 중인 아이디입니다.");
      }
    } catch (err: any) {
      setError("중복 확인 중 오류가 발생했습니다.");
      setIsIdAvailable(false);
      setIsIdChecked(true);
    } finally {
      setCheckingId(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    if (!formData.username) {
      setError("아이디를 입력해주세요.");
      setLoading(false);
      return;
    }

    if (!isIdChecked || !isIdAvailable) {
      setError("아이디 중복 확인을 해주세요.");
      setLoading(false);
      return;
    }

    if (!selectedBranch || !selectedOffice) {
      setError("본부와 지사를 모두 선택해주세요.");
      setLoading(false);
      return;
    }

    try {
      // 아이디를 이메일 형식으로 변환 (Supabase Auth는 이메일이 필수이지만, 실제 이메일은 사용하지 않음)
      // 유효한 도메인 형식 사용 (.local은 유효하지 않을 수 있음)
      const autoEmail = `${formData.username}@amazing-biz.com`;
      
      // Supabase Auth로 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: autoEmail,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            branch: selectedBranch,
            office: selectedOffice,
            position: formData.position,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // 이메일 자동 확인 처리 (에러가 발생해도 회원가입은 성공으로 처리)
      if (authData.user) {
        try {
          const confirmResponse = await fetch('/api/confirm-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: autoEmail }),
          });
          
          if (!confirmResponse.ok) {
            const errorData = await confirmResponse.json().catch(() => ({}));
            console.warn('이메일 확인 처리 경고:', errorData.error || '이메일 확인에 실패했지만 회원가입은 완료되었습니다.');
          }
        } catch (confirmError) {
          // 이메일 확인 실패해도 회원가입은 성공으로 처리
          console.warn('이메일 확인 처리 경고:', confirmError);
        }
      }

      // 회원가입 성공
      alert("회원가입이 완료되었습니다. 관리자 승인 후 로그인하실 수 있습니다.");
      router.push("/member");
    } catch (err: any) {
      setError(err.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <Header />
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-electric-blue to-blue-600 rounded-3xl mb-6 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            회원가입
          </h1>
          <p className="text-xl text-slate-600">
            어메이징 사업부 설계사 회원가입
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-10 shadow-soft border border-slate-200/50"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 아이디 */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                아이디 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="아이디를 입력하세요 (영문, 숫자, _)"
                />
                <button
                  type="button"
                  onClick={checkIdAvailability}
                  disabled={checkingId || !formData.username}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {checkingId ? "확인 중..." : "중복 확인"}
                </button>
              </div>
              {isIdChecked && (
                <p className={`mt-2 text-sm ${isIdAvailable ? "text-green-600" : "text-red-600"}`}>
                  {isIdAvailable ? "✓ 사용 가능한 아이디입니다." : "✗ 이미 사용 중인 아이디입니다."}
                </p>
              )}
            </div>

            {/* 이름 / 직책 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  직책 <span className="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                >
                  <option value="">직책을 선택하세요</option>
                  <option value="FC">FC</option>
                  <option value="팀장">팀장</option>
                  <option value="지사장">지사장</option>
                  <option value="본부장">본부장</option>
                </select>
              </div>
            </div>

            {/* 본부 / 지사 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  본부 <span className="text-red-500">*</span>
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={selectedBranch}
                  required
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    setSelectedOffice(""); // 본부 변경 시 지사 초기화
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                >
                  <option value="">본부를 선택하세요</option>
                  <option value="067본부">067본부</option>
                  <option value="290본부">290본부</option>
                  <option value="292본부">292본부</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="office"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  지사 <span className="text-red-500">*</span>
                </label>
                <select
                  id="office"
                  name="office"
                  value={selectedOffice}
                  required
                  onChange={(e) => setSelectedOffice(e.target.value)}
                  disabled={!selectedBranch}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {selectedBranch ? "지사를 선택하세요" : "먼저 본부를 선택하세요"}
                  </option>
                  {selectedBranch &&
                    branchData[selectedBranch as keyof typeof branchData]?.map((office) => (
                      <option key={office} value={office}>
                        {office}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* 전화번호 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                maxLength={13}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="010-1234-5678"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              />
            </div>

            {/* 비밀번호 / 비밀번호 확인 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="비밀번호를 입력하세요 (최소 6자)"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
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
              {loading ? "처리 중..." : "회원가입"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/member"
              className="inline-flex items-center text-slate-600 hover:text-electric-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
