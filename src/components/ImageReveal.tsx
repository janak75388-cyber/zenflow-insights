import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  src: string;
  alt?: string;
  height?: string;
};

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ImageReveal({ src, alt = "Reveal image", height = "h-[80vh]" }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const topMaskRef = useRef<HTMLDivElement>(null);
  const bottomMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const topMask = topMaskRef.current;
    const bottomMask = bottomMaskRef.current;

    if (!section || !image || !topMask || !bottomMask) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([topMask, bottomMask], { yPercent: 0 });
        return;
      }

      // Animate both masks opening during scroll
      gsap.fromTo(
        topMask,
        { yPercent: 0 },
        {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        bottomMask,
        { yPercent: 0 },
        {
          yPercent: 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      );

      // Subtle zoom and shift on image
      gsap.fromTo(
        image,
        { scale: 1.1, y: 40 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-10 bg-background overflow-hidden"
    >
      <div className={`max-w-6xl mx-auto relative ${height} rounded-3xl overflow-hidden bg-muted`}>
        {/* Fixed image */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />

        {/* Top mask */}
        <div
          ref={topMaskRef}
          className="absolute top-0 left-0 right-0 h-1/2 bg-background will-change-transform"
        />

        {/* Bottom mask */}
        <div
          ref={bottomMaskRef}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-background will-change-transform"
        />
      </div>
    </section>
  );
}
