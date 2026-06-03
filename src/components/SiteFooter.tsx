export function SiteFooter() {
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-foreground/5 text-foreground/40 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.25em] font-bold">
        <div className="flex gap-8 md:gap-10">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors underline decoration-brand/60 underline-offset-4">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="https://clutch.co" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Clutch</a>
        </div>
        <div>© 2026 Zencyp India — Precision Digital</div>
      </div>
    </footer>
  );
}
