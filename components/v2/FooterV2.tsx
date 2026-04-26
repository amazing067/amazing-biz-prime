import { Mono } from "./Core";

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
            <Mono>Since 2019 · Seoul</Mono>
          </div>
          <div className="col-span-6 md:col-span-3 space-y-1.5">
            <div className="text-[color:var(--ink-2)] uppercase tracking-[0.14em] text-[10px] mb-2">
              Contact
            </div>
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
          <div className="col-span-6 md:col-span-3 space-y-1.5">
            <div className="text-[color:var(--ink-2)] uppercase tracking-[0.14em] text-[10px] mb-2">
              Services
            </div>
            <div>포털 OS · AI Studio</div>
            <div>청구닷컴 · 치매검사</div>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right space-y-1.5">
            <div className="text-[color:var(--ink-2)] uppercase tracking-[0.14em] text-[10px] mb-2">
              Legal
            </div>
            <div>© 2026 Prime Asset</div>
            <div>Amazing Division</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
