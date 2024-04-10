import ActionBtn from "@/components/action-btn";
import LogoContainer from "@/components/logo-container";

export default function NotFound() {
	return (
		<div className="h-screen bg-gradient-to-t from-backgroundbottom to-white pb-24 ">
			<LogoContainer />
			<div className="mt-5 text-center">
				<h1 className="text-2xl font-bold mb-12">Cette page n'existe pas.</h1>
				<ActionBtn />
			</div>
		</div>
	);
}
