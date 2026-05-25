"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Trophy } from "lucide-react";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { SectionCard } from "@/components/dashboard/section-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { performanceByTeam, performanceOverTime, teamPerformers, chartPalette, chartSeries } from "@/lib/mock-data";
import { cn, initials } from "@/lib/utils";

const palette = chartSeries;

export default function PerformancePage() {
  const top3 = teamPerformers.slice(0, 3);
  const rest = teamPerformers.slice(3);

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Performance</h2>
            <p className="text-sm text-muted-foreground">
              Logic Score and DNA reuse by team and individual.
            </p>
          </div>
          <Badge variant="default">Quarter to date</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard
            title="Logic Score by team"
            description="Composite score (0–100) across reliability, fidelity, and ROI."
            className="lg:col-span-2"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceByTeam}
                  layout="vertical"
                  margin={{ top: 6, right: 16, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 100]} fontSize={11} />
                  <YAxis
                    dataKey="team"
                    type="category"
                    width={120}
                    axisLine={false}
                    tickLine={false}
                    fontSize={11}
                  />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {performanceByTeam.map((_, i) => (
                      <Cell key={i} fill={palette[i % palette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Top performers" description="People driving the most impact.">
            <div className="space-y-3">
              {top3.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{initials(p.name)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
                        i === 0 ? "bg-amber-500" : i === 1 ? "bg-zinc-400" : "bg-orange-500"
                      )}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{p.score}</p>
                    <p
                      className={cn(
                        "flex items-center justify-end text-[11px] gap-0.5",
                        p.trend >= 0 ? "text-emerald-600" : "text-rose-600"
                      )}
                    >
                      {p.trend >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(p.trend)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Logic Score over time"
          description="Composite score across Coding / Development, Consulting / Delivery and IT Services teams."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceOverTime} margin={{ top: 8, right: 16, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="seniorDevs"
                  name="Coding / Development"
                  stroke={chartPalette.indigo}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="consulting"
                  name="Consulting / Delivery"
                  stroke={chartPalette.amber}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="itServices"
                  name="IT Services"
                  stroke={chartPalette.emerald}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Leaderboard"
          description="Full leaderboard across the workspace."
          action={
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Trophy className="h-3.5 w-3.5" />
              {teamPerformers.length} contributors
            </div>
          }
        >
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Team</th>
                  <th className="px-4 py-3 text-left font-medium">DNA owned</th>
                  <th className="px-4 py-3 text-left font-medium">Score</th>
                  <th className="px-4 py-3 text-left font-medium">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teamPerformers.map((p, i) => (
                  <tr key={p.id} className="hover:bg-secondary/40">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{initials(p.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.team}</td>
                    <td className="px-4 py-3 tabular-nums">{p.workflowsOwned}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full gradient-bar" style={{ width: `${p.score}%` }} />
                        </div>
                        <span className="text-xs tabular-nums">{p.score}</span>
                      </div>
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3 text-xs font-medium",
                        p.trend >= 0 ? "text-emerald-600" : "text-rose-600"
                      )}
                    >
                      <span className="inline-flex items-center gap-0.5">
                        {p.trend >= 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(p.trend)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </PageSkeleton>
  );
}
