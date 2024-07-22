import ActionBtn from "@/components/action-btn";
import LogoContainer from "@/components/logo-container";

export default function Legal() {
  return (
    <div className="h-dvh bg-gradient-to-t from-backgroundbottom to-white">
      <LogoContainer />
      <div className="mt-5 text-center">
        <h1 className="mx-1 text-sm mb-12">
          Ce site est hébergé par OVH SAS 2 rue Kellermann - 59100 Roubaix -
          France.
        </h1>
        <ActionBtn />
      </div>
    </div>
  );
}
