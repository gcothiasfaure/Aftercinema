import Icon from "@/components/icon";
import Link from "next/link";

export default function HomeMenuBtn() {
	return (
		<Link href="/">
			<Icon iconLabel="home" />
		</Link>
	);
}
