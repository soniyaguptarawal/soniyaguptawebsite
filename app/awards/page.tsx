import type { Metadata } from "next";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import { awardsQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";
import { getPageIntro } from "@/lib/pageIntro";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Awards | Soniya Gupta-Rawal",
  description: "Research awards, grants, scholarships, and academic recognition.",
};

export default async function AwardsPage() {
  const [intro, awards] = await Promise.all([
    getPageIntro("awards"),
    hasConfig ? client.fetch(awardsQuery).catch(() => []) : [],
  ]);

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
      />
      <Awards awards={awards} />
      <Footer />
    </main>
  );
}
