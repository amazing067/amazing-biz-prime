"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MemberHeader from "@/components/MemberHeader";
const COLOR_LABEL_MAP: Record<string, string> = { white: "흰색", gold: "금색" };

// 2026-05 분할: 067 → 067(엄정화/김유겸/본부직할) + 374(류명화/류화자) + 378(이주은/이빈)
// amazing-biz-server BRANCH_TEAM_MAP 과 동기화
const branchData: Record<string, string[]> = {
  "067본부": ["본부직할지사", "김유겸 지사", "엄정화 지사", "한채은 지사"],
  "290본부": ["본부직할지사", "김미라 지사", "한희영 지사", "채혜빈 지사", "천민아 지사", "이수진 지사", "송경호 지사", "류진순 지사"],
  "292본부": ["본부직할지사", "신정민 지사"],
  "374본부": ["본부직할지사", "류화자 지사"],
  "378본부": ["본부직할지사", "이빈 지사"],
};

// 본부별 사무실 주소 (명함 인쇄에 들어감)
const HEADQUARTER_ADDRESS = "서울 광진구 천호대로 561, 영창빌딩 8층 (군자역4번출구)";
const branchAddressMap: Record<string, string> = {
  "067본부": HEADQUARTER_ADDRESS,
  "290본부": HEADQUARTER_ADDRESS,
  "292본부": HEADQUARTER_ADDRESS,
  "374본부": "서울 동작구 신대방1가길 38 동작상떼빌오피스상가 106동 201호",
  "378본부": "서울 금천구 디지털로9길 47 한신IT타워2차4층 403-2호",
};

export default function MemberBusinessCardPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [taxOption, setTaxOption] = useState<"no" | "yes">("no");
  const [taxContact, setTaxContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // 미리보기용 controlled 입력
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");

  const address = selectedBranch ? branchAddressMap[selectedBranch] || "" : "";

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
        phone: user.phone || '',
        email: user.email || '',
      });
      setSelectedBranch(user.branch_name_text || "");
      setSelectedOffice(user.team_name_text || "");
      // 프로필에서 가져올 수 있는 값으로 미리보기 초기화 (관리자는 제외)
      if (user.full_name && user.full_name !== "관리자") {
        setName(user.full_name);
      }
      if (user.phone) setPhone(user.phone);
      if (user.email) setEmail(user.email);
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
    if (!selectedColor) {
      alert("색상을 선택해주세요.");
      return;
    }
    if (taxOption === "yes" && !taxContact.trim()) {
      alert("계산서 발행 시 핸드폰번호 또는 사업자번호를 입력해주세요.");
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
          position: formObject.position,
          branch: selectedBranch,
          office: selectedOffice,
          phone: formObject.phone,
          fax: formObject.fax,
          email: formObject.email,
          address,
          orientation: selectedOrientation === "horizontal" ? "가로형" : "세로형",
          shape: selectedShape === "round" ? "라운드형" : selectedShape === "square" ? "사각형" : "없음",
          color: COLOR_LABEL_MAP[selectedColor] || selectedColor,
          quantity: "200",
          taxOption: taxOption === "yes" ? "계산서발행" : "계산서미발행",
          taxContact: taxOption === "yes" ? taxContact : "",
          price: taxOption === "yes" ? "24,200원" : "22,000원",
          paymentStatus: formObject.paymentStatus,
          depositorName: formObject.depositorName || "",
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
      setSelectedColor("");
      setSelectedBranch(userProfile?.branch || "");
      setSelectedOffice(userProfile?.office || "");
      setTaxOption("no");
      setTaxContact("");
      setName(userProfile?.name && userProfile.name !== "관리자" ? userProfile.name : "");
      setPosition("");
      setPhone(userProfile?.phone || "");
      setFax("");
      setEmail(userProfile?.email || "");

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  직책
                </label>
                <select
                  name="position"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">직책을 선택하세요</option>
                  <option value="본부장">본부장</option>
                  <option value="지사장">지사장</option>
                  <option value="팀장">팀장</option>
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
                  <option value="374본부">374본부</option>
                  <option value="378본부">378본부</option>
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
                  <option value="">{selectedBranch ? "지사를 선택하세요" : "먼저 본부를 선택하세요"}</option>
                  {selectedBranch && branchData[selectedBranch]?.map((office) => (
                    <option key={office} value={office}>{office}</option>
                  ))}
                </select>
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                주소 <span className="text-xs text-slate-500 font-normal">(본부 선택 시 자동 입력)</span>
              </label>
              <input
                type="text"
                value={address}
                readOnly
                placeholder="본부를 먼저 선택해주세요"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                명함 디자인 선택 <span className="text-red-500">*</span>
                <span className="block text-slate-500 font-normal mt-1">스타골드 재질</span>
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
              <label className="block text-sm font-medium text-slate-700 mb-3">
                색상 선택 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  onClick={() => setSelectedColor(selectedColor === "white" ? "" : "white")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedColor === "white"
                      ? "border-electric-blue bg-electric-blue/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">흰색</span>
                    {selectedColor === "white" && (
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSelectedColor(selectedColor === "gold" ? "" : "gold")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedColor === "gold"
                      ? "border-electric-blue bg-electric-blue/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">금색</span>
                    {selectedColor === "gold" && (
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
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-700 mb-2">명함은 200장 기준입니다.</p>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="taxOption" checked={taxOption === "no"} onChange={() => setTaxOption("no")} className="text-electric-blue" />
                  <span>계산서 미발행 — 22,000원</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="taxOption" checked={taxOption === "yes"} onChange={() => setTaxOption("yes")} className="text-electric-blue" />
                  <span>계산서 발행 — 24,200원 (10% 부가세 포함)</span>
                </label>
                {taxOption === "yes" && (
                  <div className="ml-6 mt-2">
                    <input
                      type="text"
                      value={taxContact}
                      onChange={(e) => setTaxContact(e.target.value)}
                      placeholder="핸드폰번호 또는 사업자번호"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">입금유무</label>
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                입금자 성명
              </label>
              <input
                type="text"
                name="depositorName"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                placeholder="입금자명을 입력하세요 (예: 홍길동)"
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-900 font-semibold mb-2">입금 안내</p>
              {taxOption === "yes" ? (
                <p className="text-sm text-amber-800">(계산서 발행) 국민 64930104107037 조유진 — 10% 부가세 포함</p>
              ) : (
                <p className="text-sm text-amber-800">(계산서 미발행) 토스뱅크 100011769493 조유진</p>
              )}
              <p className="text-sm text-amber-800 mt-2">위 계좌로 입금하시고 연락 부탁드립니다.</p>
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

