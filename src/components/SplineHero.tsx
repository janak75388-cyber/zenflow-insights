import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": {
        url: string;
        background?: string;
        ref?: React.Ref<HTMLElement>;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export function SplineHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none lg:pointer-events-auto">
      <spline-viewer
        url="https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode"
        background="rgba(0,0,0,0)"
        className="w-full h-full"
      />
    </div>
  );
}
