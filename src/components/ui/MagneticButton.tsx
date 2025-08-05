"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// Props: Accepts any React children to wrap with the effect.
interface Props {
  children: React.ReactNode;
}

// MagneticButton: Adds a magnetic hover effect to its children using GSAP.
export default function MagneticButton({ children }: Props) {
  const buttonRef = useRef<HTMLDivElement>(null); // Ref for the button container

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    // Mouse move handler: calculates relative position and animates the button
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Calculate movement based on cursor position
      const moveX = (relX - rect.width / 2) * 0.3;
      const moveY = (relY - rect.height / 2) * 0.3;

      // Animate the button to follow the cursor
      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    // Mouse leave handler: resets the button position
    const reset = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };

    // Attach event listeners
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);

    // Cleanup listeners on unmount
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  // Render the children inside a div with the effect
  return (
    <div ref={buttonRef} className="flex items-center cursor-none w-max">
      {children}
    </div>
  );
}
