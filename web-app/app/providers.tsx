"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    if (posthog) {
      posthog.capture("Page viewed");
    }
  }, [pathname]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
