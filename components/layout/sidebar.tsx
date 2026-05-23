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
    <aside className="fixed inset-y-0 left-0 z-40 hidden md:flex md:w-60 lg:w-64 flex-col border-r border-border bg-card/40 backdrop-blur">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "gradient-primary text-white shadow-md shadow-indigo-500/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4 transition-colors", active ? "text-white" : "")} />
              <span>{item.label}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse-dot" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="rounded-xl border border-border bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Unlock advanced AI insights, unlimited workflows, and priority support.
          </p>
          <button className="mt-3 w-full rounded-lg gradient-primary px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:brightness-110">
            Upgrade now
          </button>
        </div>
      </div>
    </aside>
  );
}
