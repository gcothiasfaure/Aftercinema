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
  apple_podcast: {
    label: "Apple Podcast",
    color: "#ffb7b8",
  },
  youtube: {
    label: "YouTube",
    color: "#ff9693",
  },
  deezer: {
    label: "Deezer",
    color: "#ff746a",
  },
  spotify: {
    label: "Spotify",
    color: "#fb4f3e",
  },
  instagram: {
    label: "Instagram",
    color: "#ee2101",
  },
} satisfies ChartConfig;

const addFillProperty = (data: any) => {
  data.forEach((item: any) => {
    item.fill = "var(--color-" + item.platform + ")";
  });
  console.log(data);
  return data;
};

export default function CustomChart2({ data }: { data: any }) {
  const [deviceSelected, setDeviceSelected] = useState("Tout appareil");

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-20">
          <p className="text-lg font-bold">Nombre de clics</p>
          <p className="text-sm">
            Nombre de clics total sur les boutons de plateforme sur{" "}
            <span className="underline underline-offset-1">
              aftercinema.fr/listen
            </span>
            , selon l'appareil.
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
        className="mx-auto aspect-square max-h-[250px] [&_.recharts-pie-label-text]:mb-3 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <Pie
            data={addFillProperty(data[deviceSelected])}
            label
            dataKey="count"
            nameKey="platform"
          >
            <LabelList
              dataKey="platform"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
