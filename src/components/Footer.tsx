export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 pb-12 pt-8">
      <p className="text-[14vw] md:text-[11vw] font-bold uppercase leading-none tracking-tighter text-foreground/10 select-none text-center">
        Carlovsk
      </p>

      <div className="mt-12 flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="text-xs uppercase tracking-wider text-muted">
          &copy;2025 Carlovsk Studios
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/1carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-muted hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/carlovsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-muted hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <a
          href="#nav"
          className="text-xs uppercase tracking-wider text-muted hover:text-foreground transition-colors"
        >
          Go Back to Top
        </a>
      </div>
    </footer>
  );
}
