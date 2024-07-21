import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Nb auditeurs",
    color: "#FFB7B8",
  },
} satisfies ChartConfig;

export default function AcastListenersChart({
  formattedChartData,
  chartType,
}: {
  formattedChartData: any;
  chartType: any;
}) {
  const labelFormatter = (value: any) => {
    const date = new Date(value);
    if (chartType === "month") {
      return date.toLocaleDateString("fr-FR", {
        month: "short",
        year: "numeric",
      });
    } else if (chartType === "week") {
      return (
        "sem. du " +
        date.toLocaleDateString("fr-FR", {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
        })
      );
    }
    return date.toLocaleDateString("fr-FR", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  const tickFormatter = (value: any) => {
    const date = new Date(value);
    if (chartType === "month") {
      return date.toLocaleDateString("fr-FR", {
        month: "short",
        year: "numeric",
      });
    } else if (chartType === "week") {
      return (
        "sem. du " +
        date.toLocaleDateString("fr-FR", {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
        })
      );
    }
    return date.toLocaleDateString("fr-FR", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      <BarChart
        accessibilityLayer
        data={formattedChartData}
        margin={formattedChartData.length < 10 ? { top: 25 } : undefined}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={tickFormatter}
        />
        {formattedChartData.length < 10 ? null : (
          <>
            <YAxis
              dataKey="value"
              domain={[0, 1]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={30}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  nameKey="value"
                  labelFormatter={labelFormatter}
                />
              }
            />
          </>
        )}
        <Bar
          dataKey="value"
          fill="hsl(var(--h2color))"
          radius={4}
          barSize={formattedChartData.length < 4 ? 80 : undefined}
        >
          {formattedChartData.length < 10 ? (
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          ) : null}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
