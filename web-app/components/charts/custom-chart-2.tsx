"use client";

import { LabelList, Pie, PieChart } from "recharts";

import { useState } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  count: {
    label: "Nb clics",
  },
  chrome: {
    label: "Apple Podcast",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "YouTube",
    color: "hsl(var(--chart-2))",
  },
  Deezer: {
    label: "Deezer",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Spotify",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Instagram",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function CustomChart2({ data }: { data: any }) {
  const [deviceSelected, setDeviceSelected] = useState("Tout appareil");

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-20">
          <p className="text-lg font-bold">Nombre de visites</p>
          <p className="text-sm">
            Evolution mensuelle du nombre de visites d'
            <span className="underline underline-offset-1">
              aftercinema.fr
            </span>{" "}
            selon la page et selon l'appareil.
          </p>
        </div>

        <div className="bg-transparent">
          <Select value={deviceSelected} onValueChange={setDeviceSelected}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Selectionnez un appareil"
            >
              <SelectValue placeholder="Tout appareil" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Tout appareil" className="rounded-lg">
                Tout appareil
              </SelectItem>
              <SelectItem value="Desktop" className="rounded-lg">
                Desktop
              </SelectItem>
              <SelectItem value="Mobile" className="rounded-lg">
                Mobile
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="count" hideLabel />}
          />
          <Pie data={data[deviceSelected]} dataKey="count">
            <LabelList
              dataKey="platform"
              className="fill-background"
              stroke="none"
              fontSize={12}
              // formatter={(value: keyof typeof chartConfig) =>
              //   chartConfig[value]?.label
              // }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
