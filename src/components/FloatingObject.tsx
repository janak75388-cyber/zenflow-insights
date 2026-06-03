import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroShape from "@/assets/hero-shape.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Floating, parallax 3D object that drifts with scroll + cursor. */
export function FloatingObject({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i) return;

    const ctx = gsap.context(() => {
      // Idle float
      gsap.to(i, {
        y: "+=24",
        rotate: 4,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      // Scroll parallax
      gsap.to(w, {
        yPercent: -20,
        rotate: -8,
        ease: "none",
        scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true },
      });
      // Cursor parallax
      const onMove = (e: MouseEvent) => {
        const { innerWidth: ww, innerHeight: hh } = window;
        const x = (e.clientX / ww - 0.5) * 30;
        const y = (e.clientY / hh - 0.5) * 30;
        gsap.to(i, { x, y: `+=${y * 0.1}`, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className={`pointer-events-none ${className ?? ""}`}>
      <div ref={inner} className="w-full h-full will-change-transform">
        <img src={heroShape} alt="" aria-hidden className="w-full h-full object-contain object-right" />
      </div>
    </div>
  );
}
