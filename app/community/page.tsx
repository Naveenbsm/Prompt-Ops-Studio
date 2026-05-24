"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, Network, Star, Users, Sparkles, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { SectionCard } from "@/components/dashboard/section-card";
import {
  communityNodes,
  sharedDNAFeed as initialFeed,
  cnlGrowth,
  chartPalette,
  type SharedDNA,
} from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
  const [feed, setFeed] = useLocalStorage<SharedDNA[]>(
    storageKeys.community,
    initialFeed
  );

  const totalShared = communityNodes.reduce((s, n) => s + n.sharedDNA, 0);
  const totalContributions = communityNodes.reduce((s, n) => s + n.contributions, 0);
  const avgReliability = Math.round(
    communityNodes.reduce((s, n) => s + n.reliability, 0) / communityNodes.length
  );

  const toggleImport = (id: string) => {
    setFeed((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const imported = !d.imported;
        toast.success(
          imported ? `Imported "${d.name}" into your library` : `Removed "${d.name}"`
        );
        return { ...d, imported };
      })
    );
  };

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Community Logic Network</h2>
            <p className="text-sm text-muted-foreground">
              Federated learning across UK firms — share anonymised Workflow DNA, keep private data private.
            </p>
          </div>
          <Badge variant="default" className="self-start gap-1.5">
            <Globe className="h-3.5 w-3.5" /> {communityNodes.length} peer firms in network
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Peer firms" value={`${communityNodes.length}`} icon={Users} tone="indigo" />
          <StatTile label="Shared DNA patterns" value={`${totalShared}`} icon={Sparkles} tone="emerald" />
          <StatTile label="Contributions / month" value={`${totalContributions}`} icon={Network} tone="sky" />
          <StatTile label="Avg reliability" value={`${avgReliability}%`} icon={Star} tone="amber" />
        </div>

        <SectionCard
          title="Network growth"
          description="Firms and shared DNA patterns over the last 12 weeks."
          action={<Badge variant="success">+24% / mo</Badge>}
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cnlGrowth} margin={{ top: 6, right: 8, bottom: 0, left: -22 }}>
                <defs>
                  <linearGradient id="cln-firms" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartPalette.indigo} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={chartPalette.indigo} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cln-patterns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartPalette.emerald} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={chartPalette.emerald} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} fontSize={11} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="firms"
                  name="Firms"
                  stroke={chartPalette.indigo}
                  strokeWidth={2.5}
                  fill="url(#cln-firms)"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="patterns"
                  name="DNA patterns"
                  stroke={chartPalette.emerald}
                  strokeWidth={2.5}
                  fill="url(#cln-patterns)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <SectionCard
            title="Peer firms"
            description="Anonymised contributors across UK regions."
            className="lg:col-span-2"
          >
            <ul className="space-y-2">
              {communityNodes.map((n) => (
                <li
                  key={n.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Network className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{n.firm}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.region} · {n.sector}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {n.sharedDNA} shared DNA
                      </Badge>
                      <Badge variant="neutral" className="text-[10px]">
                        {n.contributions} contributions
                      </Badge>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        ★ {n.reliability}%
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            title="Shared DNA marketplace"
            description="Anonymised patterns contributed by peer firms — import to your library."
            className="lg:col-span-3"
          >
            <ul className="space-y-2">
              {feed.map((d) => (
                <li
                  key={d.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold leading-tight">{d.name}</p>
                      <Badge variant="outline" className="text-[10px]">
                        {d.sector}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Contributed by {d.contributor}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{d.uses.toLocaleString()} uses</span>
                      <span className="text-amber-600 dark:text-amber-400">★ {d.rating}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        −{d.hallucinationReduction}% hallucinations
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={d.imported ? "outline" : "default"}
                    onClick={() => toggleImport(d.id)}
                  >
                    {d.imported ? (
                      "Imported"
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" /> Import
                      </>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <Card className="border-indigo-200 bg-indigo-50/30 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">How federated learning protects your data</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Only the behavioural DNA fingerprint of high-scoring workflows leaves your workspace — never client
                content, prompts, or outputs. PromptOps trains the network model on these fingerprints so every UK
                firm benefits as the collective gets sharper, with no exposure of private data.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageSkeleton>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "indigo" | "emerald" | "sky" | "amber";
}) {
  const toneClasses = {
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
        </div>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", toneClasses[tone])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}
