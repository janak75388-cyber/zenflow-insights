import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Philosophy — Zencyp" },
      { name: "description", content: "How Zencyp thinks about engineering, design and the discipline of shipping ambitious digital products." },
      { property: "og:title", content: "Philosophy — Zencyp" },
      { property: "og:description", content: "How Zencyp thinks about engineering, design and the discipline of shipping." },
    ],
  }),
  component: Philosophy,
});

const tenets = [
  { n: "I.", title: "Engineering is the medium.", copy: "Aesthetic and architecture are inseparable. The system is the story; the interface is its surface." },
  { n: "II.", title: "Speed is a feature.", copy: "Sub-30ms responses, lean payloads and disciplined dependencies. Performance is a posture, not an optimization step." },
  { n: "III.", title: "Restraint is luxury.", copy: "We subtract until what remains is true. Less surface, more signal. Every element earns its position." },
  { n: "IV.", title: "Measure or move on.", copy: "We instrument what we ship. Decisions are made against data, not theatre." },
];

function Philosophy() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />

      <section className="pt-40 md:pt-48 pb-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="size-2 bg-brand rounded-full" /> The Studio
          </span>
          <h1 className="mt-8 text-[clamp(3rem,10vw,11rem)] font-extrabold leading-[0.85] tracking-tighter uppercase">
            We move faster<br />
            than the <span className="font-serif italic font-semibold normal-case border-b-[6px] md:border-b-[10px] border-brand leading-none px-2">speed</span><br />
            of hype.
          </h1>
          <p className="mt-12 max-w-xl text-lg md:text-xl font-light text-foreground/70 leading-snug">
            Zencyp operates at the intersection of extreme technical rigour and artistic curiosity.
            We don't just build products; we build benchmarks.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto border-t border-foreground/10">
          {tenets.map((t) => (
            <div key={t.n} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-12 md:py-16 border-b border-foreground/10 group hover:bg-muted/60 transition-colors px-2 md:px-6">
              <span className="md:col-span-2 font-serif italic text-2xl text-foreground/40">{t.n}</span>
              <h3 className="md:col-span-5 text-3xl md:text-4xl font-bold tracking-tight group-hover:translate-x-2 transition-transform">{t.title}</h3>
              <p className="md:col-span-5 text-foreground/60 font-light leading-relaxed">{t.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
