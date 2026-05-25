"use client";

import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { DonutScore } from "@/components/dashboard/donut-score";
import { ImpactBars } from "@/components/dashboard/impact-bars";
import { ImpactChart } from "@/components/dashboard/impact-chart";
import { DeltaPill } from "@/components/dashboard/delta-pill";
import { Badge } from "@/components/ui/badge";
import { metrics, improvementAreas, pilotBenchmarks } from "@/lib/mock-data";

export default function OverviewPage() {
  return (
    <PageSkeleton>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Good morning, Alex <span className="ml-1">👋</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your Workflow DNA library and PFFE forensics from the last 30 days.
            </p>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Last sync · 2m ago
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard
              key={m.key}
              label={m.label}
              value={m.value}
              delta={m.delta}
              deltaLabel={m.deltaLabel}
              sparkSeed={m.sparkSeed}
              color={m.accent}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard
            title="Workflow Logic Score"
            description="Composite quality across reliability, fidelity, and adoption."
            action={<DeltaPill value={9} />}
          >
            <DonutScore value={87} label="Excellent" />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="font-semibold text-foreground">82%</p>
                <p className="text-muted-foreground">PFFE acc.</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="font-semibold text-foreground">89%</p>
                <p className="text-muted-foreground">Clone rate</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="font-semibold text-foreground">95%</p>
                <p className="text-muted-foreground">UK comp.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Logic Cloning Impact"
            description="DNA patterns reused across the team this quarter."
            action={<DeltaPill value={22} />}
          >
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-semibold tracking-tight">76</p>
              <p className="text-sm text-muted-foreground">High-impact DNA clones</p>
            </div>
            <div className="mt-3">
              <ImpactChart />
            </div>
          </SectionCard>

          <SectionCard
            title="Where DNA Helps Most"
            description="Workflows PromptOps recommends cloning next."
            action={<Badge variant="default">5 areas</Badge>}
          >
            <ImpactBars items={improvementAreas} />
          </SectionCard>
        </div>

        <SectionCard
          title="8-week UK pilot benchmarks"
          description="Validated across IT Services, Consulting, SaaS and Research & Development firms."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pilotBenchmarks.map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="text-xs text-muted-foreground">{b.label}</p>
                <p className="mt-1 text-xl font-semibold tracking-tight">{b.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageSkeleton>
  );
}
