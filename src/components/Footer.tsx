export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 pb-12">
      <div className="border-t border-border pt-8">
        <p className="text-[12vw] md:text-[10vw] font-bold uppercase leading-none tracking-tighter text-foreground/10 select-none">
          Carlovsk
        </p>

        <div className="flex justify-between items-center mt-8 text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} carlovsk</span>
          <span>Porto Seguro, Brazil</span>
        </div>
      </div>
    </footer>
  );
}
