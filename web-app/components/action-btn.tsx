import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Headphones } from "lucide-react";

export default function ActionBtn() {
	return (
		<Link href="/listen">
			<Button size="lg" variant="action">
				Écoute Aftercinema !
				<Headphones
					size={25}
					strokeWidth={2.5}
					absoluteStrokeWidth
					className="ml-2 mb-[2px]"
				/>
			</Button>
		</Link>
	);
}
