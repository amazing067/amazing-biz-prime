// 어메이징사업부 포털(어메이징사업부.com) — 한글 도메인은 punycode 로 적는다.
const PORTAL = "https://xn--h32b21du9cf7grcy2k20f.com";

export default function FooterV2() {
  return (
    <footer className="relative border-t border-[color:var(--line)] py-14">
      <div className="mx-auto max-w-[1760px] px-6">
        <div className="border-b border-[color:var(--line)] pb-10">
          <div className="text-[16vw] md:text-[13vw] leading-[0.85] font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
            PRIME{" "}
            <span className="font-serif-italic font-semibold text-[color:var(--dim-2)]">ASSET</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 pt-8 text-[12px] text-[color:var(--dim)]">
          <div className="col-span-12 md:col-span-4 space-y-1.5">
            <div className="text-[color:var(--ink)] font-medium">Amazing Division</div>
            <div>067 · 290 · 292 본부</div>
            <span>2019년 설립 · 서울</span>
          </div>
          <div className="col-span-6 md:col-span-3 space-y-1.5">
            <div className="text-[color:var(--ink-2)] font-semibold text-[12px] mb-2">문의</div>
            <a className="block hover:text-[color:var(--ink)]" href="mailto:induo@naver.com">
              induo@naver.com
            </a>
            <a className="block hover:text-[color:var(--ink)]" href="tel:02-2038-4379">
              02 2038 4379
            </a>
            <a
              className="block hover:text-[color:var(--ink)]"
              href="https://pf.kakao.com/_JxmxaJn/chat?utm_source=naver_blog&utm_medium=post&utm_campaign=content&utm_content="
              target="_blank"
              rel="noopener noreferrer"
            >
              카카오 1:1 상담
            </a>
          </div>
          {/* 어메이징사업부.com(포털)로 나가는 실제 링크.
              두 도메인은 같은 조직이지만 구조화 데이터(sameAs)만 있고 링크가 없으면
              검색엔진·AI 는 별개 사이트로 본다. 링크가 가장 강한 연결 신호다. (2026-08-21) */}
          <div className="col-span-6 md:col-span-3 space-y-1.5">
            <div className="text-[color:var(--ink-2)] font-semibold text-[12px] mb-2">
              어메이징사업부
            </div>
            <a className="block hover:text-[color:var(--ink)]" href={`${PORTAL}/`}>
              업무 포털
            </a>
            <a className="block hover:text-[color:var(--ink)]" href={`${PORTAL}/about`}>
              회사소개
            </a>
            <a className="block hover:text-[color:var(--ink)]" href={`${PORTAL}/magazine`}>
              매거진
            </a>
            <a className="block hover:text-[color:var(--ink)]" href={`${PORTAL}/faq`}>
              자주 묻는 질문
            </a>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right space-y-1.5">
            <div className="text-[color:var(--ink-2)] font-semibold text-[12px] mb-2">법적 고지</div>
            <div>© 2026 Prime Asset</div>
            <div>Amazing Division</div>
          </div>
        </div>
        {/* 카카오 비즈니스 채널 심사 요건 — 사업자 정보 표기 (2026-07-28, 등록증 2026-07-07 발급본 기준) */}
        <div className="mt-8 pt-6 border-t border-[color:var(--line)] text-[12px] text-[color:var(--dim)]">
          상호: 어메이징사업부 · 대표자: 윤성옥 · 사업자등록번호: 244-03-02195
        </div>
      </div>
    </footer>
  );
}
