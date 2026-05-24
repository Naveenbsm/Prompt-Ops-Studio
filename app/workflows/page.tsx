"use client";

import * as React from "react";
import { toast } from "sonner";
import { Search, MoreHorizontal, Play, Pause, Trash2, Edit3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusBadge } from "@/components/workflows/status-badge";
import { CreateWorkflowDialog } from "@/components/workflows/create-workflow-dialog";
import { WorkflowDetailSheet } from "@/components/workflows/workflow-detail-sheet";
import {
  departments,
  workflows as initialWorkflows,
  type Workflow,
  type WorkflowStatus,
} from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";
import { relativeTime } from "@/lib/utils";

const statuses: ("All" | WorkflowStatus)[] = ["All", "Active", "Paused", "Draft"];

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useLocalStorage<Workflow[]>(
    storageKeys.workflows,
    initialWorkflows
  );
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | WorkflowStatus>("All");
  const [dept, setDept] = React.useState<string>("All");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const selected = selectedId
    ? workflows.find((w) => w.id === selectedId) ?? null
    : null;

  const filtered = workflows.filter((w) => {
    const q = query.toLowerCase().trim();
    if (q && !w.name.toLowerCase().includes(q) && !w.owner.toLowerCase().includes(q)) return false;
    if (status !== "All" && w.status !== status) return false;
    if (dept !== "All" && w.department !== dept) return false;
    return true;
  });

  const addWorkflow = (wf: Workflow) => {
    setWorkflows((prev) => [wf, ...prev]);
  };

  const toggleStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const next: WorkflowStatus = w.status === "Active" ? "Paused" : "Active";
        toast.success(
          next === "Active" ? `${w.name} resumed` : `${w.name} paused`
        );
        return { ...w, status: next };
      })
    );
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => {
      const removed = prev.find((w) => w.id === id);
      if (removed) toast.success(`Deleted "${removed.name}"`);
      return prev.filter((w) => w.id !== id);
    });
    if (selectedId === id) {
      setOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Workflows</h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} of {workflows.length} workflows
            </p>
          </div>
          <CreateWorkflowDialog onCreate={addWorkflow} />
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or owner..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All departments</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No workflows match those filters"
                description="Try clearing the search or switching to a different department."
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setStatus("All");
                      setDept("All");
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead className="w-12 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((w) => (
                  <TableRow
                    key={w.id}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedId(w.id);
                      setOpen(true);
                    }}
                  >
                    <TableCell>
                      <div className="font-medium">{w.name}</div>
                      <div className="text-xs text-muted-foreground">{w.owner}</div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{w.department}</TableCell>
                    <TableCell>
                      <StatusBadge status={w.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full gradient-bar"
                            style={{ width: `${w.efficiency}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {w.efficiency}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {relativeTime(w.lastRun)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedId(w.id);
                              setOpen(true);
                            }}
                          >
                            <Edit3 className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          {w.status === "Paused" ? (
                            <DropdownMenuItem onClick={() => toggleStatus(w.id)}>
                              <Play className="h-4 w-4" /> Resume
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => toggleStatus(w.id)}>
                              <Pause className="h-4 w-4" /> Pause
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-rose-600 focus:text-rose-600"
                            onClick={() => deleteWorkflow(w.id)}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
      <WorkflowDetailSheet
        workflow={selected}
        open={open}
        onOpenChange={setOpen}
        onToggleStatus={toggleStatus}
      />
    </PageSkeleton>
  );
}
