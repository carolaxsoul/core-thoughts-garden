import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cora/AppShell";
import { PageHeader } from "@/components/cora/PageHeader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const categories = [
  "All", "Architecture", "Technology", "Programming", "Astrology", "Tarot",
  "Psychoanalysis", "Books", "Movies", "TV Shows", "Wellness", "Travel",
  "Landscape Design", "Productivity",
];

const sampleArticles = [
  { id: "a1", title: "On Calvino's invisible cities, twenty years later", category: "Books", excerpt: "What we remember from the cities we were never quite in.", date: "May 28, 2026", featured: true },
  { id: "a2", title: "A small grammar of courtyards", category: "Architecture", excerpt: "Notes on inner patios in a warming world.", date: "May 14, 2026" },
  { id: "a3", title: "The honest minimalism of Linear", category: "Technology", excerpt: "What software can borrow from architecture.", date: "Apr 30, 2026" },
  { id: "a4", title: "Tarot as a thinking tool", category: "Tarot", excerpt: "Not divination — a structured way to ask better questions.", date: "Apr 12, 2026" },
  { id: "a5", title: "Reading Lacan slowly", category: "Psychoanalysis", excerpt: "A year-long, glacial book club with one friend.", date: "Mar 22, 2026" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "CORA — Blog" },
      { name: "description", content: "Essays on architecture, technology, culture and the spaces in-between." },
      { property: "og:title", content: "CORA — Blog" },
      { property: "og:description", content: "Essays on architecture, technology, culture and the spaces in-between." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = sampleArticles.filter((a) =>
    (cat === "All" || a.category === cat) &&
    (q === "" || (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase()))
  );
  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <AppShell>
      <PageHeader eyebrow="Essays" title="The Blog" subtitle="Long-form thinking. Architecture, technology, books, the inner life." />

      <div className="px-5 sm:px-7 py-5 border-b border-border/60 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search essays…" className="pl-9 rounded-full bg-card" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full text-[12px] transition ${
                cat === c ? "bg-amethyst text-amethyst-foreground" : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {featured && (
        <article className="px-5 sm:px-7 py-8 border-b border-border/60">
          <span className="text-[11px] uppercase tracking-widest text-primary">Featured · {featured.category}</span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2 leading-tight">{featured.title}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{featured.excerpt}</p>
          <span className="text-xs text-muted-foreground block mt-3">{featured.date}</span>
        </article>
      )}

      <ul>
        {rest.map((a) => (
          <li key={a.id} className="px-5 sm:px-7 py-6 border-b border-border/60 hover:bg-card/40 transition">
            <span className="text-[11px] uppercase tracking-widest text-primary">{a.category}</span>
            <h3 className="font-serif text-2xl mt-1">{a.title}</h3>
            <p className="text-muted-foreground mt-1">{a.excerpt}</p>
            <span className="text-xs text-muted-foreground block mt-2">{a.date}</span>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
