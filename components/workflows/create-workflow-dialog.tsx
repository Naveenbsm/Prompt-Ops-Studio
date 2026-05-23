"use client";

import * as React from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { departments } from "@/lib/mock-data";

const steps = ["Details", "Trigger", "Review"] as const;

export function CreateWorkflowDialog() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [dept, setDept] = React.useState(departments[0]);
  const [trigger, setTrigger] = React.useState("schedule");

  const reset = () => {
    setStep(0);
    setName("");
    setDept(departments[0]);
    setTrigger("schedule");
  };

  const submit = () => {
    setOpen(false);
    toast.success(`Workflow "${name || "Untitled"}" created`, {
      description: "It is now in draft. You can publish it from the workflow detail panel.",
    });
    setTimeout(reset, 250);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(reset, 250);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> Create Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New workflow</DialogTitle>
          <DialogDescription>
            Build a workflow in a few steps. You can edit any of this later.
          </DialogDescription>
        </DialogHeader>

        <ol className="flex items-center justify-between">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium",
                  i < step
                    ? "bg-primary text-primary-foreground border-primary"
                    : i === step
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  i === step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s}
              </span>
              {i < steps.length - 1 && <span className="mx-3 h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="wf-name">Workflow name</Label>
              <Input
                id="wf-name"
                placeholder="e.g. Customer Refund Automation"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            <Label>Trigger type</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { id: "schedule", label: "Schedule", desc: "Cron-based" },
                { id: "webhook", label: "Webhook", desc: "On HTTP event" },
                { id: "event", label: "App event", desc: "From integrations" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTrigger(opt.id)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-colors",
                    trigger === opt.id
                      ? "border-primary bg-accent"
                      : "border-border hover:bg-secondary"
                  )}
                >
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{name || "Untitled workflow"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department</span>
              <span className="font-medium">{dept}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trigger</span>
              <span className="font-medium capitalize">{trigger}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit}>Create workflow</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
