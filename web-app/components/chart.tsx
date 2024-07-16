"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  home: {
    label: "/",
    color: "#2563eb",
  },
  listen: {
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
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {/* <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} /> */}
        {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
        <Bar dataKey="home" fill="var(--color-home)" radius={4} />
        <Bar dataKey="listen" fill="var(--color-listen)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
