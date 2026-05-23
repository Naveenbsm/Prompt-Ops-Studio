import { Badge } from "@/components/ui/badge";
import { type WorkflowStatus } from "@/lib/mock-data";

export function StatusBadge({ status }: { status: WorkflowStatus }) {
  if (status === "Active")
    return (
      <Badge variant="success" className="gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
      </Badge>
    );
  if (status === "Paused")
    return (
      <Badge variant="warning" className="gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Paused
      </Badge>
    );
  return (
    <Badge variant="neutral" className="gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /> Draft
    </Badge>
  );
}
