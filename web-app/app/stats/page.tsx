import LogoContainer from "@/components/logo-container";
import ActionBtn from "@/components/action-btn";
import EmailMenuBtn from "@/components/menu-btn/email-menu-btn";
import ShareMenuBtn from "@/components/menu-btn/share-menu-btn";
import HomeMenuBtn from "@/components/menu-btn/home-menu-btn";

import { MoveUpRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CustomChart1 from "@/components/charts/custom-chart-1";
import CustomChart2 from "@/components/charts/custom-chart-2";
import CustomChart3 from "@/components/charts/custom-chart-3";
import CustomChart4 from "@/components/charts/custom-chart-4";
import CustomChart5 from "@/components/charts/custom-chart-5";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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

function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} à ${hours}:${minutes}`;
}

export default async function Stats() {
  const data = await fetchData();

  if (!data) {
    return (
      <div className="bg-gradient-to-t from-backgroundbottom to-white min-h-screen">
        <div className="fixed top-0 w-[100vw] z-50">
          <div className="flex justify-between m-2 max-w-screen-sm mx-2 sm:mx-auto">
            <div>
              <HomeMenuBtn />
            </div>
            <div className="flex">
              <div className="mr-2">
                <EmailMenuBtn />
              </div>
              <div>
                <ShareMenuBtn />
              </div>
            </div>
          </div>
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
    <div className="bg-gradient-to-t from-backgroundbottom to-white pb-24 min-h-screen">
      <div className="fixed top-0 w-[100vw] z-50">
        <div className="flex justify-between m-2 max-w-screen-sm mx-2 sm:mx-auto">
          <div>
            <HomeMenuBtn />
          </div>
          <div className="flex">
            <div className="mr-2">
              <EmailMenuBtn />
            </div>
            <div>
              <ShareMenuBtn />
            </div>
          </div>
        </div>
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
            {formatDateTime(data["PostHog - Page viewed"].store_date)}.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-[200px] mb-3">
          <AccordionItem value="item-1">
            <AccordionTrigger>Table des matières</AccordionTrigger>
            <AccordionContent>
              <div>
                <Link
                  href="#nbr-visites"
                  className="hover:underline decoration-h2color text-h2color"
                >
                  <div className="flex items-center">
                    Nombre de visites
                    <MoveUpRight width={15} height={15} className="ml-1" />
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="#nbr-clics"
                  className="hover:underline decoration-h2color text-h2color"
                >
                  <div className="flex items-center">
                    Nombre de clics
                    <MoveUpRight width={15} height={15} className="ml-1" />
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="#donnees-youtube"
                  className="hover:underline decoration-h2color text-h2color"
                >
                  <div className="flex items-center">
                    Données YouTube
                    <MoveUpRight width={15} height={15} className="ml-1" />
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="#donnees-instagram"
                  className="hover:underline decoration-h2color text-h2color"
                >
                  <div className="flex items-center">
                    Données Instagram
                    <MoveUpRight width={15} height={15} className="ml-1" />
                  </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator
        id="nbr-visites"
        className="w-[50px] mx-auto bg-black mb-[50px]"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <CustomChart1 data={data["PostHog - Page viewed"].data} />
      </div>
      <Separator
        id="nbr-clics"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <CustomChart2 data={data["PostHog - Platform button clicked"].data} />
      </div>
      {/* <Separator className="w-[50px] mx-auto bg-black mb-[50px] mt-10" />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <CustomChart3 data={data["PostHog - Page viewed"].data} />
      </div> */}
      <Separator
        id="donnees-youtube"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <CustomChart4 data={data["YouTube"].data} />
      </div>
      <Separator
        id="donnees-instagram"
        className="w-[50px] mx-auto bg-black mb-[50px] mt-10"
      />
      <div className="max-w-screen-sm sm:mx-auto mx-2">
        <CustomChart5 data={data["Instagram"].data} />
      </div>
      <div className="flex justify-center mt-16 mb-16">
        <ActionBtn />
      </div>
    </div>
  );
}
