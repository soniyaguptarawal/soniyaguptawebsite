"use client";

import { urlFor } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

interface DataPartner {
  name: string;
  url?: string;
}

interface Project {
  _id: string;
  title: string;
  slug?: { current: string };
  description: string;
  image: SanityImageSource | null;
  status: string;
  collaborators: string;
  dataPartners?: DataPartner[];
  startDate: string;
  endDate: string;
  url: string;
}

interface ProjectsProps {
  projects: Project[];
}

const statusColors: Record<string, string> = {
  active: "bg-[#e3f2d9] text-[#315b2b]",
  completed: "bg-slate-100 text-slate-600",
  upcoming: "bg-amber/10 text-amber",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  upcoming: "Upcoming",
};

function formatProjectDate(value: string) {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return value;

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function DataPartnerLogo({ name }: { name: string }) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("micromentor")) {
    return (
      <img
        src="/partners/micromentor.svg"
        alt="MicroMentor"
        className="h-12 w-auto max-w-[190px] object-contain object-left"
        loading="lazy"
      />
    );
  }

  if (normalizedName.includes("banas")) {
    return (
      <img
        src="/partners/banas-dairy.svg"
        alt="Banas Dairy"
        className="h-12 w-auto max-w-[185px] object-contain object-left"
        loading="lazy"
      />
    );
  }

  if (normalizedName.includes("farmonaut")) {
    return (
      <span className="inline-flex items-center gap-2.5 font-semibold text-indigo-deep">
        <img
          src="/partners/farmonaut.jpg"
          alt=""
          className="h-10 w-10 rounded-md object-cover"
          loading="lazy"
        />
        <span className="text-base">Farmonaut</span>
      </span>
    );
  }

  if (normalizedName.includes("microentrepreneurs in egypt")) {
    return (
      <span className="inline-flex items-center gap-2.5 font-semibold text-indigo-deep">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e4cf] text-amber">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm13 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        </span>
        <span className="whitespace-nowrap text-xs">Microentrepreneurs in Egypt</span>
      </span>
    );
  }

  return <span className="text-xs font-semibold text-indigo-deep">{name}</span>;
}

const defaultProjects: Project[] = [
  {
    _id: "1",
    title: "Mentor Matching: Impact of Customized Mentoring on Entrepreneurs",
    description:
      "In collaboration with Micromentor (Capital For Good), this University of Cambridge-backed project develops a two-sided matching framework to customize business mentoring based on mentee and mentor characteristics. Using econometric modelling and machine learning, we aim to maximize successful matches and drive evidence-based improvements in the Micromentor platform's matching algorithm.",
    image: null,
    status: "active",
    collaborators: "Prof. Jaideep Prabhu, Prof. Ahmed Khwaja",
    dataPartners: [{name: "Micromentor", url: "https://micromentor.org/"}],
    startDate: "2022",
    endDate: "",
    url: "",
  },
  {
    _id: "2",
    title: "Banas Dairy: Strengthening Rural Retail through Umang Malls",
    description:
      "Partnering with Banas Dairy — India's largest dairy cooperative and a key contributor to Amul — to research sales performance, consumer behaviour, and marketing strategies for the Umang Mall rural retail model. The initiative covers 35+ stores in rural areas following a circular economy model, offering branded products to rural consumers.",
    image: null,
    status: "active",
    collaborators: "Prof. Jaideep Prabhu",
    dataPartners: [{name: "Banas Dairy (Umang Mall)", url: "https://www.banasdairy.coop/"}],
    startDate: "2025",
    endDate: "",
    url: "",
  },
  {
    _id: "3",
    title: "Shattering the Invisible Chains: Women Entrepreneurs in Egypt",
    description:
      "Investigating how age and gender influence buyer dependency in micro-enterprises in Egypt. Using scenario-based field experiments, this study identifies effective interventions — including negotiation training, alternative supplier information, and networking opportunities — to reduce supplier dependency and improve business performance for women entrepreneurs.",
    image: null,
    status: "active",
    collaborators: "Prof. Jaideep Prabhu, Magda Hassan, Jarrod Vassello",
    dataPartners: [{name: "Microentrepreneurs in Egypt"}],
    startDate: "2024",
    endDate: "",
    url: "",
  },
  {
    _id: "5",
    title: "Farmonaut: AI-Powered Satellite Advisories for Farmers",
    description:
      "Evaluating the causal impact of Farmonaut's AI-powered satellite-based agricultural advisories on farmer productivity. Comparing WhatsApp-based alerts versus the JEEVN AI web portal, using remote sensing data (NDVI, SAVI), Regression Kink Design, and quasi-experimental techniques across 900+ farms.",
    image: null,
    status: "active",
    collaborators: "Paul Kattuman, Luisa Corrado, Prof. Jaideep Prabhu",
    dataPartners: [{name: "Farmonaut", url: "https://farmonaut.com/"}],
    startDate: "2023",
    endDate: "",
    url: "",
  },
];

