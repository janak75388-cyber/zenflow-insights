import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Item = { name: string; tag: string; img: string };
type Props = { items: Item[]; heading?: string };

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function HorizontalPortfolio({ items, heading = "Selected Work" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth + 80;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 right-0 px-6 md:px-10 pt-28 z-10 flex items-end justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="size-2 bg-brand rounded-full" /> {heading}
          </span>
          <h2 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tighter uppercase">
            Scroll <span className="font-serif italic font-semibold normal-case">across</span>
          </h2>
        </div>
        <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          Drag / scroll →
        </span>
      </div>

      <div className="h-screen flex items-center">
        <div ref={trackRef} className="flex gap-6 md:gap-10 pl-6 md:pl-10 will-change-transform">
          {items.map((it, i) => (
            <article
              key={it.name}
              className="shrink-0 w-[78vw] md:w-[52vw] lg:w-[42vw] flex flex-col gap-6"
            >
              <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden rounded-2xl outline outline-foreground/5 group">
                <img
                  src={it.img}
                  alt={it.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">{it.name}</h3>
                  <p className="text-foreground/40 uppercase text-[10px] font-bold tracking-[0.2em] mt-2">{it.tag}</p>
                </div>
                <span className="size-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all">↗</span>
              </div>
            </article>
          ))}
          <div className="shrink-0 w-20" />
        </div>
      </div>
    </section>
  );
}
