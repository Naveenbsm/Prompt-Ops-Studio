"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { recentRuns, runEfficiency, chartPalette, type Workflow } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";
import { CheckCircle2, XCircle, Play, Pause } from "lucide-react";

interface Props {
  workflow: Workflow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleStatus?: (id: string) => void;
}

export function WorkflowDetailSheet({ workflow, open, onOpenChange, onToggleStatus }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        {workflow && (
          <>
            <SheetHeader>
              <div className="flex items-start justify-between gap-3 pr-8">
                <div>
                  <SheetTitle>{workflow.name}</SheetTitle>
                  <SheetDescription className="mt-1">{workflow.description}</SheetDescription>
                </div>
                <StatusBadge status={workflow.status} />
              </div>
            </SheetHeader>

            <div className="space-y-6 p-6 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="mt-0.5 text-sm font-medium">{workflow.department}</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="mt-0.5 text-sm font-medium">{workflow.owner}</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                  <p className="mt-0.5 text-sm font-medium">{workflow.efficiency}%</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Total runs</p>
                  <p className="mt-0.5 text-sm font-medium">{workflow.runs.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Efficiency · last 14 days</h4>
                  <Badge variant="default">+4.2%</Badge>
                </div>
                <div className="h-44 rounded-xl border border-border bg-card p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={runEfficiency(workflow.runs % 10)}>
                      <defs>
                        <linearGradient id={`wf-${workflow.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={chartPalette.indigo} stopOpacity={0.45} />
                          <stop offset="100%" stopColor={chartPalette.indigo} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" hide />
                      <YAxis hide domain={[40, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={chartPalette.indigo}
                        strokeWidth={2}
                        fill={`url(#wf-${workflow.id})`}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Recent runs</h4>
                <ul className="divide-y divide-border rounded-xl border border-border">
                  {recentRuns(workflow.id).map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        {r.status === "Success" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{r.output}</p>
                          <p className="text-xs text-muted-foreground">{relativeTime(r.startedAt)}</p>
                        </div>
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">{r.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => onToggleStatus?.(workflow.id)}>
                  {workflow.status === "Paused" ? (
                    <>
                      <Play className="h-4 w-4" /> Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                    </>
                  )}
                </Button>
                <Button variant="outline">Edit workflow</Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