export default function Projects({ projects }: ProjectsProps) {
  const sourceProjects = projects?.length > 0 ? projects : defaultProjects;
  const displayProjects = sourceProjects.map((project) => {
    const title = project.title.toLowerCase();

    if (title.includes("producer-consumers market value exchange")) {
      return {...project, collaborators: "Prof. Jaideep Prabhu"};
    }

    if (title.includes("supplier dependency in egypt") || title.includes("women entrepreneurs in egypt")) {
      return {
        ...project,
        dataPartners: [{name: "Microentrepreneurs in Egypt"}],
      };
    }

    return project;
  });

  return (
    <section id="projects" className="relative bg-cream-dark/50 py-20 md:py-24">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative mx-auto max-w-[1744px] px-5 sm:px-6 lg:px-8">
        <SectionHeading
          title="Research Projects"
          subtitle="Active and recent research initiatives across emerging markets."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {displayProjects.map((project, i) => (
            <ScrollReveal key={project._id} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-indigo-deep/10 bg-[#fffdf9] shadow-[0_8px_28px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-amber/30 hover:shadow-[0_14px_36px_rgba(30,27,75,0.10)]">
                {/* Clickable card area */}
                <a href={project.slug?.current ? `/research/${project.slug.current}` : "#"} className="flex-1 flex flex-col">
                  {/* Image area */}
                  <div className="relative aspect-[16/8] overflow-hidden bg-gradient-to-br from-indigo-deep/5 to-amber/5">
                    {project.image ? (
                      <img
                        src={urlFor(project.image).width(600).height(340).url()}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full dot-grid flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center">
                          <svg className="w-8 h-8 text-amber/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${
                            statusColors[project.status] || statusColors.active
                          }`}
                        >
                          {statusLabels[project.status] || "Active"}
                        </span>
                        {project.startDate && (
                          <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-indigo-deep/65">
                            <svg className="h-3.5 w-3.5 shrink-0 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 3v3m8-3v3M4.5 9.5h15M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
                            </svg>
                            <span className="truncate">
                              {formatProjectDate(project.startDate)}{project.endDate ? ` — ${formatProjectDate(project.endDate)}` : " — Present"}
                            </span>
                          </span>
                        )}
                      </div>
                      <svg className="h-4 w-4 shrink-0 text-amber transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </div>

                    <h3 className="mb-3 font-serif text-[1.08rem] font-bold leading-snug text-indigo-deep transition-colors group-hover:text-amber">
                      {project.title}
                    </h3>
                    <p className="flex-1 text-[13px] leading-relaxed text-indigo-deep/70">
                      {project.description}
                    </p>

                    {project.collaborators && (
                      <div className="mt-5 flex gap-2.5 border-t border-indigo-deep/10 pt-4 text-[11px] leading-relaxed text-indigo-deep/65">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm13 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                        <p className="min-w-0">
                          <span className="block text-[11px] font-medium text-indigo-deep/80">Collaborators</span>
                          <span className="block text-[11px] xl:whitespace-nowrap">{project.collaborators}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </a>

                {/* Data Partners — outside the <a> to allow nested links */}
                {project.dataPartners && project.dataPartners.length > 0 && (
                  <div className="flex gap-2.5 border-t border-indigo-deep/10 px-5 py-4">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <ellipse cx="12" cy="5" rx="8" ry="3" strokeWidth={1.7} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7" />
                    </svg>
                    <div>
                      <p className="mb-1 text-[11px] font-medium text-indigo-deep/80">Data Partner</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {project.dataPartners.map((partner, j) =>
                        partner.url ? (
                          <a
                            key={j}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-deep transition-colors hover:text-amber"
                          >
                            <DataPartnerLogo name={partner.name} />
                            <svg className="h-3 w-3 self-start text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span key={j}><DataPartnerLogo name={partner.name} /></span>
                        )
                      )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
