"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Scale,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { SectionCard } from "@/components/dashboard/section-card";
import {
  complianceChecks,
  complianceTrend,
  chartPalette,
  type ComplianceCheck,
} from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";

const frameworks: ComplianceCheck["framework"][] = [
  "DSIT AI Principles",
  "UK GDPR",
  "ICO",
  "Cyber Essentials",
];

const statusVariant: Record<
  ComplianceCheck["status"],
  "success" | "warning" | "danger"
> = {
  Pass: "success",
  Review: "warning",
  Fail: "danger",
};

const statusIcon = {
  Pass: CheckCircle2,
  Review: AlertCircle,
  Fail: XCircle,
};

export default function CompliancePage() {
  const totalCoverage =
    Math.round(
      complianceChecks.reduce((s, c) => s + c.coverage, 0) / complianceChecks.length
    );
  const passing = complianceChecks.filter((c) => c.status === "Pass").length;
  const review = complianceChecks.filter((c) => c.status === "Review").length;
  const failing = complianceChecks.filter((c) => c.status === "Fail").length;

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">UK Compliance & Governance</h2>
            <p className="text-sm text-muted-foreground">
              Audit-ready forensic reporting aligned with UK Principles-Based AI Framework, ICO and UK GDPR.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> 95% coverage
            </Badge>
            <Button>
              <FileCheck className="h-4 w-4" /> Export audit pack
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <CoverageTile label="Overall coverage" value={`${totalCoverage}%`} icon={Scale} tone="indigo" />
          <CoverageTile label="Principles passing" value={`${passing} / ${complianceChecks.length}`} icon={CheckCircle2} tone="emerald" />
          <CoverageTile label="In review" value={`${review}`} icon={AlertCircle} tone="amber" />
          <CoverageTile label="Failing" value={`${failing}`} icon={XCircle} tone="rose" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard
            title="UK compliance coverage trend"
            description="Composite across DSIT AI Principles, UK GDPR, ICO and Cyber Essentials."
            className="lg:col-span-2"
            action={<Badge variant="success">+17 pts since Dec</Badge>}
          >
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceTrend} margin={{ top: 8, right: 16, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} domain={[60, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="coverage"
                    stroke={chartPalette.indigo}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard
            title="Frameworks active"
            description="UK-specific certifications and standards covered."
          >
            <ul className="space-y-3">
              {[
                { name: "DSIT AI Principles", note: "5 of 5 principles embedded", tone: "good" },
                { name: "UK GDPR", note: "DPIA, SAR, erasure workflows", tone: "good" },
                { name: "ICO", note: "Audit-ready forensic logs", tone: "good" },
                { name: "Cyber Essentials", note: "Annual cert through Apr 2027", tone: "good" },
              ].map((f) => (
                <li
                  key={f.name}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.note}</p>
                  </div>
                  <Badge variant="success" className="gap-1 text-[10px]">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </Badge>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {frameworks.map((framework) => {
          const items = complianceChecks.filter((c) => c.framework === framework);
          if (items.length === 0) return null;
          return (
            <SectionCard
              key={framework}
              title={framework}
              description={
                framework === "DSIT AI Principles"
                  ? "UK Department for Science, Innovation and Technology — 5 core AI principles."
                  : framework === "UK GDPR"
                  ? "Data protection obligations for UK-based controllers and processors."
                  : framework === "ICO"
                  ? "Information Commissioner's Office data subject rights and reporting."
                  : "UK government-backed cyber hygiene baseline."
              }
              action={
                <Button variant="ghost" size="sm" onClick={() => toast.success(`${framework} evidence pack queued`)}>
                  <Download className="h-3.5 w-3.5" /> Evidence pack
                </Button>
              }
            >
              <ul className="divide-y divide-border rounded-xl border border-border">
                {items.map((c) => {
                  const Icon = statusIcon[c.status];
                  return (
                    <li key={c.id} className="flex items-start gap-3 p-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          c.status === "Pass"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : c.status === "Review"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold leading-tight">{c.principle}</p>
                          <Badge variant={statusVariant[c.status]} className="text-[10px]">
                            {c.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{c.notes}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          Last audit · {formatDate(c.lastAudit)}
                        </p>
                      </div>
                      <div className="hidden w-32 shrink-0 sm:block">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-muted-foreground">Coverage</span>
                          <span className="text-[11px] font-medium tabular-nums">{c.coverage}%</span>
                        </div>
                        <Progress value={c.coverage} className="mt-1 h-1.5" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          );
        })}
      </div>
    </PageSkeleton>
  );
}

function CoverageTile({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "indigo" | "emerald" | "amber" | "rose";
}) {
  const toneClasses = {
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
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
