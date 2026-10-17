import type { Metadata } from "next";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import { awardsQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Awards | Soniya Gupta-Rawal",
  description: "Research awards, grants, scholarships, and academic recognition.",
};

export default async function AwardsPage() {
  const awards = hasConfig ? await client.fetch(awardsQuery).catch(() => []) : [];

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="Recognition"
        title="Awards"
        description="Grants, fellowships, scholarships, and honours supporting research with real-world reach."
      />
      <Awards awards={awards} />
      <Footer />
    </main>
  );
}
