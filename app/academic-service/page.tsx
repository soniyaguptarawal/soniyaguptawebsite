import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProfileList from "@/components/ProfileList";
import { reviewingService, serviceMemberships } from "@/lib/cvContent";
import { academicServiceQuery } from "@/lib/queries";
import { getPageIntro } from "@/lib/pageIntro";
import { client, hasConfig } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Academic Service | Soniya Gupta-Rawal",
  description: "Journal and conference reviewing, academic service, fellowships, and professional memberships.",
};

interface AcademicServiceItem {
  _id: string;
  category: "reviewing" | "membership";
  year: string;
  title: string;
  detail: string;
}

export default async function AcademicServicePage() {
  const [intro, sanityItems] = await Promise.all([
    getPageIntro("academic-service"),
    hasConfig ? client.fetch(academicServiceQuery).catch(() => []) : [],
  ]);
  const items: AcademicServiceItem[] = sanityItems;
  const reviewing = items.length
    ? items.filter((item) => item.category === "reviewing")
    : reviewingService;
  const memberships = items.length
    ? items.filter((item) => item.category === "membership")
    : serviceMemberships;

  return (
    <main>
      <Navbar />
      <PageHero
        title={intro.title}
        description={intro.description}
      />
      <ProfileList
        title="Academic Reviewing Service"
        subtitle="Peer review for journals, conferences, and doctoral research communities."
        items={reviewing}
      />
      <ProfileList
        title="Services & Memberships"
        subtitle="Academic citizenship, leadership, and professional affiliations."
        items={memberships}
        tone="tinted"
      />
      <Footer />
    </main>
  );
}
