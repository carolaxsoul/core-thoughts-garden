import { Heart, Bookmark, Share2 } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

export type Thought = {
  id: string;
  author: string;
  handle: string;
  content: string;
  tags: string[];
  created_at: string;
  likes_count: number;
  image_url?: string | null;
};

function readingTime(text: string) {
  const m = Math.max(1, Math.round(text.split(/\s+/).length / 220));
  return `${m} min`;
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function ThoughtCard({ t }: { t: Thought }) {
  return (
    <article className="px-5 sm:px-7 py-6 border-b border-border/60 hover:bg-card/40 transition">
      <div className="flex gap-4">
        <div
          className="size-11 shrink-0 rounded-full bg-blush text-amethyst flex items-center justify-center font-serif text-lg"
          aria-hidden
        >
          {initials(t.author)}
        </div>

        <div className="flex-1 min-w-0">
          <header className="flex items-baseline gap-2 text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">{t.author}</span>
            <span>@{t.handle}</span>
            <span>·</span>
            <time>{formatDistanceToNowStrict(new Date(t.created_at))} ago</time>
            <span className="ml-auto hidden sm:inline">{readingTime(t.content)} read</span>
          </header>

          <p className="mt-2 text-[16px] leading-relaxed text-foreground whitespace-pre-wrap">
            {t.content}
          </p>

          {t.image_url && (
            <img
              src={t.image_url}
              alt=""
              className="mt-4 rounded-2xl border border-border/60 max-h-[420px] w-full object-cover"
            />
          )}

          {t.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.tags.map((tag) => (
                <span key={tag} className="text-[12px] text-primary">#{tag}</span>
              ))}
            </div>
          )}

          <footer className="mt-4 flex items-center gap-5 text-muted-foreground">
            <button className="flex items-center gap-1.5 text-sm hover:text-primary transition">
              <Heart className="size-[17px]" /> {t.likes_count}
            </button>
            <button className="flex items-center gap-1.5 text-sm hover:text-primary transition">
              <Bookmark className="size-[17px]" />
            </button>
            <button className="flex items-center gap-1.5 text-sm hover:text-primary transition ml-auto">
              <Share2 className="size-[17px]" />
            </button>
          </footer>
        </div>
      </div>
    </article>
  );
}
