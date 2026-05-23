"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { automationImpactBars } from "@/lib/mock-data";

export function ImpactChart() {
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={automationImpactBars} barCategoryGap={14} margin={{ top: 6, right: 4, bottom: 0, left: -22 }}>
          <defs>
            <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
          <YAxis axisLine={false} tickLine={false} fontSize={11} />
          <Tooltip cursor={{ fill: "rgba(99,102,241,0.08)" }} />
          <Bar dataKey="high" stackId="a" fill="url(#impactGrad)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="med" stackId="a" fill="#a78bfa" />
          <Bar dataKey="low" stackId="a" fill="#c4b5fd" radius={[0, 0, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
