import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

interface ProfileItem {
  year: string;
  title: string;
  detail: string;
}

interface ProfileListProps {
  title: string;
  subtitle: string;
  items: ProfileItem[];
  tone?: "light" | "tinted";
}

export default function ProfileList({ title, subtitle, items, tone = "light" }: ProfileListProps) {
  return (
    <section className={`relative py-20 md:py-28 ${tone === "tinted" ? "bg-cream-dark/50" : ""}`}>
      {tone === "tinted" && <div className="absolute inset-0 dot-grid opacity-25" />}
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <ScrollReveal key={`${item.year}-${item.title}`} delay={Math.min(index * 0.04, 0.25)}>
              <article className="group h-full rounded-2xl border border-indigo-deep/7 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-amber/25 hover:shadow-lg hover:shadow-indigo-deep/5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                    {item.year}
                  </span>
                  <span className="h-px flex-1 bg-indigo-deep/8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-indigo-deep transition-colors group-hover:text-amber">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-warm">{item.detail}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
