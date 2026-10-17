import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsInsights from "@/components/NewsInsights";
import PageHero from "@/components/PageHero";
import { fetchOgImage } from "@/lib/fetchOgImage";
import { newsQuery } from "@/lib/queries";
import { client, hasConfig } from "@/sanity/client";
import { getPageIntro } from "@/lib/pageIntro";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Media Mentions | Soniya Gupta-Rawal",
  description: "Press coverage, interviews, research features, and public commentary.",
};

interface NewsItem {
  _id: string;
  title: string;
  summary?: string;
  thumbnail?: unknown;
  date?: string;
  tag?: string;
  url?: string;
}

export default async function MediaMentionsPage() {
  const [intro, news] = await Promise.all([
    getPageIntro("media-mentions"),
    hasConfig ? client.fetch(newsQuery).catch(() => []) : [],
  ]);
  const items = await Promise.all(
    news.map(async (item: NewsItem) => ({
      ...item,
      ogImage: item.thumbnail ? null : item.url ? await fetchOgImage(item.url) : null,
    }))
  );

  return (
    <main>
      <Navbar />
      <PageHero
        title={intro.title}
        description={intro.description}
      />
      <NewsInsights items={items} />
      <Footer />
    </main>
  );
}
