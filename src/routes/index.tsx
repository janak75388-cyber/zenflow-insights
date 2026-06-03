import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import heroShape from "@/assets/hero-shape.jpg";
import workVault from "@/assets/work-vault.jpg";
import workLumina from "@/assets/work-lumina.jpg";

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
  { n: "01", title: "Strategic Design", copy: "Product strategy, UX research, and high-fidelity visual systems designed for rapid engineering handoff." },
  { n: "02", title: "Future Tech", copy: "Cloud-native architectures, AI-first interfaces, and custom blockchain integrations for the next web." },
  { n: "03", title: "Performance", copy: "Edge infrastructure and observability built for sub-30ms responses across global markets." },
];

const works = [
  { name: "Vault 01", tag: "Fintech / Platform Design", img: workVault },
  { name: "Lumina", tag: "IoT / Smart Systems", img: workLumina },
];

function Home() {
  return (
    <div className="bg-background text-foreground font-sans">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-16 pt-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-3/4 h-full z-0 opacity-70 pointer-events-none">
          <img
            src={heroShape}
            alt=""
            aria-hidden
            className="w-full h-full object-contain object-right"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto animate-reveal">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-xs font-serif italic text-foreground/40">01. Studio</span>
            <div className="h-px flex-1 bg-foreground/5" />
          </div>

          <h1 className="text-[clamp(3.5rem,14vw,16rem)] font-extrabold leading-[0.82] tracking-tighter uppercase">
            <div>Engineering</div>
            <div className="flex items-center gap-4 md:gap-10">
              <span className="font-serif italic font-semibold normal-case tracking-tight border-b-[6px] md:border-b-[10px] border-brand leading-none px-2">the</span>
              <span>Digital</span>
            </div>
            <div className="text-outline">Desire.</div>
          </h1>

          <div className="mt-12 flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-end">
            <div className="max-w-md">
              <p className="text-lg md:text-xl font-light text-foreground/70 leading-snug mb-6">
                An India-based tech consultancy bridging the gap between high-performance engineering and emotive digital experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Architecture", "Identity", "Scale"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full border border-foreground/10 text-[10px] font-bold uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a href="#capabilities" className="md:ml-auto group cursor-pointer relative shrink-0">
              <div className="size-28 md:size-32 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-700">
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

      {/* Capabilities */}
      <section id="capabilities" className="py-24 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16 md:mb-20">
            <span className="text-foreground text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="size-2 bg-brand rounded-full" /> Core Capabilities
            </span>
            <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-[0.2em] font-serif italic">Selected Expertise // 2026</span>
          </div>
          <div>
            {services.map((s) => (
              <div key={s.n} className="group border-b border-foreground/5 py-10 md:py-14 flex flex-col md:flex-row justify-between md:items-center gap-6 hover:bg-muted/60 px-2 md:px-6 transition-all duration-500">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-xs font-bold text-foreground/20">{s.n}</span>
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform">
                    {s.title}
                  </h3>
                </div>
                <p className="max-w-sm text-foreground/40 group-hover:text-foreground transition-colors font-light leading-relaxed">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase">Selected Work</h2>
            <Link to="/work" className="text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-foreground/60 transition-colors underline decoration-brand decoration-2 underline-offset-4">
              View Index →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {works.map((w, i) => (
              <div key={w.name} className={`space-y-6 hover-lift ${i === 1 ? "md:mt-48" : ""}`}>
                <div className="w-full aspect-[4/5] bg-muted outline outline-foreground/5 overflow-hidden">
                  <img src={w.img} alt={w.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight">{w.name}</h4>
                    <p className="text-foreground/40 uppercase text-[10px] font-bold tracking-[0.2em] mt-2">{w.tag}</p>
                  </div>
                  <Link to="/work" className="size-10 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all">↗</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-24 md:py-32 bg-brand text-brand-foreground px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Market Reach</span>
            <span className="text-6xl md:text-7xl font-extrabold tracking-tighter">140+</span>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-50">Deployments</p>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Optimization</span>
            <span className="text-6xl md:text-7xl font-extrabold tracking-tighter">4.2x</span>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-50">Performance Lift</p>
          </div>
          <div className="md:col-span-2 md:pl-16 md:border-l border-brand-foreground/10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter leading-none mb-6">
              Engineering excellence is not an option. It's the baseline.
            </h2>
            <p className="font-medium opacity-80 leading-relaxed">
              We reduce complexity to deliver clarity. Our process is rigorous, our code is lean, and our impact is measurable.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-6 md:px-10 text-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <span className="text-[30vw] font-black uppercase tracking-tighter leading-none">ZEN</span>
        </div>
        <div className="relative z-10">
          <h2 className="text-[clamp(2.75rem,10vw,10rem)] font-extrabold tracking-tighter leading-[0.9] mb-12">
            Let's build<br />
            <span className="font-serif italic font-semibold lowercase underline decoration-brand decoration-[8px] underline-offset-[12px]">something</span> real.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-6 bg-foreground text-background rounded-full px-10 md:px-14 py-5 md:py-6 text-base md:text-xl hover:bg-brand hover:text-brand-foreground transition-all duration-500 font-bold uppercase tracking-widest"
          >
            Connect <span className="text-2xl">→</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
