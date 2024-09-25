"use client";

import { Headphones, Info } from "lucide-react";

import { useState, useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AcastListenersChart from "@/components/charts/acast-listeners-chart";

export default function AcastListenersChartContainer({ data }: { data: any }) {
  const [selectedEpisode, setSelectedEpisode] = useState("all_episodes");

  const getPublishedDate = (episodeId: string) => {
    const episode = data.episodes.find(
      (ep: any) => ep.aftercinema_id === episodeId
    );
    if (!episode) return null;
    const date = new Date(episode.acast_publishedDate.slice(0, 10));
    return date;
  };

  const getSelectedEpisodeInfos = (episodeId: string) => {
    if (episodeId === "all_episodes") {
      return {
        title: "tous les épisodes",
        publishedDate: null,
      };
    }
    const episode = data.episodes.find(
      (ep: any) => ep.aftercinema_id === episodeId
    );
    return {
      title: episode.title,
      publishedDate: getPublishedDate(episodeId),
    };
  };

  const aggregateDataByMonth = (data: any) => {
    const result = data.reduce((acc: any, item: any) => {
      const month = item.date.slice(0, 7);
      if (!acc[month]) {
        acc[month] = { date: month };
        for (const key in item) {
          if (key !== "date") {
            acc[month][key] = 0;
          }
        }
      }
      for (const key in item) {
        if (key !== "date") {
          acc[month][key] += typeof item[key] === "number" ? item[key] : 0;
        }
      }
      return acc;
    }, {} as Record<string, any>);
    return Object.values(result);
  };

  const aggregateDataByWeek = (data: any) => {
    const getMonday = (d: Date) => {
      const date = new Date(d);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    };

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const result = data.reduce((acc: any, item: any) => {
      const date = new Date(item.date);
      const monday = getMonday(date);
      const weekId = formatDate(monday);

      if (!acc[weekId]) {
        acc[weekId] = { date: weekId };
        for (const key in item) {
          if (key !== "date") {
            acc[weekId][key] = 0;
          }
        }
      }

      for (const key in item) {
        if (key !== "date") {
          acc[weekId][key] += typeof item[key] === "number" ? item[key] : 0;
        }
      }

      return acc;
    }, {} as Record<string, any>);
    return Object.values(result);
  };

  const formattedChartData = useMemo(() => {
    const publishedDate = getPublishedDate(selectedEpisode);
    return data.data
      .filter((item: any) => {
        const itemDate = new Date(item.date);
        return publishedDate ? itemDate >= publishedDate : true;
      })
      .map((item: any) => ({
        date: item.date,
        value: item[selectedEpisode] as number,
      }));
  }, [data, selectedEpisode]);

  return (
    <div>
      <div className="flex items-center flex-col sm:flex-row mb-1">
        <div className="sm:mr-20">
          <p className="text-lg font-bold">
            Evolution des auditeurs
            <Headphones
              width={20}
              height={20}
              className="ml-1 inline mb-[2px]"
            />
          </p>
          <p className="text-sm">
            Evolution journalière, hebdomadiare ou mensuelle du nombre
            d'auditeurs du podcast selon l'épisode.
          </p>
        </div>

        <div className="mt-3 mb-3 sm:m-0">
          <Select value={selectedEpisode} onValueChange={setSelectedEpisode}>
            <SelectTrigger
              className="w-[200px] rounded-lg sm:ml-auto"
              aria-label="Selectionnez un épisode"
            >
              <SelectValue placeholder="Episode" />
            </SelectTrigger>
            <SelectContent className="rounded-xl h-[250px]">
              <SelectItem value="all_episodes" className="rounded-lg">
                Tous les épisodes
              </SelectItem>
              {data.episodes.map((item: any) => (
                <SelectItem
                  key={item.aftercinema_id}
                  value={item.aftercinema_id}
                  className="rounded-lg"
                >
                  {item.title.split(" : ")[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-xs text-neutral-500">
          <Info
            width={15}
            height={15}
            className="mr-1 inline mb-[2px] text-neutral-500"
          />
          Vous êtes en train de consulter :{" "}
          {getSelectedEpisodeInfos(selectedEpisode).publishedDate
            ? getSelectedEpisodeInfos(selectedEpisode).title +
              " , publié le " +
              getSelectedEpisodeInfos(
                selectedEpisode
              ).publishedDate?.toLocaleDateString("fr-FR", {
                month: "numeric",
                day: "numeric",
                year: "2-digit",
              }) +
              "."
            : getSelectedEpisodeInfos(selectedEpisode).title + "."}
        </p>
      </div>
      <Tabs defaultValue="week" className="text-sm">
        <TabsList className="text-sm">
          <TabsTrigger value="day">jour</TabsTrigger>
          <TabsTrigger value="week">semaine</TabsTrigger>
          <TabsTrigger value="month">mois</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <AcastListenersChart
            chartType={"day"}
            formattedChartData={formattedChartData}
          />
        </TabsContent>
        <TabsContent value="week">
          <AcastListenersChart
            chartType={"week"}
            formattedChartData={aggregateDataByWeek(formattedChartData)}
          />
        </TabsContent>
        <TabsContent value="month">
          <AcastListenersChart
            chartType={"month"}
            formattedChartData={aggregateDataByMonth(formattedChartData)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
