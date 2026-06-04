import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Card = { n: string; title: string; copy: string; tags: string[] };
type Props = { items: Card[] };

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky-stack cards. Each card fully covers the previous (solid bg + ascending
 * z-index). Previous cards scale + dim subtly under the new one. Stack height
 * is just (N * cardSlot) — no trailing blank gap.
 */
export function StackedServices({ items }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

      // Entrance reveal
      cards.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });

      if (reduce) return;

      // Each previous card scales + dims as the NEXT card overlaps it.
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        gsap.to(card, {
          scale: 0.97,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 30%",
            end: "top 12%",
            scrub: true,
          },
        });
      });

      // 3D tilt on pointer-fine devices
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine) return;
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>("[data-tilt-inner]");
        if (!inner) return;
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(inner, {
            rotateY: px * 5,
            rotateX: -py * 5,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }, root);
    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={root} className="relative">
      {items.map((c, i) => (
        <div
          key={c.n}
          data-stack-card
          className="sticky top-24 md:top-28 origin-top will-change-transform"
          style={{ zIndex: i + 1, transformStyle: "preserve-3d" }}
        >
          <article
            data-tilt-inner
            className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 md:p-12 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/[0.06] via-transparent to-transparent pointer-events-none" />
            <div className="flex items-baseline justify-between mb-6 md:mb-8 gap-4">
              <span className="text-xs font-bold text-foreground/30 tracking-widest">{c.n}</span>
              <div className="flex flex-wrap gap-2 justify-end">
                {c.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full border border-foreground/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-balance">{c.title}</h3>
            <p className="mt-4 md:mt-6 max-w-xl text-sm md:text-base text-foreground/60 font-light leading-relaxed text-balance">{c.copy}</p>
          </article>
          {/* Slot spacer — drives scroll distance for each card */}
          {i < items.length - 1 && <div aria-hidden className="h-[55vh] md:h-[60vh]" />}
        </div>
      ))}
    </div>
  );
}
