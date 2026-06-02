import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Newspaper, User, Library, Sun, Moon, LogOut, Compass } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/blog", label: "Blog", icon: BookOpen },
  { to: "/daily-brief", label: "Daily Brief", icon: Newspaper },
  { to: "/now", label: "Now", icon: Compass },
  { to: "/library", label: "Library", icon: Library },
  { to: "/about", label: "About", icon: User },
] as const;

export function LeftRail() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 sticky top-0 h-screen px-6 py-8 gap-1">
      <Link to="/" className="font-serif text-3xl tracking-tight text-primary mb-10 hover:opacity-80 transition">
        CORA
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-[15px] transition
                ${active
                  ? "bg-card text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"}`}
            >
              <Icon className="size-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={toggle}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-card/60 transition"
        >
          {theme === "light" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>

        {user ? (
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-card/60 transition"
          >
            <LogOut className="size-[18px]" />
            Sign out
          </button>
        ) : (
          <Button onClick={() => setAuthOpen(true)} className="rounded-full h-11 mt-2">
            Sign in
          </Button>
        )}
      </div>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </aside>
  );
}
