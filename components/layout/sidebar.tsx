"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./sidebar-nav";
import { Logo } from "./logo";
import { Sparkles } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden md:flex md:w-60 lg:w-64 flex-col border-r border-border bg-card/60 backdrop-blur-xl">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="surface-soft rounded-xl border border-border p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Unlock advanced AI insights, unlimited workflows, and priority support.
          </p>
          <button className="mt-3 w-full rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-sm transition-opacity hover:opacity-90">
            Upgrade now
          </button>
        </div>
      </div>
    </aside>
  );
}
