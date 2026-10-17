"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

interface Publication {
  _id: string;
  title: string;
  authors: string;
  year: number;
  type: string;
  journal: string;
  abstract: string;
  doi: string;
  pdfUrl: string;
  featured: boolean;
}

interface PublicationsProps {
  publications: Publication[];
}

const typeLabels: Record<string, string> = {
  working: "Working Papers",
  journal: "Journal Publications",
  chapter: "Case Studies",
  report: "Reports",
  oped: "Op-Eds",
  conference: "Conference Paper",
};

const typeOrder = ["working", "journal", "chapter", "report", "oped", "conference"];
const linkOnlyTypes = new Set(["chapter", "report", "oped"]);

const defaultPublications: Publication[] = [
  // --- Published ---
  {
    _id: "p1",
    title: "Democratizing Space: India's Frugal Space Innovation Provides Key Lessons for Emerging Nations",
    authors: "Corrado, L., Gupta-Rawal, S., Kattuman, P., & Prabhu, J.",
    year: 2026,
    type: "journal",
    journal: "PNAS Opinion",
    abstract: "",
    doi: "",
    pdfUrl: "",
    featured: true,
  },
  {
    _id: "p2",
    title: "Dynamic AI-embedded Super App: A Design-Based Process Innovation towards Customer Engagement and Value Creation",
    authors: "Gupta, S., Gupta-Rawal, S., & Shrivastava, P.",
    year: 2025,
    type: "journal",
    journal: "Journal of Product Innovation Management, 1\u201326",
    abstract: "",
    doi: "10.1111/jpim.70009",
    pdfUrl: "",
    featured: true,
  },
  {
    _id: "p3",
    title: "More the Merrier!! Understanding the Effect of Available Content Choices over Willingness to Pay for Over-the-Top Subscriptions",
    authors: "Gupta, S., Shrivastava, P., & Gupta-Rawal, S.",
    year: 2023,
    type: "journal",
    journal: "Psychology & Marketing, 40(12), 2612\u20132626",
    abstract: "",
    doi: "10.1002/mar.21895",
    pdfUrl: "",
    featured: true,
  },
  {
    _id: "p4",
    title: "Online-to-Offline (O2O) Commerce in Emerging Markets: Analysis of the Retail Sector",
    authors: "Gupta-Rawal, S. & Jeyaraj, A.",
    year: 2021,
    type: "journal",
    journal: "Journal of Asia-Pacific Business, 22(4), 260\u2013278",
    abstract: "",
    doi: "10.1080/10599231.2021.1983501",
    pdfUrl: "",
    featured: false,
  },
  // --- Working Papers ---
  {
    _id: "w1",
    title: "Matching Entrepreneurs with Mentors: Customising Business Mentoring Based on Mentee & Mentor Characteristics",
    authors: "Gupta-Rawal, S., Khwaja, A., & Prabhu, J.",
    year: 2026,
    type: "working",
    journal: "Preparing for Marketing Science",
    abstract: "",
    doi: "",
    pdfUrl: "",
    featured: true,
  },
  {
    _id: "w2",
    title: "Signals from Space, Decisions on Farms: Digital Leapfrogging for Agricultural Productivity, Climate Resilience & Sustainability",
    authors: "Gupta-Rawal, S., Corrado, L., Kattuman, P., & Prabhu, J.",
    year: 2026,
    type: "working",
    journal: "Preparing for Management Science",
    abstract: "",
    doi: "",
    pdfUrl: "",
    featured: true,
  },
  {
    _id: "w3",
    title: "Shattering the Invisible Chains: Social Constraints and Supplier Dependency of Women Entrepreneurs in Egypt",
    authors: "Hassan, M., Gupta-Rawal, S., Vassello, J., & Prabhu, J.",
    year: 2026,
    type: "working",
    journal: "Preparing for Journal of Marketing",
    abstract: "",
    doi: "",
    pdfUrl: "",
    featured: true,
  },
  {
    _id: "w4",
    title: "The Frugal Space Race: Frugal Innovation and the Cost of Environmental Information in the Global Space Programmes",
    authors: "Corrado, L., Gupta-Rawal, S., Kattuman, P., & Prabhu, J.",
    year: 2026,
    type: "working",
    journal: "Preparing for Science Policy",
    abstract: "",
    doi: "",
    pdfUrl: "",
    featured: false,
  },
];

