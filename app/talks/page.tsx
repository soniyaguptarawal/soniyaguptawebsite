import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProfileList from "@/components/ProfileList";
import Talks from "@/components/Talks";
import { cvConferencePresentations, doctoralDevelopment } from "@/lib/cvContent";
import { doctoralDevelopmentQuery, talksQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";
import { getPageIntro } from "@/lib/pageIntro";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Talks | Soniya Gupta-Rawal",
  description: "Conference presentations, doctoral seminars, and competitive workshops.",
};

export default async function TalksPage() {
  const [intro, sanityTalks, sanityDevelopment] = await Promise.all([
    getPageIntro("talks"),
    hasConfig ? client.fetch(talksQuery).catch(() => []) : [],
    hasConfig ? client.fetch(doctoralDevelopmentQuery).catch(() => []) : [],
  ]);
  const talks = sanityTalks.length ? sanityTalks : cvConferencePresentations;
  const development = sanityDevelopment.length ? sanityDevelopment : doctoralDevelopment;

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
      />
      <Talks talks={talks} />
      <ProfileList
        title="Doctoral Seminars & Competitive Workshops"
        subtitle="Selective programmes and advanced training across marketing, causal inference, and field research."
        items={development}
        tone="tinted"
      />
      <Footer />
    </main>
  );
}
