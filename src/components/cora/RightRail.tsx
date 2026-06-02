import { Link } from "@tanstack/react-router";
import { seedNews, trendingTags, nowSections } from "@/lib/mock-data";
import { formatDistanceToNowStrict } from "date-fns";

export function RightRail() {
  return (
    <aside className="hidden xl:flex flex-col w-[340px] shrink-0 sticky top-0 h-screen overflow-y-auto px-6 py-8 gap-5">
      {/* Daily brief */}
      <section className="rounded-3xl bg-card p-5">
        <header className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg">Daily Brief</h3>
          <Link to="/daily-brief" className="text-xs text-primary hover:underline">See all</Link>
        </header>
        <ul className="space-y-3">
          {seedNews.slice(0, 3).map((n) => (
            <li key={n.id}>
              <a href={n.url} target="_blank" rel="noreferrer" className="group block">
                <span className="text-[11px] uppercase tracking-wider text-primary">{n.category}</span>
                <p className="text-[14px] leading-snug group-hover:text-primary transition">{n.headline}</p>
                <span className="text-[11px] text-muted-foreground">
                  {n.source} · {formatDistanceToNowStrict(new Date(n.published_at))} ago
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Trending */}
      <section className="rounded-3xl bg-card p-5">
        <h3 className="font-serif text-lg mb-3">Trending</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-[12px] bg-blush/40 text-amethyst-foreground/80 dark:bg-secondary">
              #{t}
            </span>
          ))}
        </div>
      </section>

      {/* Reading now */}
      <section className="rounded-3xl bg-card p-5">
        <h3 className="font-serif text-lg mb-3">Reading now</h3>
        <ul className="space-y-2">
          {nowSections.reading.map((b) => (
            <li key={b.title} className="text-sm">
              <span className="font-medium">{b.title}</span>{" "}
              <span className="text-muted-foreground">— {b.by}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
