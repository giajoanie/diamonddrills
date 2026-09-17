"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export function ScoreTrendChart({
  data,
}: {
  data: { label: string; percentage: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 4 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis
          dataKey="label"
          tick={{ fill: "var(--color-fg-subtle)", fontSize: 11 }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "var(--color-fg-subtle)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={32}
          unit="%"
        />
        <Tooltip
          contentStyle={{
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: 6,
            fontSize: 12,
            color: "var(--color-fg)",
          }}
          formatter={(value) => [`${Math.round(Number(value))}%`, "Score"]}
        />
        <Line
          type="monotone"
          dataKey="percentage"
          stroke="var(--color-accent)"
          strokeWidth={2}
          dot={{ r: 4, fill: "var(--color-accent)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
