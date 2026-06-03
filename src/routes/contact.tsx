import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zencyp" },
      { name: "description", content: "Start a project with Zencyp. We respond within one working day." },
      { property: "og:title", content: "Contact — Zencyp" },
      { property: "og:description", content: "Start a project with Zencyp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <SiteNav />

      <section className="flex-1 pt-40 md:pt-48 pb-24 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <span className="text-[30vw] font-black uppercase tracking-tighter leading-none">CYP</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="size-2 bg-brand rounded-full" /> Open Inquiry
          </span>

          <h1 className="mt-8 text-[clamp(3rem,11vw,12rem)] font-extrabold leading-[0.85] tracking-tighter uppercase">
            Let's build<br />
            <span className="font-serif italic font-semibold lowercase underline decoration-brand decoration-[8px] underline-offset-[12px]">
              something
            </span> real.
          </h1>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">New Projects</span>
                <a href="mailto:hello@zencyp.in" className="block mt-3 text-2xl md:text-4xl font-extrabold tracking-tight underline decoration-brand decoration-4 underline-offset-8 hover:text-foreground/60 transition-colors break-all">
                  hello@zencyp.in
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">Careers</span>
                <a href="mailto:careers@zencyp.in" className="block mt-3 text-xl md:text-2xl font-bold tracking-tight hover:text-foreground/60 transition-colors break-all">
                  careers@zencyp.in
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">Studio</span>
                <p className="mt-3 text-lg font-light text-foreground/80 leading-snug">
                  Zencyp Digital<br />
                  New Delhi, India<br />
                  Remote / Global
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">Response</span>
                <p className="mt-3 text-lg font-light text-foreground/80 leading-snug max-w-xs">
                  We reply to every qualified brief within one working day.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-foreground/10">
            <a
              href="mailto:hello@zencyp.in"
              className="inline-flex items-center gap-6 bg-foreground text-background rounded-full px-10 md:px-14 py-5 md:py-6 text-base md:text-xl hover:bg-brand hover:text-brand-foreground transition-all duration-500 font-bold uppercase tracking-widest"
            >
              Start a project <span className="text-2xl">→</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
