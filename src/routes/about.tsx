import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cora/AppShell";
import { PageHeader } from "@/components/cora/PageHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "CORA — About" },
      { name: "description", content: "About Cora — a personal digital garden, a microblog, and a slowly growing library." },
      { property: "og:title", content: "CORA — About" },
      { property: "og:description", content: "About Cora." },
    ],
  }),
  component: About,
});

function About() {
  const [busy, setBusy] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => { setBusy(false); toast.success("Sent. I'll write back soon."); (e.target as HTMLFormElement).reset(); }, 600);
  };

  return (
    <AppShell>
      <PageHeader eyebrow="Portrait" title="About" subtitle="Hello — this is Cora." />

      <section className="px-5 sm:px-7 py-8 border-b border-border/60 grid sm:grid-cols-[180px,1fr] gap-6">
        <div className="size-40 rounded-3xl bg-gradient-to-br from-blush to-teal flex items-center justify-center font-serif text-6xl text-amethyst">
          C
        </div>
        <div className="space-y-4 text-[15px] leading-relaxed">
          <p>
            I write about architecture, technology, books and the inner life. CORA is a slow, personal corner of the
            internet — a digital garden where thoughts, essays and small obsessions coexist.
          </p>
          <p>
            By day I work somewhere between design and software. By night I read too much, watch films at the wrong
            hours, and keep a list of cities I want to live in.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-7 py-7 border-b border-border/60">
        <h2 className="font-serif text-xl mb-3">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {["Architecture", "Cinema", "Psychoanalysis", "Tarot", "Books", "Wellness", "Urbanism", "Slow internet", "Cities"].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-sm bg-blush/40 text-amethyst-foreground/80 dark:bg-secondary">{t}</span>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-7 py-7 border-b border-border/60">
        <h2 className="font-serif text-xl mb-3">Elsewhere</h2>
        <ul className="space-y-1 text-sm">
          <li><a className="text-primary hover:underline" href="#">Twitter / X</a></li>
          <li><a className="text-primary hover:underline" href="#">Are.na</a></li>
          <li><a className="text-primary hover:underline" href="#">Substack</a></li>
          <li><a className="text-primary hover:underline" href="#">Email newsletter</a></li>
        </ul>
      </section>

      <section className="px-5 sm:px-7 py-8">
        <h2 className="font-serif text-xl mb-4">Write to me</h2>
        <form onSubmit={submit} className="max-w-lg space-y-3">
          <Input required placeholder="Your name" className="rounded-xl bg-card" />
          <Input required type="email" placeholder="Your email" className="rounded-xl bg-card" />
          <Textarea required placeholder="What's on your mind?" rows={5} className="rounded-xl bg-card" />
          <Button type="submit" disabled={busy} className="rounded-full px-6">{busy ? "Sending…" : "Send"}</Button>
        </form>
      </section>
    </AppShell>
  );
}
