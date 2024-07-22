import youtubeLogo from "@/public/platforms/youtube.png";

import Image from "next/image";

export default function YouTubeChart({
  data,
}: {
  data: {
    likesCount: number;
    subscribersCount: number;
  };
}) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-lg font-bold">
          Données YouTube
          <Image
            src={youtubeLogo}
            alt="Logo plateforme"
            className="inline mb-[2px] ml-1"
            width={20}
            height={20}
          />
        </p>
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
