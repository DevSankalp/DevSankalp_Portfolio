"use client";

import { useRef } from "react";
import Image from "next/image";
import data from "@/data/personalData.json";
import MagneticButton from "@/components/ui/MagneticButton";
import { CometCard } from "@/components/ui/CometCard";
import { useGitHubProfile } from "@/hooks/useGitHubProfile";
import { FaGithub } from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiTypescript,
  SiNextdotjs,
  SiFirebase,
  SiGit,
  SiGooglecloud,
  SiPython,
  SiBlender,
} from "react-icons/si";
import { BsFileEarmarkText } from "react-icons/bs";
import { motion } from "framer-motion";
import RotatingIcon from "@/components/ui/RotatingIcon";

// AboutSection: Main About/Bio section with animated skills and GitHub profile
const AboutSection = () => {
  // Fetch GitHub profile data using custom hook
  const { profile } = useGitHubProfile();
  // Ref for left-in animation of the quote
  const leftInRef = useRef(null);
  // Skill groups for dynamic rendering of RotatingIcon components
  const skillGroups = [
    [
      {
        text: "TailwindCSS",
        icon: <SiTailwindcss className="w-8 h-8 text-cyan-400" />,
      },
      { text: "MySQL", icon: <SiMysql className="w-8 h-8 text-blue-500" /> },
      { text: "Git", icon: <SiGit className="w-8 h-8 text-orange-500" /> },
    ],
    [
      {
        text: "Javascript",
        icon: <SiJavascript className="w-8 h-8 text-yellow-400" />,
      },
      {
        text: "Typescript",
        icon: <SiTypescript className="w-8 h-8 text-blue-500" />,
      },
      {
        text: "Google Cloud",
        icon: <SiGooglecloud className="w-8 h-8 text-blue-300" />,
      },
    ],
    [
      { text: "React.js", icon: <SiReact className="w-8 h-8 text-cyan-400" /> },
      {
        text: "Next.js",
        icon: <SiNextdotjs className="w-8 h-8 text-white" />,
      },
      {
        text: "Python",
        icon: <SiPython className="w-8 h-8 text-yellow-300" />,
      },
    ],
    [
      {
        text: "Node.js",
        icon: <SiNodedotjs className="w-8 h-8 text-green-500" />,
      },
      {
        text: "Firebase",
        icon: <SiFirebase className="w-8 h-8 text-yellow-400" />,
      },
      {
        text: "Blender 3D",
        icon: <SiBlender className="w-8 h-8 text-orange-500" />,
      },
    ],
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-black flex flex-col items-center justify-center gap-24 relative z-2"
    >
      {/* Main grid: left = bio/skills, right = GitHub profile */}
      <div className="h-screen grid grid-cols-[70%_30%] items-center justify-center gap-32">
        {/* Left: Bio, quote, resume, skills */}
        <div className="w-full h-full bg-transparent rounded-xl flex flex-col justify-center gap-12">
          {/* Bio, quote, and resume button */}
          <div className="flex flex-col justify-center gap-4">
            {/* Section title */}
            <button className="text-7xl font-['monoton'] uppercase w-max">
              about me
            </button>
            {/* Animated quote */}
            <motion.h2
              ref={leftInRef}
              className="w-max rounded-xl cursor-default"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <p className="italic text-gray-400 border-l-6 border-gray-400 px-2">
                &apos; Turning ideas into scalable experiences — one line of
                code at a time. &apos;
              </p>
            </motion.h2>
            {/* Bio text */}
            <p className="max-w-xl text-justify mt-12">{data.bio}</p>
            {/* Resume download button */}
            <MagneticButton>
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-1 md:gap-2 text-nowrap px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm bg-gray-300 text-black hover:text-white hover:bg-blue-700 border border-gray-400 shadow-[0_0_4px_rgba(0,0,0,0.7)] rounded-full transition-all duration-300 active:scale-95"
              >
                <BsFileEarmarkText className="w-5 h-5" />
                View Resume
              </a>
            </MagneticButton>
          </div>

          {/* Skill Section: animated skill groups */}
          <div className="w-full flex items-start gap-6 text-gray-400 text-lg">
            {/* Map over skillGroups to render each RotatingIcon in a MagneticButton */}
            {skillGroups.map((group, idx) => (
              <MagneticButton key={idx}>
                <RotatingIcon
                  texts={group}
                  mainClassName="min-w-40 p-4 min-h-32 flex items-center justify-center rounded-xl border border-gray-700/70"
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
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Right: GitHub profile card */}
        <CometCard>
          <div className="flex flex-col bg-black/60 p-8 rounded-xl border border-gray-700/70">
            {/* GitHub avatar and icon */}
            <div className="flex flex-col items-center relative p-8">
              <FaGithub className="text-4xl mb-2 text-gray-300 absolute -left-4 -top-4 w-5 h-5 cursor-none" />
              {profile ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  width={200}
                  height={200}
                  className="border-2 border-gray-700/30 rounded-full"
                />
              ) : null}
            </div>
            {/* GitHub username link */}
            <>
              {profile ? (
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-max text-xl sm:text-2xl font-bold"
                >
                  <p>{profile.login}</p>
                </a>
              ) : (
                <a></a>
              )}
            </>
            {/* Location */}
            <p className="mt-1 text-sm text-gray-500">
              {profile ? profile.location : null}
            </p>
            {/* Public repos */}
            <div className="text-gray-300 mt-4 flex gap-2 flex-wrap text-sm">
              {profile ? (
                <>
                  <MagneticButton>
                    <a
                      href={`${profile.html_url}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      <p className="flex gap-2">Public Repositories</p>
                    </a>
                  </MagneticButton>
                  <p>- {profile.public_repos}</p>
                </>
              ) : null}
            </div>
          </div>
        </CometCard>
      </div>
    </section>
  );
};

export default AboutSection;
