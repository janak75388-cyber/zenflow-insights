import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import workVault from "@/assets/work-vault.jpg";
import workLumina from "@/assets/work-lumina.jpg";
import workAether from "@/assets/work-aether.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Zencyp" },
      {
        name: "description",
        content: "A working archive of platforms, identities and infrastructure shipped by Zencyp.",
      },
      { property: "og:title", content: "Selected Work — Zencyp" },
      {
        property: "og:description",
        content: "Platforms, identities and infrastructure shipped by Zencyp.",
      },
    ],
  }),
  component: Work,
});

const projects = [
  {
    name: "Vault 01",
    tag: "Fintech / Platform Design",
    year: "2026",
    img: workVault,
    copy: "End-to-end asset management platform serving institutional clients across three continents.",
  },
  {
    name: "Lumina",
    tag: "IoT / Smart Systems",
    year: "2025",
    img: workLumina,
    copy: "Spatial automation OS for next-generation commercial workspaces.",
  },
  {
    name: "Aether",
    tag: "Identity / Motion",
    year: "2025",
    img: workAether,
    copy: "A brand system and motion language for an emerging luxury wellness label.",
  },
];

function Work() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <section className="pt-40 md:pt-48 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="size-2 bg-brand rounded-full" /> Index 2024 — 2026
          </span>
          <h1 className="mt-8 text-[clamp(3rem,11vw,12rem)] font-extrabold leading-[0.85] tracking-tighter uppercase">
            Selected
            <br />
            <span className="text-outline">Work.</span>
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="md:col-span-7 hover-lift">
                <div className="w-full aspect-[4/5] bg-muted outline outline-foreground/5 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="md:col-span-5 space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                  {p.year} — {p.tag}
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">{p.name}</h2>
                <p className="text-foreground/60 font-light leading-relaxed max-w-md">{p.copy}</p>
                <Link
                  to="/contact"
                  className="inline-block text-[11px] font-bold uppercase tracking-widest underline decoration-brand decoration-2 underline-offset-4 hover:text-foreground/60"
                >
                  Talk about a similar build →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
