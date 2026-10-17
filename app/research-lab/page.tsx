import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import RAApplication from "@/components/RAApplication";
import Team from "@/components/Team";
import { raApplicationQuery, teamQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Research Lab | Soniya Gupta-Rawal",
  description: "The CJBS Research Apprenticeship Program and its current and former research team.",
};

export default async function ResearchLabPage() {
  const [raApplication, team] = hasConfig
    ? await Promise.all([
        client.fetch(raApplicationQuery).catch(() => null),
        client.fetch(teamQuery).catch(() => []),
      ])
    : [null, []];

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Build research together"
        title="Research Lab"
        description="A collaborative home for research apprentices, assistants, and students working on markets at the margins."
      />
      <RAApplication data={raApplication} headingOverride="CJBS Research Apprenticeship Program 2022–2027" />
      <Team members={team} />
      <Footer />
    </main>
  );
}
