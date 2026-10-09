"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { EASE } from "./Screens";

// 어메이징사업부 포털(어메이징사업부.com) — 한글 도메인은 punycode 로 적는다.
// 포털로 나가는 실제 링크는 검색엔진에 「같은 조직」임을 알리는 가장 강한 신호라 지우지 않는다(2026-08-21).
const PORTAL = "https://xn--h32b21du9cf7grcy2k20f.com";
const KAKAO =
  "https://pf.kakao.com/_mSxkxgn/chat";
// 사무실 주소(10/8 사장님) — 지도는 네이버 지도 검색으로 연다
const ADDRESS = "서울 광진구 천호대로 561, 영창빌딩 8층";
const MAP = `https://map.naver.com/p/search/${encodeURIComponent("서울 광진구 천호대로 561")}`;

export function Footer() {
  return (
    <footer className="border-t border-[var(--sa-line)] pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-4 py-12 text-[14px] text-[var(--sa-dim)] sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="col-span-2 space-y-1.5 lg:col-span-5">
          <p className="text-[16px] font-bold text-[var(--sa-ink)]">프라임에셋 어메이징사업부</p>
          <p>067 · 290 본부</p>
          <p>2019년 설립, 서울</p>
        </div>
        <div className="lg:col-span-3">
          <p className="font-semibold text-[var(--sa-ink2)]">문의</p>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href="mailto:induo@naver.com">induo@naver.com</a>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href="tel:02-2038-4379">02-2038-4379</a>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href={KAKAO} target="_blank" rel="noopener noreferrer">카카오톡 1:1 상담</a>
        </div>
        <div className="lg:col-span-2">
          <p className="font-semibold text-[var(--sa-ink2)]">어메이징사업부</p>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href={`${PORTAL}/`}>업무 포털</a>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href={`${PORTAL}/about`}>회사소개</a>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href={`${PORTAL}/magazine`}>매거진</a>
          <a className="flex min-h-11 items-center hover:text-[var(--sa-ink)]" href={`${PORTAL}/faq`}>자주 묻는 질문</a>
        </div>
        <div className="col-span-2 space-y-1.5 lg:col-span-2 lg:text-right">
          <p className="font-semibold text-[var(--sa-ink2)]">법적 고지</p>
          <p>© 2026 Prime Asset</p>
        </div>
        {/* 카카오 비즈니스 채널 심사 요건 — 사업자 정보 표기 (등록증 2026-07-07 발급본 기준) + 사무실 주소 */}
        <div className="col-span-2 space-y-1.5 border-t border-[var(--sa-line)] pt-6 text-[13px] lg:col-span-12">
          <p>
            <span className="font-semibold text-[var(--sa-ink2)]">프라임에셋 어메이징사업부</span> · {ADDRESS} (군자역 4번 출구){" "}
            <a className="whitespace-nowrap underline underline-offset-2 hover:text-[var(--sa-ink)]" href={MAP} target="_blank" rel="noopener noreferrer">
              지도 보기
            </a>
          </p>
          <p>상호: 어메이징사업부 · 대표자: 윤성옥 · 사업자등록번호: 244-03-02195</p>
        </div>
      </div>
    </footer>
  );
}

/** 휴대폰에서 첫 화면을 지나면 아래에 지원 버튼을 띄운다. 지원서 구역에 닿으면 숨긴다. */
export function MobileCta() {
  const [show, setShow] = useState(false);
  // 「문의」 를 누르면 전화·카카오톡 중 고른다 — 아이콘만 있으면 무엇인지 몰랐고, 카톡은 맨 아래까지 가야 보였다(Codex 10/8 2차)
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const apply = document.getElementById("apply");
    if (!hero || !apply) return;
    let pastHero = false;
    let atApply = false;
    const update = () => setShow(pastHero && !atApply);
    const io1 = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const io2 = new IntersectionObserver(([e]) => {
      atApply = e.isIntersecting;
      update();
    });
    io1.observe(hero);
    io2.observe(apply);
    return () => {
      io1.disconnect();
      io2.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sa-line)] bg-[rgba(242,244,243,0.94)] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
        >
          {ask && (
            <div className="mx-auto mb-2 grid max-w-[520px] grid-cols-2 gap-2">
              <a
                href="tel:02-2038-4379"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--sa-line)] bg-white text-[15px] font-semibold text-[var(--sa-ink)]"
              >
                <Phone size={17} strokeWidth={2.2} /> 전화하기
              </a>
              <a
                href={KAKAO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#FEE500] text-[15px] font-semibold text-[#191919]"
              >
                <MessageCircle size={17} strokeWidth={2.2} /> 카카오톡 문의
              </a>
            </div>
          )}
          <div className="mx-auto flex max-w-[520px] gap-2">
            <button
              type="button"
              onClick={() => setAsk((v) => !v)}
              aria-expanded={ask}
              className="flex h-12 shrink-0 items-center gap-1.5 rounded-full border border-[var(--sa-line)] bg-white px-4 text-[15px] font-semibold text-[var(--sa-ink)]"
            >
              {ask ? <X size={17} strokeWidth={2.2} /> : <MessageCircle size={17} strokeWidth={2.2} />} 문의
            </button>
            <a
              href="#apply"
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--sa-brand)] text-[16px] font-semibold text-[var(--sa-paper)] active:scale-[0.98]"
            >
              지원하기
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
