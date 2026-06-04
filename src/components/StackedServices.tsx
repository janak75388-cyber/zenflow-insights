import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Card = { n: string; title: string; copy: string; tags: string[] };
type Props = { items: Card[] };

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function StackedServices({ items }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      if (cards.length < 2) return;

      const cardH = cards[0].getBoundingClientRect().height;
      const OVERLAP = 24; // px each card peeks above the previous

      // Position cards: card 0 is at y=0, card 1 starts below, etc.
      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.set(card, { y: cardH + (i - 1) * OVERLAP });
      });

      // Build a single scrubbed timeline that pulls every card into the stack
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          // Each card needs ~60vh of scroll to settle; last card doesn't need a step
          end: `+=${(cards.length - 1) * window.innerHeight * 0.65}`,
          scrub: 0.6,
          pin: true, // ← pins the section; no vacuum gap
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        // How far this card needs to travel to sit on top of card 0
        const targetY = -(i - 1) * OVERLAP;

        // Each card's travel is one equal slice of the timeline
        tl.to(
          card,
          {
            y: targetY,
            ease: "power2.inOut",
          },
          (i - 1) / (cards.length - 1), // staggered position in timeline
        );

        // Dim + scale the card below as the next card arrives
        tl.to(
          cards[i - 1],
          {
            scale: 0.97 - (i - 1) * 0.01,
            opacity: 0.45,
            ease: "power2.inOut",
          },
          (i - 1) / (cards.length - 1),
        );
      });

      // Entrance reveal (still fires on scroll-in before pin kicks in)
      if (!reduce) {
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          });
        });
      }

      // 3-D tilt on pointer-fine devices
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (!fine || reduce) return;

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
            duration: 0.45,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }, root);

    return () => ctx.revert();
  }, [items]);

  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    items.forEach((_, i) => {
      const title = root.current?.querySelector(`[data-service-title="${i}"]`) as HTMLElement;
      if (title) gsap.to(title, { opacity: i === index ? 1 : 0.35, duration: 0.35 });
    });

    const obj = root.current?.querySelector(`[data-service-object="${index}"]`) as HTMLElement;
    if (obj) gsap.to(obj, { rotation: 360, scale: 1.08, duration: 0.75, ease: "back.out" });
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    items.forEach((_, i) => {
      const title = root.current?.querySelector(`[data-service-title="${i}"]`) as HTMLElement;
      if (title) gsap.to(title, { opacity: 1, duration: 0.35 });
    });
  };

  return (
    /* Outer wrapper — GSAP pins this element in place during the scroll sequence */
    <div ref={root} className="relative w-full">
      {items.map((c, i) => (
        <div
          key={c.n}
          data-stack-card
          /* Cards are absolutely stacked; their real positions are set by GSAP */
          className={i === 0 ? "relative" : "absolute top-0 left-0 w-full"}
          style={{ zIndex: i + 1, transformStyle: "preserve-3d" }}
          onMouseEnter={() => handleCardHover(i)}
          onMouseLeave={handleCardLeave}
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
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full border border-foreground/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-8 md:gap-12">
              <div className="flex-1">
                <h3
                  data-service-title={i}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-balance"
                >
                  {c.title}
                </h3>
                <p className="mt-4 md:mt-6 max-w-xl text-sm md:text-base text-foreground/60 font-light leading-relaxed text-balance">
                  {c.copy}
                </p>
              </div>

              <div
                data-service-object={i}
                className="hidden lg:flex flex-shrink-0 size-32 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/20 items-center justify-center will-change-transform opacity-60"
              >
                <div className="text-4xl font-bold text-brand/40">{c.n}</div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
