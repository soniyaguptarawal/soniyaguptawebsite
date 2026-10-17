import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import { projectsQuery, publicationsQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";
import { getPageIntro } from "@/lib/pageIntro";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Publications & Research Projects | Soniya Gupta-Rawal",
  description: "Research projects, working papers, journal publications, case studies, reports, and op-eds.",
};

export default async function PublicationsPage() {
  const [intro, projects, publications] = hasConfig
    ? await Promise.all([
        getPageIntro("publications"),
        client.fetch(projectsQuery).catch(() => []),
        client.fetch(publicationsQuery).catch(() => []),
      ])
    : [await getPageIntro("publications"), [], []];

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
      />
      <Projects projects={projects} />
      <Publications publications={publications} />
      <Footer />
    </main>
  );
}
