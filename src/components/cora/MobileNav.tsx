import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Compass, Library, User } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/blog", icon: BookOpen, label: "Blog" },
  { to: "/now", icon: Compass, label: "Now" },
  { to: "/library", icon: Library, label: "Library" },
  { to: "/about", icon: User, label: "About" },
] as const;

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t bg-background/90 backdrop-blur-md">
      <ul className="flex justify-around items-center h-16">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-0.5 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
