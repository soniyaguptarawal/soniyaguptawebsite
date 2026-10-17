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
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const availableTypes = new Set(displayPubs.map((p) => p.type));
  const types = [
    "all",
    ...typeOrder.filter((type) => availableTypes.has(type)),
    ...Array.from(availableTypes).filter((type) => !typeOrder.includes(type)),
  ];
  const filtered = filter === "all" ? displayPubs : displayPubs.filter((p) => p.type === filter);

  return (
    <section id="publications" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Publications"
          subtitle="Selected research contributions in quantitative marketing and emerging markets."
        />

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
                {type === "all" ? "All" : typeLabels[type] || type}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Publications list */}
        <div className="space-y-4">
          {filtered.map((pub, i) => (
            <ScrollReveal key={pub._id} delay={i * 0.05}>
              <div className="pub-card bg-white rounded-xl p-6 md:p-8 border border-indigo-deep/5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber/10 text-amber">
                        {typeLabels[pub.type] || pub.type}
                      </span>
                      <span className="text-sm text-slate-warm">{pub.year}</span>
                      {pub.featured && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-deep/5 text-indigo-deep">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-indigo-deep mb-2">
                      {pub.title}
                    </h3>
                    <p className="text-slate-warm text-sm mb-1">{pub.authors}</p>
                    <p className="text-slate-warm/70 text-sm italic">{pub.journal}</p>

                    {/* Expandable abstract */}
                    {pub.abstract && (
                      <div className="mt-3">
                        <button
                          onClick={() => setExpandedId(expandedId === pub._id ? null : pub._id)}
                          className="text-amber text-sm font-medium hover:text-amber-light transition-colors"
                        >
                          {expandedId === pub._id ? "Hide Abstract" : "Show Abstract"}
                        </button>
                        {expandedId === pub._id && (
                          <p className="mt-2 text-sm text-indigo-deep/60 leading-relaxed">
                            {pub.abstract}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-indigo-deep/10 text-xs font-medium text-indigo-deep/70 hover:border-amber hover:text-amber transition-colors"
                      >
                        DOI
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-indigo-deep text-white text-xs font-medium hover:bg-indigo-mid transition-colors"
                      >
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
