"use client";

import { useCursorPosition } from "@/hooks/useCursorPosition";
import { useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const { innerRef } = useCursorPosition();

  useEffect(() => {
    const hoverEls = document.querySelectorAll("a, button");
    hoverEls.forEach((el) => {
      const onEnter = () => {
        if (!innerRef.current) return;
        const rect = el.getBoundingClientRect();
        const cursorSize = innerRef.current.offsetHeight;
        const scale = (rect.height * 1.7) / cursorSize;
        gsap.to(innerRef.current, { scale, duration: 0.2 });
      };
      const onLeave = () => {
        gsap.to(innerRef.current, { scale: 1, duration: 0.2 });
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      (el as any)._onEnter = onEnter;
      (el as any)._onLeave = onLeave;
    });
    return () => {
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", (el as any)._onEnter);
        el.removeEventListener("mouseleave", (el as any)._onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* <div ref={outerRef} className="outer" /> */}
      <div
        ref={innerRef}
        className="hidden md:block fixed w-2 h-2 pointer-events-none mix-blend-difference z-[9999] rounded-[50%] bg-inherit invert"
      />
    </>
  );
}
