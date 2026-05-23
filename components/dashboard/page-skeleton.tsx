"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton({ children, delay = 400 }: { children: React.ReactNode; delay?: number }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (ready) return <>{children}</>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-72 lg:col-span-1" />
        <Skeleton className="h-72 lg:col-span-1" />
        <Skeleton className="h-72 lg:col-span-1" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
