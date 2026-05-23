"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DonutScoreProps {
  value: number;
  label?: string;
}

export function DonutScore({ value, label = "Excellent" }: DonutScoreProps) {
  const data = [
    { name: "score", value },
    { name: "rest", value: 100 - value },
  ];

  return (
    <div className="relative mx-auto h-44 w-44">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            innerRadius={64}
            outerRadius={82}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="url(#donutGrad)" />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight">{value}%</span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {label}
        </span>
      </div>
    </div>
  );
}
