import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cora/AppShell";
import { PageHeader } from "@/components/cora/PageHeader";
import { nowSections } from "@/lib/mock-data";

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title: "CORA — Now" },
      { name: "description", content: "What I'm reading, watching, learning, building and thinking about, right now." },
      { property: "og:title", content: "CORA — Now" },
      { property: "og:description", content: "Reading, watching, learning, building, thinking." },
    ],
  }),
  component: Now,
});

function Section({ title, items }: { title: string; items: { title: string; by?: string }[] }) {
  return (
    <section className="px-5 sm:px-7 py-7 border-b border-border/60">
      <h2 className="font-serif text-2xl mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.title} className="text-[15px]">
            <span className="font-medium">{it.title}</span>
            {it.by && <span className="text-muted-foreground"> — {it.by}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Now() {
  return (
    <AppShell>
      <PageHeader eyebrow={new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })} title="Now" subtitle="A small, honest answer to 'what are you up to these days?' Inspired by Derek Sivers." />
      <Section title="Reading" items={nowSections.reading} />
      <Section title="Watching" items={nowSections.watching} />
      <Section title="Learning" items={nowSections.learning} />
      <Section title="Building" items={nowSections.building} />
      <Section title="Thinking about" items={nowSections.thinking} />
    </AppShell>
  );
}
