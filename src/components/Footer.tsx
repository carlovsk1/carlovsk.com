export default function Footer() {
  return (
    <footer className="px-6 md:px-10 pt-10 md:pt-12 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 border-b border-border">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-strong leading-relaxed max-w-md">
          Based in Brazil, I am an innovative Bubble Developer and entrepreneur.
          My passion for intuitive user experiences, elegant solutions, and
          simplifying complex processes is evident in my work.
        </p>

        <div className="flex items-start gap-6 md:justify-end">
          <a
            href="https://www.instagram.com/1carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/in/carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
          &copy;{new Date().getFullYear()} Carlovsk Studios
        </p>
        <a
          href="#nav"
          className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
        >
          Go Back to Top
        </a>
      </div>

      <div
        aria-hidden
        className="mt-8 flex items-start justify-center overflow-hidden"
        style={{ height: "calc(14vw * 0.75)" }}
      >
        <p
          className="text-center font-black uppercase leading-[0.85] tracking-[-0.04em] text-foreground select-none whitespace-nowrap"
          style={{ fontSize: "14vw" }}
        >
          Carlovsk
        </p>
      </div>
    </footer>
  );
}
