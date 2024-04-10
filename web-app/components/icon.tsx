import { Home, Bell, Mail, Share } from "lucide-react";

export default function Icon({ iconLabel }: { iconLabel: string }) {
	return (
		<div className="p-2 rounded bg-gray-200 cursor-pointer flex justify-center flex-col hover:bg-gray-300">
			{iconLabel === "home" && <Home size={32} strokeWidth={2.5} />}
			{iconLabel === "bell" && <Bell size={32} strokeWidth={2.5} />}
			{iconLabel === "email" && <Mail size={32} strokeWidth={2.5} />}
			{iconLabel === "share" && <Share size={32} strokeWidth={2.5} />}
		</div>
	);
}
