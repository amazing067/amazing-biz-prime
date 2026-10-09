// 프라임에셋.com 첫 화면 — 2026-10 개편(시안 A 바탕 + 시안 B 의 어두운 첫 화면).
// ★리크루팅 사이트다(10/8 사장님): 주인공은 「어메이징사업부가 설계사를 찾는다」, 보메이트·현장 개발자·교육·32개 보험사는 들어올 이유(무기).
// 예전 첫 화면(components/v2/*)은 이 파일에서만 쓰였다.
import s from "@/components/home-2026/home.module.css";
import { SmoothScroll } from "@/components/home-2026/SmoothScroll";
import { Nav } from "@/components/home-2026/Nav";
import { Hero } from "@/components/home-2026/Hero";
import { Demo } from "@/components/home-2026/Demo";
import { BeforeAfter } from "@/components/home-2026/BeforeAfter";
import { Tools } from "@/components/home-2026/Tools";
import { Join } from "@/components/home-2026/Join";
import { Growth } from "@/components/home-2026/Growth";
import { Leaders } from "@/components/home-2026/Leaders";
import { Faq } from "@/components/home-2026/Faq";
import { ApplyForm } from "@/components/home-2026/ApplyForm";
import { Footer, MobileCta } from "@/components/home-2026/Footer";

export default function Home() {
  return (
    <div id="top" className={s.root}>
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <Demo />
          <BeforeAfter />
          <Tools />
          <Join />
          <Growth />
          <Leaders />
          <Faq />
          <ApplyForm />
        </main>
        <Footer />
        <MobileCta />
      </SmoothScroll>
    </div>
  );
}
