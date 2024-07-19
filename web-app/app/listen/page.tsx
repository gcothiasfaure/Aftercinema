import LogoContainer from "@/components/logo-container";
import ChartMenuBtn from "@/components/menu-btn/chart-menu-btn";
import EmailMenuBtn from "@/components/menu-btn/email-menu-btn";
import HomeMenuBtn from "@/components/menu-btn/home-menu-btn";
import ShareMenuBtn from "@/components/menu-btn/share-menu-btn";
import PlatformBtn from "@/components/platform-btn";

export default function Listen() {
  return (
    <div className="bg-gradient-to-t from-backgroundbottom to-white pb-24 min-h-screen">
      <div className="fixed top-0 w-[100vw] z-50">
        <div className="flex justify-between m-2 max-w-screen-sm mx-2 sm:mx-auto">
          <div>
            <HomeMenuBtn />
          </div>
          <div className="flex">
            <div className="mr-2">
              <ChartMenuBtn />
            </div>
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
      <div className="mt-10 flex justify-center">
        <div>
          <div>
            <PlatformBtn platformLabel="Spotify" />
          </div>
          <div className="mt-4">
            <PlatformBtn platformLabel="Deezer" />
          </div>
          <div className="mt-4">
            <PlatformBtn platformLabel="Instagram" />
          </div>
          <div className="mt-4">
            <PlatformBtn platformLabel="YouTube" />
          </div>
          <div className="mt-4">
            <PlatformBtn platformLabel="Apple Podcasts" />
          </div>
        </div>
      </div>
    </div>
  );
}
