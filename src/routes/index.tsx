import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { StackedServices } from "@/components/StackedServices";
import { HorizontalPortfolio } from "@/components/HorizontalPortfolio";
import { FloatingObject } from "@/components/FloatingObject";
import { GlassShowcase } from "@/components/GlassShowcase";
import { CountUp } from "@/components/CountUp";
import workVault from "@/assets/work-vault.jpg";
import workLumina from "@/assets/work-lumina.jpg";
import workAether from "@/assets/work-aether.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zencyp — Engineering the Digital Desire" },
      { name: "description", content: "An India-based tech consultancy bridging high-performance engineering with emotive digital experiences." },
      { property: "og:title", content: "Zencyp — Engineering the Digital Desire" },
      { property: "og:description", content: "Studio for product strategy, future tech and engineering excellence." },
    ],
  }),
  component: Home,
});

const services = [
  { n: "01", title: "Strategic Design", tags: ["Research", "Systems"], copy: "Product strategy, UX research, and high-fidelity visual systems designed for rapid engineering handoff. We make decisions defensible." },
  { n: "02", title: "Future Tech", tags: ["AI", "Cloud"], copy: "Cloud-native architectures, AI-first interfaces, and custom integrations for the next web. Built for change, instrumented from day one." },
  { n: "03", title: "Performance", tags: ["Edge", "Observability"], copy: "Edge infrastructure and observability built for sub-30ms responses across global markets. Speed as a discipline, not a sprint." },
  { n: "04", title: "Brand & Motion", tags: ["Identity", "Motion"], copy: "Identity systems and kinetic interfaces that feel weighted, intentional, and unmistakably yours." },
];

const portfolio = [
  { name: "Vault 01", tag: "Fintech / Platform", img: workVault },
  { name: "Lumina", tag: "IoT / Smart Systems", img: workLumina },
  { name: "Aether", tag: "Identity / Motion", img: workAether },
  { name: "Vault 01", tag: "Fintech / Platform", img: workVault },
];

const metrics = [
  { label: "Deployments", value: "140+" },
  { label: "Performance Lift", value: "4.2x" },
  { label: "Avg. Latency", value: "24ms" },
  { label: "Awwwards Won", value: "08" },
];

function Home() {
  return (
    <div className="bg-background text-foreground font-sans">
      <SiteNav />

      {/* Hero with parallax 3D object */}
      <section className="relative min-h-[100svh] flex flex-col justify-end px-5 md:px-10 pb-12 md:pb-16 pt-28 md:pt-32 overflow-hidden">
        <FloatingObject className="absolute top-0 right-0 w-full md:w-3/4 h-full z-0 opacity-60 md:opacity-70" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-6" y={20}>
            <span className="text-xs font-serif italic text-foreground/40">01. Studio</span>
            <div className="h-px flex-1 bg-foreground/5" />
          </Reveal>

          <h1 className="text-[clamp(3rem,13vw,15rem)] font-extrabold leading-[0.85] tracking-tighter uppercase">
            <Reveal splitWords>Engineering</Reveal>
            <div className="flex items-center gap-3 md:gap-10 flex-wrap">
              <Reveal as="span" className="font-serif italic font-semibold normal-case tracking-tight border-b-[5px] md:border-b-[10px] border-brand leading-none px-2" delay={0.1}>
                the
              </Reveal>
              <Reveal as="span" splitWords delay={0.2}>Digital</Reveal>
            </div>
            <Reveal as="div" className="text-outline" delay={0.4} splitWords>
              Desire.
            </Reveal>
          </h1>

          <div className="mt-12 flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-end">
            <Reveal className="max-w-md" delay={0.5}>
              <p className="text-lg md:text-xl font-light text-foreground/70 leading-snug mb-6">
                An India-based tech consultancy bridging the gap between high-performance engineering and emotive digital experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Architecture", "Identity", "Scale"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full border border-foreground/10 bg-background/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <a href="#capabilities" className="md:ml-auto group cursor-pointer relative shrink-0">
              <div className="size-28 md:size-32 rounded-full border border-foreground/10 bg-background/40 backdrop-blur-md flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-700">
                <div className="text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Scroll</span>
                  <span className="block text-xs">↓</span>
                </div>
              </div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-foreground/10 animate-spin-slow group-hover:opacity-0 transition-opacity" />
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-foreground/5 py-6">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              {["Interface Design", "Architecture", "Strategy", "Intelligence", "Motion", "Engineering"].map((t) => (
                <span key={t} className="font-serif italic text-3xl md:text-5xl text-foreground/20 uppercase">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky stacked services */}
      <section id="capabilities" className="py-24 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16 md:mb-20">
            <span className="text-foreground text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="size-2 bg-brand rounded-full" /> Core Capabilities
            </span>
            <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-[0.2em] font-serif italic">
              Stack & scroll
            </span>
          </Reveal>
          <StackedServices items={services} />
          <div className="h-[40vh]" />
        </div>
      </section>

      {/* Horizontal portfolio with pinned scroll */}
      <HorizontalPortfolio items={portfolio} />

      {/* Metrics with glass cards */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 bg-brand text-brand-foreground overflow-hidden">
        <div className="absolute -top-32 -left-32 size-[400px] rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-[500px] rounded-full bg-black/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95] max-w-3xl">
              Engineering excellence is not an option. It's the baseline.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 p-6 md:p-8 h-full">
                  <span className="block text-5xl md:text-6xl font-extrabold tracking-tighter">{m.value}</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-3 opacity-60">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with magnetic button */}
      <section className="py-32 md:py-48 px-6 md:px-10 text-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <span className="text-[30vw] font-black uppercase tracking-tighter leading-none">ZEN</span>
        </div>
        <div className="relative z-10">
          <Reveal as="h2" splitWords className="text-[clamp(2.75rem,10vw,10rem)] font-extrabold tracking-tighter leading-[0.9] mb-12">
            Let's build something real.
          </Reveal>
          <MagneticButton
            as="a"
            href="/contact"
            strength={0.5}
            className="bg-foreground text-background rounded-full px-10 md:px-14 py-5 md:py-6 text-base md:text-xl hover:bg-brand hover:text-brand-foreground transition-colors duration-500 font-bold uppercase tracking-widest"
          >
            Connect <span className="text-2xl">→</span>
          </MagneticButton>
          <div className="mt-8">
            <Link to="/work" className="text-[11px] font-bold uppercase tracking-widest hover:text-foreground/60 underline decoration-brand decoration-2 underline-offset-4">
              See selected work →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
