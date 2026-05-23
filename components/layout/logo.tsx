import { cn } from "@/lib/utils";

export function Logo({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-md shadow-indigo-500/20">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.5" fill="white" />
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">Promptops</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            AI Dashboard
          </span>
        </div>
      )}
    </div>
  );
}
