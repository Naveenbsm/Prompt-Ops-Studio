import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "./sparkline";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  sparkSeed: number;
  color?: string;
}

export function MetricCard({ label, value, delta, deltaLabel, sparkSeed, color = "#6366f1" }: MetricCardProps) {
  const positive = delta >= 0;
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              positive
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{deltaLabel}</p>
        <div className="-mx-1 mt-3">
          <Sparkline seed={sparkSeed} color={color} />
        </div>
      </CardContent>
    </Card>
  );
}
