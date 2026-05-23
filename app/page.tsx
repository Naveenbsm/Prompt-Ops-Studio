"use client";

import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { DonutScore } from "@/components/dashboard/donut-score";
import { ImpactBars } from "@/components/dashboard/impact-bars";
import { ImpactChart } from "@/components/dashboard/impact-chart";
import { DeltaPill } from "@/components/dashboard/delta-pill";
import { Badge } from "@/components/ui/badge";
import { metrics, improvementAreas } from "@/lib/mock-data";

const colors = ["#6366f1", "#8b5cf6", "#d946ef", "#10b981"];

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
              Here's a snapshot of your workflows for the last 30 days.
            </p>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Last updated · 2m ago
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.key}
              label={m.label}
              value={m.value}
              delta={m.delta}
              deltaLabel={m.deltaLabel}
              sparkSeed={m.sparkSeed}
              color={colors[i % colors.length]}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SectionCard
            title="Workflow Health Score"
            description="Composite score across reliability, speed, and adoption."
            action={<DeltaPill value={9} />}
          >
            <DonutScore value={87} label="Excellent" />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="font-semibold text-foreground">99.2%</p>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="font-semibold text-foreground">4.1s</p>
                <p className="text-muted-foreground">Avg run</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="font-semibold text-foreground">82%</p>
                <p className="text-muted-foreground">Adoption</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Automation Impact"
            description="High-impact automations contributing the most ROI."
            action={<DeltaPill value={22} />}
          >
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-semibold tracking-tight">62</p>
              <p className="text-sm text-muted-foreground">High Impact Automations</p>
            </div>
            <div className="mt-3">
              <ImpactChart />
            </div>
          </SectionCard>

          <SectionCard
            title="Top Improvement Areas"
            description="Where AI suggests focusing next."
            action={<Badge variant="default">5 areas</Badge>}
          >
            <ImpactBars items={improvementAreas} />
          </SectionCard>
        </div>
      </div>
    </PageSkeleton>
  );
}
