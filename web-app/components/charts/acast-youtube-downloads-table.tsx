"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Headphones, ArrowUpDown, Info } from "lucide-react";

interface Episode {
  title: string;
  publishedDate: number;
  downloads: number;
  prct: number;
  downloads7Days: number;
  downloads30Days: number;
}

import { useMemo, useState } from "react";

const columns: ColumnDef<Episode>[] = [
  {
    accessorKey: "title",
    header: () => <div className="w-[350px] text-xs">Episode</div>,
  },
  {
    accessorKey: "publishedDate",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publié le
          <ArrowUpDown className="ml-1" size={12} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rowValue: number = row.getValue("publishedDate");
      const date = new Date(rowValue).toLocaleDateString("fr-FR");
      return <div className="text-center">{date}</div>;
    },
  },
  {
    accessorKey: "downloads7Days",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Écoutes cumul 7 jours
          <ArrowUpDown className="ml-1" size={12} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("downloads7Days")}</div>
      );
    },
  },
  {
    accessorKey: "downloads30Days",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Écoutes cumul 30 jours
          <ArrowUpDown className="ml-1" size={12} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("downloads30Days")}</div>
      );
    },
  },
  {
    accessorKey: "downloads",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Écoutes totales
          <ArrowUpDown className="ml-1" size={12} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("downloads")}</div>;
    },
  },
  {
    accessorKey: "prct",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % écoutes totales
          <ArrowUpDown className="ml-1" size={12} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rowValue: number = row.getValue("prct");
      return <div className="text-center">{rowValue.toFixed(1) + "%"}</div>;
    },
  },
];

export default function AcastYouTubeDownloadsTable({ data }: { data: any }) {
  const downloadSummary: {
    downloadSummary: Episode[];
    nbTotalOfDownloads: number;
  } = useMemo(() => {
    const downloadsByEpisode: any = {};
    data.episodes.forEach((episode: any) => {
      downloadsByEpisode[episode.aftercinema_id] = {
        title: episode.title,
        publishedDate: new Date(episode.acast_publishedDate).getTime(),
        downloads: 0,
        downloads7Days: 0,
        downloads30Days: 0,
      };
    });
    data.data.forEach((item: any) => {
      for (const key in item) {
        if (key !== "date" && key !== "all_episodes") {
          downloadsByEpisode[key].downloads += item[key];
          const currentDate = new Date(item.date).getTime();
          const daysDifference = Math.ceil(
            (currentDate - downloadsByEpisode[key].publishedDate) /
              (1000 * 3600 * 24)
          );

          if (daysDifference >= 0 && daysDifference <= 7) {
            downloadsByEpisode[key].downloads7Days += item[key];
          }

          if (daysDifference >= 0 && daysDifference <= 30) {
            downloadsByEpisode[key].downloads30Days += item[key];
          }
        }
      }
    });
    const nbTotalOfDownloads = Object.values(downloadsByEpisode).reduce(
      (acc: number, episode: any) => (acc += episode.downloads),
      0
    );

    const downloadsByEpisodeArray: Episode[] =
      Object.values(downloadsByEpisode);

    downloadsByEpisodeArray.forEach((episode: Episode) => {
      episode.prct = (episode.downloads / nbTotalOfDownloads) * 100;
    });

    return {
      downloadSummary: downloadsByEpisodeArray,
      nbTotalOfDownloads: nbTotalOfDownloads,
    };
  }, [data]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: "downloads7Days", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: downloadSummary.downloadSummary,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div>
      <div className="sm:mr-20 mb-3">
        <p className="text-lg font-bold">
          Performance des épisodes
          <Headphones width={20} height={20} className="ml-1 inline mb-[2px]" />
        </p>
        <p className="text-sm">
          Tableau récapitulatif de la performance des épisodes sur toute
          période.
        </p>
        <p className="text-sm font-bold">
          {" "}
          Il y a eu un total de{" "}
          <span className="text-h2color">
            {downloadSummary.nbTotalOfDownloads}
          </span>{" "}
          téléchargements (écoutes) tout épisode et période confondues.
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          <Info
            width={15}
            height={15}
            className="mr-1 inline mb-[2px] text-neutral-500"
          />
          Le tableau est trié par défaut par{" "}
          <span className="font-bold">Écoutes cumul 7 jours</span> déscendant.
        </p>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &#x3008;
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &#x27E9;
        </Button>
      </div>
    </div>
  );
}
