import Nav from "@/components/v2/Nav";
import Hero from "@/components/v2/Hero";
import Manifesto from "@/components/v2/Manifesto";
import ValueChain from "@/components/v2/ValueChain";
import Pillars from "@/components/v2/Pillars";
import Process from "@/components/v2/Process";
import Voices from "@/components/v2/Voices";
import Training from "@/components/v2/Training";
import Tools from "@/components/v2/Tools";
import FullAccess from "@/components/v2/FullAccess";
import Benefits from "@/components/v2/Benefits";
import CareerPath from "@/components/v2/CareerPath";
import Partners from "@/components/v2/Partners";
import FAQ from "@/components/v2/FAQ";
import Apply from "@/components/v2/Apply";
import FooterV2 from "@/components/v2/FooterV2";
import FloatingContactDock from "@/components/FloatingContactDock";

export default function Home() {
  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden">
      <Nav />
      <Hero />
      <Manifesto />
      <Pillars />
      <Process />
      <Voices />
      <Training />
      <Tools />
      <FullAccess />
      <Benefits />
      <ValueChain />
      <CareerPath />
      <Partners />
      <FAQ />
      <Apply />
      <FooterV2 />
      <FloatingContactDock />
    </main>
  );
}
