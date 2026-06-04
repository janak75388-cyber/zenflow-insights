import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Card = { n: string; title: string; copy: string; tags: string[] };
type Props = { items: Card[] };

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function StackedServices({ items }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      if (cards.length === 0) return;

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

      // Calculate total scroll distance needed
      const cardHeight = cards[0].clientHeight;
      const spacingPerCard = window.innerHeight * 0.55; // ~55vh spacing
      const totalScrollDistance = cardHeight + spacingPerCard * (cards.length - 1);

      // Stack each card over previous ones
      cards.forEach((card, i) => {
        if (i === 0) return;
        const prevCard = cards[i - 1];

        gsap.to(card, {
          y: -cardHeight * (i - 1),
          ease: "none",
          scrollTrigger: {
            trigger: prevCard,
            start: `bottom ${window.innerHeight * 0.35}px`,
            end: `bottom ${window.innerHeight * 0.1}px`,
            scrub: 0.5,
            markers: false,
          },
        });
      });

      // Dim and scale previous cards as next card stacks
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];

        gsap.to(card, {
          scale: 0.97,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 35%",
            end: "top 15%",
            scrub: 0.5,
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
          gsap.to(inner, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
          });
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

    // Animate title brightness
    items.forEach((_, i) => {
      const title = root.current?.querySelector(`[data-service-title="${i}"]`) as HTMLElement;
      if (title) {
        const isActive = i === index;
        gsap.to(title, {
          opacity: isActive ? 1 : 0.4,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });

    // Animate rotating object
    const obj = root.current?.querySelector(`[data-service-object="${index}"]`) as HTMLElement;
    if (obj) {
      gsap.to(obj, {
        rotation: 360,
        scale: 1.08,
        duration: 0.8,
        ease: "back.out",
      });
    }
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Reset all titles to full opacity
    items.forEach((_, i) => {
      const title = root.current?.querySelector(`[data-service-title="${i}"]`) as HTMLElement;
      if (title) {
        gsap.to(title, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <div ref={root} className="relative">
        {items.map((c, i) => (
          <div
            key={c.n}
            data-stack-card
            className="sticky top-24 md:top-32 origin-top will-change-transform"
            style={{ zIndex: items.length - i, transformStyle: "preserve-3d" }}
            onMouseEnter={() => handleCardHover(i)}
            onMouseLeave={handleCardLeave}
          >
            <article
              data-tilt-inner
              className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 md:p-12 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] will-change-transform transition-all duration-300"
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
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-balance transition-opacity duration-400"
                  >
                    {c.title}
                  </h3>
                  <p className="mt-4 md:mt-6 max-w-xl text-sm md:text-base text-foreground/60 font-light leading-relaxed text-balance">
                    {c.copy}
                  </p>
                </div>

                <div
                  data-service-object={i}
                  className="hidden lg:flex flex-shrink-0 size-32 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/20 items-center justify-center will-change-transform opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <div className="text-4xl font-bold text-brand/40">{c.n}</div>
                </div>
              </div>
            </article>
            {/* Spacer for scroll distance */}
            {i < items.length - 1 && <div aria-hidden className="h-[55vh] md:h-[60vh]" />}
            {/* Extra spacing after last card to avoid white space */}
            {i === items.length - 1 && <div aria-hidden className="h-20 md:h-32" />}
          </div>
        ))}
      </div>
    </div>
  );
}
