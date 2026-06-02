import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/cora/AppShell";
import { Composer } from "@/components/cora/Composer";
import { ThoughtCard, type Thought } from "@/components/cora/ThoughtCard";
import { supabase } from "@/integrations/supabase/client";
import { seedThoughts } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CORA — Home" },
      { name: "description", content: "A personal feed of thoughts, notes and small obsessions." },
      { property: "og:title", content: "CORA — Home" },
      { property: "og:description", content: "A personal feed of thoughts, notes and small obsessions." },
    ],
  }),
  component: Index,
});

type Row = {
  id: string; content: string; tags: string[]; image_url: string | null;
  likes_count: number; created_at: string; user_id: string;
  profiles: { display_name: string | null } | null;
};

function Index() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("thoughts")
      .select("id, content, tags, image_url, likes_count, created_at, user_id, profiles(display_name)")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(50);
    const rows = (data ?? []) as unknown as Row[];
    const mapped: Thought[] = rows.map((r) => ({
      id: r.id,
      content: r.content,
      tags: r.tags ?? [],
      image_url: r.image_url,
      likes_count: r.likes_count,
      created_at: r.created_at,
      author: r.profiles?.display_name ?? "Anon",
      handle: (r.profiles?.display_name ?? "anon").toLowerCase().replace(/\s+/g, ""),
    }));
    setThoughts(mapped);
    setLoaded(true);
  };

  useEffect(() => { load(); }, []);

  const list: Thought[] = thoughts.length > 0 ? thoughts : (seedThoughts as Thought[]);

  return (
    <AppShell>
      <div className="border-b border-border/60 px-5 sm:px-7 py-6">
        <h1 className="font-serif text-3xl">Today</h1>
        <p className="text-sm text-muted-foreground mt-1">A chronological feed of recent thoughts.</p>
      </div>
      <Composer onPosted={load} />
      <div>
        {list.map((t) => <ThoughtCard key={t.id} t={t} />)}
        {loaded && thoughts.length === 0 && (
          <div className="px-7 py-6 text-xs text-muted-foreground italic">
            Showing seed thoughts. Sign in and post to populate your own feed.
          </div>
        )}
      </div>
    </AppShell>
  );
}
