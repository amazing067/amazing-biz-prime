"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MemberHeader from "@/components/MemberHeader";

// 전화번호 3-4-4 자동 포맷 (숫자만 11자리)
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

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

export default function MemberBadgePage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");

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
      setSelectedBranch(user.branch_name_text || "");
      setSelectedOffice(user.team_name_text || "");
      setPhone(formatPhone(user.phone || ""));
    } catch (error) {
      console.error('인증 확인 오류:', error);
      router.push("/member");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const formObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    if (formObject.employeeNumber.length !== 7) {
      alert("사원번호는 7자리여야 합니다. 확인해주세요.");
      return;
    }

    if (formObject.associationNumber.length !== 14) {
      alert("협회등록번호는 14자리여야 합니다. 확인해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formObject.name,
          englishName: formObject.englishName,
          design: formObject.design,
          paymentStatus: formObject.paymentStatus,
          position: formObject.position,
          branch: selectedBranch,
          office: selectedOffice,
          employeeNumber: formObject.employeeNumber,
          associationNumber: formObject.associationNumber,
          phone: formObject.phone,
          subject: `[명찰신청] ${formObject.name}님의 명찰 신청서`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || "이메일 전송에 실패했습니다.");
      }

      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedBranch(userProfile?.branch || "");
      setSelectedOffice(userProfile?.office || "");
      setPhone(formatPhone(userProfile?.phone || ""));

      alert("명찰 신청이 완료되었습니다!");
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 shadow-lg">
            <Badge className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            명찰 신청
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            어메이징 사업부 명찰 신청 서비스입니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-10 shadow-soft border border-slate-200/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            명찰 신청 양식
          </h3>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={userProfile?.name === "관리자" ? "" : (userProfile?.name || "")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  영어 이름
                </label>
                <input
                  type="text"
                  name="englishName"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="예: Hong Gil Dong"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  직책
                </label>
                <select
                  name="position"
                  required
                  defaultValue={userProfile?.position || ""}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">직책을 선택하세요</option>
                  <option value="FC">FC</option>
                  <option value="팀장">팀장</option>
                  <option value="지사장">지사장</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  본부
                </label>
                <select
                  value={selectedBranch}
                  required
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    setSelectedOffice("");
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">본부를 선택하세요</option>
                  <option value="067본부">067본부</option>
                  <option value="290본부">290본부</option>
                  <option value="292본부">292본부</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  지사
                </label>
                <select
                  value={selectedOffice}
                  required
                  onChange={(e) => setSelectedOffice(e.target.value)}
                  disabled={!selectedBranch}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue disabled:bg-slate-100"
                >
                  <option value="">
                    {selectedBranch ? "지사를 선택하세요" : "먼저 본부를 선택하세요"}
                  </option>
                  {selectedBranch &&
                    branchData[selectedBranch as keyof typeof branchData]?.map((office) => (
                      <option key={office} value={office}>{office}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  사원번호
                </label>
                <input
                  type="text"
                  name="employeeNumber"
                  required
                  maxLength={7}
                  pattern="[0-9]{7}"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="팜스번호 입력 (7자리)"
                />
                <p className="mt-1 text-xs text-slate-500">사원번호는 7자리입니다</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  협회등록번호
                  <a
                    href="https://fp.insure.or.kr/register/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-xs text-electric-blue hover:underline inline-flex items-center gap-1"
                  >
                    찾는법
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <input
                  type="text"
                  name="associationNumber"
                  required
                  maxLength={14}
                  pattern="[0-9]{14}"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="협회등록번호를 입력하세요 (14자리)"
                />
                <p className="mt-1 text-xs text-slate-500">협회등록번호는 14자리입니다</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                maxLength={12}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                placeholder="010-1234-5678"
              />
              <p className="mt-1 text-xs text-slate-500">3자리-4자리-4자리 (예: 010-1234-5678)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                명찰 디자인 선택
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col rounded-xl border-2 border-slate-200 bg-white cursor-pointer hover:border-electric-blue transition-colors has-[:checked]:border-electric-blue has-[:checked]:ring-2 has-[:checked]:ring-electric-blue overflow-hidden">
                  <input type="radio" name="design" value="1안" required className="sr-only peer" />
                  <div className="relative aspect-[3/4] max-h-64 bg-slate-100">
                    <Image src="/badge-design-1an.png" alt="명찰 1안" fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw" />
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <span className="font-semibold text-slate-800">1안</span>
                    <span className="text-slate-600"> — 12,000원</span>
                  </div>
                </label>
                <label className="flex flex-col rounded-xl border-2 border-slate-200 bg-white cursor-pointer hover:border-electric-blue transition-colors has-[:checked]:border-electric-blue has-[:checked]:ring-2 has-[:checked]:ring-electric-blue overflow-hidden">
                  <input type="radio" name="design" value="2안" className="sr-only peer" />
                  <div className="relative aspect-[3/4] max-h-64 bg-slate-100">
                    <Image src="/badge-design-2an.png" alt="명찰 2안" fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw" />
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <span className="font-semibold text-slate-800">2안</span>
                    <span className="text-slate-600"> — 10,000원</span>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                입금유무
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="paymentStatus" value="입금완료" required className="text-electric-blue" />
                  <span>입금완료</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="paymentStatus" value="입금예정" className="text-electric-blue" />
                  <span>입금예정</span>
                </label>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-900 font-semibold mb-1">입금 안내</p>
              <p className="text-sm text-amber-800">
                계좌번호 <strong>3333-17-8153267</strong> 카카오뱅크 김성민
              </p>
              <p className="text-sm text-amber-800 mt-1">
                위 계좌로 입금하시고 연락 부탁드립니다.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">안내:</span> 프로필사진은 따로 보내주시기 바랍니다.
              </p>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

