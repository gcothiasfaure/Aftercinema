import ActionBtn from "@/components/action-btn";
import LogoContainer from "@/components/logo-container";

export default function NotFound() {
  return (
    <div className="h-[calc(100dvh)] bg-gradient-to-t from-backgroundbottom to-white">
      <LogoContainer />
      <div className="mt-5 text-center">
        <h1 className="text-2xl font-bold ">Cette page n'existe pas.</h1>
        <ActionBtn />
      </div>
    </div>
  );
}
