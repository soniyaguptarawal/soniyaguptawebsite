"use client";

import { motion } from "framer-motion";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/client";
import ScrollReveal from "./ScrollReveal";

interface AboutProps {
  name: string;
  title: string;
  institution: string;
  bio: any[];
  photo: any;
  cvFile: any;
  email: string;
  googleScholar: string;
  linkedin: string;
  twitter: string;
  orcid: string;
}

export default function About({
  name,
  title,
  institution,
  bio,
  photo,
  cvFile,
  email,
  googleScholar,
  linkedin,
  twitter,
  orcid,
}: AboutProps) {
  const socialLinks = [
    {
      label: "Email",
      href: email ? `mailto:${email}` : null,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "Google Scholar",
      href: googleScholar,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4285F4">
          <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5h3.6v.8C2.5 11 2 12 2 13.2v8.2c0 .4.1.7.3 1H0v1.1h7.3v-1H5.2a1.9 1.9 0 0 1-.3-1v-8.1c0-1.4.7-2.6 1.7-3.4v2.7L12 16.3l5.4-3.6V9.5H24L12 0z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: linkedin,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: twitter,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: "ORCID",
      href: orcid,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#A6CE39">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.484 3.872-3.722 0-2.016-1.284-3.722-3.863-3.722h-2.306z"/>
        </svg>
      ),
    },
  ].filter((l) => l.href);

  return (
    <section
      id="about"
      className="about-section relative pt-20 pb-16 md:pt-24 md:pb-20 lg:min-h-[100svh] lg:pt-[clamp(4.5rem,9vh,6rem)] lg:pb-[clamp(2rem,4vh,3rem)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Name heading + title + institution */}
        <div className="about-heading-block mb-10 md:mb-12 lg:mb-[clamp(2rem,4vh,3rem)]">
          <motion.h1
            className="about-title font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[clamp(3.75rem,8vh,5.5rem)] font-black text-indigo-deep mb-3 tracking-tight leading-[1.02]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {name}
          </motion.h1>

          <motion.p
            className="text-indigo-deep/70 text-lg md:text-xl mb-1 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {title}
          </motion.p>

          <motion.p
            className="text-indigo-deep/50 text-base md:text-lg font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {institution}
          </motion.p>
        </div>

        <div className="about-grid grid md:grid-cols-5 gap-10 lg:gap-12 items-start lg:items-center">
          {/* Photo */}
          <ScrollReveal className="md:col-span-2" delay={0.1} direction="left">
            <div className="about-photo relative w-full max-w-md mx-auto lg:max-w-[min(25rem,41.25svh)]">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark">
                {photo ? (
                  <img
                    src={urlFor(photo).width(600).height(800).url()}
                    alt="Soniya Gupta-Rawal"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/soniya.jpg"
                    alt="Soniya Gupta-Rawal"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Decorative frame accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-amber/30 rounded-2xl -z-10" />
            </div>
          </ScrollReveal>

          {/* Bio content */}
          <ScrollReveal className="md:col-span-3" delay={0.2}>
            <div className="about-bio prose max-w-none text-[15px] sm:text-base text-indigo-deep/80 leading-[1.55]">
              {bio ? (
                <PortableText value={bio} />
              ) : (
                <div className="space-y-4">
                  <p>
                    Soniya Gupta-Rawal is a PhD candidate in Management Studies (Marketing) at
                    Cambridge Judge Business School, University of Cambridge, supervised by
                    Prof. Jaideep Prabhu. She is a Commonwealth Scholar and recipient of the
                    Tony Cowling Memorial Research Award and Judge Business School PhD Fellowship.
                  </p>
                  <p>
                    Her research specializing in Quantitative Marketing tackles critical marketing
                    challenges for entrepreneurs in emerging markets — especially micro-entrepreneurs,
                    female entrepreneurs, the informal sector, and unorganized retail. Using field
                    experiments, AI, and economic analysis, Soniya identifies what works for
                    micro-entrepreneurs in India and Sub-Saharan Africa.
                  </p>
                  <p>
                    Her thesis, <em>Business Innovation with Marketing Strategies for
                    Micro-entrepreneurs in Emerging Markets</em>, draws on econometric methods,
                    causal inference, and machine learning to develop evidence-based marketing
                    strategies for underserved entrepreneurs.
                  </p>
                </div>
              )}
            </div>

            {/* Social links & CV */}
            <div className="about-actions mt-5 flex flex-wrap items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-action inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-deep/10 text-sm text-indigo-deep/70 hover:border-amber hover:text-amber transition-colors"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
              <a
                href={cvFile || "/cv.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="about-action inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-deep text-white text-sm hover:bg-indigo-mid transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
