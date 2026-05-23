"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { pageTitles } from "./sidebar-nav";
import { currentUser } from "@/lib/mock-data";
import { initials } from "@/lib/utils";

export function Topbar() {
  const pathname = usePathname();
  const matchedKey =
    Object.keys(pageTitles)
      .filter((k) => (k === "/" ? pathname === "/" : pathname.startsWith(k)))
      .sort((a, b) => b.length - a.length)[0] ?? "/";
  const title = pageTitles[matchedKey];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <MobileNav />
      <div className="flex items-center gap-3">
        <h1 className="text-base sm:text-lg font-semibold tracking-tight">{title}</h1>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Live</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search workflows, reports..."
            className="h-9 w-56 lg:w-72 pl-9"
          />
        </div>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="text-sm">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto py-1">
              {[
                { title: "Workflow 'Invoice Processing' completed", time: "2m ago", tone: "good" },
                { title: "Lead Scoring saved 42 hrs this week", time: "1h ago", tone: "good" },
                { title: "Vendor Compliance Check is in Draft", time: "3h ago", tone: "warn" },
                { title: "SOC2 evidence collection started", time: "5h ago", tone: "neutral" },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-2 py-2 hover:bg-secondary rounded-md">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      n.tone === "good"
                        ? "bg-emerald-500"
                        : n.tone === "warn"
                        ? "bg-amber-500"
                        : "bg-indigo-500"
                    }`}
                  />
                  <div className="text-xs">
                    <p className="text-foreground">{n.title}</p>
                    <p className="text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-0.5 hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
              <Avatar>
                <AvatarFallback>{initials(currentUser.name)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              <Badge variant="default" className="mt-2 text-[10px]">
                {currentUser.role}
              </Badge>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Workspace</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
