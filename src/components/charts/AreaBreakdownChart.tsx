"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AreaBreakdownItem } from "@/lib/exam-engine/scoring";

export function AreaBreakdownChart({ data }: { data: AreaBreakdownItem[] }) {
  const rows = data.map((d) => ({ ...d, accuracy: Math.round(d.accuracy) }));
  const height = Math.max(160, rows.length * 36);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 32, bottom: 4, left: 4 }}>
        <CartesianGrid horizontal={false} stroke="var(--color-border)" />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: "var(--color-fg-subtle)", fontSize: 12 }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
          unit="%"
        />
        <YAxis
          type="category"
          dataKey="areaName"
          width={170}
          tick={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "var(--color-surface-hover)" }}
          contentStyle={{
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: 6,
            fontSize: 12,
            color: "var(--color-fg)",
          }}
          formatter={(value, _name, item) => [
            `${value}% (${item.payload.correct}/${item.payload.total})`,
            "Accuracy",
          ]}
        />
        <Bar dataKey="accuracy" fill="var(--color-accent)" radius={[0, 4, 4, 0]} maxBarSize={20}>
          <LabelList
            dataKey="accuracy"
            position="right"
            formatter={(value) => `${value}%`}
            style={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
