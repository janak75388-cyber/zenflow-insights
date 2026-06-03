import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { gsap } from "gsap";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  as?: "button" | "a";
} & Omit<ComponentProps<"button">, "ref">;

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  href,
  as,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
      gsap.to(inner, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const Tag = (as ?? (href ? "a" : "button")) as "a" | "button";
  return (
    <Tag
      ref={ref as never}
      href={href}
      className={`inline-block will-change-transform ${className ?? ""}`}
      {...(rest as never)}
    >
      <span ref={innerRef} className="inline-flex items-center gap-4 will-change-transform">
        {children}
      </span>
    </Tag>
  );
}
