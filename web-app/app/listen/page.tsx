import LogoContainer from "@/components/logo-container";
import ChartMenuBtn from "@/components/menu-btn/chart-menu-btn";
import EmailMenuBtn from "@/components/menu-btn/email-menu-btn";
import HomeMenuBtn from "@/components/menu-btn/home-menu-btn";
import ShareMenuBtn from "@/components/menu-btn/share-menu-btn";
import PlatformBtn from "@/components/platform-btn";

export default function Listen() {
  return (
    <div className="bg-gradient-to-t from-backgroundbottom to-white pb-24 min-h-screen">
      <div className="fixed top-0 z-50 mt-2 ml-2">
        <HomeMenuBtn />
      </div>
      <div className="fixed top-0 right-[112px] z-50 mt-2 mr-2">
        <ChartMenuBtn />
      </div>
      <div className="fixed top-0 right-0 z-50 mt-2 mr-2">
        <EmailMenuBtn />
      </div>
      <div className="fixed top-0 right-[56px] z-50 mt-2 mr-2">
        <ShareMenuBtn />
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
