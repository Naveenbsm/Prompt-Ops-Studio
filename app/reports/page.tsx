"use client";

import * as React from "react";
import { toast } from "sonner";
import { Download, FileText, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageSkeleton } from "@/components/dashboard/page-skeleton";
import { reports as initialReports, type ReportItem } from "@/lib/mock-data";
import { useLocalStorage, storageKeys } from "@/lib/use-local-storage";
import { formatDate } from "@/lib/utils";

const typeVariant: Record<string, "default" | "success" | "warning" | "neutral"> = {
  Financial: "default",
  Performance: "success",
  Compliance: "warning",
  Forensics: "neutral",
  "DNA Library": "default",
};

export default function ReportsPage() {
  const [reports, setReports] = useLocalStorage<ReportItem[]>(
    storageKeys.reports,
    initialReports
  );

  const addReport = (r: ReportItem) => setReports((prev) => [r, ...prev]);
  const removeReport = (id: string) =>
    setReports((prev) => {
      const removed = prev.find((r) => r.id === id);
      if (removed) toast.success(`Deleted "${removed.title}"`);
      return prev.filter((r) => r.id !== id);
    });

  return (
    <PageSkeleton>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Reports</h2>
            <p className="text-sm text-muted-foreground">
              Saved reports and exports across the workspace.
            </p>
          </div>
          <GenerateReportDialog onCreate={addReport} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reports.map((r) => (
            <Card
              key={r.id}
              className="p-5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(10,37,64,0.12)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-border">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">By {r.author}</p>
                </div>
                <Badge variant={typeVariant[r.type] ?? "default"}>{r.type}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Generated {formatDate(r.generated)}</span>
                <span>{r.size}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-rose-600"
                  onClick={() => removeReport(r.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    toast.success("Report downloaded", {
                      description: r.title,
                    })
                  }
                >
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageSkeleton>
  );
}

function GenerateReportDialog({ onCreate }: { onCreate: (r: ReportItem) => void }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState<ReportItem["type"]>("Performance");
  const [range, setRange] = React.useState("30");
  const [format, setFormat] = React.useState("pdf");

  const reset = () => {
    setName("");
    setType("Performance");
    setRange("30");
    setFormat("pdf");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a new report</DialogTitle>
          <DialogDescription>
            Choose the report type, date range, and output format.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="r-name">Report name</Label>
            <Input
              id="r-name"
              placeholder="Q2 Workflow Performance"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as ReportItem["type"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Forensics">Forensics (PFFE)</SelectItem>
                  <SelectItem value="Compliance">Compliance (ICO/GDPR)</SelectItem>
                  <SelectItem value="DNA Library">DNA Library</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Date range</Label>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
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
              const title = name.trim() || "Untitled report";
              const sizeMb = (0.5 + Math.random() * 4).toFixed(1);
              const r: ReportItem = {
                id: `r-${Date.now().toString(36)}`,
                title,
                type,
                generated: new Date().toISOString(),
                size: `${sizeMb} MB`,
                author: "Alex Rivera",
              };
              onCreate(r);
              setOpen(false);
              toast.success("Report generated", { description: title });
              setTimeout(reset, 250);
            }}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
