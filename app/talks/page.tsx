import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProfileList from "@/components/ProfileList";
import Talks from "@/components/Talks";
import { cvConferencePresentations, doctoralDevelopment } from "@/lib/cvContent";
import { talksQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Talks | Soniya Gupta-Rawal",
  description: "Conference presentations, doctoral seminars, and competitive workshops.",
};

export default async function TalksPage() {
  const sanityTalks = hasConfig ? await client.fetch(talksQuery).catch(() => []) : [];
  const eventKeys = new Set(
    sanityTalks.map((talk: { event?: string; title?: string }) =>
      `${talk.title || ""}::${talk.event || ""}`.toLowerCase().trim()
    )
  );
  const talks = [
    ...sanityTalks,
    ...cvConferencePresentations.filter(
      (talk) => !eventKeys.has(`${talk.title}::${talk.event}`.toLowerCase().trim())
    ),
  ].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Ideas in conversation"
        title="Talks"
        description="Conference presentations, doctoral consortia, seminars, and workshops where research is tested and sharpened."
      />
      <Talks talks={talks} />
      <ProfileList
        title="Doctoral Seminars & Competitive Workshops"
        subtitle="Selective programmes and advanced training across marketing, causal inference, and field research."
        items={doctoralDevelopment}
        tone="tinted"
      />
      <Footer />
    </main>
  );
}
