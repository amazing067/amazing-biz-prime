"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

const branchData: Record<string, string[]> = {
  "067본부": ["067본부 직할지사", "김유겸 지사", "류명화 지사", "류화자 지사", "이주은 지사", "엄정화 지사", "한채은 지사"],
  "290본부": ["290본부 직할지사", "김미라 지사", "한희영 지사", "채혜빈 지사", "천민아 지사", "이수진 지사", "송경호 지사", "류진순 지사"],
  "292본부": ["292본부 직할지사", "신정민 지사"],
};

export default function BusinessCardPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [taxOption, setTaxOption] = useState<"no" | "yes">("no");
  const [taxContact, setTaxContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 명함 디자인 선택 필수 확인
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

      // API Route를 통해 이메일 전송
      const response = await fetch("/api/send-business-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formObject.name,
          position: formObject.position,
          branch: selectedBranch,
          office: selectedOffice,
          phone: formObject.phone,
          fax: formObject.fax,
          email: formObject.email,
          address: "서울 광진구 천호대로 561, 영창빌딩 8층 (군자역4번출구)",
          orientation: selectedOrientation === "horizontal" ? "가로형" : "세로형",
          shape: selectedShape === "round" ? "라운드형" : selectedShape === "square" ? "사각형" : "없음",
          color: selectedColor === "white" ? "흰색" : "금색",
          quantity: "200",
          taxOption: taxOption === "yes" ? "계산서발행" : "계산서미발행",
          taxContact: taxOption === "yes" ? taxContact : "",
          price: taxOption === "yes" ? "24,200원" : "22,000원",
          paymentStatus: formObject.paymentStatus,
          memo: formObject.memo || "없음",
          subject: `[명함신청] ${formObject.name}님의 명함 신청서`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("서버 에러 응답:", errorData);
        throw new Error(errorData.details || errorData.error || "이메일 전송에 실패했습니다.");
      }

      // 폼 초기화 (alert 전에 실행)
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedOrientation("");
      setSelectedShape("");
      setSelectedBranch("");
      setSelectedOffice("");
      setTaxOption("no");
      setTaxContact("");

      // 성공 메시지
      alert("명함 신청이 완료되었습니다!");
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.message || "신청 중 오류가 발생했습니다.";
      alert(`${errorMessage}\n\n서버 콘솔에서 더 자세한 오류 정보를 확인해주세요.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cool-gray">
      <Header />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-electric-blue to-blue-600 rounded-3xl mb-6 shadow-lg">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            명함신청
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
            {/* 이름 / 직책 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  이름
                </label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all" placeholder="이름을 입력하세요" />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-2">
                  직책
                </label>
                <select id="position" name="position" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all">
                  <option value="">직책을 선택하세요</option>
                  <option value="팀장">팀장</option>
                  <option value="지사장">지사장</option>
                </select>
              </div>
            </div>
            {/* 본부 / 지사 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-slate-700 mb-2">
                  본부
                </label>
                <select id="branch" value={selectedBranch} required onChange={(e) => { setSelectedBranch(e.target.value); setSelectedOffice(""); }} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all">
                  <option value="">본부를 선택하세요</option>
                  <option value="067본부">067본부</option>
                  <option value="290본부">290본부</option>
                  <option value="292본부">292본부</option>
                </select>
              </div>
              <div>
                <label htmlFor="office" className="block text-sm font-medium text-slate-700 mb-2">
                  지사
                </label>
                <select id="office" value={selectedOffice} required onChange={(e) => setSelectedOffice(e.target.value)} disabled={!selectedBranch} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed">
                  <option value="">{selectedBranch ? "지사를 선택하세요" : "먼저 본부를 선택하세요"}</option>
                  {selectedBranch && branchData[selectedBranch]?.map((office) => (
                    <option key={office} value={office}>{office}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* 연락처 / 팩스번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="연락처를 입력하세요"
                />
              </div>
              <div>
                <label
                  htmlFor="fax"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  팩스번호
                </label>
                <input
                  type="tel"
                  id="fax"
                  name="fax"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="팩스번호를 입력하세요"
                />
              </div>
            </div>
            {/* 이메일 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="이메일을 입력하세요"
              />
            </div>
            {/* 주소 */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                주소
              </label>
              <input
                type="text"
                id="address"
                value="서울 광진구 천호대로 561, 영창빌딩 8층 (군자역4번출구)"
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 cursor-not-allowed"
              />
            </div>
            {/* 명함 디자인 선택 - 가로형/세로형 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                명함 디자인 선택 <span className="text-red-500">*</span>
                <span className="block text-slate-500 font-normal mt-1">스타골드 재질</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 명함 가로형 */}
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

                {/* 명함 세로형 */}
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
              <input
                type="hidden"
                name="orientation"
                value={selectedOrientation}
              />
            </div>

            {/* 선택사항 - 라운드형/네모형 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                선택사항
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 명함 라운드형 */}
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

                {/* 명함 사각형 */}
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
              <input
                type="hidden"
                name="shape"
                value={selectedShape}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                색상 선택
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
              <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-2">
                신청 수량
              </label>
              <input type="number" id="quantity" value="200" readOnly className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 cursor-not-allowed" />
              <p className="mt-1 text-xs text-slate-500">명함은 200장 기준입니다.</p>
            </div>
            <div>
              <label htmlFor="memo" className="block text-sm font-medium text-slate-700 mb-2">
                특이사항
              </label>
              <textarea id="memo" name="memo" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all resize-none" placeholder="특이사항이나 요청사항을 입력하세요" />
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-700 mb-2">가격 (200장 기준)</p>
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
                    <input type="text" value={taxContact} onChange={(e) => setTaxContact(e.target.value)} placeholder="핸드폰번호 또는 사업자번호" className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue text-sm" />
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
              className="w-full bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "전송 중..." : "신청하기"}
            </motion.button>
          </form>
        </motion.div>

        {/* 홈으로 돌아가기 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-electric-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
