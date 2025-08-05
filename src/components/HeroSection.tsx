"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import data from "@/data/personalData.json";
import Threads from "@/components/ui/Threads";
import { Parallax } from "react-scroll-parallax";

import RotatingText from "@/components/ui/RotatingText";

// HeroSection: Landing/intro section with animated background and rotating titles
const HeroSection = () => {
  // Ref for right-in animation of the subtitle
  const rightInRef = useRef(null);
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center h-screen z-1"
    >
      {/* Animated background using Parallax and Threads */}
      <Parallax
        speed={-70}
        className="w-screen h-screen overflow-hidden absolute top-0 left-0 -z-1"
      >
        <Threads
          amplitude={1.5}
          distance={0.1}
          enableMouseInteraction={false}
        />
      </Parallax>

      {/* Foreground: Name and animated rotating subtitle */}
      <Parallax speed={10} className="w-full">
        <div className="w-full flex flex-col items-end gap-16">
          {/* Name/title */}
          <button className="text-4xl lg:text-8xl cursor-none self-center font-bold">
            {data.name}
          </button>
          {/* Animated subtitle with right-in effect */}
          <motion.h2
            ref={rightInRef}
            className="w-max rounded-xl cursor-default"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <RotatingText
              texts={[
                "Software Developer",
                "Cloud Enthusiast",
                "Open Source Contributor",
              ]}
              mainClassName="min-w-[41vw] p-4 font-['monoton'] text-gray-400 text-2xl md:text-4xl bg-gray-700/30 backdrop-filter backdrop-blur-xs relative before:absolute before:-top-1 before:-left-4 before:w-4 before:h-[110%] before:bg-gray-400 before:border before:border-gray-100/50"
              staggerFrom={"first"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              animatePresenceMode="wait"
              staggerDuration={0.05}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </motion.h2>
        </div>
      </Parallax>
    </section>
  );
};

export default HeroSection;
