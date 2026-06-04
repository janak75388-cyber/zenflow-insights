import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Item = { name: string; tag: string; img: string };
type Props = { items: Item[]; heading?: string };

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function HorizontalPortfolio({ items, heading = "Selected Work" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

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

      // Image parallax inside cards
      gsap.utils.toArray<HTMLElement>("[data-port-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, x: 0 },
          {
            scale: 1,
            x: -30,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement!,
              containerAnimation: ScrollTrigger.getAll().find((t) => t.pin === section)?.animation,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // Stagger entrance
      gsap.from("[data-port-card]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items, isDesktop]);

  // Mobile entrance reveal
  useEffect(() => {
    if (isDesktop) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-port-card]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      <div className="lg:absolute lg:top-0 lg:left-0 lg:right-0 px-6 md:px-10 pt-20 lg:pt-28 z-10 flex items-end justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="size-2 bg-brand rounded-full" /> {heading}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter uppercase">
            Scroll <span className="font-serif italic font-semibold normal-case">across</span>
          </h2>
        </div>
        <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          {isDesktop ? "Drag / scroll →" : "Swipe →"}
        </span>
      </div>

      {/* Desktop: pinned horizontal scroll. Mobile: snap-scroll horizontal */}
      <div className={isDesktop ? "h-screen flex items-center" : "mt-10 pb-16"}>
        <div
          ref={trackRef}
          className={
            isDesktop
              ? "flex gap-6 md:gap-10 pl-6 md:pl-10 will-change-transform"
              : "flex gap-5 px-6 overflow-x-auto snap-scroll-x will-change-transform"
          }
        >
          {items.map((it, i) => (
            <article
              key={`${it.name}-${i}`}
              data-port-card
              className={`shrink-0 ${isDesktop ? "w-[78vw] md:w-[52vw] lg:w-[42vw]" : "w-[82vw] snap-item"} flex flex-col gap-5 group`}
            >
              <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden rounded-2xl outline outline-foreground/5">
                <img
                  data-port-img
                  src={it.img}
                  alt={it.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-110 will-change-transform"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">{it.name}</h3>
                  <p className="text-foreground/40 uppercase text-[10px] font-bold tracking-[0.2em] mt-2">
                    {it.tag}
                  </p>
                </div>
                <span className="size-11 md:size-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  ↗
                </span>
              </div>
            </article>
          ))}
          <div className="shrink-0 w-10 lg:w-20" />
        </div>
      </div>
    </section>
  );
}
