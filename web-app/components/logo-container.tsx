import Image from "next/image";

import logo from "@/public/logos/logo500x500px.png";

export default function LogoContainer() {
  return (
    <div className="z-1 pt-12 flex justify-center">
      <div className="relative w-[30vh] h-[30vh]">
        <Image
          src={logo}
          alt="Logo d'Aftercinema"
          fill
          priority
          sizes="(max-width: 768px) 30vh, (max-width: 1200px) 30vw, 30vw"
        />
      </div>
    </div>
  );
}