export default function Publications({ publications }: PublicationsProps) {
  const displayPubs = publications?.length > 0 ? publications : defaultPublications;
  const publicationOnly = displayPubs.filter((publication) => publication.type !== "working");
  const availableTypes = new Set(publicationOnly.map((publication) => publication.type));
  const types = [
    ...typeOrder.filter((type) => type !== "working" && availableTypes.has(type)),
    ...Array.from(availableTypes).filter((type) => !typeOrder.includes(type)),
  ];
  const [filter, setFilter] = useState<string>(() => types[0] || "journal");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const filtered = publicationOnly.filter((publication) => publication.type === filter);

  return (
    <section id="publications" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-5 sm:px-6 lg:px-8">
        <SectionHeading title="Publications" />

        {/* Filter buttons */}
        <ScrollReveal className="mb-10">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === type
                    ? "bg-indigo-deep text-white"
                    : "bg-cream-dark text-indigo-deep/60 hover:bg-indigo-deep/10"
                }`}
              >
                {typeLabels[type] || type}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Publications list */}
        <div className="space-y-4">
          {filtered.map((pub, i) => (
            <ScrollReveal key={pub._id} delay={i * 0.05}>
              <article className="pub-card rounded-xl border border-indigo-deep/5 bg-white p-5 shadow-[0_4px_24px_rgba(30,27,75,0.035)] md:p-6">
                <div className="grid grid-cols-1 items-start gap-x-4 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-y-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-6">
                  <span className="justify-self-start rounded-lg border border-amber/10 bg-amber/5 px-3 py-2 text-base font-semibold leading-none text-amber md:text-lg">
                    {pub.year}
                  </span>

                  <div className="min-w-0">
                    <h3 className="mb-1.5 font-serif text-base font-bold leading-snug text-indigo-deep md:text-lg">
                      {pub.title}
                    </h3>
                    <p className="mb-0.5 text-sm text-slate-warm">{pub.authors}</p>
                    <p className="text-sm italic text-slate-warm/80">{pub.journal}</p>

                    {/* Expandable abstract */}
                    {pub.abstract && !linkOnlyTypes.has(pub.type) && (
                      <div className="mt-2.5">
                        <button
                          onClick={() => setExpandedId(expandedId === pub._id ? null : pub._id)}
                          aria-expanded={expandedId === pub._id}
                          className="inline-flex items-center gap-2 text-amber text-sm font-medium hover:text-amber-light transition-colors"
                        >
                          <span>Abstract</span>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 12 8"
                            fill="none"
                            className="h-2 w-3 transition-transform duration-200"
                            style={{
                              transform: expandedId === pub._id ? "rotate(180deg)" : undefined,
                            }}
                          >
                            <path
                              d="M1 1.25 6 6.25l5-5"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {expandedId === pub._id && (
                          <p className="mt-2 text-sm text-indigo-deep/60 leading-relaxed">
                            {pub.abstract}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Only render actions with a real destination. */}
                  {(pub.doi || pub.pdfUrl) && (
                    <div className="flex flex-row flex-wrap gap-2 sm:col-start-2 md:col-start-3 md:row-start-1 md:min-w-20 md:flex-col">
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-w-20 items-center justify-center gap-2 rounded-lg border border-indigo-deep/10 px-3 py-1.5 text-xs font-semibold text-indigo-deep transition-colors hover:border-amber hover:text-amber"
                        >
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                            <path d="m10 13 4-4m-6.5 7.5-1 1a4 4 0 0 1-5.66-5.66l4-4a4 4 0 0 1 5.66 0m3-1 1-1a4 4 0 0 1 5.66 5.66l-4 4a4 4 0 0 1-5.66 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          DOI
                        </a>
                      )}
                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={linkOnlyTypes.has(pub.type) ? `Open link for ${pub.title}` : `Open PDF for ${pub.title}`}
                          className="inline-flex min-w-20 items-center justify-center gap-2 rounded-lg bg-indigo-deep px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-mid"
                        >
                          {linkOnlyTypes.has(pub.type) ? (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                              <path d="M13 5h6v6m0-6-9 9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                              <path d="M7 2.75h7l4 4V20a1.25 1.25 0 0 1-1.25 1.25h-9.5A1.25 1.25 0 0 1 6 20V4a1.25 1.25 0 0 1 1-1.25Zm7 .25v4h4M9 11h6m-6 3h6m-6 3h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {linkOnlyTypes.has(pub.type) ? "Link" : "PDF"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
