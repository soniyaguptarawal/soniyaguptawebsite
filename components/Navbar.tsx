"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/teaching", label: "Teaching" },
  { href: "/awards", label: "Awards" },
  { href: "/talks", label: "Talks" },
  { href: "/media-mentions", label: "Media Mentions" },
  { href: "/academic-service", label: "Academic Service" },
  { href: "/research-lab", label: "Research Lab" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "nav-blur border-indigo-deep/8 bg-cream/95 py-2.5 shadow-sm"
          : "border-indigo-deep/5 bg-cream/90 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-end px-5 lg:px-8 xl:justify-center">
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap py-2 text-[13px] font-medium transition-colors ${
                  active ? "text-indigo-deep" : "text-indigo-deep/60 hover:text-indigo-deep"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 rounded-full bg-amber transition-all ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-indigo-deep/10 xl:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className={`h-0.5 w-5 bg-indigo-deep transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-indigo-deep transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-indigo-deep transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="nav-blur overflow-hidden border-t border-indigo-deep/5 bg-cream/98 xl:hidden"
          >
            <div className="mx-auto grid max-w-3xl gap-1 px-5 py-4 sm:grid-cols-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active ? "bg-indigo-deep text-white" : "text-indigo-deep/75 hover:bg-indigo-deep/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
