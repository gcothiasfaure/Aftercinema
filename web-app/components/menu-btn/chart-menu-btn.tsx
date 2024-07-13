"use client";

import Link from "next/link";

import { usePostHog } from "posthog-js/react";

import Icon from "@/components/icon";

export default function HomeMenuBtn() {
	const posthog = usePostHog();
	return (
		<Link
			href="/stats"
			onClick={() => {
				posthog.capture("Menu button clicked", { $type: "Chart" });
			}}
		>
			<Icon iconLabel="chart" />
		</Link>
	);
}
