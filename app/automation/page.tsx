"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Bell,
  FileText,
  MessageSquare,
  Bug,
  Calendar,
  DollarSign,
  GitPullRequest,
  Star,
  CheckCircle,
  Mail,
  AlertTriangle,
  FileSignature,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusBadge } from "@/components/workflows/status-badge";
import { automations as initialAutomations, type Automation, type WorkflowStatus } from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Bell,
  FileText,
  MessageSquare,
  Bug,
  Calendar,
  DollarSign,
  GitPullRequest,
  Star,
  CheckCircle,
  Mail,
  AlertTriangle,
  FileSignature,
};

const filters: ("All" | WorkflowStatus)[] = ["All", "Active", "Paused", "Draft"];

export default function AutomationPage() {
  const [filter, setFilter] = React.useState<"All" | WorkflowStatus>("All");
  const [items, setItems] = useLocalStorage<Automation[]>(
    storageKeys.automations,
    initialAutomations
  );

  const visible = items.filter((a) => filter === "All" || a.status === filter);

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              enabled: !a.enabled,
              status: !a.enabled ? "Active" : "Paused",
            }
          : a
      )
    );

  const remove = (id: string) =>
    setItems((prev) => {
      const removed = prev.find((a) => a.id === id);
      if (removed) toast.success(`Deleted "${removed.name}"`);
      return prev.filter((a) => a.id !== id);
    });

  const add = (automation: Automation) =>
    setItems((prev) => [automation, ...prev]);

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Logic Triggers</h2>
            <p className="text-sm text-muted-foreground">
              Event-driven rules that fire your captured Workflow DNA across HubSpot, Slack, MS365 and more.
            </p>
          </div>
          <NewAutomationDialog onCreate={add} />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title="No Logic Triggers in this filter"
            description="Switch to another tab or create your first Logic Trigger."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((a) => {
              const Icon = iconMap[a.icon] ?? Bell;
              return (
                <Card key={a.id} className="p-5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(10,37,64,0.12)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-border">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Switch checked={a.enabled} onCheckedChange={() => toggle(a.id)} />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-rose-600"
                        onClick={() => remove(a.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 rounded-lg border border-border bg-secondary/40 p-3 text-xs">
                    <div className="flex gap-1">
                      <span className="font-medium text-muted-foreground w-14">When</span>
                      <span className="text-foreground">{a.trigger}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-medium text-muted-foreground w-14">Then</span>
                      <span className="text-foreground">{a.action}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {a.runs.toLocaleString()} runs
                    </span>
                    <StatusBadge status={a.status} />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PageSkeleton>
  );
}

function NewAutomationDialog({ onCreate }: { onCreate: (a: Automation) => void }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [trigger, setTrigger] = React.useState("schedule");
  const [action, setAction] = React.useState("slack");
  const [category, setCategory] = React.useState("Productivity");

  const triggerLabel: Record<string, string> = {
    schedule: "On schedule",
    webhook: "Webhook received",
    email: "New email matches",
    event: "App event",
  };
  const actionLabel: Record<string, string> = {
    slack: "Send Slack message",
    email: "Send email",
    "create-row": "Create row in Sheets",
    webhook: "Call webhook",
  };

  const reset = () => {
    setName("");
    setTrigger("schedule");
    setAction("slack");
    setCategory("Productivity");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> New Logic Trigger
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Logic Trigger</DialogTitle>
          <DialogDescription>
            Pick an event and PromptOps will suggest a DNA pattern to fire.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="aut-name">Trigger name</Label>
            <Input
              id="aut-name"
              placeholder="e.g. Fire DPIA DNA on new vendor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Practice</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consulting">Consulting</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="IT Services">IT Services</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Customer Success">Customer Success</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Trigger</Label>
            <Select value={trigger} onValueChange={setTrigger}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schedule">On schedule</SelectItem>
                <SelectItem value="webhook">Webhook received</SelectItem>
                <SelectItem value="email">New email matches</SelectItem>
                <SelectItem value="event">App event</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Action</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slack">Send Slack message</SelectItem>
                <SelectItem value="email">Send email</SelectItem>
                <SelectItem value="create-row">Create row in Sheets</SelectItem>
                <SelectItem value="webhook">Call webhook</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const finalName = name.trim() || "Untitled Logic Trigger";
              const a: Automation = {
                id: `auto-${Date.now().toString(36)}`,
                name: finalName,
                icon: "Bell",
                trigger: triggerLabel[trigger],
                action: actionLabel[action],
                runs: 0,
                status: "Draft",
                category,
                enabled: false,
              };
              onCreate(a);
              setOpen(false);
              toast.success(`Logic Trigger "${finalName}" created`);
              setTimeout(reset, 250);
            }}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
