"use client";

import { PortableText } from "next-sanity";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

interface RAApplicationProps {
  data: any;
  headingOverride?: string;
}

const defaultData = {
  heading: "Research Apprenticeship Program",
  introduction: null,
  position: "Research Apprentice",
  languages: "Proficiency in English is essential.",
  location: "Remote (Work from Home)",
  duration:
    "4 to 6 months (Minimum 4 months\u2019 work is mandatory for Completion Certificate)",
  commitment:
    "Minimum of 4 hours per week, with a 30-minute weekly meeting update call (Voluntary Position)",
  startDate: "Rolling basis",
  projectDetailsUrl:
    "https://docs.google.com/document/d/1pHslolysbmXQzkaIgsRYV0REiKY8hQmaYhago3bLM_E/edit?usp=sharing",
  applicationFormUrl: "https://forms.gle/KAJg5sGiFwdYGLVT8",
  submissionTimeline:
    "Please aim to submit your assignment within 2 weeks of receiving it. If you have other commitments, feel free to submit it at your convenience within this window \u2014 there\u2019s no need to email us about delays. For any queries or clarifications, feel free to reach out. Kindly do not email regarding submission delays.",
  reviewTimeline:
    "You can expect to hear back from us after 2\u20133 weeks of submitting both your application form and assignment. We receive thousands of applications weekly, so we appreciate your patience and understanding in the meantime.",
};

const defaultIntro = [
  "Under the guidance of Prof. Jaideep Prabhu \u2014 Professor of Marketing, Jawaharlal Nehru Professor of Indian Business and Enterprise, and Director of the Cambridge Centre for India and Global Business at Judge Business School, and his research team led by Ms. Soniya Gupta (Commonwealth Scholar and PhD student in Marketing at the University of Cambridge), a comprehensive academic study is being conducted to explore various ways of strengthening the micro-entrepreneurial ecosystem.",
  "As part of this initiative, we are offering Research Internship opportunities across multiple domains. Selected interns will contribute meaningfully to ongoing research activities and will report to an assigned project manager or research scholar.",
];

export default function RAApplication({ data, headingOverride }: RAApplicationProps) {
  const d = data || defaultData;

  return (
    <section id="apply" className="py-24 md:py-32 bg-cream-dark/50 relative">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          title={headingOverride || d.heading || defaultData.heading}
          subtitle="Join our research team at the University of Cambridge"
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Introduction */}
          <ScrollReveal className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-indigo-deep/5 h-full">
              <div className="prose prose-lg max-w-none text-indigo-deep/80 leading-relaxed mb-8">
                {d.introduction ? (
                  <PortableText value={d.introduction} />
                ) : (
                  defaultIntro.map((p, i) => (
                    <p key={i} className="mb-4 text-sm md:text-base leading-relaxed">
                      {p}
                    </p>
                  ))
                )}
              </div>

              {/* Timelines */}
              <div className="space-y-4 border-t border-indigo-deep/5 pt-6">
                <div>
                  <h4 className="text-sm font-semibold text-indigo-deep mb-1">
                    Assignment Submission Timeline
                  </h4>
                  <p className="text-sm text-slate-warm leading-relaxed">
                    {d.submissionTimeline || defaultData.submissionTimeline}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-indigo-deep mb-1">
                    Review Timeline
                  </h4>
                  <p className="text-sm text-slate-warm leading-relaxed">
                    {d.reviewTimeline || defaultData.reviewTimeline}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Position Details Card */}
          <ScrollReveal className="lg:col-span-2" delay={0.15}>
            <div className="bg-indigo-deep rounded-2xl p-6 md:p-8 text-white lg:sticky lg:top-28">
              <h3 className="font-serif text-2xl font-bold mb-6">Position Details</h3>

              <div className="space-y-4">
                {[
                  { label: "Position", value: d.position || defaultData.position },
                  { label: "Languages", value: d.languages || defaultData.languages },
                  { label: "Location", value: d.location || defaultData.location },
                  { label: "Duration", value: d.duration || defaultData.duration },
                  { label: "Commitment", value: d.commitment || defaultData.commitment },
                  { label: "Start Date", value: d.startDate || defaultData.startDate },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-amber-light text-xs font-semibold tracking-wide uppercase">
                      {item.label}
                    </p>
                    <p className="text-white/80 text-sm mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={d.applicationFormUrl || defaultData.applicationFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-amber text-white font-medium rounded-full hover:bg-amber-light transition-colors text-sm"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={d.projectDetailsUrl || defaultData.projectDetailsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-white/20 text-white/80 font-medium rounded-full hover:bg-white/10 transition-colors text-sm"
                >
                  View Project Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
