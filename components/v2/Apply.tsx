"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Icon, Mono } from "./Core";

type SubmitStatus = "idle" | "loading" | "success" | "error";

type FormState = {
  name: string;
  phone: string;
  email: string;
  experience: string;
  message: string;
};

type Tracking = {
  landingPath: string;
  landingUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  experience: "",
  message: "",
};

const EMPTY_TRACKING: Tracking = {
  landingPath: "",
  landingUrl: "",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
};

function formatPhone(value: string) {
  const n = value.replace(/[^\d]/g, "");
  if (n.length <= 3) return n;
  if (n.length <= 7) return `${n.slice(0, 3)}-${n.slice(3)}`;
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7, 11)}`;
}

export default function Apply() {
  const [f, setF] = useState<FormState>(EMPTY_FORM);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [tracking, setTracking] = useState<Tracking>(EMPTY_TRACKING);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setTracking({
      landingPath: window.location.pathname || "/",
      landingUrl: window.location.href || "",
      referrer: document.referrer || "직접 유입",
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || "",
      utmTerm: params.get("utm_term") || "",
    });
  }, []);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setF((p) => ({ ...p, phone: formatPhone(value) }));
    } else {
      setF((p) => ({ ...p, [name]: value }));
    }
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
          address: "미입력",
          experience: f.experience || "미입력",
          message: f.message || "미입력",
          tracking,
          subject: `[입사지원·메인] ${f.name}님의 지원서`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || data.details || "이메일 전송에 실패했습니다.");
      }
      setStatus("success");
      setF(EMPTY_FORM);
      setAgree(false);
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "이메일 전송에 실패했습니다.");
    }
  };

  return (
    <section
      id="apply"
      className="relative py-28 md:py-40 border-t border-[color:var(--line)] bg-[color:var(--bg-1)]"
      style={{
        ["--bg-1" as string]: "#0A0B10",
        ["--bg-2" as string]: "#15171F",
        ["--ink" as string]: "#FAFAF7",
        ["--ink-2" as string]: "rgba(250,250,247,0.78)",
        ["--dim" as string]: "rgba(250,250,247,0.55)",
        ["--dim-2" as string]: "rgba(250,250,247,0.35)",
        ["--line" as string]: "rgba(250,250,247,0.12)",
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Left col */}
          <div className="col-span-12 md:col-span-5">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--dim)]">
              <span className="w-4 h-px bg-current opacity-40" />
              12 — Apply
            </div>
            <h2 className="mt-5 text-[40px] md:text-[56px] leading-[1] tracking-[-0.025em] font-semibold text-[color:var(--ink)]">
              지원은
              <br />
              1분이면
              <br />
              <span className="font-serif-italic font-light text-[color:var(--accent)]">
                충분합니다.
              </span>
            </h2>
            <div className="mt-10 space-y-4 text-[14px] text-[color:var(--ink-2)]">
              {[
                "지원 즉시 Welcome Kit 발송",
                "24시간 내 1:1 연락",
                "원치 않으시면 추가 연락 없음",
              ].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-4 h-px bg-[color:var(--accent)]" />
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-14 grid grid-cols-2 gap-4 max-w-xs">
              <a
                href="tel:01056040424"
                className="group card-v2 card-v2-hover p-4"
              >
                <Icon
                  name="phone"
                  size={16}
                  className="text-[color:var(--dim)] group-hover:text-[color:var(--accent)] transition-colors"
                />
                <div className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[color:var(--dim)]">
                  전화
                </div>
                <Mono className="text-[13px] text-[color:var(--ink)]">010 5604 0424</Mono>
              </a>
              <a
                href="http://pf.kakao.com/_xjXxjfn"
                target="_blank"
                rel="noopener noreferrer"
                className="group card-v2 card-v2-hover p-4"
              >
                <div className="w-4 h-4 rounded-sm bg-[#FEE500] flex items-center justify-center text-[8px] text-[#191919]">
                  💬
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[color:var(--dim)]">
                  카카오
                </div>
                <div className="text-[13px] text-[color:var(--ink)]">1:1 상담</div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 md:col-span-7">
            <form
              onSubmit={submit}
              className="card-v2-strong p-8 md:p-12 space-y-8"
            >
              {[
                { k: "name" as const, l: "성함", p: "홍길동", type: "text" },
                { k: "phone" as const, l: "연락처", p: "010 0000 0000", type: "tel" },
                { k: "email" as const, l: "이메일", p: "example@email.com", type: "email" },
              ].map((x) => (
                <div key={x.k} className="border-b border-[color:var(--line)] pb-5">
                  <label className="flex items-baseline gap-4">
                    <Mono className="text-[11px] text-[color:var(--dim)] tracking-[0.14em] w-24 shrink-0">
                      {x.l.toUpperCase()}
                    </Mono>
                    <input
                      type={x.type}
                      name={x.k}
                      value={f[x.k]}
                      onChange={onChange}
                      placeholder={x.p}
                      required={x.k !== "email"}
                      maxLength={x.k === "phone" ? 13 : undefined}
                      className="flex-1 bg-transparent text-[20px] md:text-[24px] text-[color:var(--ink)] placeholder:text-[color:var(--dim-2)] focus:outline-none tracking-[-0.01em]"
                    />
                  </label>
                </div>
              ))}

              <div className="border-b border-[color:var(--line)] pb-5">
                <label className="flex items-baseline gap-4">
                  <Mono className="text-[11px] text-[color:var(--dim)] tracking-[0.14em] w-24 shrink-0">
                    EXPERIENCE
                  </Mono>
                  <select
                    name="experience"
                    value={f.experience}
                    onChange={onChange}
                    className="flex-1 bg-transparent text-[20px] md:text-[24px] text-[color:var(--ink)] focus:outline-none tracking-[-0.01em]"
                  >
                    <option value="">선택</option>
                    <option value="신입">신입</option>
                    <option value="1-3년">1–3년</option>
                    <option value="3-5년">3–5년</option>
                    <option value="5-10년">5–10년</option>
                    <option value="10년 이상">10년+</option>
                  </select>
                </label>
              </div>

              <div className="border-b border-[color:var(--line)] pb-5">
                <label className="flex items-baseline gap-4">
                  <Mono className="text-[11px] text-[color:var(--dim)] tracking-[0.14em] w-24 shrink-0 pt-1.5">
                    MESSAGE
                  </Mono>
                  <textarea
                    name="message"
                    value={f.message}
                    onChange={onChange}
                    rows={2}
                    placeholder="간단한 지원 동기 (선택)"
                    className="flex-1 bg-transparent text-[17px] text-[color:var(--ink)] placeholder:text-[color:var(--dim-2)] focus:outline-none resize-none leading-[1.6]"
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-[12px] text-[color:var(--dim)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[color:var(--accent)]"
                />
                <span>
                  개인정보 수집·이용에 동의합니다. 채용 목적 달성 시까지 보관 후 파기됩니다.{" "}
                  <span className="text-[color:var(--ink-2)]">(필수)</span>
                </span>
              </label>

              <div className="flex items-center justify-between pt-2">
                <Mono className="text-[11px] text-[color:var(--dim)]">
                  FORM_ID · AMZ-APPLY-2026
                </Mono>
                <button
                  type="submit"
                  disabled={!agree || status === "loading"}
                  className={`group inline-flex items-center gap-2 h-14 px-8 rounded-full text-[14px] font-medium transition-all ${
                    agree && status !== "loading"
                      ? "bg-[color:var(--accent)] text-[color:var(--accent-ink)] hover:brightness-110 shadow-[0_0_0_1px_var(--accent),0_16px_50px_-12px_var(--accent-glow)]"
                      : "bg-[color:var(--line)] text-[color:var(--dim)] cursor-not-allowed"
                  }`}
                >
                  {status === "loading" ? "전송 중..." : "지원서 제출"}
                  {status !== "loading" && (
                    <Icon
                      name="arrowRight"
                      size={16}
                      stroke={2}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-[13px]">
                  <Icon name="check" size={16} stroke={2} />
                  지원이 접수되었습니다. 24시간 내 연락드립니다.
                </div>
              )}
              {status === "error" && errMsg && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px]">
                  {errMsg}
                </div>
              )}
            </form>

            <p className="mt-4 text-[11px] text-[color:var(--dim)] text-right">
              외부 광고 채널을 통해 방문하신 경우{" "}
              <a
                href="/recruit"
                className="underline decoration-[color:var(--accent)] underline-offset-4"
              >
                전용 지원 페이지
              </a>
              를 이용하시면 더 빠르게 배정됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
