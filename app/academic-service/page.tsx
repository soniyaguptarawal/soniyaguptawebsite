import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProfileList from "@/components/ProfileList";
import { reviewingService, serviceMemberships } from "@/lib/cvContent";

export const metadata: Metadata = {
  title: "Academic Service | Soniya Gupta-Rawal",
  description: "Journal and conference reviewing, academic service, fellowships, and professional memberships.",
};

export default function AcademicServicePage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Contributing to the field"
        title="Academic Service"
        description="Peer review, professional communities, and service that strengthen research institutions and scholarly exchange."
      />
      <ProfileList
        title="Academic Reviewing Service"
        subtitle="Peer review for journals, conferences, and doctoral research communities."
        items={reviewingService}
      />
      <ProfileList
        title="Services & Memberships"
        subtitle="Academic citizenship, leadership, and professional affiliations."
        items={serviceMemberships}
        tone="tinted"
      />
      <Footer />
    </main>
  );
}
