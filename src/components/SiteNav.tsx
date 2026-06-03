import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="fixed top-0 z-50 w-full px-6 py-6 md:px-10 md:py-8 flex justify-between items-center bg-background/70 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-4">
        <span className="text-xl md:text-2xl font-extrabold tracking-tighter">ZENCYP.</span>
        <span className="hidden md:inline-block h-px w-10 bg-foreground/10" />
        <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest text-foreground/40 underline decoration-brand decoration-2 underline-offset-4">
          Available Q3 '26
        </span>
      </Link>
      <div className="flex gap-6 md:gap-10 text-[11px] uppercase tracking-widest font-bold">
        <Link to="/work" className="hover:text-foreground/60 transition-colors" activeProps={{ className: "underline decoration-brand decoration-2 underline-offset-4" }}>
          Work
        </Link>
        <Link to="/philosophy" className="hover:text-foreground/60 transition-colors" activeProps={{ className: "underline decoration-brand decoration-2 underline-offset-4" }}>
          Philosophy
        </Link>
        <Link to="/contact" className="hover:text-foreground/60 transition-colors" activeProps={{ className: "underline decoration-brand decoration-2 underline-offset-4" }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
