import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cora/AppShell";
import { PageHeader } from "@/components/cora/PageHeader";
import { seedNews } from "@/lib/mock-data";
import { fetchDailyBrief } from "@/services/newsApi";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/daily-brief")({
  head: () => ({
    meta: [
      { title: "CORA — Daily Brief" },
      { name: "description", content: "The most important stories of the day, curated across world news, technology, science, business and culture." },
      { property: "og:title", content: "CORA — Daily Brief" },
      { property: "og:description", content: "The most important stories of the day." },
    ],
  }),
  component: DailyBrief,
});

const categories = ["World", "Brazil", "Technology", "Science", "Business", "Culture"];

function DailyBrief() {
  const [news, setNews] = useState<typeof seedNews>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyBrief().then((data) => {
      if (data.length > 0) {
        setNews(data);
      } else {
        setNews(seedNews);
      }
      setLoading(false);
    }).catch(() => {
      setNews(seedNews);
      setLoading(false);
    });
  }, []);

  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <AppShell>
      <PageHeader eyebrow={today} title="Daily Brief" subtitle="The day, condensed. World news, technology, science, business and culture — with short summaries you can actually read." />

      <div className="px-5 sm:px-7 py-4 border-b border-border/60 flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <span key={c} className="px-3 py-1 rounded-full text-[12px] bg-teal/40 text-amethyst-foreground/80 dark:bg-secondary">{c}</span>
        ))}
      </div>

      {loading ? (
        <div className="px-5 sm:px-7 py-12 text-sm text-muted-foreground italic">
          Carregando notícias…
        </div>
      ) : (
        <ul>
          {news.map((n, i) => (
            <li key={n.id ?? i} className="px-5 sm:px-7 py-6 border-b border-border/60 hover:bg-card/40 transition">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-primary">
                <span>{n.category}</span><span>·</span><span>{n.source}</span><span>·</span>
                <span className="text-muted-foreground normal-case tracking-normal">
                  {formatDistanceToNowStrict(new Date(n.published_at))} ago
                </span>
              </div>
              <h3 className="font-serif text-2xl mt-1.5 leading-snug">{n.headline}</h3>
              <p className="text-muted-foreground mt-2">{n.summary}</p>
              <a href={n.url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline mt-3 inline-block">
                Read the original →
              </a>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
