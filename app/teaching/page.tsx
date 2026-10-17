import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { cvTeaching, type TeachingEntry } from "@/lib/cvContent";
import { teachingQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";
import { getPageIntro } from "@/lib/pageIntro";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Teaching | Soniya Gupta-Rawal",
  description: "Teaching, course coordination, and undergraduate supervision at Cambridge and MICA.",
};

const roleLabels: Record<string, string> = {
  ta: "Teaching Assistant",
  coordinator: "Course Coordinator",
  supervisor: "Undergraduate Supervisor",
  other: "Mentoring & Supervision",
};

const roleStyles: Record<string, string> = {
  ta: "bg-indigo-deep/10 text-indigo-deep",
  coordinator: "bg-amber/10 text-amber",
  supervisor: "bg-emerald-50 text-emerald-700",
  other: "bg-slate-100 text-slate-600",
};

export default async function TeachingPage() {
  const [intro, sanityTeaching] = await Promise.all([
    getPageIntro("teaching"),
    hasConfig ? client.fetch(teachingQuery).catch(() => []) : [],
  ]);
  const entries: TeachingEntry[] = sanityTeaching?.length ? sanityTeaching : cvTeaching;

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
      />

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Teaching Experience"
            subtitle="Courses and supervision at the University of Cambridge and MICA."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {entries.map((entry, index) => (
              <ScrollReveal key={entry._id} delay={Math.min(index * 0.05, 0.25)}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-indigo-deep/7 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-amber/25 hover:shadow-lg hover:shadow-indigo-deep/5 md:p-7">
                  <span className="absolute right-5 top-4 font-serif text-5xl font-black text-indigo-deep/[0.035]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[entry.role] || roleStyles.other}`}>
                      {roleLabels[entry.role] || entry.role}
                    </span>
                    <span className="text-xs font-semibold text-amber">{entry.period}</span>
                  </div>
                  <h2 className="max-w-[90%] font-serif text-xl font-bold leading-snug text-indigo-deep transition-colors group-hover:text-amber md:text-2xl">
                    {entry.course}
                  </h2>
                  {entry.professor && <p className="mt-3 text-sm text-indigo-deep/70">{entry.professor}</p>}
                  <p className="mt-1 text-sm text-slate-warm">{entry.institution}</p>
                  {entry.description && (
                    <p className="mt-5 border-t border-indigo-deep/7 pt-4 text-sm leading-relaxed text-slate-warm">
                      {entry.description}
                    </p>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
