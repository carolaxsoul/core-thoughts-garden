import type { ReactNode } from "react";
import { LeftRail } from "./LeftRail";
import { RightRail } from "./RightRail";
import { MobileNav } from "./MobileNav";
import { Link } from "@tanstack/react-router";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 border-b bg-background/85 backdrop-blur-md">
        <Link to="/" className="font-serif text-2xl text-primary">CORA</Link>
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">notes · stories · culture</span>
      </header>

      <div className="mx-auto max-w-[1400px] flex">
        <LeftRail />
        <main className="flex-1 min-w-0 border-x border-border/60 min-h-screen pb-24 lg:pb-0">
          {children}
        </main>
        <RightRail />
      </div>

      <MobileNav />
    </div>
  );
}
