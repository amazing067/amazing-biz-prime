"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import s from "./home.module.css";
import { EASE } from "./Screens";

/* 보내는 값·허니팟·유입 추적은 components/v2/Apply.tsx 와 똑같이 맞춘다.
   (/api/send-recruit 의 봇 방어 4층이 이 모양을 전제로 한다. 2026-09-14) */

type SubmitStatus = "idle" | "loading" | "success" | "error";

type FormState = {
  name: string;
  phone: string;
  email: string;
  experience: string;
  message: string;
  /** ★허니팟 — 사람 눈에 보이지 않는 칸. 채워져 있으면 봇이다 */
  website: string;
};

const EMPTY: FormState = { name: "", phone: "", email: "", experience: "", message: "", website: "" };

type Tracking = Record<
  "landingPath" | "landingUrl" | "referrer" | "utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm",
  string
>;

function formatPhone(value: string) {
  const n = value.replace(/[^\d]/g, "");
  if (n.length <= 3) return n;
  if (n.length <= 7) return `${n.slice(0, 3)}-${n.slice(3)}`;
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7, 11)}`;
}

const KAKAO =
  "https://pf.kakao.com/_mSxkxgn/chat";

const field =
  "mt-2 block w-full rounded-[12px] border border-[var(--sa-line)] bg-[var(--sa-paper)] px-4 py-3 text-[16px] text-[var(--sa-ink)] placeholder:text-[var(--sa-dim)] outline-none transition-[border-color,box-shadow] focus:border-[var(--sa-brand)] focus:shadow-[0_0_0_3px_rgba(11,90,115,0.15)]";
const label = "text-[14px] font-semibold text-[var(--sa-ink2)]";

export function ApplyForm() {
  const [f, setF] = useState<FormState>(EMPTY);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [tracking, setTracking] = useState<Tracking | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setTracking({
      landingPath: window.location.pathname || "/",
      landingUrl: window.location.href || "",
      referrer: document.referrer || "직접 유입",
      utmSource: p.get("utm_source") || "",
      utmMedium: p.get("utm_medium") || "",
      utmCampaign: p.get("utm_campaign") || "",
      utmContent: p.get("utm_content") || "",
      utmTerm: p.get("utm_term") || "",
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setF((p) => ({ ...p, [name]: name === "phone" ? formatPhone(value) : value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setStatus("error");
      setErrMsg("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/send-recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          email: f.email || "미입력",
          website: f.website, // ★허니팟
          address: "미입력",
          experience: f.experience || "미입력",
          message: f.message || "미입력",
          tracking: tracking ?? {},
          subject: `[입사지원·메인] ${f.name}님의 지원서`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || data.details || "지원서를 보내지 못했습니다.");
      }
      setStatus("success");
      setF(EMPTY);
      setAgree(false);
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "지원서를 보내지 못했습니다.");
    }
  };

  return (
    <section id="apply" className="relative scroll-mt-16 border-t border-[var(--sa-line)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-5"
        >
          <h2 className={`${s.serif} text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.2]`}>
            지원은
            <br />
            1분이면 됩니다
          </h2>
          <ul className="mt-8 space-y-3 text-[16px] text-[var(--sa-ink2)]">
            {["24시간 안에 1:1로 연락드립니다", "원치 않으시면 더 연락드리지 않습니다"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sa-brand-soft)] text-[var(--sa-brand)]">
                  <Check size={14} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="tel:02-2038-4379"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--sa-line)] px-5 text-[15px] font-semibold text-[var(--sa-ink)] transition-colors hover:bg-[var(--sa-paper)]"
            >
              <Phone size={17} strokeWidth={2.2} /> 02-2038-4379
            </a>
            <a
              href={KAKAO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--sa-line)] px-5 text-[15px] font-semibold text-[var(--sa-ink)] transition-colors hover:bg-[var(--sa-paper)]"
            >
              <MessageCircle size={17} strokeWidth={2.2} /> 카카오톡 1:1 상담
            </a>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[24px] bg-[var(--sa-paper)] p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--sa-brand)] text-[var(--sa-paper)]">
                <Check size={24} strokeWidth={3} />
              </span>
              <p className={`${s.serif} mt-6 text-[28px] font-bold`}>지원서를 받았습니다</p>
              <p className="mt-2 text-[16px] leading-[1.6] text-[var(--sa-ink2)]">24시간 안에 적어 주신 연락처로 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-[24px] bg-[var(--sa-paper)] p-6 sm:p-10" noValidate={false}>
              {/* ★허니팟 — 사람에겐 보이지 않는다 */}
              <input
                type="text"
                name="website"
                value={f.website}
                onChange={(e) => setF((p) => ({ ...p, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={label}>성함</span>
                  <input name="name" value={f.name} onChange={onChange} required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className={label}>연락처</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={f.phone}
                    onChange={onChange}
                    required
                    maxLength={13}
                    placeholder="010-0000-0000"
                    autoComplete="tel"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className={label}>
                    이메일 <span className="font-normal text-[var(--sa-dim)]">(선택)</span>
                  </span>
                  <input name="email" type="email" value={f.email} onChange={onChange} autoComplete="email" className={field} />
                </label>
                <label className="block">
                  <span className={label}>
                    경력 <span className="font-normal text-[var(--sa-dim)]">(선택)</span>
                  </span>
                  <select name="experience" value={f.experience} onChange={onChange} className={field}>
                    <option value="">선택해 주세요</option>
                    <option value="신입">신입</option>
                    <option value="1-3년">1~3년</option>
                    <option value="3-5년">3~5년</option>
                    <option value="5-10년">5~10년</option>
                    <option value="10년 이상">10년 이상</option>
                  </select>
                </label>
              </div>
              <label className="mt-5 block">
                <span className={label}>
                  하고 싶은 말 <span className="font-normal text-[var(--sa-dim)]">(선택)</span>
                </span>
                <textarea name="message" value={f.message} onChange={onChange} rows={3} className={`${field} resize-none leading-[1.6]`} />
              </label>
              <label className="mt-6 flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] leading-[1.55] text-[var(--sa-ink2)]">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--sa-brand)]"
                />
                <span>
                  개인정보 수집·이용에 동의합니다. 채용 목적을 이룰 때까지 보관한 뒤 파기합니다. <b>(필수)</b>
                </span>
              </label>
              {status === "error" && (
                <p role="alert" className="mt-4 text-[14px] font-semibold text-[var(--sa-red)]">
                  {errMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--sa-brand)] text-[16px] font-semibold text-[var(--sa-paper)] transition-[transform,background-color] duration-200 hover:bg-[var(--sa-brand-deep)] active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {status === "loading" ? "보내는 중" : "지원서 보내기"}
                {status !== "loading" && <ArrowRight size={18} strokeWidth={2.2} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
