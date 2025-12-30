"use client";

import { motion } from "framer-motion";
import { Send, Gift, Key } from "lucide-react";
import { useState } from "react";

export default function RecruitSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    experience: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API Route를 통해 이메일 전송
      const response = await fetch("/api/send-recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || "미입력",
          experience: formData.experience || "미입력",
          message: formData.message || "미입력",
          subject: `[입사지원] ${formData.name}님의 지원서`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("서버 에러 응답:", errorData);
        
        // 환경 변수 오류인 경우 더 명확한 메시지
        if (errorData.details?.includes("EMAIL_USER") || errorData.details?.includes("EMAIL_PASS")) {
          throw new Error("이메일 설정이 완료되지 않았습니다. 관리자에게 문의해주세요.");
        }
        
        throw new Error(errorData.error || errorData.details || "이메일 전송에 실패했습니다.");
      }

      // 성공 메시지
      alert("지원해주셔서 감사합니다. 지원서가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.");
      
      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        experience: "",
        message: "",
      });
    } catch (error: any) {
      console.error("이메일 전송 실패:", error);
      const errorMessage = error.message || "이메일 전송에 실패했습니다.";
      alert(`프라임에셋.com 내용:\n\n${errorMessage}\n\n서버 콘솔에서 더 자세한 오류 정보를 확인해주세요.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");
    
    // 길이에 따라 하이픈 추가
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      // 11자리 초과 시 11자리까지만
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // 연락처 필드인 경우 자동 포맷팅
    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <section id="recruit" className="py-32 bg-gradient-to-b from-white to-cool-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Recruit
          </h2>
          <p className="text-xl text-slate-600 font-light">
            지원 즉시 제공되는 Welcome Kit & System Access 권한.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 flex items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Welcome Kit</h3>
              <p className="text-sm text-slate-600">입사 즉시 제공</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-6 shadow-soft border border-slate-200/50 flex items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Key className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">System Access</h3>
              <p className="text-sm text-slate-600">즉시 권한 부여</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-10 shadow-soft-lg border border-slate-200/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="홍길동"
                />
              </div>
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
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={13}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="010-1234-5678"
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                주소 (선택)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                placeholder="서울시 강남구..."
              />
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                경력 (선택)
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
              >
                <option value="">선택해주세요</option>
                <option value="신입">신입</option>
                <option value="1-3년">1-3년</option>
                <option value="3-5년">3-5년</option>
                <option value="5-10년">5-10년</option>
                <option value="10년 이상">10년 이상</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                지원 동기 (선택)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all resize-none"
                placeholder="지원 동기를 간단히 작성해주세요..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full bg-gradient-to-r from-electric-blue to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span>{isSubmitting ? "전송 중..." : "지원하기"}</span>
              {!isSubmitting && <Send className="w-5 h-5" />}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

