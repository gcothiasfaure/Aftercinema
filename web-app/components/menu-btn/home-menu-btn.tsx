"use client";

import Link from "next/link";

import { usePostHog } from "posthog-js/react";

import Icon from "@/components/icon";

export default function HomeMenuBtn() {
	const posthog = usePostHog();
	return (
		<Link
			href="/"
			onClick={() => {
				posthog.capture("Home button clicked");
			}}
		>
			<Icon iconLabel="home" />
		</Link>
	);
}
