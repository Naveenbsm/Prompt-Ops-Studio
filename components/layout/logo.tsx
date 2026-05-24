import { cn } from "@/lib/utils";

export function Logo({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A2540] shadow-[0_4px_12px_-3px_rgba(10,37,64,0.35)]">
        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-card" />
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 6h6.5a4.5 4.5 0 010 9H9v3"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Prompt<span
              className="bg-gradient-to-r from-[#635BFF] via-[#4F46E5] to-[#0A2540] bg-clip-text text-transparent"
            >Ops</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            AI · Workflow DNA
          </span>
        </div>
      )}
    </div>
  );
}
