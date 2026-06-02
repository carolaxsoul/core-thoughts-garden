import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthModal } from "./AuthModal";

export function Composer({ onPosted }: { onPosted?: () => void }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const post = async () => {
    if (!user) return setAuthOpen(true);
    if (!text.trim()) return;
    setBusy(true);
    const tags = Array.from(text.matchAll(/#(\w+)/g)).map((m) => m[1]);
    const { error } = await supabase.from("thoughts").insert({
      user_id: user.id,
      content: text.trim(),
      tags,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setText("");
    toast.success("Posted.");
    onPosted?.();
  };

  return (
    <div className="px-5 sm:px-7 py-5 border-b border-border/60">
      <div className="flex gap-4">
        <div className="size-11 shrink-0 rounded-full bg-teal/70 text-amethyst flex items-center justify-center font-serif">
          {user ? (user.email?.[0] ?? "C").toUpperCase() : "C"}
        </div>
        <div className="flex-1 min-w-0">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={user ? "What are you thinking about?" : "Sign in to share a thought…"}
            className="border-0 bg-transparent text-[17px] resize-none focus-visible:ring-0 px-0 min-h-[64px] placeholder:text-muted-foreground/70"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Use <span className="text-primary">#hashtags</span> to organise your thoughts.
            </span>
            <Button
              onClick={post}
              disabled={busy || !text.trim()}
              className="rounded-full px-5"
            >
              {busy ? "Posting…" : "Post"}
            </Button>
          </div>
        </div>
      </div>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
