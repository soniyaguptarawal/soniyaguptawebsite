import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import { projectsQuery, publicationsQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Publications & Research Projects | Soniya Gupta-Rawal",
  description: "Research projects, working papers, journal publications, case studies, reports, and op-eds.",
};

const pageDescription =
  "My research examines how digital technologies, innovation, and market institutions shape firm behaviour, consumer decision-making, and economic outcomes in emerging markets. I draw on quantitative methods, field-based research, and collaborations with organisations to investigate questions at the intersection of marketing, technology, and development.";

export default async function PublicationsPage() {
  const [projects, publications] = hasConfig
    ? await Promise.all([
        client.fetch(projectsQuery).catch(() => []),
        client.fetch(publicationsQuery).catch(() => []),
      ])
    : [[], []];

  const visibleProjects = projects.filter(
    (project: { title?: string }) =>
      !project.title?.toLowerCase().includes("frugal space race"),
  );

  return (
    <main>
      <Navbar />
      <PageHero
        title="Research & Publications"
        description={pageDescription}
      />
      <Projects projects={visibleProjects} />
      <Publications publications={publications} />
      <Footer />
    </main>
  );
}
