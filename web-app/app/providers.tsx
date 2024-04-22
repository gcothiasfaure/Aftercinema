"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		autocapture: false,
		disable_session_recording: true,
		persistence: "memory",
		disable_persistence: true,
		disable_cookie: true,
		capture_pageview: false,
		capture_pageleave: false,
	});
}

export function PHProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (posthog) {
			let url = window.origin + pathname;
			if (searchParams.toString()) {
				url = url + `?${searchParams.toString()}`;
			}
			posthog.capture("Page viewed");
		}
	}, [pathname, searchParams]);

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
