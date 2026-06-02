export function PageHeader({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="px-5 sm:px-7 pt-10 pb-6 border-b border-border/60">
      {eyebrow && (
        <span className="text-[11px] uppercase tracking-[0.22em] text-primary">{eyebrow}</span>
      )}
      <h1 className="font-serif text-4xl sm:text-5xl mt-2 leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground max-w-xl">{subtitle}</p>}
    </div>
  );
}
