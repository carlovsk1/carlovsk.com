type Props = {
  client: string;
  year: string;
  url: string;
};

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ProjectMeta({ client, year, url }: Props) {
  return (
    <section className="border-y border-foreground/10 px-6 md:px-12 lg:px-20 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
        <MetaItem label="Client" value={client} />
        <MetaItem label="Year" value={year} />
        <MetaItem label="Live">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 decoration-muted hover:decoration-foreground transition-colors"
          >
            {hostnameOf(url)} ↗
          </a>
        </MetaItem>
      </div>
    </section>
  );
}

function MetaItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      {children ?? <span className="text-sm font-medium">{value}</span>}
    </div>
  );
}
