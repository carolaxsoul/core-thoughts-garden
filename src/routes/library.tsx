import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cora/AppShell";
import { PageHeader } from "@/components/cora/PageHeader";
import { libraryItems } from "@/lib/mock-data";
import { useState } from "react";

const types = ["all", "book", "movie", "tv", "podcast", "essay", "tool", "website"] as const;

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "CORA — Library" },
      { name: "description", content: "A personal recommendation database — books, movies, tools, websites and other things worth keeping." },
      { property: "og:title", content: "CORA — Library" },
      { property: "og:description", content: "A personal recommendation database." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [filter, setFilter] = useState<typeof types[number]>("all");
  const items = libraryItems.filter((i) => filter === "all" || i.type === filter);

  return (
    <AppShell>
      <PageHeader eyebrow="Curated" title="Library" subtitle="Books, films, podcasts, tools — things I'd actually recommend." />

      <div className="px-5 sm:px-7 py-4 border-b border-border/60 flex flex-wrap gap-1.5">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-[12px] capitalize transition ${
              filter === t ? "bg-amethyst text-amethyst-foreground" : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
          {items.map((it) => (
            <div key={it.id} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-card group">
              <div className="overflow-hidden">
                <img
                  src={it.cover}
                  alt={it.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-primary">{it.type}</span>
                  <span className="text-[11px] text-muted-foreground">{"★".repeat(it.rating)}</span>
                </div>
                <h3 className="font-serif text-base mt-0.5 leading-tight">{it.title}</h3>
                {it.notes && <p className="text-[12px] text-muted-foreground mt-1">{it.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
