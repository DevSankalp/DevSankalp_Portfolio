"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconUser,
  IconBook,
  IconBriefcase,
  IconMail,
} from "@tabler/icons-react";
import MagneticButton from "./ui/MagneticButton";

// Sidebar1: Main sidebar navigation for desktop view
export function Sidebar1() {
  // Tabler icon components for sidebar links
  const icons = [IconHome, IconUser, IconBriefcase, IconBook, IconMail];
  // Labels for each sidebar link
  const labels = ["Home", "About", "Projects", "Templates", "Contact"];
  // Combine icons and labels into link objects
  const links = labels.map((label, i) => ({
    label,
    href: `#${labels[i].toLowerCase()}`,
    icon: React.createElement(icons[i], {
      className: "h-5 w-5 shrink-0",
    }),
  }));

  // Sidebar open/close state
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 z-50 bg-black overflow-x-hidden hidden lg:inline-block">
      {/* Sidebar container with open/close state */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="min-h-screen flex flex-col justify-center">
          {/* Top: Profile/brand link */}
          <div className="flex-1 mt-4">
            <MagneticButton>
              <SidebarLink
                link={{
                  label: "DevSankalp",
                  href: "http://linkedin.com/in/sankalp-srivastava-4b76a622b/",
                  icon: (
                    <img
                      src="/pfp.jpeg"
                      alt="logo"
                      className="w-8 h-8 rounded-full hover:invert-100"
                    />
                  ),
                }}
                className="p-0 max-h-5"
              />
            </MagneticButton>
          </div>
          {/* Main navigation links */}
          <div className="flex-1 flex flex-col gap-8">
            {links.map((link) => (
              <MagneticButton key={link.label}>
                <SidebarLink link={link} className="p-0" />
              </MagneticButton>
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
