import ScrollReveal from "./ScrollReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-indigo-deep pt-32 pb-18 md:pt-40 md:pb-24">
      <div className="absolute inset-0 dot-grid-light opacity-70" />
      <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-amber/12 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-indigo-light/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.24em] text-amber-light uppercase">
              {eyebrow}
            </span>
            <span className="h-px w-12 bg-amber/60" />
          </div>
          <h1 className="max-w-4xl font-serif text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
