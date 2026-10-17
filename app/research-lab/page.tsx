import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import RAApplication from "@/components/RAApplication";
import Team from "@/components/Team";
import { raApplicationQuery, teamQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";
import { getPageIntro } from "@/lib/pageIntro";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Research Lab | Soniya Gupta-Rawal",
  description: "The CJBS Research Apprenticeship Program and its current and former research team.",
};

export default async function ResearchLabPage() {
  const [intro, raApplication, team] = hasConfig
    ? await Promise.all([
        getPageIntro("research-lab"),
        client.fetch(raApplicationQuery).catch(() => null),
        client.fetch(teamQuery).catch(() => []),
      ])
    : [await getPageIntro("research-lab"), null, []];

  return (
    <main>
      <Navbar />
      <PageHero
        title={intro.title}
        description={intro.description}
      />
      <RAApplication data={raApplication} headingOverride="CJBS Research Apprenticeship Program 2022–2027" />
      <Team members={team} />
      <Footer />
    </main>
  );
}
