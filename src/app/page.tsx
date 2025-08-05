"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Sidebar1 } from "../components/SideBar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import TemplatesSection from "../components/TemplatesSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Sidebar1 />
      <div className="lg:ml-[70px]">
        <HeroSection />
        <AboutSection />
        {/* <ProjectsSection />
        <TemplatesSection />
        <ContactSection /> */}
      </div>
    </>
  );
}
