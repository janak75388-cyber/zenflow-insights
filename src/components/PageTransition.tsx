import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";

/** Page transition: lime curtain wipes up on route change. */
export function PageTransition({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isFirst = useRef(true);

  useEffect(() => {
    const el = curtain.current;
    if (!el) return;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.55, ease: "power4.inOut" },
    ).to(el, { yPercent: -100, duration: 0.6, ease: "power4.inOut", delay: 0.05 });
  }, [path]);

  return (
    <>
      {children}
      <div
        ref={curtain}
        aria-hidden
        className="fixed inset-0 z-[100] bg-brand pointer-events-none translate-y-full"
      />
    </>
  );
}
