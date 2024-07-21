"use client";

import { LabelList, Pie, PieChart } from "recharts";

import { Headphones } from "lucide-react";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Nb de téléchargements",
  },
  apple_podcasts: {
    label: "Apple Podcasts",
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
  others: {
    label: "Autres",
    color: "#ee2101",
  },
} satisfies ChartConfig;

const addFillProperty = (data: any) => {
  data.forEach((item: any) => {
    item.fill = "var(--color-" + item.platform + ")";
  });
  data.sort((a: any, b: any) => a.platform.localeCompare(b.platform));
  return data;
};

export default function AcastYouTubePlatformsChart({ data }: { data: any }) {
  return (
    <div>
      <div className="sm:mr-20 mb-3">
        <p className="text-lg font-bold">
          Plateformes d'écoute
          <Headphones width={20} height={20} className="ml-1 inline mb-[2px]" />
        </p>
        <p className="text-sm">
          Nombre de téléchargements (le nombre d'écoutes) total selon la
          plateforme.
        </p>
      </div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[250px] [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <Pie
            data={addFillProperty(data)}
            label
            dataKey="value"
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
