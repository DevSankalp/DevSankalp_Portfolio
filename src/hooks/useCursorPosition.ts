import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useCursorPosition() {
  const innerRef = useRef<HTMLDivElement>(null);
  // const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // gsap.set([innerRef.current, outerRef.current], {
    gsap.set([innerRef.current], {
      xPercent: -50,
      yPercent: -50,
    });

    function animate() {
      // pos.x += (mouse.x - pos.x) * 0.15;
      // pos.y += (mouse.y - pos.y) * 0.15;
      // gsap.set(outerRef.current, { x: pos.x, y: pos.y });
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;
      gsap.set(innerRef.current, { x: pos.x, y: pos.y });
      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("mousemove", () => {});
  }, []);

  return { innerRef };
}
