import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Mobile3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !meshRef.current) return;

    // Only render on mobile
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mesh = meshRef.current;
      if (!mesh) return;

      // Continuous gentle rotation
      gsap.to(mesh, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      if (!reduce) {
        // Subtle scroll-driven tilt
        gsap.to(mesh, {
          rotationX: () => window.scrollY * 0.0002,
          rotationY: () => window.scrollY * 0.0003,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              if (mesh) {
                gsap.set(mesh, {
                  rotationX: self.getProgress() * 30,
                  rotationY: self.getProgress() * 45,
                });
              }
            },
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[50vh] md:hidden bg-gradient-to-b from-background to-background/50 relative overflow-hidden flex items-center justify-center"
    >
      <div
        ref={meshRef}
        className="size-48 sm:size-64 relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Icosahedron-like shape using CSS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative size-full"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Central glowing core */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand via-brand/40 to-transparent shadow-[0_0_80px_40px_rgba(192,255,0,0.15)] blur-2xl animate-pulse" />

            {/* Rotating polyhedron faces */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-brand/20 rounded-full"
                style={{
                  transform: `rotateX(${i * 30}deg) rotateY(${i * 30}deg) scaleZ(0.8)`,
                  opacity: 0.6 - i * 0.04,
                }}
              />
            ))}

            {/* Highlight spots */}
            <div
              className="absolute top-12 left-12 size-24 rounded-full bg-brand/40 blur-3xl"
              style={{ backdropFilter: "blur(10px)" }}
            />
            <div
              className="absolute bottom-16 right-8 size-20 rounded-full bg-brand/20 blur-2xl"
              style={{ backdropFilter: "blur(8px)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
