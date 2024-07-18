import youtubeLogo from "@/public/platforms/youtube.png";

import Image from "next/image";

export default function CustomChart4({ data }: { data: any }) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-lg font-bold mr-1">Données YouTube</p>
        <div>
          <Image
            src={youtubeLogo}
            alt="Logo plateforme"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-fit flex px-5 sm:px-20 pt-5">
          <div className="mr-20">
            <p className="text-xs">
              Nombre de <span className="italic">J'aime</span>
            </p>
            <p className="text-xl font-bold">{data.likesCount}</p>
          </div>
          <div>
            <p className="text-xs">
              Nombre de <span className="italic">subscribers</span>
            </p>
            <p className="text-xl font-bold">{data.subscribersCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
