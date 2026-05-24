"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, AlertTriangle, Clock, Sparkles, type LucideIcon } from "lucide-react";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { SectionCard } from "@/components/dashboard/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  efficiencyTrend30d,
  efficiencyTrend7d,
  efficiencyTrend90d,
  departmentDistribution,
  weekOverWeek,
  keyInsights,
  chartPalette,
} from "@/lib/mock-data";

const ranges = [
  { id: "7", label: "Last 7 days", data: efficiencyTrend7d },
  { id: "30", label: "Last 30 days", data: efficiencyTrend30d },
  { id: "90", label: "Last 90 days", data: efficiencyTrend90d },
] as const;

const icons: Record<string, LucideIcon> = {
  TrendingUp,
  AlertTriangle,
  Clock,
  Sparkles,
};

export default function InsightsPage() {
  const [rangeId, setRangeId] = React.useState<(typeof ranges)[number]["id"]>("30");
  const active = ranges.find((r) => r.id === rangeId)!;

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Insights</h2>
            <p className="text-sm text-muted-foreground">
              AI-surfaced trends and recommendations across your workspace.
            </p>
          </div>
          <div className="inline-flex rounded-lg border border-border p-1">
            {ranges.map((r) => (
              <Button
                key={r.id}
                variant="ghost"
                size="sm"
                onClick={() => setRangeId(r.id)}
                className={cn(
                  "h-8 px-3 text-xs",
                  rangeId === r.id && "bg-card shadow-sm text-foreground"
                )}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard
            title="Efficiency trend"
            description="Average workflow efficiency over time."
            className="lg:col-span-2"
            action={<Badge variant="success">+8.6%</Badge>}
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={active.data} margin={{ top: 6, right: 8, bottom: 0, left: -22 }}>
                  <defs>
                    <linearGradient id="eff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartPalette.indigo} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={chartPalette.indigo} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke={chartPalette.slate}
                    strokeDasharray="4 4"
                    fill="transparent"
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke={chartPalette.indigo}
                    strokeWidth={2.5}
                    fill="url(#eff)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard
            title="Workflows by department"
            description="Distribution across teams."
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={departmentDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                    isAnimationActive={false}
                  >
                    {departmentDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Week-over-week comparison"
          description="Performance vs. previous week, by area."
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weekOverWeek}
                margin={{ top: 6, right: 8, bottom: 0, left: -22 }}
                barCategoryGap={28}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="area" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="lastWeek" fill={chartPalette.cloud} radius={[6, 6, 0, 0]} name="Last week" />
                <Bar dataKey="thisWeek" fill={chartPalette.indigo} radius={[6, 6, 0, 0]} name="This week" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {keyInsights.map((k, i) => {
            const Icon = icons[k.icon] ?? Sparkles;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      k.tone === "good"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : k.tone === "warn"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                        : "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold">{k.stat}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug">{k.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{k.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </PageSkeleton>
  );
}
