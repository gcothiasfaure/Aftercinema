"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "/",
    color: "#2563eb",
  },
  mobile: {
    label: "/listen",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function CustomChart({ data }: { data: any }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[800px] w-full border"
    >
      <BarChart accessibilityLayer data={data}>
        <Bar dataKey="/" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="/listen" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
