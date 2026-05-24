"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { planTiers } from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";

export default function PricingPage() {
  const [activePlanId, setActivePlanId] = useLocalStorage<string>(
    storageKeys.plan,
    "logic-core"
  );

  function handleSelect(planId: string) {
    const plan = planTiers.find((p) => p.id === planId);
    if (!plan) return;
    setActivePlanId(planId);
    toast.success(`Plan updated to ${plan.name}`, {
      description: `£${plan.price}/mo — changes take effect immediately.`,
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/settings"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Settings
          </Link>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            UK Professional Services AI Platform
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your firm. All plans include Workflow DNA capture,
            PFFE hallucination scanning, and UK ICO/GDPR audit readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {planTiers.map((plan) => {
            const isActive = activePlanId === plan.id;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-card p-6 transition-shadow",
                  plan.popular
                    ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.25)] shadow-lg"
                    : "border-border hover:shadow-md",
                  isActive && "ring-2 ring-emerald-500"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-3 py-0.5 text-xs font-semibold shadow-sm">
                      Most popular
                    </Badge>
                  </div>
                )}
                {isActive && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="success" className="px-3 py-0.5 text-xs font-semibold shadow-sm">
                      Active plan
                    </Badge>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-lg font-bold">{plan.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{plan.audience}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-3xl font-extrabold tracking-tight">
                      £{plan.price}
                    </span>
                    <span className="mb-1 text-sm text-muted-foreground">
                      /{plan.cadence === "month-volume" ? "mo (volume)" : "mo"}
                    </span>
                  </div>
                  {plan.cadence === "month-volume" && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Starting price — scales with users
                    </p>
                  )}
                </div>

                <ul className="mb-6 flex-1 space-y-2.5">
                  {plan.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn("w-full", isActive && "opacity-60 cursor-default")}
                  variant={plan.popular ? "default" : "outline"}
                  disabled={isActive}
                  onClick={() => !isActive && handleSelect(plan.id)}
                >
                  {isActive ? "Current plan" : "Select plan"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary/30 p-5 text-center">
          <p className="text-sm text-muted-foreground">
            All prices in GBP, exc. VAT. Annual billing available at 2 months free.
            Need a custom enterprise quote?{" "}
            <button
              className="font-medium text-foreground underline-offset-2 hover:underline"
              onClick={() =>
                toast.info("Sales enquiry noted", {
                  description: "Our team will be in touch within one business day.",
                })
              }
            >
              Contact sales
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
