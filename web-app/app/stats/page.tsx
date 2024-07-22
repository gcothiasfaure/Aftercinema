import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import PostHogPageViewedChart from "@/components/charts/posthog-page-viewed-chart";
import PostHogPlatfromButtonClickedChart from "@/components/charts/posthog-platfrom-button-clicked-chart";
import AcastYouTubeDownloadsChartContainer from "@/components/charts/acast-youtube-downloads-chart-container";
import YouTubeChart from "@/components/charts/youtube-chart";
import InstagramChart from "@/components/charts/instagram-chart";
import AcastYouTubePlatformsChart from "@/components/charts/acast-youtube-platforms-chart";
import TableOfContentLink from "@/components/table-of-content-link";
import AcastListenersChartContainer from "@/components/charts/acast-listeners-chart-container";

import LogoContainer from "@/components/logo-container";
import ActionBtn from "@/components/action-btn";
import EmailMenuBtn from "@/components/menu-btn/email-menu-btn";
import ShareMenuBtn from "@/components/menu-btn/share-menu-btn";
import HomeMenuBtn from "@/components/menu-btn/home-menu-btn";
import AcastYouTubeDownloadsTable from "@/components/charts/acast-youtube-downloads-table";

const fetchData = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/get-stats-data");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default async function Stats() {
  const data = await fetchData();
  if (!data) {
    return (
      <div className="bg-gradient-to-t from-backgroundbottom to-white min-h-screen mb-16">
        <div className="fixed top-0 z-50 mt-2 ml-2">
          <HomeMenuBtn />
        </div>
        <div className="fixed top-0 right-0 z-50 mt-2 mr-2">
          <EmailMenuBtn />
        </div>
        <div className="fixed top-0 right-[56px] z-50 mt-2 mr-2">
          <ShareMenuBtn />
        </div>
        <LogoContainer />
        <div className="max-w-screen-sm sm:mx-auto mx-2">
          <div className="mt-10">
            <p className="text-lg">
              Bienvenue sur les statistiques d'
              <span className="font-bold">Aftercinema</span>!
            </p>
            <p className="text-sm">
              Il y a eu une erreur lors de la récupération des données. Veuillez
              nous excusez pour la gène occasionnée et veuillez réessayer plus
              tard. Merci.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-16 mb-16">
          <ActionBtn />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-t from-backgroundbottom to-white min-h-screen pb-16">
      <div className="fixed top-0 z-50 mt-2 ml-2">
        <HomeMenuBtn />
      </div>
      <div className="fixed top-0 right-0 z-50 mt-2 mr-2">
        <EmailMenuBtn />
      </div>
      <div className="fixed top-0 right-[56px] z-50 mt-2 mr-2">
        <ShareMenuBtn />
      </div>
      <LogoContainer />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <div className="mt-10 mb-3">
          <p className="text-lg">
            Bienvenue sur les statistiques d'
            <span className="font-bold">Aftercinema</span>!
          </p>
          <p className="text-sm">
            Les données ont été mises à jour le{" "}
            {new Date(
              data["PostHog - Page viewed"].store_date
            ).toLocaleTimeString("fr-FR", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
            .
          </p>
        </div>
        <Accordion type="single" collapsible className="w-[300px] mb-3">
          <AccordionItem value="item-1">
            <AccordionTrigger>Table des matières</AccordionTrigger>
            <AccordionContent>
              <TableOfContentLink
                id="#evol-telechgt"
                label="Evolution des téléchargements"
              />
              <TableOfContentLink
                id="#perf-episodes"
                label="Performance des épisodes"
              />
              <TableOfContentLink
                id="#evol-auditeurs"
                label="Evolution des auditeurs"
              />
              <TableOfContentLink
                id="#plateformes-ecoute"
                label="Plateformes d'écoute"
              />
              <TableOfContentLink
                id="#evol-visites"
                label="Evolution des visites"
              />
              <TableOfContentLink id="#nbr-clics" label="Nombre de clics" />
              <TableOfContentLink
                id="#donnees-youtube"
                label="Données YouTube"
              />
              <TableOfContentLink
                id="#donnees-instagram"
                label="Données Instagram"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator
        id="evol-telechgt"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <AcastYouTubeDownloadsChartContainer
          data={{
            data: data["Acast+Youtube - Downloads"].data,
            episodes: data["General - Episodes"].data,
          }}
        />
      </div>
      <Separator
        id="perf-episodes"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <AcastYouTubeDownloadsTable
          data={{
            data: data["Acast+Youtube - Downloads"].data,
            episodes: data["General - Episodes"].data,
          }}
        />
      </div>
      <Separator
        id="evol-auditeurs"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <AcastListenersChartContainer
          data={{
            data: data["Acast - Listeners"].data,
            episodes: data["General - Episodes"].data,
          }}
        />
      </div>
      <Separator
        id="plateformes-ecoute"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <AcastYouTubePlatformsChart
          data={data["Acast+Youtube - Platforms"].data}
        />
      </div>
      <Separator
        id="evol-visites"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <PostHogPageViewedChart data={data["PostHog - Page viewed"].data} />
      </div>
      <Separator
        id="nbr-clics"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <PostHogPlatfromButtonClickedChart
          data={data["PostHog - Platform button clicked"].data}
        />
      </div>
      <Separator
        id="donnees-youtube"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <YouTubeChart data={data["YouTube"].data} />
      </div>
      <Separator
        id="donnees-instagram"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <InstagramChart data={data["Instagram"].data} />
      </div>
      <div className="flex justify-center mt-16">
        <ActionBtn />
      </div>
    </div>
  );
}
