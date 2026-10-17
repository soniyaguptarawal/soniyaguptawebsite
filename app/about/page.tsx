import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { profileQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About | Soniya Gupta-Rawal",
  description: "About Soniya Gupta-Rawal, quantitative marketing researcher at the University of Cambridge.",
};

export default async function AboutPage() {
  const profile = hasConfig ? await client.fetch(profileQuery).catch(() => null) : null;

  return (
    <main>
      <Navbar />
      <About
        name={profile?.name || "Soniya Gupta-Rawal"}
        title={profile?.title || "PhD Candidate, Management Studies (Marketing)"}
        institution={profile?.institution || "Cambridge Judge Business School, University of Cambridge"}
        bio={profile?.bio}
        photo={profile?.photo}
        cvFile={profile?.cvFile}
        email={profile?.email || "sg2001@jbs.cam.ac.uk"}
        googleScholar={profile?.googleScholar || ""}
        linkedin={profile?.linkedin || ""}
        twitter={profile?.twitter || ""}
        orcid={profile?.orcid || ""}
      />
      <Footer />
    </main>
  );
}
