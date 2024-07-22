import instagramLogo from "@/public/platforms/instagram.png";

import Image from "next/image";

export default function InstagramChart({ data }: { data: any }) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-lg font-bold">
          Données Instagram
          <Image
            src={instagramLogo}
            className="inline mb-[2px] ml-1"
            alt="Logo plateforme"
            width={20}
            height={20}
          />
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-fit">
          <div className="flex mb-2 px-5 sm:px-20 pt-5">
            <div className="mr-20">
              <p className="text-xs">
                Nombre de <span className="italic">J'aime</span>
              </p>
              <p className="text-xl font-bold">{data.likesCount}</p>
            </div>
            <div>
              <p className="text-xs">
                Nombre de <span className="italic">followers</span>
              </p>
              <p className="text-xl font-bold">{data.followersCount}</p>
            </div>
          </div>
          <div className="flex px-5 sm:px-20 pt-5">
            <div className="mr-20">
              <p className="text-xs">
                Nombre de <span className="italic">posts</span>
              </p>
              <p className="text-xl font-bold">{data.postsCount}</p>
            </div>
            <div>
              <p className="text-xs">
                Nombre de <span className="italic">J'aime</span> par
                <span className="italic">posts</span>
              </p>
              <p className="text-xl font-bold">
                {parseFloat((data.likesCount / data.postsCount).toFixed(1))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
