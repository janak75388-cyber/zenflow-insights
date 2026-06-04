import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  duration?: number;
  className?: string;
};

/** Animated counter that restarts every time it enters the viewport. */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", pad = 0, duration = 1, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const format = (n: number) => {
      const s = n.toFixed(decimals);
      const [int, frac] = s.split(".");
      const padded = pad > 0 ? int.padStart(pad, "0") : int;
      return prefix + (frac ? `${padded}.${frac}` : padded) + suffix;
    };

    if (reduce) {
      el.textContent = format(to);
      return;
    }

    const obj = { v: 0 };
    el.textContent = format(0);

    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = format(obj.v);
      },
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        obj.v = 0;
        tween.restart(true);
      },
      onEnterBack: () => {
        obj.v = 0;
        tween.restart(true);
      },
      onLeave: () => {
        obj.v = 0;
        el.textContent = format(0);
        tween.pause(0);
      },
      onLeaveBack: () => {
        obj.v = 0;
        el.textContent = format(0);
        tween.pause(0);
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [to, decimals, prefix, suffix, pad, duration]);

  return <span ref={ref} className={className}>{prefix}{pad > 0 ? "0".repeat(pad) : "0"}{suffix}</span>;
}
