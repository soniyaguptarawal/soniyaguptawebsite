import ScrollReveal from "./ScrollReveal";

interface PageHeroProps {
  title: string;
  description: string;
}

export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-indigo-deep pt-32 pb-20 md:pt-36 md:pb-24">
      <div className="absolute inset-0 dot-grid-light opacity-70" />
      <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-amber/12 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-indigo-light/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h1 className="max-w-5xl font-serif text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-7xl text-base leading-relaxed text-white/65 md:text-lg">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
