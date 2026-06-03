import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Card = { n: string; title: string; copy: string; tags: string[] };
type Props = { items: Card[] };

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function StackedServices({ items }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 1 - (cards.length - 1 - i) * 0.04,
          yPercent: -8 * (cards.length - 1 - i),
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 10%",
            endTrigger: cards[cards.length - 1],
            end: "top 18%",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={root} className="relative">
      {items.map((c) => (
        <div
          key={c.n}
          data-stack-card
          className="sticky top-24 md:top-28 mb-6 origin-top will-change-transform"
        >
          <article className="rounded-3xl border border-foreground/10 bg-background/70 backdrop-blur-xl p-8 md:p-12 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
            <div className="flex items-baseline justify-between mb-8">
              <span className="text-xs font-bold text-foreground/30 tracking-widest">{c.n}</span>
              <div className="flex gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full border border-foreground/10 text-[10px] font-bold uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-4xl md:text-7xl font-extrabold tracking-tighter">{c.title}</h3>
            <p className="mt-6 max-w-xl text-foreground/60 font-light leading-relaxed">{c.copy}</p>
          </article>
        </div>
      ))}
    </div>
  );
}
