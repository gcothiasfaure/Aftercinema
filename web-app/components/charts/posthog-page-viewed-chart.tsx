"use client";

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

import { Globe } from "lucide-react";

import { useState } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  home: {
    label: "aftercinema.fr/",
    color: "#FFB7B8",
  },
  listen: {
    label: "aftercinema.fr/listen",
    color: "#EE2101",
  },
  stats: {
    label: "aftercinema.fr/stats",
    color: "#ff746a",
  },
} satisfies ChartConfig;

export default function PostHogPageViewedChart({ data }: { data: any }) {
  const [deviceSelected, setDeviceSelected] = useState("Tout appareil");
  return (
    <div>
      <div className="flex items-center flex-col sm:flex-row mb-3">
        <div className="sm:mr-20">
          <p className="text-lg font-bold">
            Evolution des visites
            <Globe width={20} height={20} className="ml-1 inline mb-[2px]" />
          </p>

          <p className="text-sm">
            Evolution mensuelle du nombre de visites d'
            <span className="underline underline-offset-1">
              aftercinema.fr
            </span>{" "}
            selon la page et selon l'appareil.
          </p>
        </div>
        <div className="mt-3 mb-3 sm:m-0">
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
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={data[deviceSelected]}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="home" fill="var(--color-home)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
          <Bar dataKey="listen" fill="var(--color-listen)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
          <Bar dataKey="stats" fill="var(--color-stats)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
