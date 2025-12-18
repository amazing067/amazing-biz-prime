"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Badge, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

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

export default function BadgePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const formObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    // 사원번호 유효성 검사 (7자리)
    if (formObject.employeeNumber.length !== 7) {
      alert("사원번호는 7자리여야 합니다. 확인해주세요.");
      return;
    }

    // 협회등록번호 유효성 검사 (14자리)
    if (formObject.associationNumber.length !== 14) {
      alert("협회등록번호는 14자리여야 합니다. 확인해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API Route를 통해 이메일 전송
      const response = await fetch("/api/send-badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formObject.name,
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
        console.error("서버 에러 응답:", errorData);
        throw new Error(errorData.details || errorData.error || "이메일 전송에 실패했습니다.");
      }

      // 폼 초기화 (alert 전에 실행)
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedBranch("");
      setSelectedOffice("");

      // 성공 메시지
      alert("명찰 신청이 완료되었습니다!");
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
            <Badge className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            명찰신청
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
            {/* 이름 / 직책 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  직책
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                >
                  <option value="">직책을 선택하세요</option>
                  <option value="FC">FC</option>
                  <option value="팀장">팀장</option>
                  <option value="지사장">지사장</option>
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
                  본부
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
                  지사
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
            {/* 사원번호 / 협회등록번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="employeeNumber"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  사원번호
                </label>
                <input
                  type="text"
                  id="employeeNumber"
                  name="employeeNumber"
                  required
                  maxLength={7}
                  pattern="[0-9]{7}"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="팜스번호 입력 (7자리)"
                />
                <p className="mt-1 text-xs text-slate-500">사원번호는 7자리입니다</p>
              </div>
              <div>
                <label
                  htmlFor="associationNumber"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
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
                  id="associationNumber"
                  name="associationNumber"
                  required
                  maxLength={14}
                  pattern="[0-9]{14}"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="협회등록번호를 입력하세요 (14자리)"
                />
                <p className="mt-1 text-xs text-slate-500">협회등록번호는 14자리입니다</p>
              </div>
            </div>
            {/* 전화번호 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="010-1234-5678"
              />
              <p className="mt-1 text-xs text-slate-500">프로필사진 전달을 위해 연락드릴 수 있습니다</p>
            </div>
            {/* 안내 문구 */}
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
