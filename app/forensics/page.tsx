"use client";

import * as React from "react";
import { toast } from "sonner";
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
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { SectionCard } from "@/components/dashboard/section-card";
import {
  forensicEvents as initialForensics,
  forensicTrend30d,
  forensicByType,
  forensicByModel,
  chartPalette,
  type ForensicEvent,
  type ForensicSeverity,
  type ForensicType,
} from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";
import { cn, relativeTime } from "@/lib/utils";

const severityVariant: Record<
  ForensicSeverity,
  "default" | "success" | "warning" | "danger" | "neutral"
> = {
  Critical: "danger",
  High: "danger",
  Medium: "warning",
  Low: "neutral",
};

const types: ("All" | ForensicType)[] = [
  "All",
  "Hallucination",
  "Context Drift",
  "Logic Error",
  "Tone Mismatch",
  "Compliance Risk",
];

export default function ForensicsPage() {
  const [events, setEvents] = useLocalStorage<ForensicEvent[]>(
    storageKeys.forensics,
    initialForensics
  );
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState<"All" | ForensicType>("All");
  const [status, setStatus] = React.useState<"All" | "Open" | "Resolved">("All");

  const filtered = events.filter((e) => {
    const q = query.toLowerCase().trim();
    if (q && !e.workflow.toLowerCase().includes(q) && !e.summary.toLowerCase().includes(q))
      return false;
    if (type !== "All" && e.type !== type) return false;
    if (status === "Open" && e.resolved) return false;
    if (status === "Resolved" && !e.resolved) return false;
    return true;
  });

  const counts = {
    open: events.filter((e) => !e.resolved).length,
    critical: events.filter((e) => !e.resolved && e.severity === "Critical").length,
    high: events.filter((e) => !e.resolved && e.severity === "High").length,
    resolved: events.filter((e) => e.resolved).length,
  };

  const toggleResolved = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const next = !e.resolved;
        toast.success(next ? "Event marked resolved" : "Event reopened", {
          description: e.workflow,
        });
        return { ...e, resolved: next };
      })
    );
  };

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Prompt Failure Forensics Engine
            </h2>
            <p className="text-sm text-muted-foreground">
              Auto-diagnose hallucinations, context drift, and logic errors before outputs reach clients.
            </p>
          </div>
          <Badge variant="success" className="self-start gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> 82% detection accuracy
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            label="Open events"
            value={counts.open}
            icon={ShieldAlert}
            tone="warn"
          />
          <StatTile
            label="Critical"
            value={counts.critical}
            icon={AlertTriangle}
            tone="danger"
          />
          <StatTile label="High" value={counts.high} icon={AlertTriangle} tone="warn" />
          <StatTile
            label="Resolved"
            value={counts.resolved}
            icon={CheckCircle2}
            tone="good"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard
            title="Hallucinations caught — 30 days"
            description="PFFE vs an unguarded LLM (baseline)."
            className="lg:col-span-2"
            action={<Badge variant="success">-18% per pilot data</Badge>}
          >
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forensicTrend30d} margin={{ top: 6, right: 8, bottom: 0, left: -22 }}>
                  <defs>
                    <linearGradient id="fcaught" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartPalette.coral} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={chartPalette.coral} stopOpacity={0} />
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
                    dataKey="caught"
                    stroke={chartPalette.coral}
                    strokeWidth={2.5}
                    fill="url(#fcaught)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard
            title="Events by type"
            description="Last 30 days of PFFE detections."
          >
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={forensicByType}
                    dataKey="count"
                    nameKey="type"
                    innerRadius={42}
                    outerRadius={72}
                    paddingAngle={2}
                    isAnimationActive={false}
                  >
                    {forensicByType.map((e) => (
                      <Cell key={e.type} fill={e.color} />
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
          title="Events by foundation model"
          description="PromptOps is model-agnostic — these are normalised counts across active LLMs."
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={forensicByModel}
                margin={{ top: 6, right: 8, bottom: 0, left: -22 }}
                barCategoryGap={28}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="model" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="high" stackId="a" fill={chartPalette.coral} name="High" radius={[0, 0, 0, 0]} />
                <Bar dataKey="med" stackId="a" fill={chartPalette.amber} name="Medium" />
                <Bar dataKey="low" stackId="a" fill={chartPalette.slate} name="Low" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search workflow or summary..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={type} onValueChange={(v) => setType(v as any)}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ul className="divide-y divide-border">
            {filtered.map((e) => (
              <li key={e.id} className="flex items-start gap-3 p-4 hover:bg-secondary/30">
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    e.severity === "Critical" || e.severity === "High"
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                      : e.severity === "Medium"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold leading-tight">{e.workflow}</p>
                    <Badge variant={severityVariant[e.severity]}>{e.severity}</Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {e.type}
                    </Badge>
                    <Badge variant="neutral" className="text-[10px]">
                      {e.model}
                    </Badge>
                    {e.resolved && (
                      <Badge variant="success" className="gap-1 text-[10px]">
                        <CheckCircle2 className="h-3 w-3" /> Resolved
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{e.summary}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {relativeTime(e.detectedAt)}
                  </p>
                </div>
                <Button
                  variant={e.resolved ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleResolved(e.id)}
                >
                  {e.resolved ? "Reopen" : "Mark resolved"}
                </Button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-8 text-center text-sm text-muted-foreground">
                No PFFE events match these filters.
              </li>
            )}
          </ul>
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
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone: "good" | "warn" | "danger" | "neutral";
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            tone === "good"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
              : tone === "warn"
              ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
              : tone === "danger"
              ? "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
              : "bg-secondary text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}
