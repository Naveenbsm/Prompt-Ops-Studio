"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { automationImpactBars, chartPalette } from "@/lib/mock-data";

export function ImpactChart() {
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={automationImpactBars} barCategoryGap={14} margin={{ top: 6, right: 4, bottom: 0, left: -22 }}>
          <defs>
            <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartPalette.indigo} />
              <stop offset="100%" stopColor={chartPalette.indigoDeep} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
          <YAxis axisLine={false} tickLine={false} fontSize={11} />
          <Tooltip cursor={{ fill: "rgba(99,91,255,0.08)" }} />
          <Bar dataKey="high" stackId="a" fill="url(#impactGrad)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="med" stackId="a" fill="#A5A0FF" />
          <Bar dataKey="low" stackId="a" fill="#D9D6FF" radius={[0, 0, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
