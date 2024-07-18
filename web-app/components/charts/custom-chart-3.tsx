"use client";

import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

import { ChevronDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  home: {
    label: "aftercinema.fr/",
    color: "#FFB7B8",
  },
  listen: {
    label: "aftercinema.fr/listen",
    color: "#EE2101",
  },
} satisfies ChartConfig;

export default function CustomChart3({ data }: { data: any }) {
  // const [episodesSelected, setDeviceSelected] = useState(["all"]);
  const [position, setPosition] = useState("bottom");

  const options: string[] = ["Option 1", "Option 2", "Option 3"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectAll = (bool: boolean) => {
    if (bool) {
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const isAllSelected = options.length === selectedOptions.length;

  // const test = (key: any) => {
  //   return data[deviceSelected].map((item: any) => ({
  //     month: item.month,
  //     value: item[key],
  //   }));
  // };

  return (
    <div>
      <div className="flex items-center flex-col sm:flex-row">
        <div className="sm:mr-20">
          <p className="text-lg font-bold">Nombre de téléchargements</p>
          <p className="text-sm">
            Evolution journalière du nombre de téléchargements (le nombre
            d'écoutes) du podcast selon l'épisode.
          </p>
        </div>

        <div className="mt-3 mb-3 sm:m-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between w-[160px]"
              >
                Episodes
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="all" onCheckedChange={handleSelectAll} />
          <label
            htmlFor="all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Tout selectionner
          </label>
        </div>
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={selectedOptions.includes(option)}
              onCheckedChange={(checked) => {
                handleCheckboxChange(option);
                console.log(checked + option);
              }}
            />
            <label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
        <div className="mt-4">
          <strong>Selected Options:</strong> {selectedOptions.join(", ")}
        </div>
      </div>

      {/* <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
        <BarChart accessibilityLayer data={}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent className="w-[150px]" nameKey="views" />
            }
          />
          <Bar dataKey="value" fill="var(--color-home)" radius={4} />
        </BarChart>
      </ChartContainer> */}
    </div>
  );
}
